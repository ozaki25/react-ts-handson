# 6.ページ遷移編

## ゴール

- [react-router](https://reacttraining.com/react-router/)を使ってこれまで作った3つのページを遷移できるようにする

## 完成形

![router3](/images/6/router3.gif)

## やること

- 各ページにURLを割り当てる
- リンクを置いて行き来できるようにする

## 事前準備

- routingのライブラリを追加する

```bash
npm i react-router-dom
```

## 各ページにURLを割り当てる

### routingに関する設定ファイルを作成する

- コンポーネントとURLのマッピングを記載するファイルを追加する
    - まずはHelloだけ
- `src`配下に`router.js`を作成する

```jsx
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Hello from './components/Hello';

function Router() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact>
          <Hello />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default Router;
```

- `Route`タグのpath属性にURLを記載し、子要素としてそのURLにアクセスした際に表示するコンポーネントを記載する

::: tip
- react-routerというライブラリの`BrowserRouter`や`Route`を使っている
- ライブラリのルールに則った書き方をすることで簡単にルーティングを実装できる
:::

- 作成したRoutingを使うように`App.js`を修正

```jsx{2,5}
import React from 'react';
import Router from './router'; // importを追加

function App() {
  return <Router />; // Routerを使うように変更
}

export default App;
```

- 現状ではうまくいっていれば`/`(ここでは[http://localhost:3000/](http://localhost:3000/))にアクセスするとHelloWorldが表示される

### 各コンポーネントとURLのマッピングを追加

- `src/router.js`に`/hello`,`/counter`,`/todo-list`のルーティングも追加する

```jsx{4-5,14-22}
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Hello from './components/Hello';
import Counter from './components/Counter';
import TodoList from './components/TodoList';

function Router() {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact>
          <Hello />
        </Route>
        <Route path="/hello" exact>
          <Hello />
        </Route>
        <Route path="/counter" exact>
          <Counter />
        </Route>
        <Route path="/todo-list" exact>
          <TodoList />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default Router;
```

- 各コンポーネントに対してコンポーネント名と同じ名前のURLを割り振った
- ブラウザにそれぞれのページのURL(`/hello`、`/counter`、`/todo-list`)を直接入力してアクセスできることを確かめる

![router](/images/6/router.gif)


## リンクを置いて行き来できるようにする

### リンクを並べたコンポーネントを作る

- `src/components`配下に`Header.js`を作成する
- 3つのページへのリンクを置いておく

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
      <NavLink to="/hello">Hello</NavLink>
      <NavLink to="/counter">Counter</NavLink>
      <NavLink to="/todo-list">TodoList</NavLink>
    </div>
  );
}

export default Header;
```

- react-routerが提供する[NavLinkコンポーネント](https://reacttraining.com/react-router/web/api/NavLink)を使うことでページ遷移することができる
    - `to`属性に遷移先のURLを記載する

### Headerコンポーネントを適用する

- `src/router.js`にHeaderコンポーネントを追加する

```jsx{6,12}
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Hello from './components/Hello';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import Header from './components/Header'; // importを追加

function Router() {
  return (
    <BrowserRouter>
      <div>
        <Header /> {/* Headerコンポーネントを追加 */}
        <Route path="/" exact>
          <Hello />
        </Route>
        <Route path="/hello" exact>
          <Hello />
        </Route>
        <Route path="/counter" exact>
          <Counter />
        </Route>
        <Route path="/todo-list" exact>
          <TodoList />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default Router;
```

- Routerタグで囲われていない外側にHeaderコンポーネントを追加したので常にリンクが表示されるようになった
- ここまでで以下のように機能は完成した

![router2](/images/6/router2.gif)

### styleを整える

- 最後にリンクの見た目を整える
- `src/components/Header.js`を修正する

```jsx{4-21,26-27,30,33}
import React from 'react';
import { NavLink } from 'react-router-dom';

// styleの定義を追加
const styles = {
  link: {
    backgroundColor: '#fff',
    border: 'solid 1px',
    borderColor: '#e70000',
    borderRadius: '2px',
    color: '#e70000',
    display: 'inline-block',
    margin: '3px',
    padding: '8px',
    textDecoration: 'none'
  },
  linkActive: {
    backgroundColor: '#e70000',
    color: '#fff'
  }
};

function Header() {
  return (
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
}

export default Header;
```

- `NavLink`タグのstyle属性にstyleを指定することで見た目を整えている
- activeStyle属性に指定されたstyleは、表示されてるページと一致するリンクにだけ適用される
    - この機能は[react-routerで用意されいる](https://reacttraining.com/react-router/web/api/NavLink/activestyle-object)

- これで完成

![router3](/images/6/router3.gif)

## まとめ

- react-routerを使うとページ遷移を簡単に行うことができる
