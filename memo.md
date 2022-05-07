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

## github pagesにデプロイ

参考：　https://qiita.com/Ham4690/items/4535d744a78db9e403d7

`yarn deploy`により、`build`ディレクトリをgithub pagesにデプロイできるようにした。
