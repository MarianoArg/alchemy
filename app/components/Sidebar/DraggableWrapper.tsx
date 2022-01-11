import { useDraggable } from "@dnd-kit/core";
import {
  ComponentType,
  ComponentVariant,
  DropEffect,
} from "~/types/components";
import { CSS } from "@dnd-kit/utilities";

interface IDraggableProps {
  type: ComponentType;
  variant: ComponentVariant;
  id: string;
  children: React.ReactNode;
  allowedDropEffect: DropEffect;
}

export default function Draggable({
  children,
  id,
  type,
  variant,
  allowedDropEffect,
}: IDraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      variant,
      type,
      allowedDropEffect,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
