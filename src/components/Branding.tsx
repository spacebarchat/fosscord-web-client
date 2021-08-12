import React, { ReactNode } from "react";
import Logo from "../assets/logo_big_transparent.png";
import "./Branding.scss";

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({ children }: { children: ReactNode }) {
  return (
    <div className="branding">
      <img src={Logo} alt="Logo" />
      <h2 className="text headline">Fosscord</h2>
    </div>
  );
}
