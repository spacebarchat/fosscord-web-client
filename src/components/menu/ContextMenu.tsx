import { Component, useState } from "react";
import { Modal } from "../../framework/Modal";
import { useTranslation } from "react-i18next";
import "./ContextMenu.scss";
import CreateChannel from "../modals/CreateChannel/CreateChannel";
import { request } from "../../util/request";
import { Network } from "../../models/networks";
import { RootState, useDispatch, useSelector } from "react-redux";
import store from "../../util/store";

export class ContextMenu extends Component {
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
			targetGuildID: e.target.parentElement.id,
		});
	};

	render() {
		return <ContentContextMenu state={this.state}></ContentContextMenu>;
	}
}

const ContentContextMenu = (state: any) => {
	const { t } = useTranslation("login");
	const { showMenu, xPos, yPos, target, targetGuildID } = state.state;
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [modal, setModal] = useState<any>(null);
	const account: any = useSelector((select: RootState) => select.accounts || [])[0];
	const network: Network = store.getState().networks.find((x: any) => x.id === account.network_id);
	const dispatch = useDispatch();

	function openModal(modal: string) {
		setModal(modal);
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const deleteGuild = async () => {
		var { body, error } = await request(`/guilds/${targetGuildID}/delete`, {
			network,
			method: "POST",
			headers: {
				Authorization: `${account.token}`,
			},
		});

		await dispatch({
			type: "GUILD_DELETE",
			payload: 0,
		});
	};

	if (showMenu)
		if (target === "sidebar-channels") {
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
							<li>{t("createCategory")}</li>
						</div>
					</ul>
				</>
			);
		} else if (target === "content channel") {
			return (
				<ul
					className="menu"
					style={{
						top: yPos,
						left: xPos,
					}}
				>
					<div className="context">
						<li>{t("editChannel")}</li>
						<div className="separator"></div>
						<li className="red">{t("deleteChannel")}</li>
					</div>
				</ul>
			);
		} else if (target === "img server") {
			return (
				<ul
					className="menu"
					style={{
						top: yPos,
						left: xPos,
					}}
				>
					<div className="context">
						<li>{t("editGuild")}</li>
						<div className="separator"></div>
						<li className="red" onClick={() => deleteGuild()}>
							{t("deleteGuild")}
						</li>
					</div>
				</ul>
			);
		} else {
			return <></>;
		}
	else
		return (
			<Modal className="server page" open={modalIsOpen} onClose={closeModal}>
				{modal === "createChannel" && <CreateChannel></CreateChannel>}
			</Modal>
		);
};
