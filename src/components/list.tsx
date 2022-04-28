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
import {
  WIDTH as NAME_CIRCLE_WIDTH,
  HEIGHT as NAME_CIRCLE_HEIGHT,
} from "../constants/sizes/nameCircle";
import { Button, Menu, MenuItem, Divider, TextField } from "@mui/material";

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
  setListName: ({
    id,
    name,
  }: {
    id: ListInfo["id"];
    name: ListInfo["name"];
  }) => void;
  setListAbstractionLevel: ({
    id,
    abstractionLevel,
  }: {
    id: ListInfo["id"];
    abstractionLevel: ListInfo["abstractionLevel"];
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
  setListName,
  setListAbstractionLevel,
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

  const originalStyle: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - LIST_WIDTH / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - LIST_HEIGHT / 2, // 基準点を図形の中心にずらす
    width: LIST_WIDTH,
    height: LIST_HEIGHT,
    border: "solid 3px blue",
    cursor: "pointer",
  };

  const abstractedStyle: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - LIST_WIDTH / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - LIST_HEIGHT / 2, // 基準点を図形の中心にずらす
  };

  switch (listShape) {
    case "circle":
      originalStyle.borderRadius = "50%";
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

  const nameCircleStyle: any = {
    position: "absolute",
    left: -LIST_WIDTH * 0.2,
    top: 0,
    width: NAME_CIRCLE_WIDTH,
    height: NAME_CIRCLE_HEIGHT,
    backgroundColor: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "skyblue",
    },
  };

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [editNameAnchorEl, setEditNameAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEditNameOpen = (event: React.MouseEvent<HTMLElement>) => {
    setEditNameAnchorEl(event.currentTarget);
  };

  const handleEditNameClose = () => {
    setEditNameAnchorEl(null);
  };

  return (
    <Draggable
      position={{ x: info.position.x, y: info.position.y }}
      onStop={onStop}
      onDrag={onDrag}
    >
      <div
        style={
          info.abstractionLevel === "original" ? originalStyle : abstractedStyle
        }
      >
        {info.abstractionLevel === "original" && (
          <div style={nameCircleStyle}>
            <p style={{ color: "white" }}>{info.name}</p>
          </div>
        )}
        <Button sx={numberCircleStyle} onDoubleClick={handleMenuOpen}>
          <p style={{ color: "white", fontSize: "20px" }}>
            {info.abstractionLevel === "original"
              ? info.has.length
              : `${info.name} = ${info.has.length}`}
          </p>
        </Button>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={menuAnchorEl}
          open={!!menuAnchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditNameOpen}>Edit a name</MenuItem>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={editNameAnchorEl}
            open={!!editNameAnchorEl}
            onClose={handleEditNameClose}
          >
            <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              defaultValue={info.name}
              onChange={(e) => {
                setListName({ id: info.id, name: e.target.value });
              }}
            />
          </Menu>
          <Divider sx={{ my: 0.5 }} />
          {info.abstractionLevel === "original" && (
            <MenuItem
              onClick={() => {
                setListAbstractionLevel({
                  id: info.id,
                  abstractionLevel: "abstracted",
                });
              }}
            >
              To Abstract
            </MenuItem>
          )}
          {info.abstractionLevel === "abstracted" && (
            <MenuItem
              onClick={() => {
                setListAbstractionLevel({
                  id: info.id,
                  abstractionLevel: "original",
                });
              }}
            >
              To Original
            </MenuItem>
          )}
        </Menu>
      </div>
    </Draggable>
  );
}
