import FlashcardApp from "@/components/FlashcardApp";
import { loadWordsFromCsv } from "@/lib/loadWords";

export default async function Page() {
  const words = await loadWordsFromCsv();
  return <FlashcardApp words={words} />;
}
