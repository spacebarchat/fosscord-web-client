import { Card } from "../framework/Card";
import { Icon } from "../framework/Icon";
import { Input } from "../framework/Input";
import { List, ListItem } from "../framework/List";
import { Text } from "../framework/Text";
import { useTranslation } from "react-i18next";
import "./Network.scss";
import { RootState, useDispatch, useSelector } from "react-redux";
import { Network } from "../reducers/networks";
import { useState } from "react";
import { Button } from "../framework/Button";
import "missing-native-js-functions";

export interface NetworkPageProps {
	selected?: Network;
	onSelect?: (network: Network) => any;
}

export default function NetworkPage(props: NetworkPageProps) {
	const { t } = useTranslation("network");
	const dispatch = useDispatch();
	const networks = useSelector((s: RootState) => s.networks);
	const [list, setList] = useState("explore");
	const [url, setURL] = useState("");

	function addNetwork(event: any) {
		event.preventDefault();
		if (!url) return;

		const network = {
			id: Math.randomIntBetween(0, 100000),
			host: url,
			name: url,
		};
		// TODO: validate and fetch network
		dispatch({
			type: "ADD_NETWORK",
			payload: network,
		});
		// @ts-ignore
		props.onSelect?.(network);
		setURL("");
		// TODO: show success toast
	}

	function removeNetwork(network: Network) {
		dispatch({ type: "REMOVE_NETWORK", payload: network });
	}

	return (
		<>
			<div className="sidebar">
				<List>
					<Text headline>{t("discover")}</Text>
					<ListItem state={list} setState={setList} name="explore" primary>
						<Icon className="left" icon="compass"></Icon>
						<div className="content">{t("explore")}</div>
					</ListItem>
					<ListItem state={list} setState={setList} name="add" primary>
						<Icon className="left" icon="plus"></Icon>
						<div className="content">{t("add")}</div>
					</ListItem>
				</List>
			</div>

			<div className="content">
				{/* // TODO: search box with all public networks */}
				{/* <Input placeholder={t("findPlaceholder")} labelText={t("search")}></Input> */}

				{(() => {
					switch (list) {
						case "explore":
							return (
								<>
									<Text headline>{t("chooseNetwork")}</Text>

									<div className="card-grid">
										{networks.map((x) => (
											<Card
												active={x === props.selected}
												key={x.id}
												onClick={() => props.onSelect?.(x)}
												title={x.name}
												description={x.description}
												header={x.splash}
												icon={x.icon}
												verified={x.verified}
											>
												{!x.verified ? (
													<Icon
														style={{
															position: "absolute",
															right: "1rem",
															top: "1rem",
														}}
														icon="trash-alt"
														color="red"
														onClick={() => removeNetwork(x)}
													/>
												) : null}
											</Card>
										))}
									</div>
								</>
							);
						case "add":
							return (
								<div className="addNetwork">
									<Text headline>{t("addNetwork")}</Text>

									<Text>{t("addNotice")}</Text>
									<Text muted>{t("setupNotice")}</Text>

									<div className="inputButton">
										<Input
											type="url"
											value={url}
											onChange={(e) => setURL(e.target.value)}
											labelText="URL"
											placeholder={t("addPlaceholder")}
										></Input>

										<Button onClick={addNetwork} primary>
											Add
										</Button>
									</div>
								</div>
							);
					}
				})()}
			</div>
		</>
	);
}
