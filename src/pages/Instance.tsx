import { Icon } from "../framework/Icon";
import { Input } from "../framework/Input";
import { List, ListItem } from "../framework/List";
import { Text } from "../framework/Text";
import { useTranslation } from "react-i18next";
import "./Instance.scss";

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
			</div>
		</>
	);
}
