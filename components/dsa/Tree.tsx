"use client";
import React from "react";
import { TreeNode } from "../../types";
import { hasDescendantMatch, countFiles, fileTypeIcon } from "./utils";
import Icon from "./Icon";

interface Props {
  node: TreeNode;
  expanded: Set<string>;
  toggleFolder: (p: string) => void;
  current: string;
  select: (p: string) => void;
  search: string;
  highlight: (t: string) => React.ReactNode;
  filteredSet: Set<string>;
}

export default function Tree({
  node,
  expanded,
  toggleFolder,
  current,
  select,
  search,
  highlight,
  filteredSet,
}: Props) {
  if (!node.children) return null;
  const entries = Object.values(node.children).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    <ul className="space-y-0.5">
      {entries.map((entry) => {
        if (entry.type === "file") {
          if (search && !filteredSet.has(entry.path!)) return null;
          const active = current === entry.path;
          return (
            <li key={entry.path}>
              <button
                onClick={() => select(entry.path!)}
                className={`group relative w-full flex items-center gap-2 rounded-md px-3 py-1.5 text-left transition-colors border border-transparent ${
                  active
                    ? "bg-indigo-600/90 text-white shadow-sm ring-1 ring-indigo-500/40"
                    : "hover:bg-neutral-700/60"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-400 rounded-l" />
                )}
                <span className="relative flex items-center gap-2 flex-1">
                  {fileTypeIcon(entry.name)}
                  <span className="truncate flex-1">
                    {highlight(entry.name)}
                  </span>
                </span>
                <span className="text-[9px] px-1 py-0.5 rounded bg-neutral-800/70 border border-neutral-700 uppercase tracking-wide">
                  {entry.name.split(".").pop()}
                </span>
              </button>
            </li>
          );
        }
        const folderPath = entry.name; // limited uniqueness assumption
        const isOpen = expanded.has(folderPath);
        if (search && !hasDescendantMatch(entry, filteredSet)) return null;
        return (
          <li key={folderPath}>
            <div className="flex flex-col">
              <button
                onClick={() => toggleFolder(folderPath)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md w-full text-left hover:bg-neutral-700/50 transition-colors"
              >
                <Icon
                  name={isOpen ? "folder-open" : "folder"}
                  className="w-4 h-4 text-amber-500"
                />
                <span className="font-medium text-neutral-200 truncate">
                  {highlight(entry.name)}
                </span>
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-neutral-700 text-neutral-300">
                  {countFiles(entry)}
                </span>
              </button>
              {isOpen && (
                <div className="ml-3 pl-2 border-l border-neutral-300 dark:border-neutral-700 mt-0.5">
                  <Tree
                    node={entry}
                    expanded={expanded}
                    toggleFolder={toggleFolder}
                    current={current}
                    select={select}
                    search={search}
                    highlight={highlight}
                    filteredSet={filteredSet}
                  />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
