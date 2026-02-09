# 実装計画: シンプルな単語帳アプリ

## 目標
Next.js (App Router), TypeScript, Tailwind CSSを使用して、ローカルJSONからデータを読み込むシンプルな単語帳アプリを作成する。

## 機能要件
1.  **単語カード表示**: 表に単語、タップで裏返して意味を表示。
2.  **振り分け機能**: 「覚えた」「まだ」ボタンで単語を分類。
3.  **進捗表示**: 全体の進捗状況をバーで表示。

## 技術スタック
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Data: Local JSON

## 提案する変更

### ディレクトリ構成
`flashcard-app/` (新規作成)
  - `data/`
    - `words.json`: 単語データ
  - `components/`
    - `Flashcard.tsx`: カード表示コンポーネント
    - `ProgressBar.tsx`: 進捗バーコンポーネント
  - `app/`
    - `page.tsx`: メイン画面 (状態管理含む)
    - `layout.tsx`: 標準レイアウト

### 1. データ構造 (`data/words.json`)
```json
[
  { "id": 1, "word": "ephemeral", "meaning": "つかの間の、儚い" },
  { "id": 2, "word": "serendipity", "meaning": "素敵な偶然に出会うこと" },
  ...
]
```

### 2. コンポーネント実装

#### `Flashcard.tsx`
- Props: `word`, `meaning`
- State: `isFlipped` (boolean)
- Clickで`isFlipped`をトグル。
- CSS (Tailwind) で回転アニメーションまたは表示切り替えを実装。

#### `ProgressBar.tsx`
- Props: `total`, `current`
- 割合を計算して幅を決定。

#### `app/page.tsx`
- `useState`で単語リスト(`queue`)、覚えたリスト(`memorized`)、まだリスト(`review`)を管理。
- 現在のカードを表示。
- ボタンクリックでリストを更新し、次のカードへ。

## 検証計画
### 自動テスト
- ビルドが通ることを確認: `npm run build`

### 手動検証
- ブラウザで起動: `npm run dev`
- カードをクリックして裏返るか確認。
- 「覚えた」「まだ」ボタンで次の単語に進むか確認。
- 進捗バーが更新されるか確認。
