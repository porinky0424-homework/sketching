import React, { useState } from "react";
import { Box, Button, Typography, Drawer, Divider } from "@mui/material";
import IconicElement from "./iconicElement";
import List from "./list";
import Function from "./function";
import { calcDistance } from "../functions/distance";
import { Position } from "../constants/types/position";
import {
  WIDTH as LIST_WIDTH,
  HEIGHT as LIST_HEIGHT,
} from "../constants/sizes/list";
import {
  WIDTH as NUMBER_CIRCLE_WIDTH,
  HEIGHT as NUMBER_CIRCLE_HEIGHT,
} from "../constants/sizes/numberCircle";
import {
  LARGE_HEIGHT,
  LARGE_WIDTH,
  MEDIUM_HEIGHT,
  MEDIUM_WIDTH,
  SMALL_HEIGHT,
  SMALL_WIDTH,
} from "../constants/sizes/function";

interface SideMenuProps {
  onIconicElementButtonClicked: (
    iconicElementShape: IconicElementShape
  ) => void;
  onListButtonClicked: (listShape: ListShape) => void;
  onFunctionButtonClicked: (functionShape: FunctionShape) => void;
}

function SideMenu({
  onIconicElementButtonClicked,
  onListButtonClicked,
  onFunctionButtonClicked,
}: SideMenuProps) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          width: "160px",
          bgcolor: "rgb(0 0 0 / 12%)",
        },
      }}
      open
    >
      <Box sx={{ py: 2, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ mr: 1, mb: 1, fontWeight: "bold" }}>
          Iconic Elements
        </Typography>
        <Button
          sx={{ height: "40px" }}
          onClick={() => onIconicElementButtonClicked("circle")}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              margin: "6px 0",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          />
        </Button>
        <Button
          sx={{ height: "40px" }}
          onClick={() => onIconicElementButtonClicked("rectangle")}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              margin: "6px 0",
              backgroundColor: "red",
            }}
          />
        </Button>
      </Box>

      <Divider />

      <Box sx={{ py: 2, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ mr: 1, mb: 1, fontWeight: "bold" }}>Lists</Typography>
        <Button
          sx={{ height: "40px" }}
          onClick={() => onListButtonClicked("circle")}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              margin: "6px 0",
              backgroundColor: "blue",
              borderRadius: "50%",
            }}
          />
        </Button>
        <Button
          sx={{ height: "40px" }}
          onClick={() => onListButtonClicked("rectangle")}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              margin: "6px 0",
              backgroundColor: "blue",
            }}
          />
        </Button>
      </Box>

      <Divider />

      <Box sx={{ py: 2, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ mr: 1, mb: 1, fontWeight: "bold" }}>
          Functions
        </Typography>
        <Button
          sx={{ height: "40px" }}
          onClick={() => onFunctionButtonClicked("small")}
        >
          <div
            style={{
              width: "30px",
              height: "15px",
              margin: "6px 0",
              backgroundColor: "green",
            }}
          />
        </Button>
        <Button
          sx={{ height: "40px" }}
          onClick={() => onFunctionButtonClicked("medium")}
        >
          <div
            style={{
              width: "50px",
              height: "15px",
              margin: "6px 0",
              backgroundColor: "green",
            }}
          />
        </Button>
        <Button
          sx={{ height: "40px" }}
          onClick={() => onFunctionButtonClicked("large")}
        >
          <div
            style={{
              width: "70px",
              height: "15px",
              margin: "6px 0",
              backgroundColor: "green",
            }}
          />
        </Button>
      </Box>
    </Drawer>
  );
}

export type IconicElementShape = "circle" | "rectangle";
export type ListShape = "circle" | "rectangle";
export type FunctionShape = "small" | "medium" | "large";

export type AbstractionLevel = "original" | "abstracted";

export const calculationTypes = ["addition", "multiplication"] as const;
export type CalculationType = typeof calculationTypes[number];

