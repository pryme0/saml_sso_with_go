import { SET_ORGANIZATION, SetOrganizationAction } from "../actions";
import { OrganizationInterface } from "../interface";

const initialState: { organization: OrganizationInterface } = {
  organization: {
    ID: null,
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: null,
    connection_id: "",
    stytch_organization_id: "",
    idp_sign_on_url: "",
    idp_issuer_url: "",
    stytch_audience_url: "",
    stytch_acs_url: "",
    stytch_issuer_url: "",
    company_name: "",
  },
};

export const organizationReducer = (
  state = initialState,
  action: SetOrganizationAction
) => {
  switch (action.type) {
    case SET_ORGANIZATION:
      return {
        ...state,
        organization: action.payload,
      };
    default:
      return state;
  }
};
