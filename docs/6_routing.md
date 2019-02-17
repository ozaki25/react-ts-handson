# 6.ページ遷移編

## ゴール

- react-routerを使ってこれまで作った3つのページを遷移できるようにする

## 完成形

![router3](/react_handson/images/6/router3.gif)

## やること

- ページにURLを割り当てる
- リンクを置いて行き来できるようにする

## 事前準備

- routingのライブラリを追加する

```bash
npm i react-router-dom
```

## ページにURLを割り当てる

### routingに関するファイルを作成する

- コンポーネントとURLのマッピングを記載するファイルを追加する
- `src`配下に`router.js`を作成する

```jsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Hello from './components/Hello';

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={Hello} exact />
    </div>
  </BrowserRouter>
);

export default Router;
```

- `Route`タグにURLとコンポーネントのマッピングをする記述
    - `path`属性にURLを、`component`属性にコンポーネントを指定する

> ### メモ
> - react-routerというライブラリの`BrowserRouter`や`Route`を使っている
> - ライブラリのルールに則った書き方をすることで簡単にルーティングを実装できる

- 作成したRoutingを使うように`App.js`を修正

```jsx
import React from 'react';
import Router from './router'; // importを追加

const App = () => <Router />; // Routerを使うように変更

export default App;
```

- 現状ではうまくいっていれば`/`(http://localhost:3000/)にアクセスするとHelloWorldが表示される

### 各コンポーネントとURLのマッピングを追加

- `Route`タグを追加して`Counter`、`TodoList`のルーティングも追加する

```jsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Hello from './components/Hello';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

const Router = () => (
  <BrowserRouter>
    <div>
      <Route path="/" component={Hello} exact />
      <Route path="/hello" component={Hello} exact />
      <Route path="/counter" component={Counter} exact />
      <Route path="/todo-list" component={TodoList} exact />
    </div>
  </BrowserRouter>
);
```

- 各コンポーネントに対してコンポーネント名と同じ名前のURLを割り振った
- ブラウザにそれぞれのページのURL(`/hello`、`/counter`、`/todo-list`)を直接入力してアクセスできることを確かめる

![router](/react_handson/images/6/router.gif)


## リンクを置いて行き来できるようにする

### リンクを並べたコンポーネントを作る

- `src/components`配下に`Header.js`を作成する
- 3つのページへのリンクを置いておく

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <div>
    <NavLink to="/hello">Hello</NavLink>
    <NavLink to="/counter">Counter</NavLink>
    <NavLink to="/todo-list">TodoList</NavLink>
  </div>
);

export default Header;
```

- `NavLink`タグを使うことでページ遷移することができる
    - `to`属性に遷移先のURLを記載する

### Headerコンポーネントを適用する

- `router.js`にHeaderコンポーネントを追加する

```jsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Hello from './components/Hello';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import Header from './components/Header'; // importを追加

const Router = () => (
  <BrowserRouter>
    <div>
      <Header /> {/* Headerコンポーネントを追加 */}
      <Route path="/" component={Hello} exact />
      <Route path="/hello" component={Hello} exact />
      <Route path="/counter" component={Counter} exact />
      <Route path="/todo-list" component={TodoList} exact />
    </div>
  </BrowserRouter>
);

export default Router;
```

- routerにHeaderコンポーネントを追加することで常にリンクが表示されるようになった
- ここまでで以下のように機能は完成した

![router2](/react_handson/images/6/router2.gif)

### styleを整える

- 最後にリンクの見た目を整える
- `Header.js`を修正する

```jsx
// styleの定義を追加
const styles = {
  link: {
    backgroundColor: '#fff',
    border: 'solid 1px',
    borderColor: '#e70000',
    borderRadius: '2px',
    color: '#e70000',
    margin: '3px',
    padding: '8px',
    textDecoration: 'none'
  },
  linkActive: {
    backgroundColor: '#e70000',
    color: '#fff'
  }
};

const Header = () => (
  <div>
    {/* style属性とactiveStyle属性を追加 */}
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/hello">
      Hello
    </NavLink>
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/counter">
      Counter
    </NavLink>
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/todo-list">
      TodoList
    </NavLink>
  </div>
);
```

- `NavLink`タグのstyle属性にstyleを指定することで見た目を整えている
- activeStyle属性に指定されたstyleは、表示されてるページと一致するリンクにだけ適用される
    - この機能はライブラリ側で用意されているもの

- これで完成

![router3](/react_handson/images/6/router3.gif)

## まとめ

- react-routerを使うとページ遷移を簡単に行うことができる