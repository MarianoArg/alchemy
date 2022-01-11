import { ComponentType, ComponentVariant, Component } from "~/types/components";
import {
  SquareShape,
  CircleShape,
  TriangleShape,
} from "~/components/shared/ComponentShapes";

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
}: Pick<Component, "type" | "variant">) {
  const Component = Shapes[type];
  return <Component className={`${variantCSS[variant]}`} />;
}
