import FosscordLogo from "../assets/logo_big_transparent.png";

export const network = {
  id: "0",
  config: {},
  verified: true,
  name: "Fosscord",
  invite: "fosscord.com",
  api: "https://api.fosscord.com",
  version: 8,
  description: "Offical fosscord.com network",
  cdn: "https://cdn.fosscord.com",
  gateway: "wss://gateway.fosscord.com",
  host: "fosscord.com",
  icon: FosscordLogo,
  splash:
    "https://images.opencollective.com/discordhooks/1f8f486/background.png",
  termsOfService: "",
};

export interface Network {
  id: string;
  config: any; // TODO
  invite: string;
  gateway: string;
  discord: boolean; // if it is the offical discord instance, used for backwards compatibility
  api: string;
  cdn: string;
  host: string;
  version: number;
  verified: boolean;
  name?: string;
  description?: string;
  splash?: string;
  icon?: string;
  termsOfService?: string;
}
