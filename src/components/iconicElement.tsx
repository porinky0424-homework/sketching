import React from 'react'
import Draggable from 'react-draggable';

type IconicElementShape = 'circle' | 'rectangle' | 'triangle'

interface Props {
  iconicElementShape: IconicElementShape
}

export default function IconicElement({ iconicElementShape }: Props) {
  return (
    <Draggable>
      <div>I can now be moved around!</div>
    </Draggable>
  );
}
