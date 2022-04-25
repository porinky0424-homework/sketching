import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React from 'react'
import { Position } from '../constants/types/position';
import { ListInfo, ListShape } from './field'
import { WIDTH, HEIGHT } from '../constants/sizes/list';

const DEFAULT_POSITION = {
  x: 0,
  y: 0,
}

interface Props {
  info: ListInfo
  listShape: ListShape
  setListPosition: ({ id, position }: {id: number, position: Position}) => void
}

export default function List({ info, listShape, setListPosition }: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    setListPosition({id: info.id, position: {x: data.lastX, y: data.lastY}})
  }

  const style: any = {
    position: 'absolute',
    left: DEFAULT_POSITION.x - WIDTH/2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - HEIGHT/2, // 基準点を図形の中心にずらす
    width: WIDTH,
    height: HEIGHT,
    border: 'solid 3px blue',
    cursor: 'pointer'
  }

  switch (listShape) {
    case 'circle':
      style.borderRadius = '50%'
      break;
    case 'rectangle':
      break;
  }

  return (
    <Draggable
      position={{x: info.position.x, y: info.position.y}}
      onStop={onStop}
    >
      <div style={style} />
    </Draggable>
  );
}
