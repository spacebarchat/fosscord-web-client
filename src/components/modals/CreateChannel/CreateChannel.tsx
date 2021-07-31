import { RootState, useDispatch, useSelector } from "react-redux";
import { Input } from "../../../framework/Input";
import "./CreateChannel.scss";
import { Text } from "../../../framework/Text";
import { useState, FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../framework/Button";
import { Radio, ChannelSVG, VoiceSVG } from "../../../framework/radio.js";
import "../../../pages/general.scss";

import "missing-native-js-functions";
import { getFormError, PlainTextError } from "../../../util/FormError";
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
	const dispatch = useDispatch();
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

		var { body, error } = await request(`/guilds/${match?.params.id}/channels`, {
			network,
			body: {
				name: name,
				type: type,
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
				Create Text Channel
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
						<Text secondary={true}>{t("channelType")}</Text>
						<span id="textChannel" onClick={() => toggle("textChannel")} className="radio">
							<Radio></Radio>
							<div className="radio-content">
								<ChannelSVG></ChannelSVG>
								<div className="radio-info">
									<span className="name">Text Channel</span>
									<span className="description">
										Post images, GIFs, stickers, opinions, and puns
									</span>
								</div>
							</div>
						</span>
						<span id="voiceChannel" onClick={() => toggle("voiceChannel")} className="radio">
							<Radio></Radio>
							<div className="radio-content">
								<VoiceSVG></VoiceSVG>
								<div className="radio-info">
									<span className="name">Voice Channel</span>
									<span className="description">
										Hang out with voice, video, and screen sharing
									</span>
								</div>
							</div>
						</span>

						<Text secondary={true}>{t("createChannel")}</Text>

						<div className="inputWrapper">
							{icon}
							<input
								className="inputDefault-_djjkz input-cIJ7To inputInner-2UxuB6"
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
