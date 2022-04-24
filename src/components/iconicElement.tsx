import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React from 'react'
import { Position } from '../constants/types/position';
import { Info, IconicElementShape } from './field'

const DEFAULT_POSITION = {
  x: 0,
  y: 100,
}

interface Props {
  info: Info
  iconicElementShape: IconicElementShape
  setPosition: ({ id, position }: {id: number, position: Position}) => void
}

export default function IconicElement({ info, iconicElementShape, setPosition }: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    setPosition({id: info.id, position: {x: data.lastX, y: data.lastY}})
  }

  const style: any = {
    position: 'absolute',
    left: DEFAULT_POSITION.x,
    top: DEFAULT_POSITION.y,
    width: 50,
    height: 50,
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
