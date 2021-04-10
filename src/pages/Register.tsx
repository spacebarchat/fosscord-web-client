import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import "./Login.scss";

export default function Register() {
	const { t } = useTranslation("register");

	return (
		<div className="page register">
			<form className="form">
				<h1 className="text headline">{t("register")}</h1>

				<Input className="email" labelText={t("email")} autoComplete="email"></Input>
				<Input className="username" type="text" labelText={t("username")} autoComplete="username"></Input>
				<Input
					className="password"
					type="password"
					labelText={t("password")}
					autoComplete="new-password"
				></Input>

				{/* // TODO: date of birth + instance selection */}
				<Checkbox labelText={t("consent")}></Checkbox>

				<Button className="submit" primary>
					{t("submit")}
				</Button>

				<div className="">
					<Link to="/login">{t("loginNotice")}</Link>
				</div>
			</form>
		</div>
	);
}
