# 4.Counter編

- カウンターアプリを作る

## ゴール

- `useState`を使った状態管理を覚える
- クリックを検知して処理を実行できるようになる

## 完成形

![counter](/images/4/counter.gif)

## やること

- カウンターのレイアウトを作る
- ボタンクリックで処理を実行させる
- `useState`で値を管理する

## カウンターのレイアウトを作る

### Counterコンポーネントを作る

- 現在のカウンターの値とプラス/マイナスボタンを表示する
- `src/components/Counter.tsx`を作成する

```tsx
import React from 'react';

function Counter() {
  return (
    <div>
      <div>0</div>
      <button>ー</button>
      <button>＋</button>
    </div>
  )
}

export default Counter;
```

- Counterコンポーネントを表示するように`src/App.tsx`を修正

```tsx{2,5}
import React from 'react';
import Counter from './components/Counter'; // importを追加

function App() {
  return <Counter />; // Counterコンポーネントを使う
}

export default App;
```

### Styleの追加

- このままでは見た目が悪いので`src/styles/Counter.module.css`を作成してCSSを定義する

```css
.counter {
  text-align: center;
}

.count {
  font-size: 64px;
}
```

- CSSを読み込むように`src/components/Counter.tsx`を修正する


```tsx{2,6-8}
import React from 'react';
import styles from '../styles/Counter.module.css';

function Counter() {
  return (
    // className属性を追加
    <div className={styles.counter}>
      <div className={styles.count}>0</div>
      <button>ー</button>
      <button>＋</button>
    </div>
  );
}

export default Counter;
```

::: tip
- ReactでCSSを書く方法はいろいろあるが、今回はCSS Modulesという方法を採用している
:::

- 画像のように中央寄せになっていればOK

![counter](/images/4/counter.png)

## ボタンクリックで処理を実行させる

- 見た目はできたので機能を追加していく
- プラス/マイナスボタンを押した時に処理を実行できるようにする
    - まずはクリックしたことを検知するところまで

```tsx{5-8,10-13,18-20}
import React from 'react';
import styles from '../styles/Counter.module.css';

function Counter() {
  // ーを押した時の処理を追加
  const down = () => {
    alert('down');
  };

  // ＋を押した時の処理を追加
  const up = () => {
    alert('up');
  };

  return (
    <div className={styles.counter}>
      <div className={styles.count}>0</div>
      {/* onClick属性を追加 */}
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
    </div>
  );
}

export default Counter;
```

- onClick属性を使うことでクリック時の挙動を指定できる
- このコードを実行すると`ー`ボタンをクリックするとdown関数が呼ばれアラートに`down`と表示される(＋も同様)

::: tip
- ボタンをクリックして出てくるポップアップは`alert()`の実行によって表示されている
- 今回のように開発途中で関数が呼ばれていることだけ確認したいような時に使うと便利
:::

::: tip
`const xxx = () => { ... }`という書き方はアロー関数と呼ばれる記法で関数を定義している
:::

## `useState`で値を管理する

- 最後に、ボタンをクリックした時にカウンターの値を増減できるようにする
- 今はカウンターの値が埋め込みになっているので、この値をコンポーネントで管理するように変更する

### `useState`でカウンターの値を管理する

- Reactコンポーネントは`useState`を使うことで値を管理できるようになる

::: tip
- 値を管理するとは？
   - ユーザ操作等で変化し得る値を保持して変更を管理すること
   - 管理する値が更新されると自動的に最新の値で画面が再描画される
- コンポーネントが管理する値のことをStateと呼ぶ
:::

- `count`というカウンターの値を表すStateを持つようにする

```tsx{5-6,18-19}
import React from 'react';
import styles from '../styles/Counter.module.css';

function Counter() {
  // countというStateを定義する
  const [count, setCount] = React.useState<number>(0);

  const down = () => {
    alert('down');
  };

  const up = () => {
    alert('up');
  };

  return (
    <div className={styles.counter}>
      {/* 変数countを使うように変更 */}
      <div className={styles.count}>{count}</div>
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
    </div>
  );
}

export default Counter;
```

- 状態(State)の定義
    - `const [count, setCount] = React.useState<number>(0)`でStateを定義している
        - `count`は現在の値
        - `setCount`は`count`を更新するための関数
        - `useState`の引数である`0`は`count`の初期値
        - `<number>`は管理する値の型

::: tip
- 今回は管理するのがカウンターの値だったので`count`、`setCount`という変数名をつけた
- 変数名は用途に応じて任意の名前をつけることができる
:::

### Stateを更新する

- `count`は`setCount`を使って更新する

```tsx{8-9,13-14}
import React from 'react';
import styles from '../styles/Counter.module.css';

function Counter() {
  const [count, setCount] = React.useState<number>(0);

  const down = () => {
    // countの値を更新する処理を追加
    setCount(count - 1);
  };

  const up = () => {
    // countの値を更新する処理を追加
    setCount(count + 1);
  };

  return (
    <div className={styles.counter}>
      <div className={styles.count}>{count}</div>
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
    </div>
  );
}

export default Counter;
```

- `setCount`を使って`count`の値を更新すると、フレームワークの機能により自動的に再描画され画面が更新される
- ここまでで完成形と同じものが完成

![counter](/images/4/counter.gif)

## 課題

- ボタンを押すと、現在の値を2乗した値に更新されるボタンを作ってみよう

![counter2](/images/4/counter2.gif)

## まとめ

- `useState`を使うことでコンポーネントでStateを管理することができる
- `useState`によって生成した`setXxx`を使うことでStateを更新することができる
- Stateが更新されると自動的に再描画され画面が更新される

## 課題の回答例

- src/components/Counter.tsx

```tsx
import React from 'react';
import styles from '../styles/Counter.module.css';

function Counter() {
  const [count, setCount] = React.useState<number>(0);

  const down = () => {
    setCount(count - 1);
  };

  const up = () => {
    setCount(count + 1);
  };

  const power = () => {
    setCount(count ** 2);
  };

  return (
    <div className={styles.counter}>
      <div className={styles.count}>{count}</div>
      <button onClick={down}>ー</button>
      <button onClick={up}>＋</button>
      <button onClick={power}>＊＊</button>
    </div>
  );
}

export default Counter;
```