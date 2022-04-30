import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import React, { useEffect, useState } from "react";
import { IconicElementInfo, IconicElementShape, ListInfo } from "./field";
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
  getListNames: () => Partial<ListInfo>[];
  getListValue: (listId: ListInfo["id"] | undefined) => number | undefined;
}

export default function IconicElement({
  info,
  iconicElementShape,
  updateIconicElement,
  getListNames,
  getListValue,
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

  const listNames = getListNames();
  const alignedListValue = getListValue(info.alignedListId);

  useEffect(() => {
    if (
      alignedListValue !== undefined &&
      alignedListValue >= 0 &&
      alignedListValue < points.length
    ) {
      updateIconicElement({
        ...info,
        position: {
          x: points[alignedListValue].x + info.position.x,
          y: points[alignedListValue].y + info.position.y,
        },
      });

      const newOriginX = points[alignedListValue].x;
      const newOriginY = points[alignedListValue].y;

      setPoints(
        points.map((point) => ({
          x: point.x - newOriginX,
          y: point.y - newOriginY,
        }))
      );
    }
  }, [alignedListValue]);

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

          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={pathMenuAnchorEl}
            open={!!pathMenuAnchorEl}
            onClose={handlePathMenuClose}
          >
            {listNames.map((listName) => (
              <MenuItem
                onClick={() => {
                  updateIconicElement({
                    ...info,
                    alignedListId: listName.id,
                  });

                  handlePathMenuClose();
                  handleMenuClose();
                  startPathMake();
                }}
                key={listName.id}
              >
                {listName.name}
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
