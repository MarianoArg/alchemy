import { v4 as uuidv4 } from "uuid";

export const ComponentsData = [
  {
    title: "Squares",
    id: uuidv4(),
    type: "square",
    items: [
      {
        id: uuidv4(),
        variant: "red",
      },
      {
        id: uuidv4(),
        variant: "green",
      },
      {
        id: uuidv4(),
        variant: "blue",
      },
      {
        id: uuidv4(),
        variant: "yellow",
      },
    ],
  },
  {
    title: "Triangle",
    id: uuidv4(),
    type: "triangle",
    items: [
      {
        id: uuidv4(),
        variant: "black",
      },
      {
        id: uuidv4(),
        variant: "yellow",
      },
      {
        id: uuidv4(),
        variant: "pink",
      },
      {
        id: uuidv4(),
        variant: "blue",
      },
    ],
  },
  {
    title: "Circle",
    id: uuidv4(),
    type: "circle",
    items: [
      {
        id: uuidv4(),
        variant: "red",
      },
      {
        id: uuidv4(),
        variant: "black",
      },
      {
        id: uuidv4(),
        variant: "green",
      },
      {
        id: uuidv4(),
        variant: "pink",
      },
    ],
  },
]