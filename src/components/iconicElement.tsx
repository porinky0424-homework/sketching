import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React from 'react'
import { Position } from '../constants/types/position';
import { IconicElementInfo, IconicElementShape } from './field'

const DEFAULT_POSITION = {
  x: 0,
  y: 0,
}

const WIDTH = 50
const HEIGHT = 50

interface Props {
  info: IconicElementInfo
  iconicElementShape: IconicElementShape
  setPosition: ({ id, position }: {id: number, position: Position}) => void
}

export default function IconicElement({ info, iconicElementShape, setPosition }: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({id: info.id, position: {x: data.lastX, y: data.lastY}})
  }

  const style: any = {
    position: 'absolute',
    left: DEFAULT_POSITION.x - WIDTH/2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - HEIGHT/2, // 基準点を図形の中心にずらす
    width: WIDTH,
    height: HEIGHT,
    border: 'solid 3px red',
    cursor: 'pointer'
  }

  switch (iconicElementShape) {
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
