import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React, {useEffect} from 'react'
import { Position } from '../constants/types/position';
import { Info } from './field'

type IconicElementShape = 'circle' | 'rectangle' | 'triangle'

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

  return (
    <Draggable
      position={{x: info.position.x, y: info.position.y}}
      onStop={onStop}
    >
      <div style={{width: 50, height: 50, borderRadius: '50%', border: 'solid 3px red', cursor: 'pointer'}} />
    </Draggable>
  );
}
