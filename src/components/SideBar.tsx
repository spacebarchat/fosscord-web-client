/* eslint-disable react-hooks/rules-of-hooks */
import { RootState, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { FriendList } from "./FriendList";
import { Network } from "../models/networks";
import store from "../util/store";
import { getMessages, sendMessages } from "../util/Messages";
import { useEffect, useState } from "react";
import { LittleModal } from "../framework/LittleModal";
import i18n from "../util/i18n";
import { useTranslation } from "react-i18next";
import { Guild } from "../models/guilds";
import { Button } from "../framework/Button";
import { Spinner } from "../framework/Spinner";
import "./SideBar.scss";
import "@fosscord/ui/scss/scrollbar.scss";
import "@fosscord/ui/scss/indicators.scss";
import "../framework/tooltip.scss";
import FosscordLogo from "../assets/logo_big_transparent.png";

import VoiceSVG from "../assets/voice.png";
import SpeakerSVG from "../assets/speaker.png";
import SettingsSVG from "../assets/settings.png";

import AddServer from "./modals/AddServer/AddServer";
import { ContextMenu } from "../components/menu/ContextMenu";
import CreateChannel from "./modals/CreateChannel/CreateChannel";

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
	const { t } = useTranslation("translation");
	const [key, setKey] = useState<any>(Math.random());
	const [channel, setChannel] = useState<string>("");
	const [sidebar, setSidebar] = useState<boolean>(true);
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [modal, setModal] = useState({
		modal: "",
		category_id: "",
	});

	var guilds = useSelector((select: RootState) => select.guilds || []);
	guilds = guilds.filter(function (el) {
		return el != null;
	});
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

	const guild = guilds.find((i) => {
		if (i != null && i.id === match?.params.id) return i;
	});

	let channel_name;
	channel_name = guild?.channels.find((i: any) => i.id === match?.params.channel)?.name;

	useEffect(() => {
		if (guild) {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			channel_name = guild.channels.find((i: any) => i.id === match?.params.channel)?.name;
			if (channel_name) setChannel(channel_name);
		}
	}, [match?.params.channel, guild]);

	const channelChange = (x: any) => {
		if (x.type === 0) history.push("/channels/" + match?.params.id + "/" + x.id);
	};

	function openModal(modal: string, category_id: string) {
		setModal({ modal, category_id });
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

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
								<>
									<div className="sidebar-channels">
										<div className="container">
											<header>
												<h1 className="text headline">{guild?.name}</h1>
											</header>
											{/* TODO: dropdown for server related actions */}
											<div className="scrolled-container scrollbar">
												<div style={{ height: "16px" }}></div>
												<ul className="list">
													{guild?.channels
														.sort((a, b) => (a.type > b.type ? 1 : -1))
														.map((x: Channel) => (
															<li
																id={x.id}
																key={x.id}
																className={
																	"item" +
																	(match?.params.channel === x.id
																		? " active"
																		: "") +
																	(x.type === 4 ? " category" : "")
																}
																onClick={() => channelChange(x)}
															>
																{x.type === 0 && (
																	<i className="icon hashtag left"> </i>
																)}
																{x.type === 2 && (
																	<i className="icon voice-chat left"> </i>
																)}
																{x.type === 4 && (
																	<i className="icon arrow-down left"> </i>
																)}
																<div className="content channel">
																	{x.name}
																</div>
																{x.type !== 4 && (
																	<i className="icon settings right visibleOnHover">
																		{" "}
																	</i>
																)}
																{x.type === 4 && (
																	<i
																		onClick={() =>
																			openModal("createChannel", x.id)
																		}
																		className="icon plus right"
																	>
																		{" "}
																	</i>
																)}
															</li>
														))}
												</ul>
											</div>
											<div className="settingsBar">
												<div className="member">
													<div className="image">
														<img
															src="https://ui.fosscord.com/test/assets/avatar_xnacly.jpg"
															alt=""
														/>
														<span className="indicator online"></span>
													</div>
													<div className="contentWrap">
														<span className="name">MasterKiller</span>
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
													<div className="tooltip-text blue top">
														{t("userSettings")}
													</div>
												</div>
											</div>
										</div>
									</div>
									<LittleModal
										className="server page"
										open={modalIsOpen}
										onClose={closeModal}
									>
										{modal.modal === "createChannel" && (
											<CreateChannel
												close={() => closeModal()}
												category_id={modal.category_id}
											></CreateChannel>
										)}
									</LittleModal>
								</>
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
					<div className="contentWrap">
						<div className="chatContent">
							<div className="scrolled-container scrollbar">
								<Messages message={key}></Messages>
							</div>
							<input
								type="text"
								className="text secondary"
								placeholder={t("sendMessage") + " #" + channel_name}
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
						<div className="membersWrap">
							<h2 className="membersGroup" aria-label="👑Founders👑, 3 members">
								<span aria-hidden="true">👑Founders👑 — 3</span>
							</h2>
							<div className="member">
								<div className="image">
									<img src="https://ui.fosscord.com/test/assets/avatar_xnacly.jpg" alt="" />
									<span className="indicator online"></span>
								</div>
								<div className="contentWrap">
									<span className="name">MasterKiller</span>
									<span className="description">Test Game playing</span>
								</div>
							</div>
						</div>
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
	const { t } = useTranslation("translation");
	var guilds = useSelector((select: RootState) => select.guilds || []);
	guilds = guilds.filter(function (el) {
		return el != null;
	});

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
				className={"guild home" + (match?.params.id === "@me" ? " active" : "")}
				title={t("home")}
				onClick={() => history.push("/channels/@me")}
			>
				<span className="pill"></span>
				<img src={FosscordLogo} className="img" alt="" />
			</div>
			<hr />
			{guilds.map((x: Guild) => (
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
						<img src={x.icon} alt="" className="img server" />
					) : (
						<span className="img server">{getAcronym(x.name)}</span>
					)}
				</div>
			))}
			<div className="guild new-guild" title={t("add") + " " + t("guild")} onClick={openModal}>
				<span className="pill"></span>
				<span className="img">
					<span>+</span>
				</span>
			</div>

			<LittleModal className="server page" open={modalIsOpen} onClose={closeModal}>
				<AddServer close={() => closeModal()}></AddServer>
			</LittleModal>
		</div>
	);
};

const Messages = (message: any) => {
	const { t } = useTranslation("translation");
	const [messages, setMessages] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	useEffect(() => {
		setLoading(true);
		if (match?.params.channel) {
			getMessages(account, network, match?.params.channel).then((value: any) => {
				if (value.code) return;
				else {
					setMessages(value);
				}
			});
		}
		setLoading(false);
	}, [account, match?.params.channel, message, network]);

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
			<Spinner style={loading ? {} : { display: "none" }}></Spinner>
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

					<div className="messageOptions">
						<div className="tooltip">
							<div className="buttonOption">
								<i className="icon react left"> </i>
							</div>
							<div className="tooltip-text blue left">{t("addReaction")}</div>
						</div>
						<div className="tooltip">
							<div className="buttonOption">
								<i className="icon edit left"> </i>
							</div>
							<div className="tooltip-text blue top">{t("edit")}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SideBar;
