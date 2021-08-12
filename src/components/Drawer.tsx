import React, { ReactNode, useState } from "react";
import GuildSidebar from "../pages/guild/guild";
import { Channel, Guild } from "fosscord.js";
import ChannelSidebar from "../pages/channel/sidebar";
import { Button } from "../framework/Button";
import "./Drawer.scss";

const Drawer = ({
  children,
  channel,
  guild,
}: {
  children?: ReactNode;
  channel?: Channel;
  guild?: Guild;
}) => {
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <>
      <Button
        primary
        className="menuBtn"
        onClick={() => setVisibility(!visibility)}
      >
        Menu
      </Button>
      <div className={"content " + (visibility ? " show" : "")}>
        <GuildSidebar />
        <ChannelSidebar guild={guild} />
      </div>
      <div
        className={visibility ? "drawer-enabled" : ""}
        style={{ display: "contents" }}
      >
        {children}
      </div>
    </>
  );
};

export default Drawer;
