import { RootState, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Input } from "../framework/Input";
import "./AddServer.scss";
import { Text } from "../framework/Text";
import { useState, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../framework/Button";
import "../pages/general.scss";
import "../pages/TopScreen.scss";
import "missing-native-js-functions";

export const AddServer = () => {
	const { t } = useTranslation("login");
	const dispatch = useDispatch();
	const guilds = useSelector((select: RootState) => select.guilds || []);
	const history = useHistory();
	const [name] = useState("");

	const urlWithoutAddServer = history.location.pathname.replaceAll("/server/add", "");

	async function submit(event: FormEvent) {
		event.preventDefault();
		const guild = {
			id: Math.randomIntBetween(0, 100000),
			name: name,
		};
		// TODO: validate and fetch network
		dispatch({
			type: "ADD_GUILDS",
			payload: guild,
		});
		history.push(urlWithoutAddServer);
	}

	return (
		<>
			<div className="page add">
				<form className="form" onSubmit={submit}>
					<Text headline={true}>{t("addServer")}</Text>
					<div className="guild">
						<span className="img">{t("upload").toUpperCase()}</span>
					</div>
					<Input labelText={t("serverName")} value={name}></Input>
					<Text muted={true} className="little">{t("addServerNotice")}</Text>
					<Button primary>{t("add")}</Button>
				</form>
			</div>
		</>
	);
};

export default AddServer;
