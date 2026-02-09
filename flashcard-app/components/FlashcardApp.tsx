"use client";

import { useMemo, useState } from "react";
import Flashcard from "@/components/Flashcard";
import ProgressBar from "@/components/ProgressBar";
import type { Word } from "@/types/word";

type FlashcardAppProps = {
  words: Word[];
};

export default function FlashcardApp({ words }: FlashcardAppProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [memorized, setMemorized] = useState<Word[]>([]);
  const [notYet, setNotYet] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);

  const currentWord = words[currentIndex];
  const finished = currentIndex >= words.length;
  const progress = useMemo(() => currentIndex, [currentIndex]);

  const handleClassify = (type: "memorized" | "not-yet") => {
    try {
      if (!currentWord) return;

      if (type === "memorized") {
        setMemorized((prev) => [...prev, currentWord]);
      } else {
        setNotYet((prev) => [...prev, currentWord]);
      }

      setCurrentIndex((prev) => prev + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "分類中にエラーが発生しました。");
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setMemorized([]);
    setNotYet([]);
    setError(null);
  };

  if (error) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4">
        <div className="w-full rounded-xl bg-white p-8 text-center shadow">
          <p className="mb-4 text-red-600">{error}</p>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl bg-slate-600 px-4 py-2 font-semibold text-white transition hover:bg-slate-700"
          >
            最初からやり直す
          </button>
        </div>
      </main>
    );
  }

  if (words.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4">
        <p className="w-full rounded-xl bg-white p-8 text-center text-slate-600 shadow">
          読み込める単語データがありませんでした。
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">単語帳アプリ</h1>

      <div className="mb-8">
        <ProgressBar current={progress} total={words.length} />
      </div>

      {finished ? (
        <section className="rounded-2xl bg-white p-8 shadow">
          <h2 className="mb-4 text-xl font-bold text-slate-800">完了</h2>
          <p className="mb-2 text-slate-700">全 {words.length} 問が終了しました。</p>
          <p className="text-slate-700">覚えた: {memorized.length} 件</p>
          <p className="text-slate-700">まだ: {notYet.length} 件</p>
        </section>
      ) : (
        <section className="space-y-4">
          <Flashcard key={currentWord.id} item={currentWord} />
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleClassify("memorized")}
              className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600"
            >
              覚えた
            </button>
            <button
              type="button"
              onClick={() => handleClassify("not-yet")}
              className="rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white transition hover:bg-amber-600"
            >
              まだ
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
