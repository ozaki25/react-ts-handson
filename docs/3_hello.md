# 3.HelloWorld編

- HelloWorldを表示する

## ゴール

- Reactのコンポーネントの使い方を理解する

## 完成形

![hello2](/images/3/hello2.png)

## やること

- コンポーネントを作る
- コンポーネントを使う
- コンポーネントに引数を渡す

## Reactコンポーネントとは

- 2章で出てきたApp.tsxのようにhtmlをreturnする関数をReactコンポーネント(或いは単にコンポーネント)と呼ぶ

```tsx
import React from 'react';

function App() {
  return <h1>Hello World</h1>;
}

export default App;
```

## コンポーネントを作る

- Reactは複数のコンポーネントを作成しそれらを組み合わせていくことで開発を行う

### Helloコンポーネントを作る

- `src/components`ディレクトリを作り`Hello.tsx`を作成する
    - `Hello World`を2つ表示するだけのコンポーネント

```tsx
import React from 'react';

function Hello() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>Hello World</p>
    </div>
  );
}

export default Hello;
```

::: tip
Reactコンポーネントは慣習として最初の文字を大文字で作成します。function名とファイル名の最初の文字は大文字にしましょう。
:x: hello.tsx :o: Hello.tsx
:::

## コンポーネントを使う

### Helloコンポーネントを使う

- 作成したHelloコンポーネントを呼び出して画面に表示されるようにする
- `import`したコンポーネントはhtmlタグのようにして使うことができる
- `src/App.tsx`を修正する

```tsx{2,5}
import React from 'react';
import Hello from './components/Hello'; // Helloコンポーネントをimportする

function App() {
  return <Hello />; // importしたHelloコンポーネント使う
}

export default App;
```

- ブラウザに`Hello World`が2つ表示されればOK

![hello](/images/3/hello.png)

## コンポーネントに引数を渡す

- Helloコンポーネントは決まった値だけを返していた
- 次は引数を渡してそれをコンポーネントに埋め込んでみる

### Greetコンポーネントを作る

- `src/components`ディレクトリに`Greet.tsx`を作成する

```tsx
import React from 'react';

type GreetProps = {
  name: string;
};

function Greet({ name }: GreetProps) {
  // 引数は{}で囲って受け取る
  return <p>Hello {name}さん！</p>; // htmlタグの中で{}を使うと変数を埋め込むことができる
}

export default Greet;
```

::: tip
引数を複数受け取りたい場合は`,`区切りで書くことができる。`function Greet({ name, name2, name3 }) {`
:::

### Greetコンポーネントを使う

- `src/App.tsx`を修正してGreetコンポーネントを呼び出す

```tsx{3,9-10}
import React from 'react';
import Hello from './components/Hello';
import Greet from './components/Greet'; // importを追加

function App() {
  return (
    <div>
      <Hello />
      {/* 引数は属性として渡す */}
      <Greet name="尾崎" />
    </div>
  );
}

export default App;
```

### 引数の受け渡し

- 引数は属性に値を設定することで渡すことができる
    - `<Greet name="尾崎" />`
- 属性で渡された値は関数の宣言時に受け取ることができる
    - `function Greet({ name }) {`
- 引数を渡す時の属性名と、受け取る時の変数名は同一でないといけないので注意
    - 引数の受け渡しは、渡した順序ではなく名前で紐づけされている
- 以下のような画面が表示されていれば完成

![hello2](/images/3/hello2.png)

## 課題

- Greetコンポーネントの引数を`name`から`firstName`と`lastName`の２つに変更し、以下の画面を再現してみよう

![hello3](/images/3/hello3.png)

## まとめ

- コンポーネントはhtmlタグを返す関数として作る
- importしたコンポーネントはhtmlタグと同じように扱うことができる
- 属性に値を設定することで引数を渡すことができる

## 課題の回答例

- src/App.tsx

```tsx
import React from 'react';
import Hello from './components/Hello';
import Greet from './components/Greet';

function App() {
  return (
    <div>
      <Hello />
      <Greet firstName="遥輝" lastName="西川" />
      <Greet firstName="卓也" lastName="中島" />
      <Greet firstName="拳士" lastName="杉谷" />
    </div>
  );
}

export default App;
```

- src/components/Greet.tsx

```tsx
import React from 'react';

type GreetProps = {
  firstName: string;
  lastName: string;
};

function Greet({ firstName, lastName }: GreetProps) {
  return (
    <p>
      Hello {lastName} {firstName}さん！
    </p>
  );
}

export default Greet;
```
