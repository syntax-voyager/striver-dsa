"use client";
interface Crumb { name: string; full: string }

interface Props {
  breadcrumbs: Crumb[];
  onSelect: (full: string) => void;
  currentExt?: string;
  currentLength?: number;
}

export default function Breadcrumbs({ breadcrumbs, onSelect, currentExt, currentLength }: Props) {
  return (
    <div className="px-4 pt-3 pb-2 border-b border-neutral-800 flex items-center gap-2 flex-wrap bg-neutral-900/40 backdrop-blur sticky top-0 z-10">
      {breadcrumbs.length === 0 && (
        <span className="text-sm text-neutral-500">Select a file</span>
      )}
      {breadcrumbs.map((b, i) => (
        <span key={b.full} className="flex items-center gap-2 text-sm">
          {i > 0 && <span className="text-neutral-400">/</span>}
          <button
            onClick={() => onSelect(b.full)}
            className={`hover:underline ${
              i === breadcrumbs.length - 1
                ? "font-medium text-indigo-400"
                : "text-neutral-300"
            }`}
          >
            {b.name}
          </button>
        </span>
      ))}
      {currentExt && (
        <span className="ml-auto text-[10px] text-neutral-500 flex items-center gap-2">
          <span className="uppercase tracking-wide bg-neutral-800 border border-neutral-700 px-2 py-0.5 rounded">
            {currentExt}
          </span>
          {typeof currentLength === 'number' && <span>{currentLength} ch</span>}
        </span>
      )}
    </div>
  );
}
