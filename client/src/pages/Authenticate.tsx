import React, { useCallback, useEffect } from "react";
import { useStytchB2BClient, useStytchMemberSession } from "@stytch/react/b2b";
import Spinner from "../components/common/Spinner";
import { axiosInstance } from "../utils";

export const Authenticate = () => {
  const stytch = useStytchB2BClient();
  const { session } = useStytchMemberSession();

  const authenticateUser = useCallback(() => {
    if (session) {
      axiosInstance
        .get(
          `/authenticate?stytch_organization_id=${session.organization_id}&stytch_member_id=${session.member_id}`
        )
        .then((data) => {
          window.location.href = "http://localhost:3000/dashboard";
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      authenticateUser();
    } else {
      const token = new URLSearchParams(window.location.search).get("token");

      try {
        if (token) {
          const tokenType = new URLSearchParams(window.location.search).get(
            "stytch_token_type"
          );
          if (tokenType === "multi_tenant_magic_links") {
            stytch.magicLinks.authenticate({
              magic_links_token: token,
              session_duration_minutes: 240,
            });
          }

          if (tokenType === "sso") {
            stytch.sso.authenticate({
              sso_token: token,
              session_duration_minutes: 240,
            });
          }
        }
      } catch (error) {
        console.log({ error });
      }
    }
  }, [session]);

  return (
    <div className="flex justify-center w-full items-center">
      <Spinner size="100" />
    </div>
  );
};
