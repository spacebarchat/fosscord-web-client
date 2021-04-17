import { Card } from "../framework/Card";
import { Icon } from "../framework/Icon";
import { Input } from "../framework/Input";
import { List, ListItem } from "../framework/List";
import { Text } from "../framework/Text";
import { useTranslation } from "react-i18next";
import "./Network.scss";
import { RootState, useSelector } from "react-redux";

export interface NetworkPageProps {
	onSelect?: (id: string) => any;
}

export default function NetworkPage(props: NetworkPageProps) {
	const { t } = useTranslation("network");
	const networks = useSelector((s: RootState) => s.networks);

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
						<Icon className="left" icon="plus"></Icon>
						<div className="content">{t("add")}</div>
					</ListItem>
				</List>
			</div>

			<div className="content">
				<Text headline>{t("find")}</Text>
				<Input placeholder={t("findPlaceholder")} labelText={t("search")}></Input>

				<div className="card-grid">
					{networks.map((x) => (
						<Card
							onClick={() => props.onSelect?.(x.id)}
							title={x.name}
							description={x.description}
							header={x.splash}
							icon={x.icon}
							verified={x.verified}
						></Card>
					))}
				</div>
			</div>
		</>
	);
}
