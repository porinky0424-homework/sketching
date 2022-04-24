import React, { useEffect, useState } from 'react'
import IconicElement from './iconicElement'
import { Position } from '../constants/types/position'

export type IconicElementShape = 'circle' | 'rectangle'

export interface Info {
  id: number
  iconicElementShape: IconicElementShape
  position: Position
}

export default function Field() {
  const [infos, setInfos] = useState<Info[]>([{id: 1, iconicElementShape: 'rectangle', position: {x:0, y:0}}])
  const [elemntsCount, setElementsCount] = useState<number>(1)

  const setInfo = (info: Omit<Info, 'id'>) => {
    setInfos(cur => [...cur, {id: elemntsCount+1, ...info}])
    setElementsCount(cur => cur + 1)
  }

  const setPosition = ({ id, position }: {id: number, position: Position}) => {
    setInfos(infos.map((info) => (
      (info.id === id) ? {...info, position} : info
    )))
  }

  useEffect(() => {
    console.log(infos)
  }, [infos])

  return (
    <>
    {
      infos.map((info) => {
        return <IconicElement key={info.id} info={info} iconicElementShape={info.iconicElementShape} setPosition={setPosition} />
      })
    }
    </>
  );
}