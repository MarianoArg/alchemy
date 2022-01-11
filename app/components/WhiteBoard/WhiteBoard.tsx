// import { useDrop, XYCoord } from "react-dnd";
import React from "react";
import {
  ComponentType,
  ComponentVariant,
  DropEffect,
} from "~/types/components";
import ComponentOption from "~/components/Sidebar/ComponentOption";
import { useDroppable } from "@dnd-kit/core";
import { useAppState, useAppUpdater } from "~/context/Main";
import Draggable from "~/components/Sidebar/DraggableWrapper";
import { CSS } from "@dnd-kit/utilities";

export default function WhiteBoard() {
  const [selectedItem, setSelectedItem] = React.useState<string>("");
  const state = useAppState();
  const actions = useAppUpdater();
  const parentRef = React.useRef<HTMLDivElement>(null);

  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const handleItemClick = (id: string) => {
    setSelectedItem(id === selectedItem ? "" : id);
  };

  React.useLayoutEffect(() => {
    const removeElement = (e) => {
      if (e.keyCode === 8 && selectedItem) {
        actions?.removeItemFromBoard(selectedItem);
      }
    };

    document.addEventListener("keydown", removeElement);
    return () => document.removeEventListener("keydown", removeElement);
  }, [selectedItem, actions]);

  const isActive = !isOver;

  // const style = {
  //   transform: CSS.Translate.toString(transform),
  // };

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      ref={parentRef}
    >
      <div
        ref={setNodeRef}
        className={`w-10/12 h-5/6 border-dashed border-4 flex flex-wrap relative ${
          isOver ? "border-slate-500" : "border-slate-200"
        }`}
      >
        {Object.values(state.boardItems).map(
          ({ id, variant, type, top, left, delta }) => (
            <div
              key={id}
              className={`h-24 w-24 ${
                selectedItem === id ? "border-2 border-rose-500" : "border-0"
              }`}
              onClick={() => handleItemClick(id as string)}
            >
              <Draggable
                id={id}
                key={id}
                type={type as ComponentType}
                variant={variant as ComponentVariant}
                allowedDropEffect={DropEffect.Move}
              >
                <ComponentOption
                  type={type as ComponentType}
                  variant={variant as ComponentVariant}
                />
              </Draggable>
            </div>
          )
        )}
      </div>
    </div>
  );
}
