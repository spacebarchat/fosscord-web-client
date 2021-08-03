import { RootState, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./AddServer.scss";
import { Text } from "../../../framework/Text";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../framework/Button";
import { Input } from "../../../framework/Input";
import "../../../pages/general.scss";

import "missing-native-js-functions";
import { PlainTextError } from "../../../util/FormError";
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

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	async function submit(this: any, event: any) {
		event.preventDefault();
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions

		setLoading(true);

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
		else history.push("/channels/" + body.id);

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
				{t("addServer")}
			</Text>
			<div className="page channel">
				<form
					onSubmit={(e) => {
						submit(e);
					}}
				>
					<div className="form">
						<div className="inputWrapper">
							<Input
								maxLength={100}
								placeholder={t("guildName")}
								onChange={(e) => setName(e.target.value)}
							></Input>
						</div>
						<PlainTextError error={err} style={{ marginBottom: 0 }}></PlainTextError>
						<Text muted={true} className="little">
							{t("addServerNotice")}
						</Text>
					</div>
					<div className="footer">
						<Button primary type="submit" loading={loading} disabled={loading}>
							{t("add")}
						</Button>
						<Button secondary type="button" onClick={() => props.close?.()}>
							{t("cancel")}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default AddServer;
