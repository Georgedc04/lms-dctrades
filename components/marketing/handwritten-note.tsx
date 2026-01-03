import React from "react";

interface NoteProps {
  text: string;
  author: string;
  rotation?: string;
  className?: string;
}

export function HandwrittenNote({ text, author, rotation = "-rotate-2", className }: NoteProps) {
  return (
    <div className={`relative p-6 bg-yellow-50 shadow-xl border-t-2 border-yellow-100 ${rotation} ${className}`}>
      {/* Tape Effect */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-sm -rotate-2 border border-white/20" />
      
      <div className="flex flex-col h-full">
        <p className="font-handwritten text-xl md:text-2xl text-slate-800 leading-snug mb-4">
          &quot;{text}&quot;
        </p>
        <div className="mt-auto">
          <p className="font-handwritten text-indigo-600 text-lg">
            — {author}
          </p>
        </div>
      </div>
    </div>
  );
}