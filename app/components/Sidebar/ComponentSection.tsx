import * as Accordion from "@radix-ui/react-accordion";
import ComponentOption from "./ComponentOption";
import {
  ComponentType,
  ComponentVariant,
  DropEffect,
} from "~/types/components";

import Draggable from "./DraggableWrapper";
import { DragOverlay } from "@dnd-kit/core";
import { useAppState } from "~/context/Main";

export default function ComponentSection() {
  const state = useAppState();

  return (
    <div>
      <Accordion.Root
        type="single"
        collapsible
        defaultValue={`component-${state.sidebarItems[0]?.id}`}
      >
        {state.sidebarItems.map((component, i) => (
          <Accordion.Item
            key={component.id}
            value={`component-${component.id}`}
          >
            <Accordion.Header>
              <Accordion.Trigger className="font-medium text-sm flex group my-2">
                <span className="mr-1 aria-hidden parentOpen:rotate-90 transition-all duration-100 ease-in-out">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {component.title}
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="dataOpen:animate-slideDown dataClosed:animate-slideUp overflow-hidden bg-sky-50 p-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.values(component?.items ?? []).map((item) => (
                  <Draggable
                    id={item.id}
                    key={item.id}
                    type={component.type as ComponentType}
                    variant={item.variant as ComponentVariant}
                    allowedDropEffect={DropEffect.Copy}
                  >
                    <div
                      key={item.id}
                      className="overflow-hidden bg-white p-3 cursor-pointer hover:ring-2 ring-sky-600"
                    >
                      <ComponentOption
                        type={component.type as ComponentType}
                        variant={item.variant as ComponentVariant}
                      />
                    </div>
                  </Draggable>
                ))}
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
      <DragOverlay>
        {state.activeItem ? (
          <ComponentOption
            type={state.activeItem.type as ComponentType}
            variant={state.activeItem.variant as ComponentVariant}
          />
        ) : null}
      </DragOverlay>
    </div>
  );
}
