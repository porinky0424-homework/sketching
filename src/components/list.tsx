import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useState } from "react";
import { Position } from "../constants/types/position";
import { ListInfo, ListShape } from "./field";
import {
  WIDTH as LIST_WIDTH,
  HEIGHT as LIST_HEIGHT,
} from "../constants/sizes/list";
import {
  WIDTH as NUMBER_CIRCLE_WIDTH,
  HEIGHT as NUMBER_CIRCLE_HEIGHT,
} from "../constants/sizes/numberCircle";
import { Button, Menu, MenuItem, Divider } from "@mui/material";

const DEFAULT_POSITION = {
  x: 0,
  y: 0,
};

interface Props {
  info: ListInfo;
  listShape: ListShape;
  setListPosition: ({
    id,
    position,
  }: {
    id: number;
    position: Position;
  }) => void;
  shiftIconicElementPosition: ({
    id,
    positionDiff,
  }: {
    id: number;
    positionDiff: Position;
  }) => void;
}

export default function List({
  info,
  listShape,
  setListPosition,
  shiftIconicElementPosition,
}: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    setListPosition({
      id: info.id,
      position: { x: data.lastX, y: data.lastY },
    });
  };

  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    info.has.forEach((id) => {
      shiftIconicElementPosition({
        id,
        positionDiff: { x: data.deltaX, y: data.deltaY },
      });
    });
  };

  const mainStyle: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - LIST_WIDTH / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - LIST_HEIGHT / 2, // 基準点を図形の中心にずらす
    width: LIST_WIDTH,
    height: LIST_HEIGHT,
    border: "solid 3px blue",
    cursor: "pointer",
  };

  switch (listShape) {
    case "circle":
      mainStyle.borderRadius = "50%";
      break;
    case "rectangle":
      break;
  }

  const numberCircleStyle: any = {
    position: "absolute",
    left: LIST_WIDTH * 0.75,
    top: LIST_HEIGHT * 0.75,
    width: NUMBER_CIRCLE_WIDTH,
    height: NUMBER_CIRCLE_HEIGHT,
    backgroundColor: "blue",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "skyblue",
    },
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable
      position={{ x: info.position.x, y: info.position.y }}
      onStop={onStop}
      onDrag={onDrag}
    >
      <div style={mainStyle}>
        <Button sx={numberCircleStyle} onClick={handleMenuOpen}>
          <p style={{ color: "white", fontSize: "30px" }}>{info.has.length}</p>
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleMenuClose}>Archive</MenuItem>
          <MenuItem onClick={handleMenuClose}>More</MenuItem>
        </Menu>
      </div>
    </Draggable>
  );
}
