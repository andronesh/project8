"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ItemsColumn } from "./ItemsColumnView";
import { Droppable } from "@hello-pangea/dnd";

// const Droppable = dynamic(
//   () =>
//     import("react-beautiful-dnd").then((mod) => {
//       return mod.Droppable;
//     }),
//   { ssr: false }
// );

type Props = {
  column: ItemsColumn;
  droppableId: string;
  className?: string;
};

export function DroppableWrapper(props: React.PropsWithChildren<Props>) {
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`flex flex-col px-2 w-96 rounded-lg bg-opacity-70 ${
            snapshot.isDraggingOver ? "bg-blue-950" : "bg-transparent"
          }`}
          {...provided.droppableProps}
        >
          <div className="font-bold text-center">{props.column.title}</div>
          {props.children}
          {/* {provided.placeholder} */}
        </div>
      )}
    </Droppable>
  );
}
