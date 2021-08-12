import React, { ReactNode, useEffect } from "react";
// @ts-ignore
import { Client, Constants } from "fosscord.js";
import { useHistory } from "react-router-dom";
import store from "./util/store";

const client = new Client({
  intents: [
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING",
    "GUILDS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_INVITES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILD_WEBHOOKS",
  ],
});

export default client;

console.log(client);

export function InitClient({ children }: { children?: ReactNode }) {
  let history = useHistory();

  const onInvalidated = () => {
    store.removeItem("token");
    history.push("/login");
  };

  useEffect(() => {
    console.log("Init client");
    client.on("invalidated", onInvalidated);
    store.getItem("token").then((x: any) => {
      if (!x) return client.emit(Constants.Events.INVALIDATED);
      client.login(x).catch((e: any) => {});
    });

    return () => {
      client.off("invalidated", onInvalidated);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
