import { useCatch, redirect, useLoaderData } from "remix";
import type { LoaderFunction, MetaFunction } from "remix";
import WhiteBoard from "~/components/WhiteBoard";
import { getSession, destroySession } from "~/services/session";
import { ComponentsData } from "~/data/components";
import { useAppUpdater } from "~/context/Main";
import React from "react";
import { DndContext } from "@dnd-kit/core";
import { ClientOnly } from "remix-utils";

export let loader: LoaderFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("sessionId")) {
    const currentSession = session.get("sessionId");
    if (currentSession !== params.sessionId) {
      await destroySession(session);
      return redirect("/", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }
  }

  return { sessionId: params.sessionId, sidebarItems: ComponentsData };
};

export default function EditionSession() {
  const actions = useAppUpdater();

  let { sessionId, sidebarItems } = useLoaderData();

  React.useEffect(() => {
    if (actions) {
      actions?.init(sessionId);
      actions?.setSidebarItems(sidebarItems);
    }
  }, []);

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

    if (over) {
      actions?.updateItem({
        id: active.id,
        delta,
        top: over.rect.top,
        left: delta.x,
      });
    }
    actions?.moveItem(null);
  }

  return <WhiteBoard />;
}

export function CatchBoundary() {
  let caught = useCatch();

  let message: React.ReactNode;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </p>
      );
    case 404:
      message = (
        <p>Looks like you tried to visit a page that does not exist.</p>
      );
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : "Oops...",
  };
};
