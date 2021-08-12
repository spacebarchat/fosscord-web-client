import React, { useEffect, useState } from "react";
import { Message } from "fosscord.js";
import FlatList from "flatlist-react";
// import { Text } from "../../framework/Text";
import { TextChannel } from "fosscord.js";
import Drawer from "../../components/Drawer";
import { toHTML } from "discord-markdown";
import { relativeTime } from "../../util/Time";
// import { network } from "../../models/networks";
import client from "../../Client";
// import { useCache } from "../../util/useCache";
import "../../framework/tooltip.scss";
import "@fosscord/ui/scss/embed.scss";
import "./messages.scss";
import { useCache } from "../../util/useCache";

export default function Messages({ match }: any) {
  let channel = client.channels.resolve(match.params.channel);
  let guild = client.guilds.resolve(match.params.guild);

  useCache(client.guilds);
  useCache(client.channels);

  return (
    <Drawer channel={channel} guild={guild}>
      <div className="chatContent">
        <div className="scrolled-container">
          <RenderMessages channel={channel as TextChannel}></RenderMessages>
        </div>
      </div>
    </Drawer>
  );
}

function RenderMessages({ channel }: { channel: TextChannel }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useCache(channel?.messages);

  useEffect(() => {
    channel?.messages?.fetch().then((msgs) => setMessages(msgs.array()));
  }, [channel, messages]);

  if (!channel) return <>Please select a channel first</>;
  if (channel?.type !== "GUILD_TEXT") return <>Wrong Channel type</>;

  console.log(messages);

  return (
    <FlatList
      list={messages}
      sortBy={[{ key: "createdTimestamp", descending: true }]}
      renderItem={renderMessage}
    ></FlatList>
  );
}

export function renderMessage(item: Message, index: number, seperators: any) {
  const { id, author, member } = item;
  const { username } = author;

  const content = toHTML(escapeHTML(item.content), {
    discordCallback: {
      user: (user: any) => `@${item.mentions.users.map((x) => x.username)}`,
      role: (role: any) =>
        `<span>@${item.mentions?.roles?.map((x) => x.name)}</span>`,
      channel: (role: any) =>
        `#${item.mentions?.channels?.map((x: any) => x.name)}`,
    },
    cssModuleNames: {
      "d-mention": "d-mention",
    },
  });

  return (
    <div key={id} className="message">
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
            style={{ color: member?.displayHexColor || "#000" }}
          >
            {username}
          </a>
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
              style={{ height: x.height / 3, width: x.width / 3 }}
              alt="Test"
              className="attachments"
              src={x.url}
            />
          ))}
        {item.reactions && (
          <div>
            {item.reactions.cache?.map((x: any) => {
              return (
                <div>
                  <button>
                    <span>{x.emoji.id ? x.emoji.id : x.emoji.name}</span>
                  </button>
                  <span>{x.count}</span>
                </div>
              );
            })}
          </div>
        )}
        {item.embeds &&
          item.embeds.map((embed: any) => {
            const {
              author,
              title,
              description,
              url,
              thumbnail,
              image,
              footer,
            } = embed;
            return (
              <div className="embed">
                <div className="embed-primary-container">
                  <div className="embed-secondary-container">
                    {author && (
                      <div className="embed-author">
                        <img
                          src={author.url}
                          className="embed-author-iconUrl"
                          alt=""
                        />
                        <span className="embed-author-name">{author}</span>
                      </div>
                    )}
                    {title && (
                      <span className="embed-title">
                        {url && (
                          <a href={url} className="text link">
                            {title}
                          </a>
                        )}
                        {!url && <span className="text link">{title}</span>}
                      </span>
                    )}
                    <span className="embed-description">{description}</span>
                  </div>
                  {thumbnail && (
                    <img
                      src={thumbnail.url}
                      className="embed-thumpnail"
                      alt=""
                    />
                  )}
                </div>
                {image && (
                  <img src={image.url} className="embed-image" alt="" />
                )}
                {footer && (
                  <div className="embed-footer">
                    {footer?.iconURL && (
                      <img
                        className="embed-footer-image"
                        src={footer?.iconURL}
                        alt=""
                      />
                    )}
                    <span className="embed-footer-text">{footer.text}</span>
                    {embed.timestamp && (
                      <span className="embed-timestamp">{embed.timestamp}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
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
