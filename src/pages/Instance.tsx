import { Card } from "../framework/Card";
import { Icon } from "../framework/Icon";
import { Input } from "../framework/Input";
import { List, ListItem } from "../framework/List";
import { Text } from "../framework/Text";
import "./Instance.scss";
import Logo from "../assets/logo_big_transparent.png";

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

				<div className="card-grid">
					<Card
						verified={true}
						title="Fosscord"
						icon={Logo}
						header={"https://images.opencollective.com/discordhooks/1f8f486/background.png"}
						description="Offical fosscord.com instance"
					></Card>
					<Card
						verified={true}
						title="Discord"
						icon="https://logopng.net/wp-content/uploads/2020/07/logo-discord-png-icon-6.png"
						header={
							"https://preview.redd.it/4zh2hgl46cp51.png?width=3325&format=png&auto=webp&s=b9123bff12e1d5b86248d27a059104b4c92e05b5"
						}
						description="Offical discord.com instance"
					></Card>

					<Card title="localhost" description="localhost test instance"></Card>
				</div>
			</div>
		</>
	);
}
