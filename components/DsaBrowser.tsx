"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import CodeView from "./CodeView";
import indexData from "@/data/dsa-index.json";
import { IndexData } from "../types";
import Breadcrumbs from "./dsa/Breadcrumbs";
import Sidebar from "./ui/SideBar";

interface Props {
  initialPath?: string;
}

export default function DsaBrowser({ initialPath }: Props) {
  const data = indexData as IndexData;
  const [selectedPath, setSelectedPath] = useState<string | null>(
    initialPath || null
  );
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [fuzzy, setFuzzy] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState<number>(288); // default sidebar width
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const resizingRef = useRef(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // Focus & select existing search text for quick replacement
        setTimeout(() => {
          if (searchInputRef.current) {
            searchInputRef.current.focus();
            searchInputRef.current.select();
          }
        }, 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Expand all folders in path of selected file (only mutate when needed to avoid infinite loop)
  useEffect(() => {
    if (!selectedPath) return;
    setExpanded((prev) => {
      const parts = selectedPath.split("/");
      let changed = false;
      const next = new Set(prev);
      for (let i = 1; i < parts.length; i++) {
        const segPath = parts.slice(0, i).join("/");
        if (!next.has(segPath)) {
          next.add(segPath);
          changed = true;
        }
      }
      return changed ? next : prev; // keep same reference if nothing new to prevent re-renders
    });
  }, [selectedPath]);

  // Track viewport width for responsive behavior
  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024;
      setIsMobile(w < 768); // Tailwind md breakpoint
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Close mobile sidebar on file select
  useEffect(() => {
    if (isMobile) setMobileSidebarOpen(false);
  }, [selectedPath, isMobile]);

  // Simple fuzzy score
  const score = useCallback((needle: string, hay: string) => {
    let hIdx = 0,
      nIdx = 0,
      score = 0;
    const h = hay.toLowerCase();
    const n = needle.toLowerCase();
    while (hIdx < h.length && nIdx < n.length) {
      if (h[hIdx] === n[nIdx]) {
        score += 2;
        nIdx++;
      } else score -= 1;
      hIdx++;
    }
    return nIdx === n.length ? score - (h.length - n.length) : -9999;
  }, []);

  const filteredFiles = useMemo(() => {
    if (!data) return [];
    if (!search) return data.files;
    if (!fuzzy) {
      const s = search.toLowerCase();
      return data.files.filter(
        (f) =>
          f.path.toLowerCase().includes(s) ||
          f.content.toLowerCase().includes(s)
      );
    }
    const arr = data.files
      .map((f) => ({
        file: f,
        sc: Math.max(
          score(search, f.path),
          score(search, f.content.slice(0, 400))
        ),
      }))
      .filter((x) => x.sc > -5000);
    arr.sort((a, b) => b.sc - a.sc);
    return arr.slice(0, 500).map((x) => x.file);
  }, [data, search, fuzzy, score]);

  const currentFile = filteredFiles.find((f) => f.path === selectedPath);

  const toggleFolder = (p: string) => {
    const ns = new Set(expanded);
    if (ns.has(p)) ns.delete(p);
    else ns.add(p);
    setExpanded(ns);
  };

  const onSelectFile = (p: string) => {
    setSelectedPath(p);
    if (typeof window !== "undefined") {
      const url = "/code/" + p.split("/").map(encodeURIComponent).join("/");
      window.history.replaceState(null, "", url);
    }
  };

  const breadcrumbs = useMemo(() => {
    if (!selectedPath) return [];
    const parts = selectedPath.split("/");
    return parts.map((seg, i) => ({
      name: seg,
      full: parts.slice(0, i + 1).join("/"),
    }));
  }, [selectedPath]);

  const highlight = (text: string) => {
    if (!search) return text;
    const lc = text.toLowerCase();
    const s = search.toLowerCase();
    const idx = lc.indexOf(s);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="bg-yellow-300/60 dark:bg-yellow-600/40 rounded px-0.5">
          {text.slice(idx, idx + s.length)}
        </span>
        {text.slice(idx + s.length)}
      </>
    );
  };

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-neutral-100 select-none">
      {/* Sidebar (desktop) */}
      {!isMobile && data && (
        <div
          style={{ width: sidebarWidth, minWidth: sidebarWidth }}
          className="h-full shrink-0 border-r border-neutral-800/60 bg-neutral-900/40 backdrop-blur-sm"
        >
          <Sidebar
            data={data}
            search={search}
            setSearch={setSearch}
            fuzzy={fuzzy}
            setFuzzy={setFuzzy}
            expanded={expanded}
            toggleFolder={toggleFolder}
            currentFile={currentFile || null}
            onSelectFile={onSelectFile}
            highlight={highlight}
            filteredFiles={filteredFiles}
            searchInputRef={searchInputRef}
          />
        </div>
      )}
      {/* Resizer (desktop only) */}
      {!isMobile && (
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            resizingRef.current = true;
          }}
          onDoubleClick={() => setSidebarWidth(288)}
          className="w-1 cursor-col-resize bg-neutral-700/50 hover:bg-indigo-400/50 transition-colors"
          style={{ userSelect: "none" }}
        />
      )}
      {/* Mobile sidebar overlay */}
      {isMobile && (
        <>
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-200 bg-black/50 ${
              mobileSidebarOpen
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            className={`fixed top-0 left-0 bottom-0 z-50 w-[85%] max-w-[320px] border-r border-neutral-800/70 bg-neutral-900/95 backdrop-blur-xl transition-transform duration-300 ease-out ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {data && (
              <Sidebar
                data={data}
                search={search}
                setSearch={setSearch}
                fuzzy={fuzzy}
                setFuzzy={setFuzzy}
                expanded={expanded}
                toggleFolder={toggleFolder}
                currentFile={currentFile || null}
                onSelectFile={onSelectFile}
                highlight={highlight}
                filteredFiles={filteredFiles}
                searchInputRef={searchInputRef}
              />
            )}
          </div>
        </>
      )}
      <div
        onMouseMove={(e) => {
          if (!isMobile && resizingRef.current) {
            const next = Math.min(500, Math.max(200, e.clientX));
            setSidebarWidth(next);
          }
        }}
        onMouseUp={() => {
          if (resizingRef.current) resizingRef.current = false;
        }}
        onMouseLeave={() => {
          if (resizingRef.current) resizingRef.current = false;
        }}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar for mobile */}
          {isMobile && (
            <div className="flex items-center gap-2 p-2 border-b border-neutral-800/60 bg-neutral-900/60 backdrop-blur">
              <button
                onClick={() => setMobileSidebarOpen((o) => !o)}
                className="px-3 py-2 rounded-md bg-neutral-800/80 hover:bg-neutral-700 text-xs font-medium tracking-wide border border-neutral-700 active:scale-[.97] transition"
                aria-label="Toggle navigation"
              >
                {mobileSidebarOpen ? "Close" : "Menu"}
              </button>
              <div className="flex-1 min-w-0">
                <Breadcrumbs
                  breadcrumbs={breadcrumbs}
                  onSelect={onSelectFile}
                  currentExt={currentFile?.name.split(".").pop()}
                  currentLength={currentFile?.path.length}
                />
              </div>
            </div>
          )}
          {!isMobile && (
            <Breadcrumbs
              breadcrumbs={breadcrumbs}
              onSelect={onSelectFile}
              currentExt={currentFile?.name.split(".").pop()}
              currentLength={currentFile?.path.length}
            />
          )}
          <div className="flex-1 overflow-auto">
            {currentFile ? (
              <CodeView file={currentFile} search={search} />
            ) : (
              <div className="p-10 text-neutral-500 text-sm">
                Use the sidebar to browse files. Start typing to search.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
