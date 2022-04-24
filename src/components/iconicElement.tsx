import React, {useEffect, useRef} from 'react'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Info } from './field'

type IconicElementShape = 'circle' | 'rectangle' | 'triangle'

interface Props {
  id: number
  info: Info
  iconicElementShape: IconicElementShape
}

export default function IconicElement({ id, info, iconicElementShape }: Props) {
  useEffect(() => {
    console.log(id, info)
  }, [id, info])
  return (
    <Draggable>
      <div>I can now be moved around!</div>
    </Draggable>
  );
}
