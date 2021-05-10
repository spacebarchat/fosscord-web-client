import { createSelector } from "redux-orm";
import { orm, session } from ".";
import { Guild } from "./guilds";

export const guilds = createSelector(orm, orm.get("Guild"));
