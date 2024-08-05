import { combineReducers } from "@reduxjs/toolkit";

export interface TenantInterface {
  ID: number | null;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  connection_id: string;
  stytch_organization_id: string;
  idp_sign_on_url: string;
  idp_issuer_url: string;
  stytch_audience_url: string;
  stytch_acs_url: string;
  stytch_issuer_url: string;
  company_name: string;
}

export interface MemberInterface {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  first_name: string;
  last_name: string;
  email: string;
  tenant_id: number;
  stytch_member_id: string;
  roles: string[];
}

export interface DashboardInterface {
  activeSection: string;
}

export const SET_MEMBER = "SET_MEMBER";
export const SET_TENANT = "SET_TENANT";
export const SET_DASHBOARD_INTERFACE = "SET_DASHBOARD_INTERFACE";

export interface SetTenantAction {
  type: typeof SET_TENANT;
  payload: TenantInterface;
}

// Action creator to set tenant
export const setTenant = (tenant: TenantInterface): SetTenantAction => ({
  type: SET_TENANT,
  payload: tenant,
});

export interface SetMemberAction {
  type: typeof SET_MEMBER;
  payload: MemberInterface;
}

// Action creator to set member
export const setMember = (member: MemberInterface): SetMemberAction => ({
  type: SET_MEMBER,
  payload: member,
});

export interface SetDashboardAction {
  type: typeof SET_DASHBOARD_INTERFACE;
  payload: DashboardInterface;
}

export const setDashboard = (
  dashboard: DashboardInterface
): SetDashboardAction => ({
  type: SET_DASHBOARD_INTERFACE,
  payload: dashboard,
});

const initialMemberState = {
  member: null,
};

const initialDashboardState = {
  activeSection: "Profile",
};

const initialTenantState: { tenant: TenantInterface } = {
  tenant: {
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

export const tenantReducer = (
  state = initialTenantState,
  action: SetTenantAction
) => {
  switch (action.type) {
    case SET_TENANT:
      return {
        ...state,
        tenant: action.payload,
      };
    default:
      return state;
  }
};

export const dashboardReducer = (
  state = initialDashboardState,
  action: SetDashboardAction
) => {
  switch (action.type) {
    case SET_DASHBOARD_INTERFACE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const memberReducer = (
  state = initialMemberState,
  action: SetMemberAction
) => {
  switch (action.type) {
    case SET_MEMBER:
      return {
        ...state,
        member: action.payload,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  memberReducer,
  tenantReducer,
  dashboardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
