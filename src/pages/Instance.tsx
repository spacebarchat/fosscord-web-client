import { Icon } from "../framework/Icon";
import { Input } from "../framework/Input";
import { List, ListItem } from "../framework/List";
import { Text } from "../framework/Text";
import "./Instance.scss";

export default function Instance(props: any) {
	return (
		<>
			<div className="sidebar">
				<List>
					<Text headline>Discover</Text>
					<ListItem active primary>
						<Icon className="left" icon="compass"></Icon>
						<div className="content">Explore</div>
					</ListItem>
					<ListItem>
						<Icon className="left" icon="settings"></Icon>
						<div className="content">Settings</div>
					</ListItem>
					<ListItem>
						<Icon className="left" icon="plus"></Icon>
						<div className="content">Add</div>
					</ListItem>
				</List>
			</div>

			<div className="content">
				<Text headline>Find Instances</Text>
				<Input placeholder="Explore communities" labelText="Search"></Input>
			</div>
		</>
	);
}
