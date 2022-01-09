import { useDrop, XYCoord } from "react-dnd";
import React from "react";
import {
  ComponentType,
  ComponentVariant,
  Component,
  DropEffect,
} from "~/types/components";
import { v4 as uuidv4 } from "uuid";
import { usePersistedState } from "~/hooks/usePersistedState";
import ComponentOption from "~/components/Sidebar/ComponentOption";

interface IProps {
  sessionId: string;
}

export default function WhiteBoard({ sessionId }: IProps) {
  const [selectedItem, setSelectedItem] = React.useState<string>("");
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [itemsOnBoard, setItemsOnBoard] = usePersistedState(sessionId, {});

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: Object.values(ComponentType),
    drop: (item: Component, monitor) => {
      const dropResult = monitor.getDropResult();
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const getSourceClientOffset = monitor.getSourceClientOffset() as XYCoord;
      const getInitialSourceClientOffset =
        monitor.getInitialSourceClientOffset() as XYCoord;
      if (item.allowedDropEffect === DropEffect.Copy) {
        const newComponent = {
          ...item,
          id: uuidv4(),
          allowedDropEffect: DropEffect.Move,
        };

        const getInitialClientOffset = monitor.getInitialClientOffset();

        const getClientOffset = monitor.getClientOffset();
        const left = getSourceClientOffset.x - getInitialSourceClientOffset.x;
        const top = getSourceClientOffset.y - getInitialSourceClientOffset.y;
        moveBox(newComponent, left, top);
      } else {
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item, left, top);
      }
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const moveBox = React.useCallback(
    (item: Component, left: number, top: number) => {
      setItemsOnBoard((prev) => ({
        ...prev,
        [item.id]: {
          ...item,
          top,
          left,
        },
      }));
    },
    [itemsOnBoard, setItemsOnBoard]
  );

  const handleItemClick = (id: string) => {
    setSelectedItem(id === selectedItem ? "" : id);
  };

  React.useLayoutEffect(() => {
    const removeElement = (e) => {
      if (e.keyCode === 8 && selectedItem) {
        setItemsOnBoard((prev) => {
          delete prev[selectedItem];
          return { ...prev };
        });
      }
    };

    document.addEventListener("keydown", removeElement);
    return () => document.removeEventListener("keydown", removeElement);
  }, [selectedItem, setItemsOnBoard]);

  const isActive = canDrop && isOver;

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      ref={parentRef}
    >
      <div
        ref={drop}
        className={`w-10/12 h-5/6 border-dashed border-4 flex flex-wrap relative ${
          isActive ? "border-slate-500" : "border-slate-200"
        }`}
      >
        {Object.values(itemsOnBoard).map(({ id, variant, type, top, left }) => (
          <div
            key={id}
            className={`h-24 w-24 absolute ${
              selectedItem === id ? "border-2 border-rose-500" : "border-0"
            }`}
            style={{ top, left }}
            onClick={() => handleItemClick(id as string)}
          >
            <ComponentOption
              id={id}
              top={top}
              left={left}
              allowedDropEffect={DropEffect.Move}
              type={type as ComponentType}
              variant={variant as ComponentVariant}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
