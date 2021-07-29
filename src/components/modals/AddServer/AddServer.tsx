import { RootState, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input } from "../../../framework/Input";
import "./AddServer.scss";
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

export const AddServer = () => {
	const { t } = useTranslation("login");
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState<any>(null);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	async function submit(event: FormEvent) {
		event.preventDefault();

		var { body, error } = await request("/guilds", {
			network,
			body: {
				name: name,
			},
			headers: {
				Authorization: `${account.token}`,
			},
		});

		setLoading(false);
		// setErr(error.name._errors[0].message);
		if (error) return;

		console.log(event.target);

		await dispatch({
			type: "GUILD_CREATE",
			payload: 0,
		});
	}

	return (
		<>
			<div className="page add">
				<form className="form" onSubmit={submit}>
					<Text headline={true}>{t("addServer")}</Text>
					<Input
						labelText={t("serverName")}
						error={getFormError(err, "login")}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>
					<Text muted={true} className="little">
						{t("addServerNotice")}
					</Text>
					<Button loading={loading} primary>
						{t("add")}
					</Button>
				</form>
			</div>
		</>
	);
};

export default AddServer;
