# 1.開発環境構築

## 前提

- `node`コマンドが使えること
    - バージョンは14以上が望ましい

```bash
node -v
# v15.6.0
```

- 入っていなければ公式からダウンロードしてください
    - [https://nodejs.org/ja/](https://nodejs.org/ja/)

## 雛形の生成

- `create-react-app`という公式のジェネレータを使う
    - コマンドを実行したディレクトリに`react-handson`というディレクトリが生成される

```bash
# 雛形の生成(ちょっと時間かかる)
npx create-react-app --template typescript react-handson

# 生成したプロジェクトへ移動
cd react-handson
```

## 動作確認

- 以下のコマンドを入力しアプリ起動
    - `npm start`
- ブラウザが勝手に開いて以下の画面が表示されればOK
    - [http://localhost:3000/](http://localhost:3000/)でアクセスできる

::: tip
停止する時は `Ctl + c`
:::


![template](/images/1/template.png)

- VSCodeでプロジェクトを開く

![vscode1](/images/1/vscode1.png)
![vscode2](/images/1/vscode2.png)


- ホットリロードの確認
    - `npm start`でアプリを起動した状態でコードを修正してみる
    - `src/App.tsx`を開き`Edit src/App.tsx and save to reload.`の文言を適当に書き換えて保存する
    - 自動でリロードが走りコンソールにログが流れる
    - ブラウザが勝手にリロードされ変更が反映される

![hotreload](/images/1/hotreload.gif)
