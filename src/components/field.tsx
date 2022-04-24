import React, { useEffect, useState } from 'react'
import IconicElement from './iconicElement'
import { Position } from '../constants/types/position'

export interface Info {
  position: Position
}

export default function Field() {
  const [infos, setInfos] = useState<Map<number, Info>>(new Map())
  const [elemntsCount, setElementsCount] = useState<number>(0)

  const setInfo = (info: Info) => {
    infos.set(elemntsCount + 1, info)
    setElementsCount(cur => cur + 1)
  }

  const setPosition = ({ id, position }: {id: number, position: Position}) => {
    const info = infos.get(id)
    infos.set(id, {...info, position})
  }

  useEffect(() => {
    setInfo({position: {x:0, y:0}})
  }, [])

  return (
    <>
    {
      Array.from(infos).map(([id, info]) => {
        return <IconicElement id={id} info={info} iconicElementShape='circle' />
      })
    }
    </>
  );
}