"use client";

import { FileEntry, IndexData } from "@/types";
import { RefObject, ReactNode } from "react";
import Tree from "../dsa/Tree";
import SearchBar from "./SearchBar";

interface SidebarProps {
  data: IndexData;
  search: string;
  setSearch: (v: string) => void;
  fuzzy: boolean;
  setFuzzy: (fn: (f: boolean) => boolean) => void;
  expanded: Set<string>;
  toggleFolder: (p: string) => void;
  currentFile: FileEntry | null;
  onSelectFile: (p: string) => void;
  highlight: (text: string) => ReactNode;
  filteredFiles: FileEntry[];
  searchInputRef: RefObject<HTMLInputElement | null>;
}

export default function Sidebar({
  data,
  search,
  setSearch,
  fuzzy,
  setFuzzy,
  expanded,
  toggleFolder,
  currentFile,
  onSelectFile,
  highlight,
  filteredFiles,
  searchInputRef,
}: SidebarProps) {
  const totalCount = data.files.length;
  const filteredCount = filteredFiles.length;
  return (
    <aside className="flex flex-col h-full min-h-0 shrink-0 border-r border-neutral-800 bg-neutral-900/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/40">
      <div className="px-3 pt-3 pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold tracking-tight text-sm uppercase text-neutral-400">
            DSA Explorer
          </span>
        </div>
        <SearchBar
          search={search}
          setSearch={setSearch}
          setFuzzy={setFuzzy}
          fuzzy={fuzzy}
          searchInputRef={searchInputRef}
        />
      </div>
      <div className="px-3 pb-2 text-[10px] text-neutral-500 flex items-center gap-3 border-b border-neutral-800">
        <span>
          {filteredCount}/{totalCount} files
        </span>
        <span
          className="inline-flex items-center gap-1"
          title="Static build data"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          static
        </span>
      </div>
      <nav className="flex-1 min-h-0 overflow-auto overflow-x-hidden text-sm leading-5 py-2 custom-scroll">
        <Tree
          node={data.tree}
          expanded={expanded}
          toggleFolder={toggleFolder}
          current={currentFile?.path || ""}
          select={onSelectFile}
          search={search}
          highlight={highlight}
          filteredSet={new Set(filteredFiles.map((f) => f.path))}
        />
      </nav>
      <div className="px-3 py-2 text-[10px] text-neutral-500 border-t border-neutral-800 flex items-center justify-between gap-2">
        <span className="truncate" title={data.generatedAt}>
          Updated{" "}
          {data.generatedAt && new Date(data.generatedAt).toLocaleTimeString()}
        </span>
      </div>
    </aside>
  );
}
