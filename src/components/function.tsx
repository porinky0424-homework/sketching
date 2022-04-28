import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useEffect, useState } from "react";
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
  setFunctionResult: ({
    id,
    result,
  }: {
    id: FunctionInfo["id"];
    result: FunctionInfo["result"];
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
  setFunctionResult,
  setFunctionCalculationType,
  calculate,
}: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    setFunctionPosition({
      id: info.id,
      position: { x: data.lastX, y: data.lastY },
    });
  };

  useEffect(() => {
    if (info.has.length >= 2) {
      setFunctionResult({
        id: info.id,
        result: calculate(info.has[0], info.has[1], info.caluclationType),
      });
    } else {
      setFunctionResult({
        id: info.id,
        result: undefined,
      });
    }
  }, [calculate, info, setFunctionResult]);

  const originalStyle: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - SMALL_WIDTH / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - SMALL_HEIGHT / 2, // 基準点を図形の中心にずらす
    width: SMALL_WIDTH,
    height: SMALL_HEIGHT,
    border: "solid 3px green",
    cursor: "pointer",
  };

  switch (functionShape) {
    // TODO
    default:
      break;
  }

  const numberCircleStyle: any = {
    position: "absolute",
    left: SMALL_WIDTH * 0.92,
    top: SMALL_HEIGHT * 0.75,
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
    left: -SMALL_WIDTH * 0.1,
    top: -SMALL_HEIGHT * 0.1,
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
          <p style={{ color: "white" }}>{info.result ?? "?"}</p>
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
            >
              {calculationTypesItem}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Draggable>
  );
}
