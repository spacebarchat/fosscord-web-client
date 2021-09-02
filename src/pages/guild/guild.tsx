import React, { useState } from "react";
import client from "../../Client";
import { useCache } from "../../util/useCache";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";
// @ts-ignore
import FosscordLogo from "../../assets/logo_big_transparent.png";
import "@fosscord/ui/scss/guild.scss";
import "./guild.scss";

export interface Params {
  id: string;
  channel: string;
}

const GuildSideBar = () => {
  const { t } = useTranslation("translation");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const guilds = (globalThis as any).guilds || useCache(client.guilds).array();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = useHistory();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const match = useRouteMatch<Params>({
    path: "/channels/:id/:channel?",
    exact: false,
  });

  // eslint-disable-next-line
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  function openModal() {
    setIsOpen(true);
  }

  // eslint-disable-next-line
  function closeModal() {
    setIsOpen(false);
  }

  const navigateTo = (channel: string) => history.push("/channels/" + channel);

  return (
    <div className="guild-container">
      <div
        className={"guild home" + (match?.params.id === "@me" ? " active" : "")}
        title={t("home")}
        onClick={() => history.push("/channels/@me")}
      >
        <span className="pill"></span>
        <img src={FosscordLogo} className="img" alt="" />
      </div>
      <hr />
      {guilds
        .sort((a: any, b: any) => (a.rawPosition > b.rawPosition ? 1 : -1))
        .map((x: any) => (
          <div
            id={x.id}
            className={"guild" + (match?.params.id === x.id ? " active" : "")}
            title={x.name}
            key={+new Date() + "_" + x.id + "_" + Math.random()}
            onClick={() => {
              if (x.id) navigateTo(x.id.toString());
            }}
          >
            <span className="pill"></span>
            {x.icon ? (
              <img
                src={x.iconURL({ size: 1024 })}
                alt=""
                className="img server"
              />
            ) : (
              <span className="img server">
                {!x.iconURL() && x?.nameAcronym}
              </span>
            )}
          </div>
        ))}
      <div
        className="guild green"
        title={t("add") + " " + t("guild")}
        onClick={openModal}
      >
        <span className="pill"></span>
        <span className="img">
          <span>+</span>
        </span>
      </div>

      {/* <LittleModal className="server page" open={modalIsOpen} onClose={closeModal}>
            <AddServer close={() => closeModal()}></AddServer>
        </LittleModal> */}
    </div>
  );
};

export default GuildSideBar;
