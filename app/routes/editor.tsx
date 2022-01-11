import { Outlet } from "remix";
import Sidebar from "~/components/Sidebar";
import { DndContext } from "@dnd-kit/core";
import { ClientOnly } from "remix-utils";
import { useAppUpdater } from "~/context/Main";

import { DropEffect } from "~/types/components";

const Content = () => (
  <div className="flex w-full h-full bg-sky-50 font-plex">
    <Sidebar />
    <div className="flex flex-1 justify-items-center justify-center items-center">
      <Outlet />
    </div>
  </div>
);

export default function EditorLayout() {
  const actions = useAppUpdater();

  function handleDragStart(event) {
    const { active } = event;
    const { current } = active.data;

    actions?.moveItem({
      id: active.id,
      ...current,
    });
  }

  function handleDragEnd(event) {
    const { active, over, delta } = event;
    const { current } = active.data;

    if (current.allowedDropEffect === DropEffect.Copy) {
      actions?.addItemToBoard({
        ...current,
        id: active.id,
        delta,
        top: over.rect.top,
        left: delta.x,
      });
    } else if (over) {
      actions?.updateItem({
        id: active.id,
        delta,
        top: over.rect.top,
        left: delta.x,
      });
    }
    actions?.moveItem(null);
  }

  return (
    <ClientOnly fallback={<Content />}>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Content />
      </DndContext>
    </ClientOnly>
  );
}
