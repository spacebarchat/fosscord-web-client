import { RootState, useDispatch, useSelector } from "react-redux";
import { Input } from "../../../framework/Input";
import "./CreateChannel.scss";
import { Text } from "../../../framework/Text";
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../framework/Button";
import "../../../pages/general.scss";

import "missing-native-js-functions";
import { getFormError, PlainTextError } from "../../../util/FormError";
import { Network } from "../../../models/networks";
import store from "../../../util/store";
import { request } from "../../../util/request";
import { Modal } from "../../../framework/Modal";
import { useRouteMatch } from "react-router";
import { Dispatch } from "../../../util/opcodes/Dispatch";
import { Client } from "../../../util/Client";

export interface Params {
	id: string;
	channel: string;
}

export const CreateChannel = () => {
	const { t } = useTranslation("login");
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

	async function submit(event: FormEvent) {
		event.preventDefault();

		setLoading(true);

		var { body, error } = await request(`/guilds/${match?.params.id}/channels`, {
			network,
			body: {
				name: name,
				type: 0,
			},
			headers: {
				Authorization: `${account.token}`,
			},
		});

		setLoading(false);
		setErr(error);
		if (error) return;
		// TODO: update channels sidebar at end

		await dispatch({
			type: "CHANNEL_CREATE",
			payload: 0,
		});
	}

	return (
		<>
			<div className="page channel">
				<form className="form" onSubmit={submit}>
					<Text headline={true}>{t("createChannel")}</Text>
					<Input
						labelText={t("channelName")}
						error={getFormError(err, "login")}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>
					<Text muted={true} className="little">
						{t("addServerNotice")}
					</Text>
					<Button loading={loading} primary disabled={loading}>
						{t("add")}
					</Button>
				</form>
			</div>
		</>
	);
};

export default CreateChannel;
