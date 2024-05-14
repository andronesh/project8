"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  // DragDropContext,
  // Droppable,
  // Draggable,
  DropResult,
  DraggableLocation,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import dynamic from "next/dynamic";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.DragDropContext;
    }),
  { ssr: false }
);
const Droppable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Droppable;
    }),
  { ssr: false }
);
const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

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

const generateItems = (count: number, columnId: number): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${columnId}-${k}-${new Date().getTime()}`,
    title: `item ${columnId}-${k}`,
    position: k,
  }));

const generateColumn = (id: number, itemsCount: number): ItemsColumn => {
  return { id, title: "column " + id, items: generateItems(itemsCount, id) };
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
const grid = 8;

// const getItemStyle = (
//   isDragging: boolean,
//   draggableStyle: DraggingStyle | NotDraggingStyle | undefined
// ) => {
//   console.info(draggableStyle);
//   return {
//     // some basic styles to make the items look a bit nicer
//     // userSelect: "none",
//     padding: grid * 2,
//     margin: `0 0 ${grid}px 0`,

//     // change background colour if dragging
//     background: isDragging ? "lightgreen" : "grey",

//     // styles we need to apply on draggables
//     ...draggableStyle,
//   };
// };

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export function DragTest() {
  // const [state, setState] = useState([getItems(10), getItems(5, 10)]);
  const [columns, setColumns] = useState([
    generateColumn(1, 7),
    generateColumn(2, 3),
  ]);

  function onDragEnd({ source, destination }: DropResult) {
    // dropped outside the list
    if (!destination) {
      return;
    }
    // const sInd = +source.droppableId;
    // const dInd = +destination.droppableId;
    const sourceColumnIndex = +source.droppableId;
    const destinationColumnIndex = +destination.droppableId;

    if (sourceColumnIndex === destinationColumnIndex) {
      const reorderedItems = reorderInsideColumn(
        columns[sourceColumnIndex],
        source.index,
        destination.index
      );
      const newState = [...columns];
      newState[sourceColumnIndex].items = reorderedItems;
      setColumns(newState);
    } else {
      const result = moveBetweenColumns(
        columns[sourceColumnIndex],
        columns[destinationColumnIndex],
        source,
        destination
      );
      const newState = [...columns];
      newState[sourceColumnIndex].items = result[0];
      newState[destinationColumnIndex].items = result[1];

      // setState(newState.filter((group) => group.length));
      setColumns(newState);
    }
  }

  return (
    <div>
      {/* <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button> */}
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
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`py-1`}
                        >
                          <div
                            className={`flex justify-around p-2 rounded-lg   ${
                              snapshot.isDragging
                                ? "bg-gray-600 shadow-lg"
                                : "bg-gray-700"
                            }`}
                          >
                            {item.title}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
