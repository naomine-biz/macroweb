# FFXI Macro & Equipment Set Viewer

Final Fantasy XI (FFXI) のマクロと装備セットを見やすく表示するWebアプリケーションです。

## 🎮 機能

- **マクロ表示**: FFXIのマクロブック内容を読みやすい形式で表示
- **装備セット表示**: 4x4グリッドレイアウトで装備を視覚的に表示
- **統合表示**: マクロ内で参照される装備セットを自動的に関連表示
- **レスポンシブデザイン**: PC・モバイル両対応
- **ページ分割**: セクションごとに分割されたナビゲーション

## 🚀 使用方法

### データファイルの準備
1. FFXIの装備セットファイル（`es*.dat`）を用意
2. マクロファイル（`mcr*.dat`）を用意
3. 以下のツールでYAML形式に変換:
   - [print_equipset](https://github.com/hamham-fenrir/print_equipset)
   - [print_macrobook](https://github.com/hamham-fenrir/print_macrobook)

### ビルドと実行
```bash
# 依存関係のインストール
npm install

# YAMLファイルを src/data/ に配置
cp eq.yaml src/data/
cp mc.yaml src/data/

# ビルド
npm run build

# ローカルサーバーで確認
cd output
python -m http.server 8000
```

## 📁 ファイル構成

```
src/
├── html/           # HTMLテンプレート
├── css/            # スタイルシート
├── js/             # JavaScript
└── data/           # YAMLデータファイル
    ├── eq.yaml     # 装備セットデータ
    └── mc.yaml     # マクロデータ
```

## 🛠️ 技術仕様

- **フロントエンド**: HTML5, CSS3, JavaScript (jQuery)
- **データ形式**: YAML (gzip圧縮)
- **ビルドツール**: npm scripts
- **レイアウト**: CSS Grid, Flexbox

## 📝 改良点

このフォークでは以下の機能を追加・改良しました:

- ✅ 4x4グリッドレイアウトによる装備表示
- ✅ HTMLファイル分割によるパフォーマンス向上
- ✅ マクロ内容の直接表示（クリック不要）
- ✅ 装備セット情報の自動統合表示
- ✅ 改良されたナビゲーション機能
- ✅ レスポンシブデザインの強化

## 🔗 関連リンク

- **オリジナル版**: [hamham-fenrir/macroweb](https://github.com/hamham-fenrir/macroweb)
- **データ変換ツール**: 
  - [print_equipset](https://github.com/hamham-fenrir/print_equipset)
  - [print_macrobook](https://github.com/hamham-fenrir/print_macrobook)

## 📄 ライセンス

このプロジェクトはオリジナル版と同じライセンスに従います。
