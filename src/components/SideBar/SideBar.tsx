/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { RootState, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { useTranslation } from "react-i18next";
import FlatList from "flatlist-react";
// UTILS / FRAMEWORK
import store from "../../util/store";
import { sendMessages } from "../../util/Messages";
import { LittleModal } from "../../framework/LittleModal";
import { Button } from "../../framework/Button";
import { FaChevronDown } from "../../framework/radio";
// MODELS
import { Network } from "../../models/networks";
// COMPONENTS
import { FriendList } from "../FriendList/FriendList";
import { ContextMenu } from "../Menu/ContextMenu";
import CreateChannel from "../Modals/CreateChannel/CreateChannel";
import GuildBar from "../GuildBar/GuildBar";
import { Messages } from "../Messages/messages";
// IMPORT IMAGES
import VoiceSVG from "../../assets/voice.png";
import SpeakerSVG from "../../assets/speaker.png";
import SettingsSVG from "../../assets/settings.png";
// IMPORTS CSS
import "@fosscord/ui/scss/scrollbar.scss";
import "@fosscord/ui/scss/indicators.scss";
import "../../framework/tooltip.scss";
import "./SideBar.scss";

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
	const [data, setData] = useState<any>();
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
	const user: any = useSelector((select: RootState) => select.users || [])[0];
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	if (guilds.length < 0) return <div></div>;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	// eslint-disable-next-line array-callback-return
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
	}, [match?.params.channel]);

	useEffect(() => {
		if (guild) {setData(guild?.channels)} else {setData({})};
	}, [match?.params.channel, guild, guild?.channels]);

	if (data === undefined) {
		if (guild) setData(guild?.channels);
	}

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
											<div className="scrolled-container scrollbar channels">
												<div style={{ height: "16px" }}></div>
												{!typeof data === undefined && (
													<div className="list">
														<div>
															{renderChannels(
																data.filter(
																	(x: any) => !x.parent_id && x.type !== 4
																)
															)}

															<FlatList
																bounces={false}
																list={data.filter((x: any) => x.type === 4)}
																renderWhenEmpty={() => <span></span>}
																renderItem={(item: any) =>
																	item && (
																		<div key={item.id}>
																			<div
																				id={item.id}
																				className={"item category"}
																				onClick={() => {
																					const d = [...data];
																					const i = d.find(
																						(x) =>
																							x.id === item.id
																					);
																					i.collapsed =
																						!i.collapsed;
																					setData(d);
																				}}
																			>
																				<FaChevronDown
																					style={{
																						transform:
																							item.collapsed
																								? "rotate(-90deg)"
																								: "rotate(0deg)",
																					}}
																				/>
																				<span>
																					{item.name.toUpperCase()}
																				</span>
																				<i
																					onClick={() =>
																						openModal(
																							"createChannel",
																							item.id
																						)
																					}
																					className="icon plus right"
																				>
																					{" "}
																				</i>
																			</div>
																			{!item.collapsed &&
																				renderChannels(
																					data.filter(
																						(x: any) =>
																							x.parent_id ===
																							item.id
																					),
																					{
																						id:
																							"category" +
																							item.id,
																					}
																				)}
																		</div>
																	)
																}
																keyExtractor={(item: any) => item.id}
															/>
														</div>
													</div>
												) && console.log(data)}
											</div>
											<div className="settingsBar">
												<div className="member">
													<div className="image">
														<img
															src={
																network.cdn +
																"/avatars/" +
																user.id +
																"/" +
																user.avatar +
																".png"
															}
															alt=""
														/>
														<span className="indicator online"></span>
													</div>
													<div className="contentWrap">
														<span className="name">{user.username}</span>
														{/* <span className="description">Test Game playing</span> */}
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
						{match?.params.id !== "@me" && (
							<header>
								<h1 className="text headline icon">
									<i className="icon hashtag left"> </i>
								</h1>
								<h1 className="text headline">{channel}</h1>
							</header>
						)}
					</div>
				</div>

				{match?.params.channel != null && (
					<div className="contentWrap">
						<div className="chatContent">
							<div className="scrolled-container scrollbar chat">
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
					</div>
				)}
			</div>

			{match?.params.id !== "@me" && (
				<div className="membersWrap right">
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
			)}
		</div>
	);
};
export function renderChannels(d: Array<Object>, props?: any) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	const channelChange = (x: any) => {
		if (x.type === 0) history.push("/channels/" + match?.params.id + "/" + x.id);
	};

	return (
		<FlatList
			list={d}
			renderWhenEmpty={() => <span></span>}
			renderItem={(item: any) => (
				<div
					id={item.id}
					key={item.id}
					className={"item" + (match?.params.channel === item.id ? " active" : "")}
					onClick={() => channelChange(item)}
				>
					{item.type === 0 ? <i className="icon hashtag left"> </i> : null}
					{item.type === 2 ? <i className="icon voice-chat left"> </i> : null}
					<span>{item.name}</span>
					<i className="icon settings right visibleOnHover"> </i>
				</div>
			)}
			keyExtractor={(item: any) => item.id}
			{...props}
		/>
	);
}

export function getAcronym(str: string) {
	if (str)
		return str
			.replace(/'s /g, " ")
			.replace(/\w+/g, function (e) {
				return e[0];
			})
			.replace(/\s/g, "");
}

export default SideBar;
