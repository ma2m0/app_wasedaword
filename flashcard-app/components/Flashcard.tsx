"use client";

import { useState } from "react";
import type { Word } from "@/types/word";

type FlashcardProps = {
  item: Word;
};

export default function Flashcard({ item }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!item || !item.word || !item.meaning) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white p-6 shadow-md">
        <p className="text-red-500">カードデータの読み込みに失敗しました。</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((prev) => !prev)}
      className="h-64 w-full rounded-2xl bg-white p-6 text-left shadow-md transition hover:shadow-lg"
      aria-label="単語カード"
    >
      <div className="mb-4 text-xs font-medium text-slate-500">
        {isFlipped ? "裏面（意味）" : "表面（単語）"}
      </div>
      <div className="flex h-[calc(100%-1.5rem)] items-center justify-center text-center">
        <p className="text-2xl font-bold text-slate-800">
          {isFlipped ? item.meaning : item.word}
        </p>
      </div>
      <div className="mt-4 text-center text-sm text-slate-500">タップして反転</div>
    </button>
  );
}
