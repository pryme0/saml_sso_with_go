import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "../components/common/Spinner";
import { useStytchB2BClient, useStytchMemberSession } from "@stytch/react/b2b";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils";

// Define a single schema for both sign-in types
export const magicLinkSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

const samlSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
});
// Use a single type with optional fields for form values
type FormValues = {
  email?: string;
  company_name?: string;
};

enum SignInTypeEnum {
  MagicLink = "MagicLink",
  SAML = "SAML",
}

export const SignInPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const { session } = useStytchMemberSession();
  const [signInType, setSignInType] = useState<SignInTypeEnum>(
    SignInTypeEnum.MagicLink
  );
  const stytch = useStytchB2BClient();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(
      signInType === SignInTypeEnum.MagicLink ? magicLinkSchema : samlSchema
    ),
  });

  const handleMagicLinkSignIn = async (email: string) => {
    setEmail(email);
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/getStytchOrgId/${email}`);

      await stytch.magicLinks.email.loginOrSignup({
        email_address: email,
        organization_id: data.data.organization_id,
        login_redirect_url: "http://localhost:3000/authenticate",
      });
      setLoading(false);
      setMagicLinkSent(true);
    } catch (error: any) {
      console.log({ error });
      setLoading(false);
    }
  };

  const checkSession = useCallback(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleSAMLSignIn = async (company_name: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/signIn/saml/${company_name}`);

      setLoading(false);

      stytch.sso.start({
        connection_id: `${data.data.connection_id}`,
        login_redirect_url: "http://localhost:3000/authenticate",
        signup_redirect_url: "http://localhost:3000/authenticate",
      });
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      signInType === SignInTypeEnum.MagicLink
        ? data.email && handleMagicLinkSignIn(data["email"])
        : data.company_name && handleSAMLSignIn(data["company_name"]);
    } catch (error) {
      console.log({ error });
    }
  };

  const toggleFormType = (type: SignInTypeEnum) => {
    setSignInType(type);
    reset();
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign In With{" "}
          {signInType === SignInTypeEnum.MagicLink ? "Magic Link" : "SAML"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {signInType === SignInTypeEnum.MagicLink ? (
            magicLinkSent ? (
              <div className="mb-2">
                <p className="text-center block font-[700] text-lg font-medium text-gray-500">
                  A sign in link has been sent to your email !
                </p>

                <p
                  onClick={() => handleMagicLinkSignIn(email)}
                  className="flex justify-center hover:underline cursor-pointer text-center block font-[700] text-md font-medium text-blue-500 mt-[5px]"
                >
                  {loading ? <Spinner /> : "Resend link"}
                </p>
              </div>
            ) : (
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-[700] text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  
                  ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )
          ) : (
            <div className="mb-4">
              <label
                htmlFor="company_name"
                className="block font-[700] text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                id="company_name"
                type="text"
                {...register("company_name")}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  
                  ${errors.company_name ? "border-red-500" : ""}`}
              />
              {errors.company_name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.company_name.message}
                </p>
              )}
            </div>
          )}

          {!magicLinkSent && (
            <button
              type="submit"
              className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? <Spinner /> : "Sign In"}
            </button>
          )}
        </form>

        <div className="flex justify-center mt-10 pt-5 border-t-2">
          <button
            type="submit"
            onClick={() =>
              toggleFormType(
                signInType === SignInTypeEnum.MagicLink
                  ? SignInTypeEnum.SAML
                  : SignInTypeEnum.MagicLink
              )
            }
            className="flex items-center justify-center w-md bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Switch to{" "}
            {signInType === SignInTypeEnum.MagicLink ? "SAML" : "Magic Link"}
          </button>
        </div>
      </div>
    </div>
  );
};
