# Mucu

[English](./README.md) | [日本語](./README-jp.md)

コピー&ペーストで使える、Tailwind CSS ベースの React コンポーネント。

## 特徴

- **コピー&ペースト** - コンポーネントは `node_modules` ではなくプロジェクトに直接配置
- **Tailwind CSS 4** - `tailwind-variants` と CSS カスタムプロパティでスタイリング
- **TypeScript** - ポリモーフィックな `as` prop による完全な型安全性
- **ダークモード** - `data-theme` 属性によるデザイントークン
- **アニメーション** - `motion/react` で構築
- **アイコン生成** - CLI で SVG を React コンポーネントに変換

## インストール

```bash
pnpm add -g mucu
```

## クイックスタート

```bash
# プロジェクトを初期化
mucu init

# コンポーネントを追加
mucu add button

# 複数のコンポーネントを追加
mucu add toast tooltip popover
```

コンポーネントはプロジェクトにコピーされ、すぐにインポートできます:

```tsx
import { Button } from '@/components/ui/Button'

export default function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  )
}
```

## コンポーネント

| カテゴリ       | コンポーネント                                 |
| -------------- | ---------------------------------------------- |
| レイアウト     | `Box` `Image`                                  |
| フォーム       | `TextField` `TextArea` `Checkbox` `RadioGroup` |
| アクション     | `Button` `ButtonBase`                          |
| フィードバック | `Spinner` `Toast` `Tooltip` `Popover`          |
| ナビゲーション | `Tab` `Calendar` `Menu`                        |

## CLI

```bash
mucu init                              # 設定とユーティリティをセットアップ
mucu add [components...]               # コンポーネントを追加（引数なしで対話モード）
mucu add -a                            # 全コンポーネントを追加
mucu list                              # 利用可能なコンポーネント一覧
mucu icon generate <input> -o <output> # SVG を React アイコンコンポーネントに変換
```

## 設定

`mucu.config.json`

```json
{
  "componentsDir": "src/components/ui",
  "libDir": "src/lib",
  "stylesDir": "src/styles",
  "iconsDir": "src/components/icons",
  "typescript": true,
  "aliases": {
    "components": "@/components/ui",
    "lib": "@/lib",
    "icons": "@/components/icons"
  }
}
```

## 開発

```bash
pnpm install          # 依存関係のインストール
pnpm dev              # 開発モード
pnpm build            # 全パッケージをビルド
pnpm test             # テスト実行
pnpm storybook        # Storybook でコンポーネントを確認
```

```
packages/
├── cli/          # CLI ツール（mucu コマンド）
└── registry/     # コンポーネントレジストリ + Storybook
```

## 技術スタック

React 19 / TypeScript 5 / Tailwind CSS 4 / tailwind-variants / motion/react / Storybook 10 / Vitest / Playwright / pnpm

## ライセンス

MIT
