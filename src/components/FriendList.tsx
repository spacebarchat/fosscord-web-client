import { RootState, useSelector } from "react-redux";
import "@fosscord/ui/scss/input-fields.scss";
import "@fosscord/ui/scss/list.scss";
import "./SideBar.scss";

export const FriendList = () => {
	const guilds = useSelector((select: RootState) => select.guilds || []);
	if (guilds.length < 0) return <div></div>;

	return (
		<div className="sidebar friendList">
			<div className="container">
				<header>
					<input
						className="input"
						placeholder="Find or start a conversation"
						name=""
						type="text"
						defaultValue=""
					/>
				</header>
				<div className="scrolled-container scrollbar">
					<div style={{ height: "8px" }}></div>
					<ul className="list">
						<li className="item">
							<i className="icon settings left"></i>
							<div className="content">Friends</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
