import { RootState, useSelector } from "react-redux";
import { Input } from "../../../framework/Input";
import "./CreateChannel.scss";
import { Text } from "../../../framework/Text";
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../framework/Button";
import { Radio, ChannelSVG, VoiceSVG } from "../../../framework/radio.js";
import "../../../pages/general.scss";

import "missing-native-js-functions";
import { PlainTextError } from "../../../util/FormError";
import { Network } from "../../../models/networks";
import store from "../../../util/store";
import { request } from "../../../util/request";
import { useRouteMatch } from "react-router";
import "@fosscord/ui/scss/radio.scss";

export interface Params {
	id: string;
	channel: string;
}

export const CreateChannel = (props: any) => {
	const { t } = useTranslation("translation");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState<any>(null);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	var country = document.getElementById("innerFill");
	country?.setAttribute("style", "fill: blue; stroke: black");

	async function submit(event: FormEvent) {
		event.preventDefault();

		setLoading(true);

		var type = (document.querySelector(".active")?.id || "") === "voiceChannel" ? 2 : 0;
		let parent_id = undefined;

		if (props.category_id) parent_id = props.category_id;

		var { error } = await request(`/guilds/${match?.params.id}/channels`, {
			network,
			body: {
				name: name,
				type: type,
				parent_id,
			},
			headers: {
				Authorization: `${account.token}`,
			},
		});

		setLoading(false);
		setErr(error);
		if (error) return;

		store.dispatch({
			type: "CHANNEL_CREATE",
			payload: 0,
		});

		props.close?.();

		return;
	}

	const [icon, setIcon] = useState<any>(<ChannelSVG></ChannelSVG>);

	function toggle(id: any) {
		document.querySelector(".active")?.classList.remove("active");
		const radiobtn = document.querySelector(`#${id}`)?.classList;
		radiobtn?.contains("active") ? radiobtn?.remove("active") : radiobtn?.add("active");
		setIcon(
			(document.querySelector(".active")?.id || "") === "voiceChannel" ? (
				<VoiceSVG></VoiceSVG>
			) : (
				<ChannelSVG></ChannelSVG>
			)
		);
	}

	return (
		<>
			<Text headline={true} className="titleModal">
				{t("createChannel")}
			</Text>
			<div
				className="page channel"
				onSubmit={(e) => {
					e.preventDefault();
					submit(e);
				}}
			>
				<form>
					<div className="form">
						<span id="textChannel" onClick={() => toggle("textChannel")} className="radio">
							<Radio></Radio>
							<div className="radio-content">
								<ChannelSVG></ChannelSVG>
								<div className="radio-info">
									<span className="name">{t("textChannel")}</span>
									<span className="description">{t("textChannelDesc")}</span>
								</div>
							</div>
						</span>
						<span id="voiceChannel" onClick={() => toggle("voiceChannel")} className="radio">
							<Radio></Radio>
							<div className="radio-content">
								<VoiceSVG></VoiceSVG>
								<div className="radio-info">
									<span className="name">{t("voiceChannel")}</span>
									<span className="description">{t("voiceChannelDesc")}</span>
								</div>
							</div>
						</span>
						<div className="inputWrapper channel">
							{icon}
							<Input
								maxLength={100}
								placeholder="new-channel"
								onChange={(e) => setName(e.target.value)}
								name=""
								type="text"
								value={name}
							/>
						</div>
						<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>
						<Text muted={true} className="little">
							{t("addServerNotice")}
						</Text>
					</div>
					<div className="footer">
						<Button type="submit" loading={loading} primary disabled={loading}>
							{t("add")}
						</Button>
						<Button type="button" onClick={() => props.close?.()} secondary>
							{t("cancel")}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateChannel;
