import React from "react";
// import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useForceUpdate from "../../util/useForceUpdate";
import { Guild, GuildChannel, ThreadChannel } from "fosscord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import { FaChevronDown, FaHashtag, FaVolumeUp } from "../../framework/radio";
import { Text } from "../../framework/Text";
import { Link, useHistory, useRouteMatch } from "../../util/Router";
import { useCache } from "../../util/useCache";
import "./sidebar.scss";
// @ts-ignore
import VoiceSVG from "../../assets/voice.png";
// @ts-ignore
import SpeakerSVG from "../../assets/speaker.png";
// @ts-ignore
import SettingsSVG from "../../assets/settings.png";
import Friends from "../friends/friends";
import client from "../../Client";

export interface Params {
  id: string;
  channel: string;
}

const SideBar = ({ guild }: { guild: Guild | any }) => {
  const forceUpdate = useForceUpdate();
  const { t } = useTranslation("translation");

  const history = useHistory();

  const data =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCache(guild?.channels)
      ?.array()
      .filter(
        (x: any) =>
          x.type === "GUILD_CATEGORY" ||
          guild.me?.permissionsIn(x).has("VIEW_CHANNEL")
      ) || [];

  if (guild === null) return <Friends></Friends>;

  // @ts-ignore
  globalThis.channels = guild?.channels?.cache?.array();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const match = useRouteMatch<Params>({
    path: "/channels/:id/:channel?",
    exact: false,
  });

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // let history = useHistory();
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (match?.params.channel === undefined) {
  //     history.push(
  //       `/channels/${guild.id}/${data.find((x) => x.type === "GUILD_TEXT").id}`
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [guild]);

  function renderChannels(d: (GuildChannel | ThreadChannel)[]) {
    return d.map((item) => (
      <>
        <div
          onClick={() => {
            if (item.type === "GUILD_VOICE") {
              const connection = joinVoiceChannel({
                channelId: item.id,
                guildId: item.guild.id,
                adapterCreator: item.guild.voiceAdapterCreator,
              });
              setTimeout(() => {
                connection.destroy();
              }, 5000);
            } else history.push(`/channels/${guild?.id}/${item?.id}`);
          }}
          style={{ textDecoration: "none" }}
          className={
            "item" + (match?.params.channel === item.id ? " active" : "")
          }
          key={item.id}
        >
          {item.type === "GUILD_TEXT" && <FaHashtag className="icon" />}
          {item.type === "GUILD_VOICE" && <FaVolumeUp className="icon" />}
          <Text className="channel-name">{item.name}</Text>
        </div>
        {item.type === "GUILD_VOICE" && (
          <div className="membersWrap voiceChannel">
            {item.members.map((x: any) => {
              return (
                <div className="member">
                  <div className="image">
                    <img src={x.user.avatarURL({ size: 1024 })} alt="" />
                  </div>
                  <div className="contentWrap">
                    <span className="name">{x.user.username}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    ));
  }

  //console.log(data);

  return (
    <div className="sidebar-channels">
      <div className="header">
        <Text className="guild-title">{guild?.name || "Server"}</Text>
      </div>
      <div className="container">
        <div className="scrolled-container">
          <div className="list">
            {/*  SCROLL BAR */}
            {/* check discord AGAIN */}
            {renderChannels(
              data
                .sort((a: any, b: any) =>
                  a.rawPosition > b.rawPosition ? 1 : -1
                )
                .sort((a: any, b: any) => (a.type === "GUILD_VOICE" ? 1 : -1))
                .sort((a: any, b: any) =>
                  a.rawPosition > b.rawPosition ? 1 : -1
                )
                .sort((a: any, b: any) =>
                  a.type === "GUILD_STAGE_VOICE" ? 1 : -1
                )
                .filter((x: any) => !x.parentId && x.type !== "GUILD_CATEGORY")
            )}

            {data
              .filter((x: any) => x.type === "GUILD_CATEGORY")
              .filter(
                (category: any) =>
                  data.find((x: any) => x.parentId === category.id) ||
                  guild.me?.permissionsIn(category).has("MANAGE_CHANNELS")
              )
              .map((item: any) => (
                <div key={item.id}>
                  <div
                    key={item.id}
                    className={"item category"}
                    onClick={() => {
                      const i = data.find((x: any) => x.id === item.id);
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
                  src={client.user?.avatarURL({ size: 1024 }) || ""}
                  alt=""
                />
                <span className="indicator online"></span>
              </div>
              <div className="contentWrap">
                <span className="name">{client.user?.username}</span>
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
