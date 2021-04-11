import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Branding } from "../components/Branding";
import { InstanceSelection } from "../components/InstanceSelection";
import { Button } from "../framework/Button";
import { Input } from "../framework/Input";
import "./Login.scss";

export default function LoginScreen() {
	const { t } = useTranslation("login");

	return (
		<div className="page login">
			<form className="form">
				<Branding />
				<h1 className="text headline">{t("login")}</h1>

				<InstanceSelection />
				{/* email or phone autocomplete */}
				<Input autoComplete="email" type="text" className="emailPhone" labelText={t("emailTelephone")}></Input>

				<Input
					className="password"
					type="password"
					labelText={t("password")}
					autoComplete="current-password"
				></Input>

				{/* // TODO instance selection */}

				<Link className="small" to="/resetPassword">
					{t("forgotPassword")}
				</Link>

				<Button className="submit " primary>
					{t("login")}
				</Button>

				<div className="text muted">
					{t("registerNotice")}
					<Link to="/register">{t("register")}</Link>
				</div>
			</form>
		</div>
	);
}
