"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
type Language = string;
const theme = themes.vsDark;

interface FileEntry { path: string; name: string; content: string }
interface Props { file: FileEntry; search?: string }

function guessLanguage(name: string): Language | undefined {
  if (name.endsWith('.cpp') || name.endsWith('.cc') || name.endsWith('.cxx')) return 'cpp';
  if (name.endsWith('.c')) return 'c';
  if (name.endsWith('.h') || name.endsWith('.hpp')) return 'clike';
  if (name.endsWith('.ts')) return 'typescript';
  if (name.endsWith('.js') || name.endsWith('.mjs')) return 'javascript';
  if (name.endsWith('.json')) return 'json';
  return 'clike';
}

export default function CodeView({ file, search }: Props) {
  const lang = guessLanguage(file.name) as Language;
  const [wrap, setWrap] = useState<boolean>(() => (typeof window !== 'undefined' ? localStorage.getItem('code-wrap') === '1' : false));
  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window === 'undefined') return 14;
    const stored = localStorage.getItem('code-font');
    return stored ? parseInt(stored, 10) || 14 : 14;
  });
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('code-wrap', wrap ? '1' : '0'); }, [wrap]);
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('code-font', String(fontSize)); }, [fontSize]);

  const lines = useMemo(() => file.content.split(/\r?\n/), [file.content]);
  const sizeBytes = new Blob([file.content]).size;
  const lineMatches = useMemo(() => {
    if (!search) return new Set<number>();
    const s = search.toLowerCase();
    const set = new Set<number>();
    lines.forEach((ln, idx) => { if (ln.toLowerCase().includes(s)) set.add(idx); });
    return set;
  }, [search, lines]);

  const [showMap, setShowMap] = useState(false);
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-3 flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-col min-w-0">
          <h2 className="font-semibold text-lg truncate" title={file.path}>{file.path}</h2>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 flex gap-3">
            <span>{lines.length} lines</span>
            <span>{sizeBytes} bytes</span>
            <span>lang: {lang}</span>
            {search && <span>{lineMatches.size} matching lines</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <label className="flex items-center gap-1 text-[11px] cursor-pointer select-none">
            <input type="checkbox" className="accent-indigo-600" checked={wrap} onChange={e=>setWrap(e.target.checked)} />
            <span>Wrap</span>
          </label>
          <div className="flex items-center gap-1 text-[11px]">
            <span className="opacity-60">Font</span>
            <input type="range" min={11} max={20} value={fontSize} onChange={e=>setFontSize(parseInt(e.target.value,10))} />
          </div>
          <button onClick={()=>setShowMap(m=>!m)} className="text-[11px] px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 hover:bg-neutral-700">{showMap ? 'Hide Map' : 'Minimap'}</button>
          <button
            onClick={() => navigator.clipboard.writeText(file.content)}
            className="text-[11px] px-2 py-1 rounded bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-sm shadow-indigo-950/30"
          >Copy</button>
        </div>
      </div>
      <div className="code-frame rounded-xl overflow-hidden text-sm flex-1 min-h-0 bg-neutral-950/60">
        <Highlight code={file.content} language={lang} theme={theme}>
          {/* prism-react-renderer types are broad; keeping lightweight here */}
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
            <pre className={`${className} h-full ${wrap ? 'whitespace-pre-wrap' : 'whitespace-pre'} overflow-auto p-4 leading-relaxed`} style={{ ...style, fontSize, background:'transparent' }}>
              {tokens.map((line: unknown, i: number) => {
                const lineProps = getLineProps({ line });
                const isMatch = lineMatches.has(i);
                return (
                  <div key={i} {...lineProps} className={`table-row ${isMatch ? 'bg-indigo-600/10' : ''}`}>
                    <span className="table-cell pr-4 select-none opacity-50 text-right w-12">{i + 1}</span>
                    <span className="table-cell">{Array.isArray(line) && line.map((token: unknown, key: number) => <span key={key} {...getTokenProps({ token })} />)}</span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
      {showMap && (
        <div className="mt-3 h-24 relative rounded-md overflow-hidden border border-neutral-800 bg-neutral-900/70">
          <div className="absolute inset-0 text-[5px] leading-[6px] font-mono opacity-50 p-2 whitespace-pre overflow-hidden select-none">
            {lines.slice(0,600).map((l,i)=> (i%3===0? l.slice(0,120):'')).join('\n')}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-neutral-900" />
        </div>
      )}
    </div>
  );
}
