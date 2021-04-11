import { RootState, useSelector } from "react-redux";
import { Dropdown, DropdownItem } from "../framework/Dropdown";
import { Instance } from "../reducers/instances";
import "./InstanceSelection.scss";

export interface InstanceSelectionProps {
	onChange?: (instance: Instance) => any;
	defaultValue?: Instance;
}

export function InstanceSelection(props: InstanceSelectionProps) {
	const instances = useSelector((s: RootState) => s.instances);
	if (!props.defaultValue) props.onChange?.(instances[0]);

	return (
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
							icon={icon}
						></DropdownItem>
					);
				}),
				<DropdownItem name="Add Instance" id="" icon="plus" onClick={() => console.log("plus")}></DropdownItem>,
			]}
		/>
	);
}
