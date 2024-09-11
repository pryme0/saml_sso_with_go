import React, { useState } from "react";
import { useStytchB2BClient } from "@stytch/react/b2b";
import { toast } from "react-toastify";
import {
  B2BProducts,
  AuthFlowType,
  StytchB2BUIConfig,
} from "@stytch/vanilla-js";
import { StytchB2B } from "@stytch/react/b2b";

enum SignInTypeEnum {
  MagicLink = "MagicLink",
  SAML = "SAML",
}

export const SignInPage: React.FC = () => {
  const [signInType, setSignInType] = useState<SignInTypeEnum>(
    SignInTypeEnum.MagicLink
  );
  const stytch = useStytchB2BClient();

  const config: StytchB2BUIConfig = {
    authFlowType: AuthFlowType.Organization,
    products: [B2BProducts.sso],
    sessionOptions: { sessionDurationMinutes: 240 },
    emailMagicLinksOptions: {
      loginRedirectURL: "http://localhost:3000/authenticate",
      signupRedirectURL: "http://localhost:3000/authenticate",
    },
    ssoOptions: {
      loginRedirectURL: "http://localhost:3000/authenticate",
      signupRedirectURL: "http://localhost:3000/authenticate",
    },
  };

  const discoveryConfig: StytchB2BUIConfig = {
    authFlowType: AuthFlowType.Discovery,
    products: [B2BProducts.emailMagicLinks],
    sessionOptions: { sessionDurationMinutes: 240 },
    emailMagicLinksOptions: {
      loginRedirectURL: "http://localhost:3000/authenticate",
      signupRedirectURL: "http://localhost:3000/authenticate",
    },
    ssoOptions: {
      loginRedirectURL: "http://localhost:3000/authenticate",
      signupRedirectURL: "http://localhost:3000/authenticate",
    },
  };

  const handleSAMLSignIn = async (connection_id: string) => {
    try {
      stytch.sso.start({
        connection_id: `${connection_id}`,
        login_redirect_url: "http://localhost:3000/authenticate",
        signup_redirect_url: "http://localhost:3000/authenticate",
      });
      //eslint-disable-next-line
    } catch (error: any) {
      toast.error(
        error.message ||
          "An error occurred while trying to sign in, please try again",
        {
          position: "top-right",
          autoClose: 3000, // Close after 3 seconds
        }
      );
    }
  };

  const toggleFormType = (type: SignInTypeEnum) => {
    setSignInType(type);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center bg-gray-100">
      {signInType === SignInTypeEnum.MagicLink ? (
        <div className="mb-4">
          <StytchB2B config={discoveryConfig} />
        </div>
      ) : (
        <StytchB2B config={config} />
      )}

      <div className="flex items-center justify-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="mx-4 text-gray-500">OR</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          onClick={() =>
            toggleFormType(
              signInType === SignInTypeEnum.MagicLink
                ? SignInTypeEnum.SAML
                : SignInTypeEnum.MagicLink
            )
          }
          className={`flex font-bold justify-center w-full bg-[#19303d] text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2`}
        >
          Sign in with{" "}
          {signInType === SignInTypeEnum.MagicLink ? "SAML SSO" : "Magic Link"}
        </button>
      </div>
    </div>
  );
};
