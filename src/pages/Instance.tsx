import { Card } from "../framework/Card";
import { Icon } from "../framework/Icon";
import { Input } from "../framework/Input";
import { List, ListItem } from "../framework/List";
import { Text } from "../framework/Text";
import { useTranslation } from "react-i18next";
import "./Instance.scss";
import Logo from "../assets/logo_big_transparent.png";

export default function Instance(props: any) {
	const { t } = useTranslation("instance");
	return (
		<>
			<div className="sidebar">
				<List>
					<Text headline>{t("discover")}</Text>
					<ListItem active primary>
						<Icon className="left" icon="compass"></Icon>
						<div className="content">{t("explore")}</div>
					</ListItem>
					<ListItem>
						<Icon className="left" icon="settings"></Icon>
						<div className="content">{t("settings")}</div>
					</ListItem>
					<ListItem>
						<Icon className="left" icon="plus"></Icon>
						<div className="content">{t("add")}</div>
					</ListItem>
				</List>
			</div>

			<div className="content">
				<Text headline>{t("find")}</Text>
				<Input placeholder={t("findPlaceholder")} labelText={t("search")}></Input>

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
