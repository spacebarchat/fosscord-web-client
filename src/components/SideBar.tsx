/* eslint-disable react-hooks/rules-of-hooks */
import { RootState, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
import "@fosscord/ui/scss/list.scss";
import "./SideBar.scss";
import { FriendList } from "./FriendList";
import { Network } from "../models/networks";
import store from "../util/store";
import { getMessages, sendMessages } from "../util/Messages";
import React, { FunctionComponent, useEffect, useState } from "react";
import i18n from "../util/i18n";
import { Button } from "../framework/Button";
import MenuLogo from "../assets/menu.svg";

export interface Params {
	id: string;
	channel: string;
}

export interface Channel {
	id: string;
	name: string;
	type: number;
}

const SideBar:FunctionComponent<{ activated?: boolean }> = ({ activated = true }) => {
	const [key, setKey] = useState<any>(Math.random());
	const guilds = useSelector((select: RootState) => select.guilds || []);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);
	const [active, setActive] = useState(activated);

	function activate() {
		if (active) {
			setActive(false);
		} else {
			setActive(true);
		}
	}

	if (guilds.length < 0) return <div></div>;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	if (match?.params.id === "@me") return <FriendList></FriendList>;

	const guild = guilds.find((i) => i.id === match?.params.id);

	const channelChange = (x: any) => {
		if (x.type === 0) history.push("/channels/" + match?.params.id + "/" + x.id);
	};

	console.log(guild);

	return (
		<div className="content">
			<Button primary className="menuButton" onClick={() => activate() }>
            	<img src={ MenuLogo } />
        	</Button>
			<div className="sidebar" style={{ display: (active ? "none" : "block") }}>
				<div className="container">
					<header>
						<h1 className="text headline">{guild?.name}</h1>
					</header>
					<div className="scrolled-container scrollbar">
						<div style={{ height: "16px" }}></div>
						<ul className="list">
							{guild?.channels.map((x: Channel) => (
								<li key={x.id} className="item" onClick={() => channelChange(x)}>
									{x.type === 0 && <i className="icon hashtag left"> </i>}
									{x.type === 2 && <i className="icon voice-chat left"> </i>}
									<div className="content">{x.name}</div>
									<i className="icon settings right visibleOnHover"> </i>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className="chatContent">
				<div className="scrolled-container scrollbar">
					<Messages message={key}></Messages>
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
							<a className="text default" style={{ color: "rgb(0, 69, 255)" }}>
								{x.author.username}
							</a>
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
