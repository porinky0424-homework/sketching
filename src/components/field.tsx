import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography
} from '@mui/material'
import IconicElement from './iconicElement'
import { Position } from '../constants/types/position'

interface HeaderProps {
  onCircleButtonClicked: () => void
  onRectangleButtonClicked: () => void
}

function Header({ onCircleButtonClicked, onRectangleButtonClicked }: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={onCircleButtonClicked}>generate <Typography sx={{ fontSize: '40px' }}>●</Typography></Button>
          <Button color="inherit" onClick={onRectangleButtonClicked}>generate <Typography sx={{ fontSize: '40px' }}>■</Typography></Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export type IconicElementShape = 'circle' | 'rectangle'

export interface Info {
  id: number
  iconicElementShape: IconicElementShape
  position: Position
}

export default function Field() {
  const [infos, setInfos] = useState<Info[]>([])
  const [elemntsCount, setElementsCount] = useState<number>(0)

  const setInfo = (info: Omit<Info, 'id'>) => {
    setInfos(cur => [...cur, {id: elemntsCount+1, ...info}])
    setElementsCount(cur => cur + 1)
  }

  const setPosition = ({ id, position }: {id: number, position: Position}) => {
    setInfos(infos.map((info) => (
      (info.id === id) ? {...info, position} : info
    )))
  }

  const onCircleButtonClicked = () => {
    setInfo({iconicElementShape: 'circle', position: {x:0, y:0}})
  }

  const onRectangleButtonClicked = () => {
    setInfo({iconicElementShape: 'rectangle', position: {x:0, y:0}})
  }

  return (
    <>
      <Header onCircleButtonClicked={onCircleButtonClicked} onRectangleButtonClicked={onRectangleButtonClicked} />
      {
        infos.map((info) => {
          return <IconicElement key={info.id} info={info} iconicElementShape={info.iconicElementShape} setPosition={setPosition} />
        })
      }
    </>
  );
}