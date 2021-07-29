/* eslint-disable react-hooks/rules-of-hooks */
import { RootState, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { FriendList } from "./FriendList";
import { Network } from "../models/networks";
import store from "../util/store";
import { getMessages, sendMessages } from "../util/Messages";
import { useEffect, useState } from "react";
import { Modal } from "../framework/Modal";
import i18n from "../util/i18n";
import { Guild } from "../models/guilds";
import { Button } from "../framework/Button";
import "./SideBar.scss";
import "@fosscord/ui/scss/scrollbar.scss";
import FosscordLogo from "../assets/logo_big_transparent.png";
// import { Modal } from "../framework/Modal";
import AddServer from "./modals/AddServer/AddServer";
import { ContextMenu } from "../components/menu/ContextMenu";

export interface Params {
	id: string;
	channel: string;
}

export interface Channel {
	id: string;
	name: string;
	type: number;
}

const SideBar = () => {
	const [key, setKey] = useState<any>(Math.random());
	const [channel, setChannel] = useState<string>("");
	const [sidebar, setSidebar] = useState<boolean>(true);

	const guilds = useSelector((select: RootState) => select.guilds || []);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	if (guilds.length < 0) return <div></div>;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});
	const guild = guilds.find((i) => i.id === match?.params.id);

	useEffect(() => {
		if (guild) {
			let channel_name = guild.channels.find((i: any) => i.id === match?.params.channel)?.name;
			if (channel_name) setChannel(channel_name);
		}
	}, [match?.params.channel, guild]);

	const channelChange = (x: any) => {
		if (x.type === 0) history.push("/channels/" + match?.params.id + "/" + x.id);
	};

	return (
		<div className="content">
			<ContextMenu></ContextMenu>
			<div className={"sidebar" + (!sidebar ? " show" : "")}>
				<GuildBar></GuildBar>
				{(() => {
					switch (match?.params.id) {
						case "@me":
							return <FriendList></FriendList>;
						default:
							return (
								<div className="sidebar-channels">
									<div className="container">
										<header>
											<h1 className="text headline">{guild?.name}</h1>
										</header>
										<div className="scrolled-container scrollbar">
											<div style={{ height: "16px" }}></div>
											<ul className="list">
												{guild?.channels.map((x: Channel) => (
													<li
														key={x.id}
														className="item"
														onClick={() => channelChange(x)}
													>
														{x.type === 0 && (
															<i className="icon hashtag left"> </i>
														)}
														{x.type === 2 && (
															<i className="icon voice-chat left"> </i>
														)}
														<div className="content channel">{x.name}</div>
														<i className="icon settings right visibleOnHover">
															{" "}
														</i>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							);
					}
				})()}
			</div>

			<Button primary onClick={() => setSidebar(!sidebar)} className="menuBtn">
				Menu
			</Button>

			<div className={"pageContent" + (!sidebar ? " sidebar-enabled" : "")}>
				<div className="topbar">
					<div className="container">
						<header>
							<h1 className="text headline icon">
								<i className="icon hashtag left"> </i>
							</h1>
							<h1 className="text headline">{channel}</h1>
						</header>
					</div>
				</div>

				{match?.params.channel != null && (
					<div className="chatContent">
						<div className="scrolled-container scrollbar">
							<Messages message={key}>
								<p>loading</p>
							</Messages>
						</div>
						<input
							type="text"
							className="text secondary"
							placeholder="Message this channel"
							defaultValue=""
							onKeyPress={(event) => {
								if (event.key === "Enter" && match?.params.channel) {
									sendMessages(account, network, match?.params.channel, event);
									(event.target as HTMLInputElement).value = "";
									setKey(Math.random());
								}
							}}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export function getAcronym(str: string) {
	if (str)
		return str
			.replace(/'s /g, " ")
			.replace(/\w+/g, function (e) {
				return e[0];
			})
			.replace(/\s/g, "");
}

const GuildBar = () => {
	const guilds = useSelector((select: RootState) => select.guilds || []);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	const [modalIsOpen, setIsOpen] = useState<boolean>(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const navigateTo = (channel: string) => history.push("/channels/" + channel);

	return (
		<div className="guild-container">
			<div
				className={"guild " + (match?.params.id === "@me" ? "active" : "")}
				onClick={() => history.push("/channels/@me")}
			>
				<span className="pill"></span>
				<img src={FosscordLogo} className="img" alt="" />
			</div>
			<hr />
			{guilds.map((x: Guild) => (
				<div
					id={x.id}
					className={"guild " + (match?.params.id === x.id ? "active" : "")}
					key={x.id}
					onClick={() => {
						if (x.id) navigateTo(x.id.toString());
					}}
				>
					<span className="pill"></span>
					{x.icon ? (
						<img src={x.icon} alt="" className="img server" />
					) : (
						<span className="img server">{getAcronym(x.name)}</span>
					)}
				</div>
			))}
			<div className="guild new-server" onClick={openModal}>
				<span className="pill"></span>
				<span className="img">+</span>
			</div>

			<Modal className="server page" open={modalIsOpen} onClose={closeModal}>
				<AddServer></AddServer>
			</Modal>
		</div>
	);
};

const Messages = (message: any) => {
	const [messages, setMessages] = useState<any>(null);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	useEffect(() => {
		if (match?.params.channel) {
			getMessages(account, network, match?.params.channel).then((value: any) => {
				if (value.code) return;
				else {
					setMessages(value);
				}
			});
		}
	}, [message]);

	const formatter = new Intl.RelativeTimeFormat(i18n.language, {
		numeric: "auto",
	});

	const DIVISIONS: any = [
		{ amount: 60, name: "seconds" },
		{ amount: 60, name: "minutes" },
		{ amount: 24, name: "hours" },
		{ amount: 7, name: "days" },
		{ amount: 4.34524, name: "weeks" },
		{ amount: 12, name: "months" },
		{ amount: Number.POSITIVE_INFINITY, name: "years" },
	];

	function formatTimeAgo(date: any) {
		let duration = (date - +new Date()) / 1000;

		for (let i = 0; i <= DIVISIONS.length; i++) {
			const division = DIVISIONS[i];
			if (Math.abs(duration) < division.amount) {
				return formatter.format(Math.round(duration), division.name);
			}
			duration /= division.amount;
		}
	}

	if (!match?.params.channel || !messages) return <div></div>;

	return (
		<div>
			{messages?.map((x: any) => (
				<div key={x.id} className="message">
					<img
						src={network.cdn + "/avatars/" + x.author.id + "/" + x.author.avatar + ".png"}
						alt=""
					/>
					<div className="contentMessage">
						<div className="messageHeader">
							<button className="text default" style={{ color: "rgb(0, 69, 255)" }}>
								{x.author.username}
							</button>
							<span className="text muted">
								{" "}
								{formatTimeAgo(new Date(x.created_at).setMonth(+new Date().getMonth()))}
							</span>
						</div>
						<span className="text secondary">{x.content}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default SideBar;
