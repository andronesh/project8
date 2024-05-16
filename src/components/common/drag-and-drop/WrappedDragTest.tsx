"use client";

import React, { useState } from "react";
// import { DropResult, DraggableLocation } from "react-beautiful-dnd";
import {
  DropResult,
  DraggableLocation,
  DragDropContext,
  Droppable,
} from "@hello-pangea/dnd";
// import dynamic from "next/dynamic";
import { DraggableWrapper } from "./DraggableWrapper";
import { ItemCard } from "./ItemCard";

// const DragDropContext = dynamic(
//   () =>
//     import("react-beautiful-dnd").then((mod) => {
//       return mod.DragDropContext;
//     }),
//   { ssr: false }
// );
// const Droppable = dynamic(
//   () =>
//     import("react-beautiful-dnd").then((mod) => {
//       return mod.Droppable;
//     }),
//   { ssr: false }
// );

type Item = {
  id: string;
  title: string;
  position: number;
};

type ItemsColumn = {
  id: number;
  title: string;
  items: Item[];
};

const generateItems = (
  itemIdOffset: number,
  count: number,
  columnId: number
): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    // id: `item-${columnId}-${k}-${new Date().getTime()}`,
    id: `${itemIdOffset + k}`,
    title: `item ${columnId}-${k}`,
    position: k,
  }));

const generateColumn = (
  id: number,
  itemsCount: number,
  itemIdOffset: number
): ItemsColumn => {
  return {
    id,
    title: "column " + id,
    items: generateItems(itemIdOffset, itemsCount, id),
  };
};

const reorderInsideColumn = (
  column: ItemsColumn,
  removeFromIndex: number,
  placeAtIndex: number
) => {
  const resultItems = Array.from(column.items);
  const [removed] = resultItems.splice(removeFromIndex, 1);
  resultItems.splice(placeAtIndex, 0, removed);
  return resultItems;
};

/**
 * Moves an item from one list to another list.
 */
const moveBetweenColumns = (
  from: ItemsColumn,
  to: ItemsColumn,
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceResultItems = Array.from(from.items);
  const destResultItems = Array.from(to.items);
  const [removed] = sourceResultItems.splice(droppableSource.index, 1);

  destResultItems.splice(droppableDestination.index, 0, removed);

  // const result = {};
  // result[0] = sourceResultItems;
  // result[droppableDestination.droppableId] = destResultItems;

  return [sourceResultItems, destResultItems];
};

export function WrappedDragTest() {
  const [columns, setColumns] = useState([
    generateColumn(1, 7, 0),
    generateColumn(2, 3, 7),
  ]);

  function onDragEnd({ source, destination, draggableId }: DropResult) {
    // dropped outside the list
    if (!destination) {
      return;
    }
    // const sInd = +source.droppableId;
    // const dInd = +destination.droppableId;
    const sourceColumnIndex = +source.droppableId;
    const destinationColumnIndex = +destination.droppableId;

    if (sourceColumnIndex === destinationColumnIndex) {
      // const reorderedItems = reorderInsideColumn(
      //   columns[sourceColumnIndex],
      //   source.index,
      //   destination.index
      // );
      // const newState = [...columns];
      // newState[sourceColumnIndex].items = reorderedItems;
      // setColumns(newState);
    } else {
      // const result = moveBetweenColumns(
      //   columns[sourceColumnIndex],
      //   columns[destinationColumnIndex],
      //   source,
      //   destination
      // );
      // const newState = [...columns];
      // newState[sourceColumnIndex].items = result[0];
      // newState[destinationColumnIndex].items = result[1];
      // // setState(newState.filter((group) => group.length));
      // setColumns(newState);
    }

    console.info("sourceColumnIndex: " + sourceColumnIndex);
    console.info("destinationColumnIndex: " + destinationColumnIndex);
    console.info("draggableId: " + draggableId);
  }

  return (
    <div style={{ display: "flex" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, columnIndex) => (
          <Droppable key={column.id} droppableId={`${columnIndex}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`flex flex-col px-2 w-96 rounded-lg bg-opacity-70 ${
                  snapshot.isDraggingOver ? "bg-blue-950" : "bg-transparent"
                }`}
                {...provided.droppableProps}
              >
                <div className="font-bold text-center">{column.title}</div>
                {column.items.map((item, index) => (
                  <DraggableWrapper
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    className={`my-1 rounded-lg`}
                  >
                    <ItemCard item={item} />
                  </DraggableWrapper>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}
