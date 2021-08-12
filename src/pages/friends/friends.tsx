import React from "react";
import FlatList from "flatlist-react";
//import client from "../../Client";
//import { useCache } from "../../util/useCache";
import "@fosscord/ui/scss/input-fields.scss";
import "./friends.scss";
import { useTranslation } from "react-i18next";

const Friends = () => {
  const { t } = useTranslation("translation");

  //const friends = useCache(client.friends).array();

  return (
    <div className="side-friendList">
      <div className="container-friends">
        <header>
          <button className="searchBar" title={t("friendsSearchPlaceholder")}>
            {t("friendsSearchPlaceholder")}
          </button>
        </header>
        <div className="scrolled-container-friendList scrollbar">
          <div style={{ height: "8px" }}></div>
          <ul className="list">
            <li className={"item"}>
              <i className="icon settings left"></i>
              <div className="content">{t("friends")}</div>
            </li>
          </ul>
          <div className="friendsList">
            <div className="privateChannelsHeader">
              <span>
                Direct Messages<i className="icon plus right"> </i>
              </span>
            </div>
            <FriendsRender></FriendsRender>
          </div>
        </div>
      </div>
    </div>
  );
};

const FriendsRender = () => {
  const data = [
    {
      bot: false,
      id: "832289478419808318",
      username: "docktor sus",
      avatar:
        "https://images.lindependant.fr/api/v1/images/view/5a96c2538fe56f2ad026226b/large/image.jpg",
      discriminator: "0000",
    },
    {
      bot: false,
      id: "223533056852623360",
      username: "MasterKiller",
      avatar:
        "https://cdn.discordapp.com/avatars/223533056852623360/deb08682e310377aedffa3c99b72d370.webp?size=128",
      discriminator: "0000",
    },
  ];

  return (
    <FlatList
      bounces={false}
      style={{
        flexGrow: 0,
      }}
      list={data}
      renderItem={(item: any) => (
        <div key={item.id} className={"member"}>
          <div className="image">
            <img src={item.avatar} alt="" />
            <span className="indicator online"></span>
          </div>
          <div className="contentWrap">
            <span className="name">{item.username}</span>
            <span className="description">Test Game playing</span>
          </div>
          <i className="icon settings right visibleOnHover"> </i>
        </div>
      )}
      keyExtractor={(item: any) => item.id}
    />
  );
};

export default Friends;
