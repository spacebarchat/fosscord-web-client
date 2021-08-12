import React from "react";
import { useTranslation } from "react-i18next";
import useForceUpdate from "../../util/useForceUpdate";
import { Guild, GuildChannel, ThreadChannel } from "fosscord.js";
import { FaChevronDown, FaHashtag, FaVolumeUp } from "../../framework/radio";
import { Text } from "../../framework/Text";
import { Link } from "../../util/Router";
import { useCache } from "../../util/useCache";
import "./sidebar.scss";
// @ts-ignore
import VoiceSVG from "../../assets/voice.png";
// @ts-ignore
import SpeakerSVG from "../../assets/speaker.png";
// @ts-ignore
import SettingsSVG from "../../assets/settings.png";
import Friends from "../friends/friends";

const SideBar = ({ guild }: { guild: Guild | any }) => {
  const forceUpdate = useForceUpdate();
  const { t } = useTranslation("translation");

  const data =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCache(guild?.channels)
      ?.array()
      .filter(
        (x) =>
          x.type === "GUILD_CATEGORY" ||
          guild.me?.permissionsIn(x).has("VIEW_CHANNEL")
      ) || [];

  if (guild === null) return <Friends></Friends>;

  // @ts-ignore
  globalThis.test = guild?.channels?.cache?.array();

  function renderChannels(d: (GuildChannel | ThreadChannel)[]) {
    return d.map((item) => (
      <Link
        to={`/channels/${guild?.id}/${item?.id}`}
        style={{ textDecoration: "none" }}
        className="item"
        key={item.id}
      >
        {item.type === "GUILD_TEXT" && <FaHashtag className="icon" />}
        {item.type === "GUILD_VOICE" && <FaVolumeUp className="icon" />}
        <Text className="channel-name">{item.name}</Text>
      </Link>
    ));
  }

  return (
    <div className="sidebar-channels">
      <div className="header">
        <Text className="guild-title">{guild?.name || "Server"}</Text>
      </div>
      <div className="container">
        <div className="scrolled-container">
          <div className="list">
            {/*  SCROLL BAR */}
            {renderChannels(
              data
                .sort((a: any, b: any) =>
                  a.rawPosition > b.rawPosition ? 1 : -1
                )
                .filter((x) => !x.parentId && x.type !== "GUILD_CATEGORY")
            )}

            {data
              .filter((x) => x.type === "GUILD_CATEGORY")
              .filter(
                (category) =>
                  data.find((x) => x.parentId === category.id) ||
                  guild.me?.permissionsIn(category).has("MANAGE_CHANNELS")
              )
              .map((item: any) => (
                <div key={item.id}>
                  <div
                    key={item.id}
                    className={"item category"}
                    onClick={() => {
                      const i = data.find((x) => x.id === item.id);
                      // @ts-ignore
                      i.collapsed = !i.collapsed;
                      forceUpdate();
                    }}
                  >
                    <FaChevronDown
                      style={{
                        transform: item.collapsed
                          ? "rotate(-90deg)"
                          : "rotate(0deg)",
                      }}
                    />
                    <Text>{item.name}</Text>
                  </div>
                  {item.collapsed === false &&
                    renderChannels(
                      data.filter((x: any) => x.parentId === item.id)
                    )}
                </div>
              ))}
          </div>
          <div className="settingsBar">
            <div className="member">
              <div className="image">
                <img
                  src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22408516/Big_Chungus.png"
                  alt=""
                />
                <span className="indicator online"></span>
              </div>
              <div className="contentWrap">
                <span className="name">Big Chungus</span>
                <span className="description">Test Game playing</span>
              </div>
            </div>
            <div className="tooltip">
              <div className="buttonOption">
                <img src={VoiceSVG} alt="" />
              </div>
              <div className="tooltip-text blue top">{t("mute")}</div>
            </div>
            <div className="tooltip">
              <div className="buttonOption">
                <img src={SpeakerSVG} alt="" />
              </div>
              <div className="tooltip-text blue top">{t("deafen")}</div>
            </div>
            <div className="tooltip">
              <div className="buttonOption">
                <img src={SettingsSVG} alt="" />
              </div>
              <div className="tooltip-text blue top">{t("userSettings")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
