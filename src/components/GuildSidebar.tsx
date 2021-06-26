import { RootState, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Guild } from "../models/guilds";
import "@fosscord/ui/scss/guild.scss";

export default function GuildSidebar() {
	const guilds = useSelector((select: RootState) => select.guilds || []);
	if (guilds.length <= 0) return <div></div>;
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();
	const navigateTo = (channel: string) => history.push("/channels/" + channel);

	return (
		<div className="guild-container">
			<div className="guild home" onClick={() => history.push("/channels/@me")}>
				<span className="pill"></span>
				<a></a>
			</div>
			<div className="guild seperator">
				<hr />
			</div>
			{guilds.map((x: Guild) => (
				<div className="guild" key={x.id} onClick={() => navigateTo(x.id.toString())}>
					<span className="pill"></span>
					{x.icon ? (
						<img src={x.icon} alt="" className="img" />
					) : (
						<span className="img">{getAcronym(x.name)}</span>
					)}
				</div>
			))}
		</div>
	);
}

export function getAcronym(str: string) {
	return str
		.replace(/'s /g, " ")
		.replace(/\w+/g, function (e) {
			return e[0];
		})
		.replace(/\s/g, "");
}
