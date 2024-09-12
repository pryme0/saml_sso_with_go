import React, { useState } from "react";
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
  const [companySlug, setCompanySlug] = useState("");

  const discoveryConfig: StytchB2BUIConfig = {
    authFlowType: AuthFlowType.Discovery,
    products: [B2BProducts.emailMagicLinks, B2BProducts.sso],
    sessionOptions: { sessionDurationMinutes: 240 },
    emailMagicLinksOptions: {
      loginRedirectURL: "http://loaclhost:3002/authenticate",
      signupRedirectURL: "http://loaclhost:3002/authenticate",
    },
    ssoOptions: {
      loginRedirectURL: "http://loaclhost:3002/authenticate",
      signupRedirectURL: "http://loaclhost:3002/authenticate",
    },
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
        <div className="flex flex-col items-center w-[400px] max-w-md">
          <input
            type="text"
            required={true}
            placeholder="Input company slug "
            onChange={(e) => setCompanySlug(e.target.value)}
            className={`h-[50px] w-[350px] px-4 py-2 mb-5 border rounded-md shadow-sm focus:outline-none transition duration-300 ease-in-out`}
          />

          <button
            type="submit"
            onClick={() => {
              window.location.href = `http://localhost:3000/${companySlug}`;
            }}
            className={`flex font-bold justify-center w-[350px] bg-[#19303d] text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2`}
          >
            Sign in with SAML
          </button>
        </div>
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
