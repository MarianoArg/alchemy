import { redirect, LoaderFunction } from "remix";
import { getSession, commitSession } from "~/services/session";
import { v4 as uuidv4 } from "uuid";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("sessionId")) {
    return redirect(`/editor/${session.get("sessionId")}`);
  }

  const newSession = uuidv4();
  session.set("sessionId", newSession);
  return redirect(`/editor/${newSession}`, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
