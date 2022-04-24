import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React, {useEffect} from 'react'
import { Info } from './field'

type IconicElementShape = 'circle' | 'rectangle' | 'triangle'

interface Props {
  id: number
  info: Info
  iconicElementShape: IconicElementShape
}

export default function IconicElement({ id, info, iconicElementShape }: Props) {
  return (
    <Draggable
      position={{x: info.position.x, y: info.position.y}}
    >
      <div>I can now be moved around!</div>
    </Draggable>
  );
}
