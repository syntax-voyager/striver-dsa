"use client";
import React, { useMemo, useState } from 'react';
import { FileEntry } from '../../types';
import Icon from './Icon';

interface Props {
  files: FileEntry[]; // filtered
  allFiles: FileEntry[]; // full
  onClose: () => void;
  onOpen: (p: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export default function CommandPalette({ files, allFiles, onClose, onOpen, inputRef }: Props) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    if (!q) return files.slice(0, 40);
    const s = q.toLowerCase();
    return allFiles.filter(f => f.path.toLowerCase().includes(s)).slice(0, 60);
  }, [q, files, allFiles]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/40 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-[600px] max-w-full bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden" onMouseDown={e=>e.stopPropagation()}>
        <div className="p-2 border-b border-neutral-200 dark:border-neutral-700">
          <input ref={inputRef} value={q} onChange={e=>setQ(e.target.value)} placeholder="Quick open file..." className="w-full bg-transparent outline-none text-sm px-2 py-1" />
        </div>
        <ul className="max-h-[50vh] overflow-auto text-sm">
          {shown.map(f => (
            <li key={f.path}>
              <button onClick={()=>onOpen(f.path)} className="w-full text-left px-3 py-2 hover:bg-indigo-600 hover:text-white flex items-center gap-2">
                <Icon name="file" className="w-4 h-4 opacity-70" />
                <span className="truncate">{f.path}</span>
              </button>
            </li>
          ))}
          {shown.length === 0 && <li className="px-3 py-4 text-neutral-500 text-xs">No matches</li>}
        </ul>
        <div className="p-2 border-t border-neutral-200 dark:border-neutral-700 text-[10px] flex justify-between text-neutral-500">
          <span>Enter to open • Esc to close</span>
          <span>{shown.length} shown</span>
        </div>
      </div>
    </div>
  );
}