export interface IconicElementInfo {
  id: number;
  iconicElementShape: IconicElementShape;
  position: Position;
  belongsTo: ListInfo["id"] | undefined;
}

export interface ListInfo {
  id: number;
  name: string;
  listShape: ListShape;
  position: Position;
  has: IconicElementInfo["id"][];
  abstractionLevel: AbstractionLevel;
  belongsTo: FunctionInfo["id"] | undefined;
}

export interface FunctionInfo {
  id: number;
  name: string;
  functionShape: FunctionShape;
  position: Position;
  has: ListInfo["id"][];
  caluclationType: CalculationType;
}

export default function Field() {
  const [iconicElementInfos, setIconicElementInfos] = useState<
    IconicElementInfo[]
  >([]);
  const [listInfos, setListInfos] = useState<ListInfo[]>([]);
  const [functionInfos, setFunctionInfos] = useState<FunctionInfo[]>([]);
  const [iconicElementsCount, setIconicElementsCount] = useState<number>(0);
  const [listsCount, setListsCount] = useState<number>(0);
  const [functionsCount, setFunctionsCount] = useState<number>(0);

  const registerIconicElement = (info: Omit<IconicElementInfo, "id">) => {
    setIconicElementInfos((cur) => [
      ...cur,
      { id: iconicElementsCount + 1, ...info },
    ]);
    setIconicElementsCount((cur) => cur + 1);
  };

  const registerList = (info: Omit<ListInfo, "id">) => {
    setListInfos((cur) => [...cur, { id: listsCount + 1, ...info }]);
    setListsCount((cur) => cur + 1);
  };

  const registerFunction = (info: Omit<FunctionInfo, "id">) => {
    setFunctionInfos((cur) => [...cur, { id: functionsCount + 1, ...info }]);
    setFunctionsCount((cur) => cur + 1);
  };

  const shiftIconicElementPosition = ({
    id,
    positionDiff,
  }: {
    id: number;
    positionDiff: Position;
  }) => {
    const prevPosition = iconicElementInfos.find(
      (info) => info.id === id
    )?.position;
    if (prevPosition === undefined) {
      throw new Error("");
    }
    setIconicElementInfos((cur) =>
      cur.map((info) =>
        info.id === id
          ? {
              ...info,
              position: {
                x: prevPosition.x + positionDiff.x,
                y: prevPosition.y + positionDiff.y,
              },
            }
          : info
      )
    );
  };

  const setListPosition = ({
    id,
    position,
  }: {
    id: number;
    position: Position;
  }) => {
    setListInfos(
      listInfos.map((info) => (info.id === id ? { ...info, position } : info))
    );
  };

  const setListName = ({
    id,
    name,
  }: {
    id: ListInfo["id"];
    name: ListInfo["name"];
  }) => {
    setListInfos(
      listInfos.map((info) => (info.id === id ? { ...info, name } : info))
    );
  };

  const setListAbstractionLevel = ({
    id,
    abstractionLevel,
  }: {
    id: ListInfo["id"];
    abstractionLevel: ListInfo["abstractionLevel"];
  }) => {
    setListInfos(
      listInfos.map((info) =>
        info.id === id ? { ...info, abstractionLevel } : info
      )
    );
  };

  const setFunctionPosition = ({
    id,
    position,
  }: {
    id: number;
    position: Position;
  }) => {
    setFunctionInfos(
      functionInfos.map((info) =>
        info.id === id ? { ...info, position } : info
      )
    );
  };

  const setFunctionName = ({
    id,
    name,
  }: {
    id: FunctionInfo["id"];
    name: FunctionInfo["name"];
  }) => {
    setFunctionInfos(
      functionInfos.map((info) => (info.id === id ? { ...info, name } : info))
    );
  };

  const setFunctionCalculationType = ({
    id,
    caluclationType,
  }: {
    id: FunctionInfo["id"];
    caluclationType: FunctionInfo["caluclationType"];
  }) => {
    setFunctionInfos(
      functionInfos.map((info) =>
        info.id === id ? { ...info, caluclationType } : info
      )
    );
  };

  const onIconicElementButtonClicked = (
    iconicElementShape: IconicElementShape
  ) => {
    registerIconicElement({
      iconicElementShape,
      position: { x: 300, y: 200 },
      belongsTo: undefined,
    });
  };

  const onListButtonClicked = (listShape: ListShape) => {
    registerList({
      name: `List${listsCount + 1}`,
      listShape,
      position: { x: 500, y: 200 },
      has: [],
      abstractionLevel: "original",
      belongsTo: undefined,
    });
  };

  const onFunctionButtonClicked = (functionShape: FunctionShape) => {
    registerFunction({
      name: `Func${functionsCount + 1}`,
      functionShape,
      position: { x: 800, y: 200 },
      has: [],
      caluclationType: "addition",
    });
  };

  // 配置的にiconicElementがlistに含まれうるかどうかを計算する
  const isIconicElementIncludedInList = (
    iconicElementInfo: IconicElementInfo,
    listInfo: ListInfo
  ): boolean => {
    if (listInfo.listShape === "circle") {
      return (
        calcDistance(iconicElementInfo.position, listInfo.position) <
        LIST_WIDTH / 2
      );
    } else if (listInfo.listShape === "rectangle") {
      return (
        Math.abs(listInfo.position.x - iconicElementInfo.position.x) <
          LIST_WIDTH / 2 &&
        Math.abs(listInfo.position.y - iconicElementInfo.position.y) <
          LIST_HEIGHT / 2
      );
    }
    throw new Error("Invalid listShape");
  };

  // 配置的にlist（のnumberCircleの中心）がfunctionに含まれうるかどうかを計算する
  const isListIncludedInFunction = (
    listInfo: ListInfo,
    functionInfo: FunctionInfo
  ): boolean => {
    let functionWidth, functionHeight;

    switch (functionInfo.functionShape) {
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
    return (
      Math.abs(
        functionInfo.position.x -
          (listInfo.position.x + LIST_WIDTH * 0.25 + NUMBER_CIRCLE_WIDTH * 0.5)
      ) <
        functionWidth / 2 &&
      Math.abs(
        functionInfo.position.y -
          (listInfo.position.y +
            LIST_HEIGHT * 0.25 +
            NUMBER_CIRCLE_HEIGHT * 0.5)
      ) <
        functionHeight / 2
    );
  };

  // iconicElementが所属しているListがあればそのidを、なければundefinedを返す関数
  const getListId = (
    iconicElementInfo: IconicElementInfo
  ): ListInfo["id"] | undefined =>
    listInfos
      .filter((listInfo) =>
        isIconicElementIncludedInList(iconicElementInfo, listInfo)
      )
      // 距離が近い方を優先する
      .sort(
        (a, b) =>
          calcDistance(a.position, iconicElementInfo.position) -
          calcDistance(b.position, iconicElementInfo.position)
      )
      .find(() => true)?.id;

  // listが所属しているfunctionがあればそのidを、なければundefinedを返す関数
  const getFunctionId = (listInfo: ListInfo): FunctionInfo["id"] | undefined =>
    functionInfos
      .filter((functionInfo) =>
        isListIncludedInFunction(listInfo, functionInfo)
      )
      // 距離が近い方を優先する
      .sort(
        (a, b) =>
          calcDistance(a.position, listInfo.position) -
          calcDistance(b.position, listInfo.position)
      )
      .find(() => true)?.id;

  const updateListHas = (
    iconicElementId: IconicElementInfo["id"],
    prevBelongsTo: IconicElementInfo["belongsTo"],
    newBelongsTo: IconicElementInfo["belongsTo"]
  ) => {
    setListInfos((cur) =>
      cur.map((listInfo) => {
        if (listInfo.id === prevBelongsTo) {
          listInfo.has = listInfo.has.filter((id) => id !== iconicElementId);
        }
        if (listInfo.id === newBelongsTo) {
          if (!listInfo.has.includes(iconicElementId)) {
            listInfo.has.push(iconicElementId);
          }
        }
        return listInfo;
      })
    );
  };

  const updateFunctionHas = (
    listId: ListInfo["id"],
    prevBelongsTo: ListInfo["belongsTo"],
    newBelongsTo: ListInfo["belongsTo"]
  ) => {
    setFunctionInfos((cur) =>
      cur.map((functionInfo) => {
        if (functionInfo.id === prevBelongsTo) {
          functionInfo.has = functionInfo.has.filter((id) => id !== listId);
        }
        if (functionInfo.id === newBelongsTo) {
          if (!functionInfo.has.includes(listId)) {
            functionInfo.has.push(listId);
          }
        }
        return functionInfo;
      })
    );

    console.log(functionInfos);
  };

  const updateIconicElement = (iconicElementInfo: IconicElementInfo) => {
    const newBelongsTo = getListId(iconicElementInfo);

    const prevBelongsTo = iconicElementInfos.find(
      (info) => info.id === iconicElementInfo.id
    )?.belongsTo;

    setIconicElementInfos(
      iconicElementInfos.map((info) =>
        info.id === iconicElementInfo.id
          ? { ...iconicElementInfo, belongsTo: newBelongsTo }
          : info
      )
    );

    updateListHas(iconicElementInfo.id, prevBelongsTo, newBelongsTo);
  };

  const updateList = (listInfo: ListInfo) => {
    const newBelongsTo = getFunctionId(listInfo);

    const prevBelongsTo = listInfos.find(
      (info) => info.id === listInfo.id
    )?.belongsTo;

    setListInfos(
      listInfos.map((info) =>
        info.id === listInfo.id
          ? { ...listInfo, belongsTo: newBelongsTo }
          : info
      )
    );

    updateFunctionHas(listInfo.id, prevBelongsTo, newBelongsTo);
  };

  const calculate = (
    listId_1: ListInfo["id"],
    listId_2: ListInfo["id"],
    calculationType: CalculationType
  ) => {
    const value_1 = listInfos.find((info) => info.id === listId_1)?.has.length;

    if (value_1 === undefined) {
      throw new Error(`Unknown list found: {id: ${listId_1}}.`);
    }
    const value_2 = listInfos.find((info) => info.id === listId_2)?.has.length;

    if (value_2 === undefined) {
      throw new Error(`Unknown list found: {id: ${listId_2}}.`);
    }

    switch (calculationType) {
      case "addition":
        return value_1 + value_2;
      case "multiplication":
        return value_1 * value_2;
      default:
        throw new Error("Invalid calculation Type.");
    }
  };

  console.log("<component>field");

  return (
    <Box sx={{ display: "flex" }}>
      <SideMenu
        onIconicElementButtonClicked={onIconicElementButtonClicked}
        onListButtonClicked={onListButtonClicked}
        onFunctionButtonClicked={onFunctionButtonClicked}
      />
      {functionInfos.map((info) => (
        <Function
          key={info.id}
          info={info}
          functionShape={info.functionShape}
          setFunctionPosition={setFunctionPosition}
          setFunctionName={setFunctionName}
          setFunctionCalculationType={setFunctionCalculationType}
          calculate={calculate}
        />
      ))}
      {listInfos.map((info) => (
        <List
          key={info.id}
          info={info}
          listShape={info.listShape}
          setListPosition={setListPosition}
          setListName={setListName}
          setListAbstractionLevel={setListAbstractionLevel}
          shiftIconicElementPosition={shiftIconicElementPosition}
          updateList={updateList}
        />
      ))}
      {iconicElementInfos.map((info) => {
        const list = listInfos.find(
          (listInfo) => listInfo.id === info.belongsTo
        );
        return (
          list?.abstractionLevel !== "abstracted" && (
            <IconicElement
              key={info.id}
              info={info}
              iconicElementShape={info.iconicElementShape}
              updateIconicElement={updateIconicElement}
            />
          )
        );
      })}
    </Box>
  );
}
