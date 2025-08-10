"use client";
import React from 'react';
export function Icon({ name, className }: { name: 'folder' | 'folder-open' | 'file'; className?: string }) {
  if (name === 'file') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6" />
    </svg>
  );
  if (name === 'folder-open') return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8h7l2 2h9" />
      <path d="M3 8v10a2 2 0 0 0 2 2h14.5a1.5 1.5 0 0 0 1.47-1.17L22 10H12l-2-2H3Z" />
    </svg>
  );
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 8a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </svg>
  );
}
export default Icon;
