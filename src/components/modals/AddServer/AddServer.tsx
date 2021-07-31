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

export const AddServer = (props: any) => {
	const { t } = useTranslation("translation");
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState<any>(null);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x) => x.id === account.network_id);

	async function submit(this: any, event: any) {
		event.preventDefault();
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions

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
		setErr(error);
		if (error) return;

		store.dispatch({
			type: "GUILD_CREATE",
			payload: 0,
		});

		props.close?.();
		return;
	}

	return (
		<>
			<Text headline={true} className="titleModal">
				Create New Server
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
						<Text secondary={true}>{t("addServer")}</Text>

						<div className="inputWrapper">
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

export default AddServer;
