import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Login.scss";

export default function LoginScreen() {
	const { t } = useTranslation("login");

	return (
		<div className="page login">
			<form className="form">
				<h1 className="text headline">{t("login")}</h1>

				{/* email or phone autocomplete */}
				<Input autoComplete="email" type="text" className="emailPhone" labelText={t("emailTelephone")}></Input>

				<Input
					className="password"
					type="password"
					labelText={t("password")}
					autoComplete="current-password"
				></Input>

				{/* // TODO instance selection */}

				<Link to="/resetPassword">{t("forgotPassword")}</Link>

				<Button className="submit " primary>
					{t("login")}
				</Button>

				<Link to="/register">{t("registerNotice")}</Link>
			</form>
		</div>
	);
}
