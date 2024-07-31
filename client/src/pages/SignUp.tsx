import React, { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance, excludedProviders } from "../utils";
import Spinner from "../components/common/Spinner";
import { useNavigate } from "react-router-dom";
import { useStytchMemberSession } from "@stytch/react/b2b";
import { toast } from "react-toastify";

const schema = z.object({
  company_name: z.string().min(3, "Company name is required"),
  name: z.string().min(5, "Name is required"),
  email: z
    .string()
    .email("Email is required")
    .refine((email) => {
      const domain = email.split("@")[1];
      return !excludedProviders.includes(domain);
    }, "Provide a valid work email"),
});

interface formInterface {
  company_name: string;
  name: string;
  email: string;
}

export const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { session } = useStytchMemberSession();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<formInterface>({
    resolver: zodResolver(schema),
    defaultValues: {
      company_name: "",
      email: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<formInterface> = async (data) => {
    try {
      setLoading(true);
      await axiosInstance.post("/signup", data);
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      console.error({ error });
      toast.error(error.response.data.message || "Something went wrong", {
        position: "top-right",
        autoClose: 3000,
      });
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

  return (
    <div className="flex w-full items-center justify-center  bg-gray-100">
      <div className="max-w-md w-full bg-white p-5 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Input full name"
              {...register("name")}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  
                ${errors.name ? "border-red-500" : ""}`}
            />
            {touchedFields.name && errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Work Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Input work email"
              {...register("email")}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  
                ${errors.email ? "border-red-500" : ""}`}
            />
            {touchedFields.email && errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="company_name"
              className="block text-sm font-medium text-gray-700"
            >
              Company name
            </label>
            <input
              id="company_name"
              type="text"
              placeholder="Input company name"
              {...register("company_name")}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  
                ${errors.company_name ? "border-red-500" : ""}`}
            />
            {touchedFields.company_name && errors.company_name && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.company_name.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="flex justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? <Spinner /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};
