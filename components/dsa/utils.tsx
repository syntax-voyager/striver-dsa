"use client";
import { TreeNode } from '@/types';
import React from 'react';

export function hasDescendantMatch(node: TreeNode, set: Set<string>): boolean {
  if (node.type === 'file' && node.path) return set.has(node.path);
  if (!node.children) return false;
  return Object.values(node.children).some((child) => hasDescendantMatch(child, set));
}

export function countFiles(node: TreeNode): number {
  if (node.type === 'file') return 1;
  if (!node.children) return 0;
  return Object.values(node.children).reduce((acc, child) => acc + countFiles(child), 0);
}

export function fileTypeIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase();
  const base = 'w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[8px] font-bold';
  switch (ext) {
    case 'cpp':
    case 'cc':
    case 'cxx':
      return (
        <span className={`${base} bg-indigo-600/30 text-indigo-300 border border-indigo-500/40`}>C++</span>
      );
    case 'h':
    case 'hpp':
      return (
        <span className={`${base} bg-emerald-600/30 text-emerald-300 border border-emerald-500/40`}>H</span>
      );
    case 'txt':
      return (
        <span className={`${base} bg-neutral-600/30 text-neutral-300 border border-neutral-500/40`}>TXT</span>
      );
    default:
      return (
        <span className={`${base} bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/40`}>{ext?.slice(0,3)}</span>
      );
  }
}
