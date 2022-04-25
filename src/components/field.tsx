import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography
} from '@mui/material'
import IconicElement from './iconicElement'
import List from './list'
import { calcDistance } from '../functions/distance'
import { Position } from '../constants/types/position'
import { WIDTH as LIST_WIDTH, HEIGHT as LIST_HEIGHT } from '../constants/sizes/list'

interface HeaderProps {
  onIconicElementButtonClicked: (iconicElementShape: IconicElementShape) => void
  onListButtonClicked: (listShape: ListShape) => void
}

function Header({ onIconicElementButtonClicked, onListButtonClicked }: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ display: 'flex' }}>
        <Toolbar>
          <Typography sx={{ mr: 1, height: '100%' }}>generate iconic elements →</Typography>
          <Button color="inherit" sx={{ height: '40px' }} onClick={() => onIconicElementButtonClicked('circle')}><Typography sx={{ fontSize: '25px' }}>🔴</Typography></Button>
          <Button color="inherit" sx={{ height: '40px', mr: 3 }} onClick={() => onIconicElementButtonClicked('rectangle')}><Typography sx={{ fontSize: '25px' }}>⬛️</Typography></Button>
  
          <Typography sx={{ mr: 1, height: '100%' }}>generate lists →</Typography>
          <Button color="inherit" sx={{ height: '40px' }} onClick={() => onListButtonClicked('circle')}><Typography sx={{ fontSize: '25px' }}>🔴</Typography></Button>
          <Button color="inherit" sx={{ height: '40px', mr: 3 }} onClick={() => onListButtonClicked('rectangle')}><Typography sx={{ fontSize: '25px' }}>⬛️</Typography></Button>
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
  belongsTo: ListInfo['id'] | undefined
}

export interface ListInfo {
  id: number
  listShape: ListShape
  position: Position
}

export default function Field() {
  const [iconicElementInfos, setIconicElementInfos] = useState<IconicElementInfo[]>([])
  const [listInfos, setListInfos] = useState<ListInfo[]>([])
  const [iconicElementsCount, setIconicElementsCount] = useState<number>(0)
  const [listsCount, setListsCount] = useState<number>(0)

  const registerIconicElement = (info: Omit<IconicElementInfo, 'id'>) => {
    setIconicElementInfos(cur => [...cur, {id: iconicElementsCount+1, ...info}])
    setIconicElementsCount(cur => cur + 1)
  }

  const registerList = (info: Omit<ListInfo, 'id'>) => {
    setListInfos(cur => [...cur, {id: listsCount+1, ...info}])
    setListsCount(cur => cur + 1)
  }

  const setListPosition = ({ id, position }: {id: number, position: Position}) => {
    setListInfos(listInfos.map((info) => (
      (info.id === id) ? {...info, position} : info
    )))
  }

  const onIconicElementButtonClicked = (iconicElementShape: IconicElementShape) => {
    registerIconicElement({iconicElementShape, position: {x:100, y:200}, belongsTo: undefined})
  }

  const onListButtonClicked = (listShape: ListShape) => {
    registerList({listShape, position: {x:100, y:200}})
  }

  // 配置的にiconicElementがlistに含まれうるかどうかを計算する
  const isIncluded = (iconicElementInfo: IconicElementInfo, listInfo: ListInfo): boolean => {
    if (listInfo.listShape === 'circle') {
      return calcDistance(iconicElementInfo.position, listInfo.position) < (LIST_WIDTH)/2
    } else if (listInfo.listShape === 'rectangle') {
      return Math.abs(listInfo.position.x - iconicElementInfo.position.x) < (LIST_WIDTH)/2
        && Math.abs(listInfo.position.y - iconicElementInfo.position.y) < (LIST_HEIGHT)/2
    }
    throw new Error("Invalid listShape")
  }

  // iconicElementが所属しているListがあればそのidを、なければundefinedを返す関数
  const getListId = (iconicElementInfo: IconicElementInfo): (number | undefined) => (
    listInfos
      .filter((listInfo) => (isIncluded(iconicElementInfo, listInfo)))
      // 距離が近い方を優先する
      .sort((a, b) => calcDistance(a.position, iconicElementInfo.position) - calcDistance(b.position, iconicElementInfo.position))
      .find(() => true)?.id
  )

  const updateIconicElement = (iconicElementInfo: IconicElementInfo) => {
    const listId = getListId(iconicElementInfo)
    console.log(listId)

    setIconicElementInfos(iconicElementInfos.map((info) => (
      (info.id === iconicElementInfo.id) ? {...iconicElementInfo, belongsTo: listId} : info
    )))
  }

  return (
    <>
      <Header onIconicElementButtonClicked={onIconicElementButtonClicked} onListButtonClicked={onListButtonClicked} />
      {
        iconicElementInfos.map((info) => (
          <IconicElement
            key={info.id}
            info={info}
            iconicElementShape={info.iconicElementShape}
            updateIconicElement={updateIconicElement}
          />
        ))
      }
      {
        listInfos.map((info) => (
          <List
            key={info.id}
            info={info}
            listShape={info.listShape}
            setListPosition={setListPosition}
          />
        ))
      }
    </>
  );
}