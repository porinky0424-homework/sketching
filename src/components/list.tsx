import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React from "react";
import { Position } from "../constants/types/position";
import { ListInfo, ListShape } from "./field";
import {
  WIDTH as LIST_WIDTH,
  HEIGHT as LIST_HEIGHT,
} from "../constants/sizes/list";
import {
  WIDTH as NUMBER_CIRCLE_WIDTH,
  HEIGHT as NUMBER_CIRCLE_HEIGHT,
} from "../constants/sizes/numberCircle";

const DEFAULT_POSITION = {
  x: 0,
  y: 0,
};

interface Props {
  info: ListInfo;
  listShape: ListShape;
  setListPosition: ({
    id,
    position,
  }: {
    id: number;
    position: Position;
  }) => void;
}

export default function List({ info, listShape, setListPosition }: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    setListPosition({
      id: info.id,
      position: { x: data.lastX, y: data.lastY },
    });
  };

  const mainStyle: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - LIST_WIDTH / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - LIST_HEIGHT / 2, // 基準点を図形の中心にずらす
    width: LIST_WIDTH,
    height: LIST_HEIGHT,
    border: "solid 3px blue",
    cursor: "pointer",
  };

  switch (listShape) {
    case "circle":
      mainStyle.borderRadius = "50%";
      break;
    case "rectangle":
      break;
  }

  const numberCircleStyle: any = {
    position: "absolute",
    left: LIST_WIDTH * 0.25,
    top: LIST_HEIGHT * 0.25,
    width: NUMBER_CIRCLE_WIDTH,
    height: NUMBER_CIRCLE_HEIGHT,
    backgroundColor: "blue",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Draggable
      position={{ x: info.position.x, y: info.position.y }}
      onStop={onStop}
    >
      <div>
        <div style={mainStyle} />
        <div style={numberCircleStyle}>
          <p style={{ color: "white", fontSize: "30px" }}>{info.has.length}</p>
        </div>
      </div>
    </Draggable>
  );
}
