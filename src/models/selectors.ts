import { createSelector } from "redux-orm";
import { orm } from "./";

// @ts-ignore
export const networksSelector = createSelector(orm.get("Network"), (s) => s.orm);
