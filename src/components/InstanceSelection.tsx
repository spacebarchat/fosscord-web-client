import { RootState, useSelector } from "react-redux";
import { Modal } from "../framework/Modal";
import { Dropdown, DropdownItem } from "../framework/Dropdown";
import { Instance } from "../reducers/instances";
import "./InstanceSelection.scss";
import React, { useState } from "react";
import { Route, useHistory } from "react-router";

const InstancePage = React.lazy(() => import("../pages/Instance"));

export interface InstanceSelectionProps {
	onChange?: (instance: Instance) => any;
	defaultValue?: Instance;
}

export function InstanceSelection(props: InstanceSelectionProps) {
	const history = useHistory();
	const instances = useSelector((s: RootState) => s.instances);
	if (!props.defaultValue) props.onChange?.(instances[0]);

	const urlWithoutInstance = history.location.pathname.replaceAll("/instance", "");

	return (
		<>
			<Dropdown
				className="instance-selection"
				labelText="Instance"
				onChange={(index) => props.onChange?.(instances[index])}
				children={[
					...instances.map((instance) => {
						const icon = instance.icon && <img className="icon" alt="" src={instance.icon}></img>;

						return (
							<DropdownItem
								name={instance.host}
								key={instance.id}
								id={instance.id}
								icon={icon}></DropdownItem>
						);
					}),
					<DropdownItem
						name="Add Instance"
						id="add_instance"
						key="add_instance"
						icon="plus"
						onClick={() => history.push(`${history.location.pathname}/instance`)}></DropdownItem>,
				]}
			/>
			<Modal
				className="instance page"
				open={history.location.pathname.includes("/instance")}
				onClose={() => history.replace(urlWithoutInstance)}>
				<Route path={`${urlWithoutInstance}/instance`}>
					<InstancePage></InstancePage>
				</Route>
			</Modal>
		</>
	);
}
