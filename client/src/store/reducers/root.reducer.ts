import { combineReducers } from "@reduxjs/toolkit";
import { memberReducer } from "./member.reducer";
import { organizationReducer } from "./organization.reducer";
import { dashboardReducer } from "./dashboard.reducer";

export const rootReducer = combineReducers({
  memberReducer,
  organizationReducer: organizationReducer,
  dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
