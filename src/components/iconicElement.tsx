import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React, {useEffect} from 'react'
import { Position } from '../constants/types/position';
import { Info, IconicElementShape } from './field'



interface Props {
  info: Info
  iconicElementShape: IconicElementShape
  setPosition: ({ id, position }: {id: number, position: Position}) => void
}

export default function IconicElement({ info, iconicElementShape, setPosition }: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    console.log({x: data.lastX, y: data.lastY})
    setPosition({id: info.id, position: {x: data.lastX, y: data.lastY}})
  }

  const style: any = {width: 50, height: 50, border: 'solid 3px red', cursor: 'pointer'}

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
