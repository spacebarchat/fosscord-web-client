import { RootState, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Guild } from "../models/guilds";
import "@fosscord/ui/scss/guild.scss";

export default function GuildSidebar() {
	const guilds = useSelector((select: RootState) => select.guilds || []);
	if (guilds.length < 0) return <div></div>;
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();
	const navigateTo = (channel: number) => history.push("/channels/" + channel);

	console.log(guilds);

	return (
		<div className="guild-container">
			<div className="guild home">
				<span className="pill"></span>
				<a href=""></a>
			</div>
			<div className="guild seperator">
				<hr />
			</div>
			{guilds.map((x: Guild) => (
				<div className="guild" onClick={() => navigateTo(Number(x.id))}>
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
