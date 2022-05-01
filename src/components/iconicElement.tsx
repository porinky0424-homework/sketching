import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useEffect, useState } from "react";
import {
  CalculationType,
  FunctionInfo,
  IconicElementInfo,
  IconicElementShape,
  ListInfo,
} from "./field";
import { WIDTH, HEIGHT } from "../constants/sizes/iconicElement";
import { Menu, MenuItem } from "@mui/material";
import { Position } from "../constants/types/position";

const DEFAULT_POSITION = {
  x: 0,
  y: 0,
};

interface Props {
  info: IconicElementInfo;
  iconicElementShape: IconicElementShape;
  updateIconicElement: (iconicElementInfo: IconicElementInfo) => void;
  listInfos: ListInfo[];
  functionInfos: FunctionInfo[];
  calculate: (
    listId_1: ListInfo["id"],
    listId_2: ListInfo["id"],
    calculationType: CalculationType
  ) => number;
  deleteIconicElement: (id: IconicElementInfo["id"]) => void;
}

export default function IconicElement({
  info,
  iconicElementShape,
  updateIconicElement,
  listInfos,
  functionInfos,
  calculate,
  deleteIconicElement,
}: Props) {
  const onStop = (e: DraggableEvent, data: DraggableData) => {
    updateIconicElement({
      ...info,
      position: { x: data.lastX, y: data.lastY },
    });
  };

  const style: any = {
    position: "absolute",
    left: DEFAULT_POSITION.x - WIDTH / 2, // 基準点を図形の中心にずらす
    top: DEFAULT_POSITION.y - HEIGHT / 2, // 基準点を図形の中心にずらす
    width: WIDTH,
    height: HEIGHT,
    border: "solid 3px red",
    cursor: "pointer",
  };

  // pathにおける点の位置
  const [points, setPoints] = useState<Position[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [pathMenuAnchorEl, setPathMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handlePathMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPathMenuAnchorEl(event.currentTarget);
  };

  const handlePathMenuClose = () => {
    setPathMenuAnchorEl(null);
  };

  const handleDelete = () => {
    deleteIconicElement(info.id);
  };

  const [alignedId, setAlignedId] = useState<
    ListInfo["id"] | FunctionInfo["id"] | undefined
  >(undefined);
  const [alignedType, setAlignedType] = useState<
    "list" | "function" | undefined
  >(undefined);

  const getValue = () => {
    if (alignedType === "list") {
      return listInfos.find((listInfo) => listInfo.id === alignedId)?.has
        .length;
    } else if (alignedType === "function") {
      const functionInfo = functionInfos.find(
        (functionInfo) => functionInfo.id === alignedId
      );
      if (functionInfo === undefined) {
        return undefined;
      }
      let result;
      if (functionInfo.has.length >= 2) {
        result = calculate(
          functionInfo.has[0],
          functionInfo.has[1],
          functionInfo?.caluclationType
        );
      }
      return result;
    }
    return undefined;
  };

  useEffect(() => {
    if (alignedId !== undefined) {
      const value = getValue();
      if (value !== undefined && value >= 0 && value < points.length) {
        updateIconicElement({
          ...info,
          position: {
            x: points[value].x + info.position.x,
            y: points[value].y + info.position.y,
          },
        });

        setPoints(
          points.map((point) => ({
            x: point.x - points[value].x,
            y: point.y - points[value].y,
          }))
        );
      } else {
        updateIconicElement({
          ...info,
          position: {
            x: points[0].x + info.position.x,
            y: points[0].y + info.position.y,
          },
        });

        setPoints(
          points.map((point) => ({
            x: point.x - points[0].x,
            y: point.y - points[0].y,
          }))
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alignedId, alignedType, getValue()]);

  // クリックした位置をpointsに登録する
  const setNewPoints = (event: MouseEvent) => {
    setPoints((cur) => [
      ...cur,
      {
        x: event.offsetX - info.position.x,
        y: event.offsetY - info.position.y,
      },
    ]);
  };

  const [isPathMake, setIsPathMake] = useState(false);

  const startPathMake = () => {
    document.addEventListener("dblclick", setNewPoints);

    setIsPathMake(true);
    setPoints([{ x: 0, y: 0 }]);

    document.addEventListener("click", (event) => {
      if (event.detail === 3) {
        document.removeEventListener("dblclick", setNewPoints);
        setIsPathMake(false);
      }
    });
  };

  switch (iconicElementShape) {
    case "circle":
      style.borderRadius = "50%";
      break;
    case "rectangle":
      break;
  }

  return (
    <Draggable
      position={{
        x: info.position.x,
        y: info.position.y,
      }}
      onStop={onStop}
      disabled={isPathMake}
    >
      <div style={style} onDoubleClick={handleMenuOpen}>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={menuAnchorEl}
          open={!!menuAnchorEl}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handlePathMenuOpen}>Path</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={pathMenuAnchorEl}
            open={!!pathMenuAnchorEl}
            onClose={handlePathMenuClose}
          >
            {listInfos.map((info) => (
              <MenuItem
                onClick={() => {
                  setAlignedId(info.id);
                  setAlignedType("list");

                  handlePathMenuClose();
                  handleMenuClose();
                  startPathMake();
                }}
                key={info.id}
              >
                {info.name}
              </MenuItem>
            ))}
            {functionInfos.map((info) => (
              <MenuItem
                onClick={() => {
                  setAlignedId(info.id);
                  setAlignedType("function");

                  handlePathMenuClose();
                  handleMenuClose();
                  startPathMake();
                }}
                key={info.id}
              >
                {info.name}
              </MenuItem>
            ))}
          </Menu>
        </Menu>
        {points.map((point, idx) => (
          <div key={idx}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "black",
                position: "absolute",
                top: point.y + 15,
                left: point.x + 15,
              }}
            />
            <p
              style={{
                position: "absolute",
                top: point.y - 20,
                left: point.x + 21,
              }}
            >
              {idx}
            </p>
          </div>
        ))}
      </div>
    </Draggable>
  );
}
