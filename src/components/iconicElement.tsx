import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React from "react";
import { IconicElementInfo, IconicElementShape } from "./field";
import { WIDTH, HEIGHT } from "../constants/sizes/iconicElement";

const DEFAULT_POSITION = {
  x: 0,
  y: 0,
};

interface Props {
  info: IconicElementInfo;
  iconicElementShape: IconicElementShape;
  updateIconicElement: (iconicElementInfo: IconicElementInfo) => void;
}

export default function IconicElement({
  info,
  iconicElementShape,
  updateIconicElement,
}: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    updateIconicElement({
      ...info,
      position: { x: data.lastX, y: data.lastY },
    });
  };

  const style: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - WIDTH / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - HEIGHT / 2, // 基準点を図形の中心にずらす
    width: WIDTH,
    height: HEIGHT,
    border: "solid 3px red",
    cursor: "pointer",
  };

  switch (iconicElementShape) {
    case "circle":
      style.borderRadius = "50%";
      break;
    case "rectangle":
      break;
  }

  return (
    <Draggable
      position={{ x: info.position.x, y: info.position.y }}
      onStop={onStop}
    >
      <div style={style} />
    </Draggable>
  );
}
