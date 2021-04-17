import { RootState, useSelector } from "react-redux";
import { Modal } from "../framework/Modal";
import { Dropdown, DropdownItem } from "../framework/Dropdown";
import { Network } from "../reducers/networks";
import "./NetworkSelection.scss";
import React, { useState } from "react";
import { Route, useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const NetworkPage = React.lazy(() => import("../pages/Network"));

export interface NetworkSelectionProps {
	onChange?: (network: Network) => any;
	defaultValue?: Network;
}

export function NetworkSelection(props: NetworkSelectionProps) {
	const { t } = useTranslation("network");
	const history = useHistory();
	const networks = useSelector((s: RootState) => s.networks);
	if (!props.defaultValue) props.onChange?.(networks[0]);

	const urlWithoutNetwork = history.location.pathname.replaceAll("/network", "");

	return (
		<>
			<Dropdown
				className="network-selection"
				labelText="Network"
				onChange={(index) => props.onChange?.(networks[index])}
				children={[
					...networks.map((network) => {
						const icon = network.icon && <img className="icon" alt="" src={network.icon}></img>;

						return (
							<DropdownItem
								name={network.host}
								key={network.id}
								id={network.id}
								icon={icon}
							></DropdownItem>
						);
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
					<NetworkPage
						onSelect={(id) => props.onChange?.(networks.find((x) => x.id === id) as Network)}
					></NetworkPage>
				</Route>
			</Modal>
		</>
	);
}
