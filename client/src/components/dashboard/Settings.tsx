import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../store/reducers";
import { axiosInstance } from "../../utils";
import Spinner from "../common/Spinner";

interface SAMLFormInputs {
  idp_issuer_url: string;
  idp_sign_on_url: string;
  signing_certificate: string;
}

export const Settings = () => {
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Successfully copied to clipboard", {
      position: "top-right",
      autoClose: 3000, // Close after 3 seconds
    });
  };

  const tenant = useSelector((state: RootState) => state.tenantReducer.tenant);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SAMLFormInputs>({
    defaultValues: {
      idp_sign_on_url: tenant?.idp_sign_on_url || "",
      idp_issuer_url: tenant?.idp_issuer_url || "",
    },
  });

  const onSubmit = async (data: SAMLFormInputs) => {
    try {
      setLoading(true);
      await axiosInstance.put(
        `/tenants/update/saml-connection/${tenant.ID}`,
        data
      );
      setLoading(false);
      setShowForm(false);
      reset();
      toast.success("SAML Configuration updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
      });
    } catch (error) {
      console.log({ error });
      setLoading(false);

      toast.error(
        "SAML Configuration Failed, please try again with the correct credentials",
        {
          position: "top-right",
          autoClose: 3000, // Close after 3 seconds
        }
      );
    }
  };

  return (
    <div className="flex  flex-col w-full md:w-1/2">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Configure Saml
        </button>

        {showForm && (
          <div className="mt-6">
            <div className="mt-16 mb-[100px]">
              <h2 className="text-xl font-semibold mb-4">
                Use the credentails below to setup SAML on your idp
              </h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Copy the ACS url below and paste it into your identity
                  provider SAML configuration.
                </label>
                <div
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                  onClick={() =>
                    copyToClipboard(tenant && tenant.stytch_acs_url)
                  }
                  title="Click to copy"
                >
                  {tenant.stytch_acs_url}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Copy the Audience url below and paste it into your identity
                </label>
                <div
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                  onClick={() => copyToClipboard(tenant.stytch_audience_url)}
                  title="Click to copy"
                >
                  {tenant.stytch_audience_url}
                </div>
              </div>
            </div>
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-4">
                  Input the credentials gotten from your identity provider to
                  set up SAML on Pooja
                </h2>
                <label
                  htmlFor="idpIssuerUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  IDP Issuer URL
                </label>
                <input
                  {...register("idp_issuer_url", {
                    required: "IDP Issuer URL is required",
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: "Enter a valid URL",
                    },
                  })}
                  type="text"
                  id="idpIssuerUrl"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter IDP Issuer URL"
                />
                {errors.idp_issuer_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.idp_issuer_url.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="idpSignOnUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  IDP Sign-On URL
                </label>
                <input
                  {...register("idp_sign_on_url", {
                    required: "IDP Sign-On URL is required",
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: "Enter a valid URL",
                    },
                  })}
                  type="text"
                  id="idpSignOnUrl"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter IDP Sign-On URL"
                />
                {errors.idp_sign_on_url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.idp_sign_on_url.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="idpSignOnUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  IDP Signing Certificate
                </label>
                <textarea
                  {...register("signing_certificate", {
                    required: "IDP Signing Certificate is required",
                  })}
                  id="idpSigningCertificate"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter IDP Signing Certificate"
                />

                {errors.signing_certificate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.signing_certificate.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? <Spinner /> : "Update SAML configuration"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
