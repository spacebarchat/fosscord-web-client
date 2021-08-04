import { RootState, useSelector } from "react-redux";
import "@fosscord/ui/scss/input-fields.scss";
import { useTranslation } from "react-i18next";
import "./FriendList.scss";
import "../SideBar/SideBar.scss";
import { useHistory, useRouteMatch } from "react-router";
import FlatList from "flatlist-react";

export const FriendList = () => {
	const { t } = useTranslation("translation");
	const guilds = useSelector((select: RootState) => select.guilds || []);

	if (guilds.length < 0) return <div></div>;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<any>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	return (
		<div className="sidebar friendList">
			<div className="container-friends">
				<header>
					<button className="searchBar" title={t("friendsSearchPlaceholder")}>
						{t("friendsSearchPlaceholder")}
					</button>
				</header>
				<div className="scrolled-container-friendList scrollbar">
					<div style={{ height: "8px" }}></div>
					<ul className="list">
						<li className={"item" + (match?.params.id === "@me" ? " active" : "")}>
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
						<Friends></Friends>
					</div>
				</div>
			</div>
		</div>
	);
};

const Friends = () => {
	const data = [
		{
			bot: false,
			id: "832289478419808318",
			username: "docktor sus",
			avatar: "https://images.lindependant.fr/api/v1/images/view/5a96c2538fe56f2ad026226b/large/image.jpg",
			discriminator: "0000",
		},
		{
			bot: false,
			id: "223533056852623360",
			username: "MasterKiller",
			avatar: "https://cdn.discordapp.com/avatars/223533056852623360/deb08682e310377aedffa3c99b72d370.webp?size=128",
			discriminator: "0000",
		},
	];

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<any>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	const channelChange = (x: any) => {
		history.push("/channels/" + match?.params.id + "/" + x.id);
	};

	return (
		<FlatList
			bounces={false}
			style={{
				flexGrow: 0,
			}}
			list={data}
			renderItem={(item: any) => (
				<div
					key={item.id}
					className={"member" + (match?.params.channel === item.id ? " active" : "")}
					onClick={() => channelChange(item)}
				>
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
