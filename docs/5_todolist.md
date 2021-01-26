# 5.TodoList編

- TodoListを作る

## ゴール

- 繰り返し項目をリスト表示できるようになる
- 入力内容を取得して扱えるようになる

## 完成形

![todo5](/images/5/todo5.gif)

## やること

- TodoListを表示する
- Todoの完了/未完了を切り替える
- 新しいTodoを追加する

## TodoListを表示する

### TodoListコンポーネントを作成

- `src/components/TodoList.tsx`を作成する
    - まずはTodoListの文字列を返すだけのものを作成

```tsx
import React from 'react';

function TodoList() {
  return (
    <div>
      <h1>TodoList</h1>
    </div>
  );
}

export default TodoList;
```

- TodoListコンポーネントを表示するように`App.tsx`を修正

```tsx{2,5}
import React from 'react';
import TodoList from './components/TodoList'; // importを追加

function App() {
  return <TodoList />; // TodoListコンポーネントを使用
}

export default App;
```

- ここまででは画面に`TodoList`と表示されるだけ

### TodoListの定義

- まずはTodoListのTodoの型定義を作成しておく
    - Todoは`id`、`title`、`done`の3つのフィールドからなるとする
- `src/interfaces/Todo.ts`を作成する

```ts
export type TodoType = {
  id: number;
  title: string;
  done: boolean;
};
```

- 次にTodoListコンポーネントでStateとしてTodoのリストを保持するようにする
- `todoList`というStateを定義し初期値として`defaultTodo`を設定する
- `console.log`でStateに値を設定できていることを確認する

```tsx{2,4-9,12-13}
import React from 'react';
import { TodoType } from '../interfaces/Todo';

// TodoListのデフォルト値の定義を追加
const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);
  console.log(todoList); // stateの値を確認する処理を追加
  return (
    <div>
      <h1>TodoList</h1>
    </div>
  );
}

export default TodoList;
```

![todo_console](/images/5/todo_console.png)

::: tip
- ブラウザ上でF12(もしくは右クリック->検証)を押すと開発者ツールを出すことができる
- Consoleタブを選択すると`console.log()`の出力を確認することができる
- 出力のされ方はブラウザによって多少の差異がある
:::

::: tip
- `defaultTodo`は`TodoType`の配列なので変数の宣言時に`const defaultTodo: TodoType[]`といった形で型の情報を付与している
:::

### TodoListを画面に表示する

- Stateで保持しているTodoListを画面に表示する

```tsx{16-19}
import React from 'react';
import { TodoType } from '../interfaces/Todo';

const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);
  console.log(todoList); // stateの値を確認する処理を追加
  return (
    <div>
      <h1>TodoList</h1>
      {/* TodoListの要素数分だけpタグを生成する処理を追加 */}
      {todoList.map(todo => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default TodoList;
```

- `.map`を使うことでTodoの数だけpタグを生成している
- 今回のようにループ処理で同じ形式のタグを複数生成する場合は`key`属性に一意な値を設定する必要がある
    - Reactの特徴である仮想DOMを用いたレンダリングの最適化を実現するために使われる
- ここまででTodoの一覧が表示されるようになった

![todo](/images/5/todo.png)


## Todoの完了/未完了を切り替える

- 次は表示されたTodoをクリックすることでTodoの完了/未完了を切り替えられるようにする

### 完了時の見た目を修正する

- 今のままでは完了も未完了も同じ見た目になっているので、完了の場合に取り消し線がつくようにしておく
- styleを定義し、doneがtrueの場合のみ適用されるようにする
- TodoList用のstyleとして`src/styles/TodoList.module.css`を作成する

```css
.done {
  color: #bbb;
  text-decoration: line-through;
}
```

- `src/components/TodoList.tsx`にCSSを適用する

