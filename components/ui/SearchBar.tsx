"use client";
import { RefObject } from "react";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  fuzzy: boolean;
  setFuzzy: (fn: (f: boolean) => boolean) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
}

export default function SearchBar({ search, setSearch, fuzzy, setFuzzy, searchInputRef }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          ref={searchInputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={fuzzy ? "Fuzzy search..." : "Search (substring)..."}
          className="w-full rounded-md border border-neutral-700 bg-neutral-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-2 py-1 text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-1 top-1.5 text-xs text-neutral-500 hover:text-neutral-200"
          >
            ✕
          </button>
        )}
      </div>
      <button
        onClick={() => setFuzzy((f) => !f)}
        title="Toggle fuzzy search"
        className={`text-[10px] px-2 py-1 rounded border ${
          fuzzy
            ? "bg-indigo-600 text-white border-indigo-600"
            : "border-neutral-700 hover:bg-neutral-700"
        }`}
      >
        {fuzzy ? "FZ" : "SUB"}
      </button>
    </div>
  );
}
