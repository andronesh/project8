"use client";

import React from "react";

export type Item = {
  id: string;
  title: string;
  position: number;
};

type Props = {
  item: Item;
  // isDragging: boolean;
};

export function ItemCard(props: Props) {
  return (
    <div
      className={`flex justify-around p-2 rounded-lg   ${
        // props.isDragging ? "bg-gray-600 shadow-lg" : "bg-gray-700"
        ""
      }`}
    >
      {props.item.id + ": " + props.item.title}
    </div>
  );
}
