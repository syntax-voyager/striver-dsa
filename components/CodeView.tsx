"use client";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Highlight, themes } from "prism-react-renderer";
import type { RenderProps, Token } from "prism-react-renderer";
type Language = string;
const theme = themes.vsDark;

interface FileEntry {
  path: string;
  name: string;
  content: string;
}
interface Props {
  file: FileEntry;
  search?: string;
}

function guessLanguage(name: string): Language | undefined {
  if (name.endsWith(".cpp") || name.endsWith(".cc") || name.endsWith(".cxx"))
    return "cpp";
  if (name.endsWith(".c")) return "c";
  if (name.endsWith(".h") || name.endsWith(".hpp")) return "clike";
  if (name.endsWith(".ts")) return "typescript";
  if (name.endsWith(".js") || name.endsWith(".mjs")) return "javascript";
  if (name.endsWith(".json")) return "json";
  return "clike";
}

export default function CodeView({ file, search }: Props) {
  const lang = guessLanguage(file.name) as Language;
  const [fontSize, setFontSize] = useState<number>(14);

  // On mount, read persisted preferences (client only) and apply.
  useEffect(() => {
    try {
      const storedFont = localStorage.getItem("code-font");
      if (storedFont) {
        const parsed = parseInt(storedFont, 10);
        if (!Number.isNaN(parsed) && parsed >= 11 && parsed <= 32) {
          setFontSize(parsed);
        }
      }
    } catch {
      // ignore read errors (private mode, etc.)
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("code-font", String(fontSize));
    } catch {}
  }, [fontSize]);

  const lines = useMemo(() => file.content.split(/\r?\n/), [file.content]);
  const sizeBytes = new Blob([file.content]).size;
  const lineMatches = useMemo(() => {
    if (!search) return new Set<number>();
    const s = search.toLowerCase();
    const set = new Set<number>();
    lines.forEach((ln, idx) => {
      if (ln.toLowerCase().includes(s)) set.add(idx);
    });
    return set;
  }, [search, lines]);

  const [showMap, setShowMap] = useState(false);

  // Scroll + minimap sync
  const codeRef = useRef<HTMLDivElement | null>(null);
  // Removed scrollMeta/minimap viewport overlay for now to simplify and avoid unused vars.

  const handleMinimapPointer = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const ratio = Math.min(1, Math.max(0, y / rect.height));
      const el = codeRef.current;
      if (!el) return;
      const { scrollHeight, clientHeight } = el;
      el.scrollTop = (scrollHeight - clientHeight) * ratio;
    },
    []
  );

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-3 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-col min-w-0">
          <h2 className="font-semibold text-lg truncate" title={file.name}>
            {file.name}
          </h2>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 flex gap-3">
            <span>{lines.length} lines</span>
            <span>{sizeBytes} bytes</span>
            <span>lang: {lang}</span>
            {search && <span>{lineMatches.size} matching lines</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-[11px]">
            <span className="opacity-60">Font</span>
            <input
              type="range"
              min={11}
              max={20}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
            />
          </div>
          <button
            onClick={() => setShowMap((m) => !m)}
            className="text-[11px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700"
          >
            {showMap ? "Hide Map" : "Minimap"}
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(file.content)}
            className="text-[11px] px-2 py-1 rounded bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-sm shadow-indigo-950/30"
          >
            Copy
          </button>
        </div>
      </div>
      <div className="relative flex-1 min-h-0">
        <div
          ref={codeRef}
          className={`code-frame rounded-xl text-sm overflow-auto h-full bg-neutral-950/60 ${
            showMap ? "pr-[130px]" : ""
          }`}
        >
          <Highlight code={file.content} language={lang} theme={theme}>
            {({
              className,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }: RenderProps) => (
              <pre
                className={`${className} h-full ${
                  "whitespace-pre"
                } p-4 leading-relaxed`}
                style={{ ...style, fontSize, background: "transparent" }}
              >
                {tokens.map((line: Token[], i: number) => {
                  const lineProps = getLineProps({ line });
                  const isMatch = lineMatches.has(i);
                  return (
                    <div
                      key={i}
                      {...lineProps}
                      className={`table-row ${
                        isMatch ? "bg-indigo-600/10" : ""
                      }`}
                    >
                      <span className="table-cell pr-4 select-none opacity-50 text-right w-12">
                        {i + 1}
                      </span>
                      <span className="table-cell">
                        {Array.isArray(line) &&
                          line.map((token: Token, key: number) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                      </span>
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
        {showMap && (
          <div
            className="absolute top-0 right-0 h-full w-[80px] md:w-[120px] border-l border-neutral-800 bg-neutral-900/80 backdrop-blur-sm select-none text-[6px] leading-[7px] font-mono cursor-pointer"
            onPointerDown={(e) => {
              handleMinimapPointer(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons & 1) handleMinimapPointer(e);
            }}
          >
            <Highlight code={file.content} language={lang} theme={theme}>
              {({ tokens, getLineProps, getTokenProps }: RenderProps) => (
                <pre className="absolute inset-0 overflow-hidden p-2 pr-1 mr-2 opacity-60">
                  {tokens.map((line: Token[], i: number) => {
                    const { className, ...rest } = getLineProps({ line });
                    return (
                      <div
                        key={i}
                        className={className}
                        style={{
                          whiteSpace: "pre",
                          overflow: "hidden",
                          textOverflow: "clip",
                          maxWidth: "100%",
                        }}
                        {...rest}
                      >
                        {Array.isArray(line) &&
                          line.map((token: Token, key: number) => {
                            const tokenProps = getTokenProps({ token });
                            // Hard cap token content length per line for minimap rendering performance
                            let content = String(tokenProps.children);
                            if (content.length > 200) {
                              content = content.slice(0, 200);
                            }
                            return (
                              <span
                                key={key}
                                {...tokenProps}
                                style={{
                                  ...tokenProps.style,
                                  fontSize: 6,
                                }}
                              >
                                {content}
                              </span>
                            );
                          })}
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>
          </div>
        )}
      </div>
    </div>
  );
}
