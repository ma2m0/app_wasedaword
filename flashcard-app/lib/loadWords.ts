import { promises as fs } from "fs";
import path from "path";
import type { Word } from "@/types/word";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "words.csv");

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

export async function loadWordsFromCsv(): Promise<Word[]> {
  const raw = await fs.readFile(DATA_FILE_PATH, "utf8");
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length <= 1) {
    return [];
  }

  return lines.slice(1).map((line, index) => {
    const [word, frequency, meaning] = parseCsvLine(line);
    return {
      id: index + 1,
      word: word ?? "",
      meaning: meaning ?? "",
      frequency: Number(frequency) || undefined
    };
  });
}
