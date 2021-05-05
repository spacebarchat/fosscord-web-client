import { RootState, useSelector } from "react-redux";
import { Guild } from "../models/guilds";
import "@fosscord/ui/scss/guild.scss";
import { User } from "../models/users";
import store from "../util/store";

export default function GuildSidebar() {
	const guilds = useSelector((select: RootState) => select.guilds);

	return (
		<div className="guild-container">
			<div className="guild home">
				<span className="pill"></span>
				<span className="img"></span>
			</div>
			<div className="guild seperator">
				<span className="pill"></span>
				<span className="img"></span>
			</div>
			{guilds.map((x: Guild) => (
				<div className="guild">
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
