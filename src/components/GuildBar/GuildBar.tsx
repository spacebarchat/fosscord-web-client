import { useState } from "react";
import { RootState, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router";
import { useTranslation } from "react-i18next";
import { Guild } from "../../models/guilds";
//FRAMEWORK
import { LittleModal } from "../../framework/LittleModal";
//MODALS/IMPORTS
import AddServer from "../Modals/AddServer/AddServer";
import FosscordLogo from "../../assets/logo_big_transparent.png";

export interface Params {
	id: string;
	channel: string;
}

export interface Channel {
	id: string;
	name: string;
	type: number;
}

const GuildBar = () => {
	const { t } = useTranslation("translation");
	var guilds = useSelector((select: RootState) => select.guilds || []);
	guilds = guilds.filter(function (el: any) {
		return el != null;
	});

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const match = useRouteMatch<Params>({
		path: "/channels/:id/:channel?",
		exact: false,
	});

	const [modalIsOpen, setIsOpen] = useState<boolean>(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const navigateTo = (channel: string) => history.push("/channels/" + channel);

	return (
		<div className="guild-container">
			<div
				className={"guild home" + (match?.params.id === "@me" ? " active" : "")}
				title={t("home")}
				onClick={() => history.push("/channels/@me")}
			>
				<span className="pill"></span>
				<img src={FosscordLogo} className="img" alt="" />
			</div>
			<hr />
			{guilds.map((x: Guild) => (
				<div
					id={x.id}
					className={"guild" + (match?.params.id === x.id ? " active" : "")}
					title={x.name}
					key={+new Date() + "_" + x.id + "_" + Math.random()}
					onClick={() => {
						if (x.id) navigateTo(x.id.toString());
					}}
				>
					<span className="pill"></span>
					{x.icon ? (
						<img src={x.icon} alt="" className="img server" />
					) : (
						<span className="img server">{getAcronym(x.name)}</span>
					)}
				</div>
			))}
			<div className="guild new-guild" title={t("add") + " " + t("guild")} onClick={openModal}>
				<span className="pill"></span>
				<span className="img">
					<span>+</span>
				</span>
			</div>

			<LittleModal className="server page" open={modalIsOpen} onClose={closeModal}>
				<AddServer close={() => closeModal()}></AddServer>
			</LittleModal>
		</div>
	);
};

export function getAcronym(str: string) {
	if (str)
		return str
			.replace(/'s /g, " ")
			.replace(/\w+/g, function (e) {
				return e[0];
			})
			.replace(/\s/g, "");
}

export default GuildBar;
