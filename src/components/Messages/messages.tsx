import { useEffect, useState } from "react";
import { RootState, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { useTranslation } from "react-i18next";
import FlatList from "flatlist-react";
//MODELS / UTILS
import { Network } from "../../models/networks";
import store from "../../util/store";
import { relativeTime } from "../../util/Time";
import { getMessages } from "../../util/Messages";

export interface Params {
	id: string;
	channel: string;
}

export interface Channel {
	id: string;
	name: string;
	type: number;
}

export const Messages = (message: any) => {
	const { t } = useTranslation("translation");
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
	}, [account, match?.params.channel, message, network]);

	if (!match?.params.channel || !messages) return <div></div>;

	return (
		<FlatList
			list={messages}
			keyExtractor={(item: any) => item.id}
			renderWhenEmpty={() => <p className="empty">{t("emptyMessages")}</p>}
			sortBy={[{ key: "timestamp", descending: true }]}
			renderItem={renderMessage}
		></FlatList>
	);
};

export function renderMessage(item: any, index: any) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { t } = useTranslation("translation");
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	if (!item || item === 404 || item === "Error: Not found") return;

	return (
		<div key={item.id} className="message">
			<img
				src={network.cdn + "/avatars/" + item.author.id + "/" + item.author.avatar + ".png"}
				alt=""
			/>
			<div className="contentMessage">
				<div className="messageHeader">
					<button className="text default" style={{ color: "rgb(0, 69, 255)" }}>
						{item.author.username}
					</button>
					<span className="text muted"> {relativeTime(item.timestamp)}</span>
				</div>
				<span className="text secondary">{item.content && item.content}</span>
				<span className="text secondary">{item.embeds && item.embeds.map((x: any) => <></>)}</span>

				{item.attachments &&
					item.attachments.map((x: any) => (
						<img style={{ height: x.height / 3, width: x.width / 3 }} alt="Test" src={x.url} />
					))}
				{item.reactions && (
					<div>
						{item.reactions.map((x: any) => {
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
						return (
							<div>
								<div>{embed.title}</div>
								<span>{embed.description}</span>
							</div>
						);
					})}
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
	);
}
