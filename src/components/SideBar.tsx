import { RootState, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router";
import { useHistory } from "react-router-dom";
import { Guild } from "../models/guilds";
import "@fosscord/ui/scss/list.scss";
import "./SideBar.scss";

export interface Params {
	id: string;
	channel: string;
}

export interface Channel {
	id: string;
	name: string;
	type: number;
}

const SideBar = () => {
	const guilds = useSelector((select: RootState) => select.guilds || []);
	if (guilds.length < 0) return <div></div>;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	const guild = guilds.find((i) => i.id === match?.params.id);

	return (
		<div className="sidebar">
			<div className="container">
				<header>
					<h1 className="text headline">{guild?.name}</h1>
				</header>
				<div className="scrolled-container scrollbar">
					<div style={{ height: "16px" }}></div>
					<ul className="list">
						{guild?.channels.map((x: Channel) => (
							<li
								className="item"
								onClick={() => history.push("/channels/" + match?.params.id + "/" + x.id)}
							>
								{x.type === 0 && <i className="icon hashtag left"> </i>}
								{x.type === 2 && <i className="icon voice-chat left"> </i>}
								<div className="content">{x.name}</div>
								{x.type === 0 ||
									(x.type === 2 && <i className="icon settings right visibleOnHover"> </i>)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export function getAcronym(str: string) {
	return str
		.replace(/'s /g, " ")
		.replace(/\w+/g, function (e) {
			return e[0];
		})
		.replace(/\s/g, "");
}

export default SideBar;
