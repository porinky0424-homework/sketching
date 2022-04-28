import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useState } from "react";
import { Position } from "../constants/types/position";
import {
  CalculationType,
  calculationTypes,
  FunctionInfo,
  FunctionShape,
  ListInfo,
} from "./field";
import {
  SMALL_WIDTH,
  SMALL_HEIGHT,
  MEDIUM_WIDTH,
  MEDIUM_HEIGHT,
  LARGE_WIDTH,
  LARGE_HEIGHT,
} from "../constants/sizes/function";
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
  info: FunctionInfo;
  functionShape: FunctionShape;
  setFunctionPosition: ({
    id,
    position,
  }: {
    id: number;
    position: Position;
  }) => void;
  setFunctionName: ({
    id,
    name,
  }: {
    id: FunctionInfo["id"];
    name: FunctionInfo["name"];
  }) => void;
  setFunctionCalculationType: ({
    id,
    caluclationType,
  }: {
    id: FunctionInfo["id"];
    caluclationType: FunctionInfo["caluclationType"];
  }) => void;
  calculate: (
    listId_1: ListInfo["id"],
    listId_2: ListInfo["id"],
    calculationType: CalculationType
  ) => number;
}

export default function Function({
  info,
  functionShape,
  setFunctionPosition,
  setFunctionName,
  setFunctionCalculationType,
  calculate,
}: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    setFunctionPosition({
      id: info.id,
      position: { x: data.lastX, y: data.lastY },
    });
  };

  let result;
  if (info.has.length >= 2) {
    result = calculate(info.has[0], info.has[1], info.caluclationType);
  }

  let functionWidth, functionHeight;

  switch (functionShape) {
    case "small":
      functionWidth = SMALL_WIDTH;
      functionHeight = SMALL_HEIGHT;
      break;
    case "medium":
      functionWidth = MEDIUM_WIDTH;
      functionHeight = MEDIUM_HEIGHT;
      break;
    case "large":
      functionWidth = LARGE_WIDTH;
      functionHeight = LARGE_HEIGHT;
      break;
    default:
      throw new Error("Invalid functionShape.");
  }

  const originalStyle: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - functionWidth / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - functionHeight / 2, // 基準点を図形の中心にずらす
    width: functionWidth,
    height: functionHeight,
    border: "solid 3px green",
    cursor: "pointer",
  };

  const numberCircleStyle: any = {
    position: "absolute",
    left: functionWidth * 0.92,
    top: functionHeight * 0.75,
    width: NUMBER_CIRCLE_WIDTH,
    height: NUMBER_CIRCLE_HEIGHT,
    backgroundColor: "green",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#509378",
    },
  };

  const nameCircleStyle: any = {
    position: "absolute",
    left: -functionWidth * 0.1,
    top: -functionHeight * 0.1,
    width: NAME_CIRCLE_WIDTH,
    height: NAME_CIRCLE_HEIGHT,
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#509378",
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
    >
      <div style={originalStyle}>
        <div style={nameCircleStyle}>
          <p style={{ color: "white" }}>{info.name}</p>
        </div>
        <Button sx={numberCircleStyle} onDoubleClick={handleMenuOpen}>
          <p style={{ color: "white" }}>{result ?? "?"}</p>
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
                setFunctionName({ id: info.id, name: e.target.value });
              }}
            />
          </Menu>
          <Divider sx={{ my: 0.5 }} />
          {calculationTypes.map((calculationTypesItem) => (
            <MenuItem
              onClick={() => {
                setFunctionCalculationType({
                  id: info.id,
                  caluclationType: calculationTypesItem,
                });
                handleMenuClose();
              }}
              key={calculationTypesItem}
            >
              {calculationTypesItem}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Draggable>
  );
}
