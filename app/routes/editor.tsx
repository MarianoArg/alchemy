import { Outlet, useMatches } from "remix";
import Sidebar from "~/components/Sidebar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function EditorLayout() {
  const matches = useMatches();
  const match = matches.find((match) => match?.handle?.background);
  const background = match?.handle?.background ?? "";

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full h-full bg-sky-50 font-plex">
        <Sidebar />
        <div className="flex flex-1 justify-items-center justify-center items-center">
          <Outlet />
        </div>
      </div>
    </DndProvider>
  );
}
