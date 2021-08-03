import { RootState, useDispatch, useSelector } from "react-redux";
import { Input } from "../../../framework/Input";
import "./CreateCategory.scss";
import { Text } from "../../../framework/Text";
import { useState, FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../framework/Button";
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

export const CreateCategory = (props: any) => {
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

		var { body, error } = await request(`/guilds/${match?.params.id}/channels`, {
			network,
			body: {
				name: name,
				type: 4,
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

	return (
		<>
			<Text headline={true} className="titleModal">
				{t("createCategory")}
			</Text>
			<div
				className="page channel"
				onSubmit={(e) => {
					e.preventDefault();
					submit(e);
				}}
			>
				<form>
					<div id="formCreateChannel" className="form">
						<div className="inputWrapper category">
							<Input
								maxLength={100}
								placeholder="New category"
								onChange={(e) => setName(e.target.value)}
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

export default CreateCategory;
