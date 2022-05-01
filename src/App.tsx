import React, { useEffect, useState } from "react";
import "./App.css";
import Field from "./components/field";
import { create, SimpleDrawingBoard } from "simple-drawing-board";

function App() {
  const [sdb, setSdb] = useState<SimpleDrawingBoard | undefined>(undefined);

  const clear = () => {
    sdb?.clear();
  };

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    setSdb(create(canvas));

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);
  return (
    <div className="App">
      <canvas
        id="canvas"
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
      <Field clear={clear} />
    </div>
  );
}

export default App;
