"use client";

import React from "react";
import { Item } from "./ItemCard";

export type ItemsColumn = {
  id: number;
  title: string;
  items: Item[];
};

type Props = {
  column: ItemsColumn;
  className?: string;
};

export function ItemsColumnView(props: React.PropsWithChildren<Props>) {
  return (
    <div
      className={`flex flex-col px-2 w-96 rounded-lg bg-opacity-70 ${props.className}`}
    >
      <div className="font-bold text-center">{props.column.title}</div>
      {props.children}
      {/* {provided.placeholder} */}
    </div>
  );
}
