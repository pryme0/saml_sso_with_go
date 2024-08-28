import { OrganizationInterface } from "../interface";
import { SET_ORGANIZATION } from "./action.types";

export interface SetOrganizationAction {
  type: typeof SET_ORGANIZATION;
  payload: OrganizationInterface;
}

// Action creator to set organization
export const setOrganization = (
  organization: OrganizationInterface
): SetOrganizationAction => ({
  type: SET_ORGANIZATION,
  payload: organization,
});
