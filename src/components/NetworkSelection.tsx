import { RootState, useSelector } from "react-redux";
import { Modal } from "../framework/Modal";
import { Dropdown, DropdownItem } from "../framework/Dropdown";
import { Network } from "../reducers/networks";
import "./NetworkSelection.scss";
import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const NetworkPage = React.lazy(() => import("../pages/Network"));

export interface NetworkSelectionProps {
	onChange?: (network: Network) => any;
	defaultValue?: Network;
}

// TODO: network delete button

export function NetworkSelection(props: NetworkSelectionProps) {
	const { t } = useTranslation("network");
	const history = useHistory();
	const networks = useSelector((s: RootState) => s.networks);
	const [network, setNetwork] = useState(networks[0]);
	useEffect(() => {
		if (!props.defaultValue) props.onChange?.(network);
	}, []);

	function changeNetwork(network: Network) {
		setNetwork(network);
		props.onChange?.(network);
	}

	const urlWithoutNetwork = history.location.pathname.replaceAll("/network", "");

	return (
		<>
			<Dropdown
				className="network-selection"
				labelText="Network"
				selected={networks.findIndex((x) => x === network)}
				onChange={(index) => changeNetwork(networks[index])}
				children={[
					...networks.map((x) => {
						const icon = x.icon && <img className="icon" alt="" src={x.icon}></img>;

						return <DropdownItem name={x.host} key={x.id} id={x.id} icon={icon}></DropdownItem>;
					}),
					<DropdownItem
						name={t("addNetwork")}
						id="add_network"
						key="add_network"
						icon="plus"
						onClick={() => history.push(`${history.location.pathname}/network`)}
					></DropdownItem>,
				]}
			/>
			<Modal
				className="network page"
				open={history.location.pathname.includes("/network")}
				onClose={() => history.replace(urlWithoutNetwork)}
			>
				<Route path={`${urlWithoutNetwork}/network`}>
					<NetworkPage selected={network} onSelect={changeNetwork}></NetworkPage>
				</Route>
			</Modal>
		</>
	);
}