```tsx{3,17-19}
import React from 'react';
import { TodoType } from '../interfaces/Todo';
import styles from '../styles/TodoList.module.css';

const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);
  return (
    <div>
      <h1>TodoList</h1>
      {todoList.map(todo => (
        // style属性を追加
        // doneがtrueならstyleを適用、falseなら何も適用しない
        <p key={todo.id} className={todo.done ? styles.done : undefined}>
          {todo.title}
        </p>
      ))}
    </div>
  );
}

export default TodoList;
```

::: tip
- styleの適用部分で三項演算子を使っている
- `(条件式) ? (trueの時の値) : (falseの時の値);`
:::

- doneがtrueのTodoに取り消し線が表示されるようになった

![todo2](/images/5/todo2.png)

### クリックされたことを検知する

- Todoを表示するpタグに`onClick`属性を追加する
- どのTodoがクリックされたか判別できるように`id`属性も追加しておく
- `toggleComplete`関数を追加しクリックした際に呼び出されるようにする

```tsx{14-18,24,28-29}
import React from 'react';
import { TodoType } from '../interfaces/Todo';
import styles from '../styles/TodoList.module.css';

const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);

  // toggleComplete関数を追加
  const toggleComplete = (event: React.MouseEvent) => {
    const target = event.target as Element;
    alert(target.id); // event.target.idでクリックされた要素のid属性を取得できる
  };

  return (
    <div>
      <h1>TodoList</h1>
      {todoList.map(todo => (
        // id属性とonClick属性を追加
        <p
          key={todo.id}
          className={todo.done ? styles.done : undefined}
          id={String(todo.id)}
          onClick={toggleComplete}
        >
          {todo.title}
        </p>
      ))}
    </div>
  );
}

export default TodoList;
```

- Todoの文字列をクリックすると、そのTodoのidがalertで表示される

### クリックされたTodoのdoneを切り替える

- クリックしたTodoのdoneの値を更新する

```tsx{17-28}
import React from 'react';
import { TodoType } from '../interfaces/Todo';
import styles from '../styles/TodoList.module.css';

const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);

  const toggleComplete = (event: React.MouseEvent) => {
    const target = event.target as Element;

    // 属性の値は全て文字列で返却されるので数値型に変換する
    const id = Number(target.id);

    // Stateに保持しているtodoListに対してループ処理
    const newTodoList = todoList.map(todo => {
      // クリックされたtodoのidと一致したらdoneのtrue/falseを反転させる
      if (todo.id === id) todo.done = !todo.done;
      return todo;
    });

    // 新しいtodoListでStateを更新する
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h1>TodoList</h1>
      {todoList.map(todo => (
        <p
          key={todo.id}
          className={todo.done ? styles.done : undefined}
          id={String(todo.id)}
          onClick={toggleComplete}
        >
          {todo.title}
        </p>
      ))}
    </div>
  );
}

export default TodoList;
```

::: tip
- JavaScriptでは等価演算子は`===`を使う
- 否定の場合は`!==`
:::

- ここまでできるとTodoの完了/未完了をクリックすることで切り換えられるようになる

![todo3](/images/5/todo3.gif)

## 新しいTodoを追加する

- ここまででTodoの完了/未完了を管理できるようになった
- 次は新しくTodoを追加できるようにする

### 入力フォームの作成

- 追加したいTodoの内容を入力するフォームと追加ボタンを配置する

```tsx{27-31}
import React from 'react';
import { TodoType } from '../interfaces/Todo';
import styles from '../styles/TodoList.module.css';

const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);

  const toggleComplete = (event: React.MouseEvent) => {
    const target = event.target as Element;
    const id = Number(target.id);
    const newTodoList = todoList.map(todo => {
      if (todo.id === id) todo.done = !todo.done;
      return todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h1>TodoList</h1>
      {/* 入力域とボタンを追加 */}
      <p>
        <input />
        <button>追加</button>
      </p>
      {todoList.map(todo => (
        <p
          key={todo.id}
          className={todo.done ? styles.done : undefined}
          id={String(todo.id)}
          onClick={toggleComplete}
        >
          {todo.title}
        </p>
      ))}
    </div>
  );
}

export default TodoList;
```

