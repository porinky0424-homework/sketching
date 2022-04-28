import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import IconicElement from "./iconicElement";
import List from "./list";
import Function from "./function";
import { calcDistance } from "../functions/distance";
import { Position } from "../constants/types/position";
import {
  WIDTH as LIST_WIDTH,
  HEIGHT as LIST_HEIGHT,
} from "../constants/sizes/list";
import { SMALL_HEIGHT, SMALL_WIDTH } from "../constants/sizes/function";

interface HeaderProps {
  onIconicElementButtonClicked: (
    iconicElementShape: IconicElementShape
  ) => void;
  onListButtonClicked: (listShape: ListShape) => void;
  onFunctionButtonClicked: (functionShape: FunctionShape) => void;
}

function Header({
  onIconicElementButtonClicked,
  onListButtonClicked,
  onFunctionButtonClicked,
}: HeaderProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ display: "flex" }}>
        <Toolbar>
          <Typography sx={{ mr: 1, height: "100%" }}>
            generate iconic elements →
          </Typography>
          <Button
            color="inherit"
            sx={{ height: "40px" }}
            onClick={() => onIconicElementButtonClicked("circle")}
          >
            <Typography sx={{ fontSize: "25px" }}>🔴</Typography>
          </Button>
          <Button
            color="inherit"
            sx={{ height: "40px", mr: 3 }}
            onClick={() => onIconicElementButtonClicked("rectangle")}
          >
            <Typography sx={{ fontSize: "25px" }}>⬛️</Typography>
          </Button>

          <Typography sx={{ mr: 1, height: "100%" }}>
            generate lists →
          </Typography>
          <Button
            color="inherit"
            sx={{ height: "40px" }}
            onClick={() => onListButtonClicked("circle")}
          >
            <Typography sx={{ fontSize: "25px" }}>🔴</Typography>
          </Button>
          <Button
            color="inherit"
            sx={{ height: "40px", mr: 3 }}
            onClick={() => onListButtonClicked("rectangle")}
          >
            <Typography sx={{ fontSize: "25px" }}>⬛️</Typography>
          </Button>

          <Typography sx={{ mr: 1, height: "100%" }}>
            generate functions →
          </Typography>
          <Button
            color="inherit"
            sx={{ height: "40px" }}
            onClick={() => onFunctionButtonClicked("small")}
          >
            <Typography sx={{ fontSize: "25px" }}>🔴</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
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
  result: number | undefined;
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

  const setFunctionResult = ({
    id,
    result,
  }: {
    id: FunctionInfo["id"];
    result: FunctionInfo["result"];
  }) => {
    setFunctionInfos(
      functionInfos.map((info) => (info.id === id ? { ...info, result } : info))
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
      position: { x: 100, y: 200 },
      belongsTo: undefined,
    });
  };

  const onListButtonClicked = (listShape: ListShape) => {
    registerList({
      name: "anonymous",
      listShape,
      position: { x: 100, y: 200 },
      has: [],
      abstractionLevel: "original",
      belongsTo: undefined,
    });
  };

  const onFunctionButtonClicked = (functionShape: FunctionShape) => {
    registerFunction({
      name: "anonymous",
      functionShape,
      position: { x: 100, y: 200 },
      has: [],
      caluclationType: "addition",
      result: undefined,
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

  // 配置的にlistがfunctionに含まれうるかどうかを計算する
  const isListIncludedInFunction = (
    listInfo: ListInfo,
    functionInfo: FunctionInfo
  ): boolean => {
    return (
      Math.abs(functionInfo.position.x - listInfo.position.x) <
        SMALL_WIDTH / 2 &&
      Math.abs(functionInfo.position.y - listInfo.position.y) < SMALL_HEIGHT / 2
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
    console.log(newBelongsTo);

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

  return (
    <>
      <Header
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
          setFunctionResult={setFunctionResult}
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
    </>
  );
}
