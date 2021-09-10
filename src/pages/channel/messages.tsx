import React, { useEffect, useState } from "react";
import { Message, TextChannel } from "fosscord.js";
import FlatList from "flatlist-react";
import { Button } from "../../framework/Button";
import Drawer from "../../components/Drawer";
import { toHTML } from "discord-markdown";
import { relativeTime } from "../../util/Time";
// import { network } from "../../models/networks";
import client from "../../Client";
// import { useCache } from "../../util/useCache";
import "../../framework/tooltip.scss";
import "@fosscord/ui/scss/embed.scss";
import "@fosscord/ui/scss/indicators.scss";
import "./messages.scss";
import { useCache } from "../../util/useCache";

export default function Messages({ match }: any) {
  //let channel = client.channels.resolve(match.params.channel);
  let channel = client.channels.cache.get(match.params.channel);
  let guild = client.guilds.resolve(match.params.guild);

  useCache(client.guilds);
  useCache(client.channels);

  //console.log(channel);

  return (
    <Drawer channel={channel} guild={guild}>
      {guild && (
        <div className="channelContent">
          <div className="header">
            <span className="typeChannel">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                className="StyledIconBase-ea9ulj-0 cKCFNq sc-jrAGrp hLLxCf"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                ></path>
              </svg>
            </span>
            <h1 className="text headline">{(channel as TextChannel)?.name}</h1>
            {(channel as TextChannel)?.topic && (
              <>
                <div className="separator"></div>
                <span className="description">
                  {(channel as TextChannel)?.topic}
                </span>
              </>
            )}
          </div>
          <div className="contentWrap">
            <div className="chatContent">
              <div className="scrolled-container scrollbar chat">
                <div className="scrollerSpacer"></div>
                <RenderMessages
                  channel={channel as TextChannel}
                ></RenderMessages>
              </div>
              <div className="inputMessage">
                <div className="buttonOption">
                  <Button>➕</Button>
                </div>
                <input
                  type="text"
                  className="text secondary"
                  placeholder={`Message #${(channel as TextChannel)?.name}`}
                  onKeyDown={(e: any) => {
                    if (e.which === 13) {
                      e.preventDefault();
                      if (!channel) return;
                      (channel as TextChannel).send(e.target.value);
                      e.target.value = "";
                      return false;
                    }
                  }}
                />
              </div>
            </div>
            <div className="membersWrap right">
              {guild?.roles?.cache
                .sort((a: any, b: any) =>
                  a.rawPosition < b.rawPosition ? 1 : -1
                )
                .filter((x: any) => x.hoist === true)
                .map((role: any) => {
                  if (
                    role.members
                      .array()
                      .filter(
                        (x: any) =>
                          x.presence?.status !== undefined &&
                          x.roles.cache
                            .array()
                            .filter((x: any) => x.hoist === true)[0].id ===
                            role.id
                      ).length === 0
                  )
                    return <></>;

                  return (
                    <>
                      <h2 className="membersGroup">
                        <span aria-hidden="true">
                          {role.name} -{" "}
                          {
                            role.members
                              .array()
                              .filter(
                                (x: any) =>
                                  x.presence?.status !== undefined &&
                                  x.roles.cache
                                    .array()
                                    .filter((x: any) => x.hoist === true)[0]
                                    .id === role.id
                              ).length
                          }
                        </span>
                      </h2>
                      {role.members.map((member: any) => {
                        if (
                          member.presence?.status === "offline" ||
                          !member.presence ||
                          member.roles.cache
                            .array()
                            .filter((x: any) => x.hoist === true)[0].id !==
                            role.id
                        )
                          return <></>;

                        return (
                          <div key={member.id} className="member">
                            <div className="image">
                              <img
                                src={member.user.displayAvatarURL({
                                  size: 64,
                                })}
                                alt=""
                              />
                              <span
                                className={
                                  "indicator " +
                                  (member.presence?.status === "online"
                                    ? "online"
                                    : "") +
                                  (member.presence?.status === "dnd"
                                    ? "dnd"
                                    : "") +
                                  (member.presence?.status === "idle"
                                    ? "afk"
                                    : "")
                                }
                              ></span>
                            </div>
                            <div className="contentWrap">
                              <span
                                className="name"
                                style={{
                                  color: `${
                                    member.roles.cache.array()?.length > 1
                                      ? member.displayColor !== 0
                                        ? member.displayHexColor
                                        : "#8e9297"
                                      : "#8e9297"
                                  }`,
                                }}
                              >
                                {member.user.username}
                                {member.user.bot ? (
                                  <span className="bot">BOT</span>
                                ) : null}
                              </span>
                              <span className="description">
                                {member.presence?.activities[0]?.type ===
                                  "PLAYING" && <>Playing </>}

                                {member.presence?.activities[0]?.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
              <h2 className="membersGroup">
                <span aria-hidden="true">
                  OFFLINE -&nbsp;
                  {
                    guild?.members?.cache
                      .array()
                      .filter((x: any) => x.presence?.status === undefined)
                      .length
                  }
                </span>
              </h2>
              {guild.members?.cache
                .sort(function (a: any, b: any) {
                  if (
                    (!a.nickname &&
                      !b.nickname &&
                      a.user.username.toLowerCase() <
                        b.user.username.toLowerCase()) ||
                    (a.nickname &&
                      !b.nickname &&
                      a.nickname.toLowerCase() <
                        b.user.username.toLowerCase()) ||
                    (!a.nickname &&
                      b.nickname &&
                      a.user.username.toLowerCase() <
                        b.nickname.toLowerCase()) ||
                    (a.nickname &&
                      b.nickname &&
                      a.nickname.toLowerCase() < b.nickname.toLowerCase())
                  ) {
                    return -1;
                  } else return 1;
                })
                .map((member: any) => {
                  if (member.presence?.status !== undefined) return <></>;
                  return (
                    <div key={member.id} className="member offline">
                      <div className="image">
                        <img
                          src={member.user.displayAvatarURL({
                            size: 64,
                          })}
                          alt=""
                        />
                        <span className={"indicator offline"}></span>
                      </div>
                      <div className="contentWrap">
                        <span
                          className="name"
                          style={{
                            color: `${
                              member.roles.cache.array()?.length > 1
                                ? member.displayColor !== 0
                                  ? member.displayHexColor
                                  : "#8e9297"
                                : "#8e9297"
                            }`,
                          }}
                        >
                          {member.nickname || member.user.username}
                          {member.user.bot ? (
                            <span className="bot">BOT</span>
                          ) : null}
                        </span>
                        <span className="description"></span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
}

function RenderMessages({ channel }: { channel: TextChannel }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useCache(channel?.messages);

  useEffect(() => {
    channel?.messages?.fetch().then((msgs: any) => setMessages(msgs.array()));
  }, [channel, messages]);

  if (!channel) return <>Please select a channel first</>;
  if (channel?.type !== "GUILD_TEXT") return <>Wrong Channel type</>;

  //console.log(messages);

  return (
    <FlatList
      list={messages}
      sortBy={[{ key: "createdAt", descending: true }]}
      renderItem={renderMessage}
      renderWhenEmpty={() => <></>}
    ></FlatList>
  );
}

export function renderMessage(item: Message, index: number, seperators: any) {
  const { id, author, member } = item;
  const { username } = author;

  function hexToRgb(hex: any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? "" +
          parseInt(result[1], 16) +
          "," +
          parseInt(result[2], 16) +
          "," +
          parseInt(result[3], 16)
      : null;
  }

  let me = false;

  const content = toHTML(escapeHTML(item.content), {
    discordCallback: {
      //user: (user: any) => `@${item.mentions.users.map((x) => x.username)}`,
      user: (user: any) => {
        if (
          item.guild?.members.cache.get(user.id)?.displayName ===
          client.user?.username
        ) {
          me = true;
          return (
            "<span class='mentioned-me'>@" +
            item.guild?.members.cache.get(user.id)?.displayName +
            "</span>"
          );
        } else {
          me = false;
          return (
            "<span>@" +
            item.guild?.members.cache.get(user.id)?.displayName +
            "</span>"
          );
        }
      },
      role: (role: any) => {
        if (
          item.guild !== null &&
          client.guilds.cache.get(item.guild?.id)?.roles.cache.get(role.id)
        )
          me = true;
        else me = false;
        return `<span style='background-color: ${
          item.guild?.roles.cache.get(role.id)?.color !== 0
            ? `rgba(${hexToRgb(
                item.guild?.roles.cache.get(role.id)?.hexColor
              )},0.1)`
            : "hsla(235,calc(var(--saturation-factor, 1)*85.6%),64.7%,0.3)"
        }; color: ${
          item.guild?.roles.cache.get(role.id)?.color !== 0
            ? item.guild?.roles.cache.get(role.id)?.hexColor
            : "hsl(236,calc(var(--saturation-factor, 1)*83.3%),92.9%)"
        }'>@${item.guild?.roles.cache.get(role.id)?.name}</span>`;
      },
      channel: (channel: any) =>
        `<span>#${item.guild?.channels.cache.get(channel.id)?.name}</span>`,
      everyone: () => "<span>@everyone</span>",
      here: () => "<span>@here</span>",
    },
    cssModuleNames: {
      "d-mention": "d-mention",
    },
  });

  return (
    <div key={id} className={"message " + (me ? "mentioned-me" : "")}>
      <img
        src={item?.author?.avatarURL({ size: 1024 })?.toString()}
        className="avatar"
        alt=""
      />
      <div className="contentMessage">
        <div className="messageHeader">
          <a
            href="/"
            className="text default"
            style={{
              color:
                member?.displayHexColor === "#000000"
                  ? "#ffffff"
                  : member?.displayHexColor,
            }}
          >
            {username}
          </a>
          {item.author.bot ? <span className="bot">BOT</span> : null}
          <span className="text muted">{relativeTime(item.createdAt)}</span>
        </div>
        <span
          className="text secondary"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        ></span>
        <span className="text secondary">
          {item.embeds && item.embeds.map((x: any) => <></>)}
        </span>

        {item.attachments &&
          item.attachments.map((x: any) => (
            <img
              key={x.id}
              style={{ height: x.height, width: x.width }}
              alt="Test"
              className="attachments"
              src={x.url}
            />
          ))}
        {item.reactions && (
          <div className="emojis">
            {item.reactions.cache?.map((x: any) => {
              return (
                <div key={x.id} className="emoji">
                  <button>
                    <span>
                      {x.emoji.id ? (
                        x.emoji.animated ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: toHTML(
                                escapeHTML(
                                  "<a:" + x.emoji.name + ":" + x.emoji.id + ">"
                                )
                              ),
                            }}
                          ></span>
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: toHTML(
                                escapeHTML(
                                  "<:" + x.emoji.name + ":" + x.emoji.id + ">"
                                )
                              ),
                            }}
                          ></span>
                        )
                      ) : (
                        x.emoji.name
                      )}{" "}
                      {x.count}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {/* {item.embeds &&
          item.embeds.map((embed: any) => {
            return (
              <div key={embed.id} className="embed">
                <div className="embed-primary-container">
                  <div className="embed-secondary-container">
                    {embed.author && (
                      <div className="embed-author">
                        <img
                          src={embed.author.url}
                          className="embed-author-iconUrl"
                          alt=""
                        />
                        <span className="embed-author-name">
                          {embed.author}
                        </span>
                      </div>
                    )}
                    {embed.title && (
                      <span className="embed-title">
                        {embed.url && (
                          <a href={embed.url} className="text link">
                            {embed.title}
                          </a>
                        )}
                        {!embed.url && (
                          <span className="text link">{embed.title}</span>
                        )}
                      </span>
                    )}
                    <span className="embed-description">
                      {embed.description}
                    </span>
                  </div>
                  {embed.thumbnail && (
                    <img
                      src={embed.thumbnail.url}
                      className="embed-thumpnail"
                      alt=""
                    />
                  )}
                </div>
                {embed.image && (
                  <img src={embed.image.url} className="embed-image" alt="" />
                )}
                {embed.footer && (
                  <div className="embed-footer">
                    {embed.footer?.iconURL && (
                      <img
                        className="embed-footer-image"
                        src={embed.footer?.iconURL}
                        alt=""
                      />
                    )}
                    <span className="embed-footer-text">
                      {embed.footer.text}
                    </span>
                    {embed.timestamp && (
                      <span className="embed-timestamp">{embed.timestamp}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })} */}
      </div>
    </div>
  );
}

const escapeHTML = (text: string) => {
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  return text;
};
