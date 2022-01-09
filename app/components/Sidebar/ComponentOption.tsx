import { ComponentType, ComponentVariant, Component } from "~/types/components";
import {
  SquareShape,
  CircleShape,
  TriangleShape,
} from "~/components/shared/ComponentShapes";
import { useDrag, DragSourceMonitor } from "react-dnd";

const Shapes = {
  [ComponentType.Square]: SquareShape,
  [ComponentType.Circle]: CircleShape,
  [ComponentType.Triangle]: TriangleShape,
};

export const variantCSS = {
  [ComponentVariant.Black]: "fill-stone-900",
  [ComponentVariant.Blue]: "fill-sky-800",
  [ComponentVariant.Yellow]: "fill-yellow-500",
  [ComponentVariant.Red]: "fill-rose-700",
  [ComponentVariant.Green]: "fill-lime-600",
  [ComponentVariant.Pink]: "fill-pink-600",
};

export default function ComponentOption({
  type,
  variant,
  id,
  allowedDropEffect,
  top,
  left,
}: Component) {
  const Component = Shapes[type];

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type,
      item: {
        id,
        type,
        variant,
        allowedDropEffect,
        top,
        left,
      },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, type, variant, top, left, allowedDropEffect]
  );

  return isDragging ? (
    <div ref={dragPreview} className="translate-x-0	translate-y-0">
      <Component className={`${variantCSS[variant]}`} />
    </div>
  ) : (
    <div ref={drag} className="translate-x-0	translate-y-0">
      <Component className={`${variantCSS[variant]}`} />
    </div>
  );
}
