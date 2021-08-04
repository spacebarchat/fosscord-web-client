import { Component, useState } from "react";
import { LittleModal } from "../../framework/LittleModal";
import { useTranslation } from "react-i18next";
import "./ContextMenu.scss";
import CreateChannel from "../Modals/CreateChannel/CreateChannel";
import { request } from "../../util/request";
import { Network } from "../../models/networks";
import { RootState, useSelector } from "react-redux";
import { useHistory } from "react-router";
import store from "../../util/store";
import CreateCategory from "../Modals/CreateCategory/CreateCategory";

export class ContextMenu extends Component {
	// TODO: fix overflow
	state = {
		xPos: "0px",
		yPos: "0px",
		showMenu: false,
		target: null,
		targetGuildID: null,
	};

	componentDidMount() {
		document.addEventListener("click", this.handleClick);
		document.addEventListener("contextmenu", this.handleContextMenu);
		document.addEventListener("keydown", this.handleKeyDown);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleClick);
		document.removeEventListener("contextmenu", this.handleContextMenu);
		document.removeEventListener("keydown", this.handleKeyDown);
	}

	handleKeyDown = (event: Event) => {
		if ((event as KeyboardEvent).keyCode !== 27) return; // matches Escape
		if (this.state.showMenu) this.setState({ showMenu: false });
	};

	handleClick = (e: any) => {
		if (this.state.showMenu) this.setState({ showMenu: false });
	};

	handleContextMenu = (e: any) => {
		e.preventDefault();
		this.setState({
			xPos: `${e.pageX - 30}px`,
			yPos: `${e.pageY}px`,
			showMenu: true,
			target: e.target.className,
			targetGuildID: e.target.id,
		});
	};

	render() {
		return <ContentContextMenu state={this.state}></ContentContextMenu>;
	}
}

export interface Params {
	id: string;
	channel: string;
}

const ContentContextMenu = (state: any) => {
	const { t } = useTranslation("translation");
	const { showMenu, xPos, yPos, target, targetGuildID } = state.state;
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [modal, setModal] = useState<any>(null);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x: any) => x.id === account.network_id);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const history = useHistory();

	function openModal(modal: string) {
		setModal(modal);
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const deleteGuild = async () => {
		await request(`/guilds/${targetGuildID}/delete`, {
			network,
			method: "POST",
			headers: {
				Authorization: `${account.token}`,
			},
		});

		history.push("/channels/@me");

		store.dispatch({
			type: "GUILD_DELETE",
			payload: 0,
		});
	};

	const deleteChannel = async () => {
		await request(`channels/${targetGuildID}`, {
			network,
			method: "DELETE",
			headers: {
				Authorization: `${account.token}`,
			},
		});

		store.dispatch({
			type: "CHANNEL_DELETE",
			payload: 0,
		});
	};

	if (showMenu)
		if (target === "scrolled-container scrollbar channels") {
			return (
				<>
					<ul
						className="menu"
						style={{
							top: yPos,
							left: xPos,
						}}
					>
						<div className="context">
							<li onClick={() => openModal("createChannel")}>{t("createChannel")}</li>
							<li onClick={() => openModal("createCategory")}>{t("createCategory")}</li>
						</div>
					</ul>
				</>
			);
		} else if (target === "scrolled-container scrollbar chat") {
			return (
				<ul
					className="menu"
					style={{
						top: yPos,
						left: xPos,
					}}
				>
					<div className="context">
						<li>{t("delete")}</li>
					</div>
				</ul>
			);
		} else if (target === "item" || target === "item active") {
			return (
				<ul
					className="menu"
					style={{
						top: yPos,
						left: xPos,
					}}
				>
					<div className="context">
						<li>{t("edit")}</li>
						<div className="separator"></div>
						<li className="red" onClick={() => deleteChannel()}>
							{t("delete")}
						</li>
					</div>
				</ul>
			);
		} else if (target === "item category") {
			return (
				<ul
					className="menu"
					style={{
						top: yPos,
						left: xPos,
					}}
				>
					<div className="context">
						<li>{t("edit")}</li>
						<div className="separator"></div>
						<li className="red" onClick={() => deleteChannel()}>
							{t("delete")}
						</li>
					</div>
				</ul>
			);
		} else if (target === "guild") {
			return (
				<ul
					className="menu"
					style={{
						top: yPos,
						left: xPos,
					}}
				>
					<div className="context">
						<li>{t("edit")}</li>
						<div className="separator"></div>
						<li className="red" onClick={() => deleteGuild()}>
							{t("delete")}
						</li>
					</div>
				</ul>
			);
		} else {
			return <></>;
		}
	else
		return (
			<LittleModal className="server page" open={modalIsOpen} onClose={closeModal}>
				{modal === "createChannel" && <CreateChannel close={() => closeModal()}></CreateChannel>}
				{modal === "createCategory" && <CreateCategory close={() => closeModal()}></CreateCategory>}
			</LittleModal>
		);
};
