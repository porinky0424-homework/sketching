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
  onIconicElementButtonClicked: (iconicElementShape: IconicElementShape) => void
}

function Header({ onIconicElementButtonClicked }: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => onIconicElementButtonClicked('circle')}>generate <Typography sx={{ fontSize: '40px' }}>●</Typography></Button>
          <Button color="inherit" onClick={() => onIconicElementButtonClicked('rectangle')}>generate <Typography sx={{ fontSize: '40px' }}>■</Typography></Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export type IconicElementShape = 'circle' | 'rectangle'
export type ListShape = 'circle' | 'rectangle'

export interface IconicElementInfo {
  id: number
  iconicElementShape: IconicElementShape
  position: Position
}

export interface ListInfo {
  id: number
  ListShape: ListShape
  position: Position
}

export default function Field() {
  const [iconicElementInfos, setIconicElementInfos] = useState<IconicElementInfo[]>([])
  const [iconicElementsCount, setIconicElementsCount] = useState<number>(0)

  const registerIconicElement = (info: Omit<IconicElementInfo, 'id'>) => {
    setIconicElementInfos(cur => [...cur, {id: iconicElementsCount+1, ...info}])
    setIconicElementsCount(cur => cur + 1)
  }

  const setIconicElementPosition = ({ id, position }: {id: number, position: Position}) => {
    setIconicElementInfos(iconicElementInfos.map((info) => (
      (info.id === id) ? {...info, position} : info
    )))
  }

  const onIconicElementButtonClicked = (iconicElementShape: IconicElementShape) => {
    registerIconicElement({iconicElementShape, position: {x:100, y:200}})
  }

  return (
    <>
      <Header onIconicElementButtonClicked={onIconicElementButtonClicked} />
      {
        iconicElementInfos.map((info) => {
          return <IconicElement key={info.id} info={info} iconicElementShape={info.iconicElementShape} setPosition={setIconicElementPosition} />
        })
      }
    </>
  );
}