![todo4](/images/5/todo4.png)

### 入力内容を取得する

```tsx{14-15,17-20,35-38}
import React from 'react';
import { TodoType } from '../interfaces/Todo';
import styles from '../styles/TodoList.module.css';

const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);

  // 入力域の参照を定義
  const inputRef = React.useRef<HTMLInputElement>(null);

  // addTodo関数を追加
  const addTodo = () => {
    alert(inputRef.current?.value); // 入力内容はinput.current?.valueで取得できる
  };

  const toggleComplete = (event: React.MouseEvent) => {
    const target = event.target as Element;
    const id = Number(target.id);
    const newTodoList = todoList.map(todo => {
      if (todo.id === id) todo.done = !todo.done;
      return todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h1>TodoList</h1>
      {/* 入力域を参照できるようにref属性を追加 */}
      <input ref={inputRef} />
      {/* onClick属性を追加 */}
      <button onClick={addTodo}>追加</button>
      {todoList.map(todo => (
        <p
          key={todo.id}
          className={todo.done ? styles.done : undefined}
          id={String(todo.id)}
          onClick={toggleComplete}
        >
          {todo.title}
        </p>
      ))}
    </div>
  );
}

export default TodoList;
```

- 入力域の参照を取得
    - `const inputRef = React.useRef<HTMLInputElement>(null);`で入力域の参照を定義
    - `<input ref={inputRef} />`で`ref`属性にセットすることで、変数`inputRef`にinputタグの情報が格納される
- 追加ボタンクリック時の挙動
    - `<button onClick={addTodo}>追加</button>`でclick時に`addTodo`関数を呼び出すようにしている
- ここまでで追加ボタンを押すと入力した内容がalertに表示されるようになった

### 入力内容をTodoListに追加

```tsx{17-28}
import React from 'react';
import { TodoType } from '../interfaces/Todo';
import styles from '../styles/TodoList.module.css';

const defaultTodo: TodoType[] = [
  { id: 1, title: 'HelloWorldを作る', done: true },
  { id: 2, title: 'Counterを作る', done: true },
  { id: 3, title: 'TodoListを作る', done: false },
];

function TodoList() {
  const [todoList, setTodoList] = React.useState<TodoType[]>(defaultTodo);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTodo = () => {
    // 新しいtodoを組み立てる
    const todo: TodoType = {
      id: todoList.length + 1,
      title: inputRef.current?.value!, // 入力内容をtitleにセット
      done: false,
    };

    // [...state.todoList, todo]とすることで現在のtodoListの配列の最後尾に新しいtodoを追加できる
    setTodoList([...todoList, todo]);

    // 入力域を空にする
    if (inputRef.current) inputRef.current.value = '';
  };

  const toggleComplete = (event: React.MouseEvent) => {
    const target = event.target as Element;
    const id = Number(target.id);
    const newTodoList = todoList.map(todo => {
      if (todo.id === id) todo.done = !todo.done;
      return todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h1>TodoList</h1>
      <input ref={inputRef} />
      <button onClick={addTodo}>追加</button>
      {todoList.map(todo => (
        <p
          key={todo.id}
          className={todo.done ? styles.done : undefined}
          id={String(todo.id)}
          onClick={toggleComplete}
        >
          {todo.title}
        </p>
      ))}
    </div>
  );
}

export default TodoList;
```

- これで入力された内容がTodoListの末尾に追加されるようになった
- 入力した内容が残り続けないように、空文字をセットすることでフォームをリセットしている

![todo5](/images/5/todo5.gif)

## まとめ

- `useState`はStateとして配列も管理することができる
- `.map`をうまく活用することで配列を繰り返し処理で画面に表示することができる
- `useRef`を使って入力域とフィールドを紐付けることで入力内容を取得することができる
