## react-draggableにchildrenの型定義がない？問題

https://bagelee.com/programming/javascript-2/patch-package/ のようにpatch-packageをつかうことで解決した。

## Warning: findDOMNode is deprecated in StrictMode.について

react-draggableの公式によると

```
// If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
// Unfortunately, in order for <Draggable> to work properly, we need raw access
// to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
// as in this example:
//
// function MyComponent() {
//   const nodeRef = React.useRef(null);
//   return (
//     <Draggable nodeRef={nodeRef}>
//       <div ref={nodeRef}>Example Target</div>
//     </Draggable>
//   );
// }
```

らしいので、一旦無視する。

## 進捗

- 環境構築(react with typescript, Material UI)
- ドラッグ&ドロップできる、四角、丸のiconic elementsの作成(react-draggable)
- ボタンを押すと1つのiconic elementsを作成できるようにした