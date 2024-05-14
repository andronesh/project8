"use client";

import React from "react";
import dynamic from "next/dynamic";

const Draggable = dynamic(
  () =>
    import("react-beautiful-dnd").then((mod) => {
      return mod.Draggable;
    }),
  { ssr: false }
);

type Props = {
  draggableId: string;
  index: number;
  className?: string;
};

export function DraggableWrapper(props: React.PropsWithChildren<Props>) {
  return (
    <Draggable draggableId={props.draggableId} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`${props.className} ${
            snapshot.isDragging ? "bg-gray-600 shadow-lg" : "bg-gray-700"
          }`}
        >
          {props.children}
        </div>
      )}
    </Draggable>
  );
}
