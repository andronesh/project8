"use client";

import React from "react";
import { Draggable } from "@hello-pangea/dnd";

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
					className={`${props.className} ${snapshot.isDragging ? "bg-accent shadow-lg" : "bg-card"}`}
				>
					{props.children}
				</div>
			)}
		</Draggable>
	);
}
