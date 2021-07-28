import { RootState, useSelector } from "react-redux";
import { Input } from "../framework/Input";
import { guilds, Guild } from "../models/guilds";
import "../pages/Login.scss";
import "@fosscord/ui/scss/guild.scss";
import "./AddServer.scss";
import { List, ListItem } from "../framework/List";
import { Text } from "../framework/Text";
import React, { FormEvent } from "react";
import { Route, useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../framework/Button";

const NetworkPage = React.lazy(() => import("../pages/Network"));

// export interface AddServerProps {
// 	onChange?: (network: Network) => any;
// 	defaultValue?: Network;
// }

export const AddServer = () => {
	const { t } = useTranslation("login");
	const guilds = useSelector((select: RootState) => select.guilds || []);
	const history = useHistory();

	const urlWithoutAddServer = history.location.pathname.replaceAll("/server/add", "");

	async function submit(event: FormEvent) {
		// event.preventDefault();
		history.push(urlWithoutAddServer);
	}

	return (
		<>
			<div className="page add">
				<form className="form" onSubmit={submit}>
					<h1 className="text headline">{t("AddAServer")}</h1>
					<div className="guild">
						<span className="img">UPLOAD</span>
					</div>
					<Input labelText={t("serverName")}></Input>
					<div className="text muted">{t("addServerNotice")}</div>
					<Button primary>{t("login")}</Button>
				</form>
			</div>
		</>
	);
};

export default AddServer;
