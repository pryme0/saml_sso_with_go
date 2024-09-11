import React from "react";

import { useStytchMember, useStytchOrganization } from "@stytch/react/b2b";

export const Profile = () => {
  const { member } = useStytchMember();
  const { organization } = useStytchOrganization();

  console.log({ roles: member?.roles });

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="flex flex-col w-full gap-5 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4"> User Details </h2>
        <div className="flex items-center h-20 ">
          <img
            alt="Stytch_Logo.png"
            className="w-20 h-20 mr-5"
            src="Stytch_Logo.png"
          />
          <div>
            <p className="flex gap-8 ">
              <strong>Name</strong> {member?.name.split(" ")[0]}{" "}
              {member?.name.split(" ")[1]}
            </p>
            <p className="flex gap-8">
              <strong>Email</strong> {member?.email_address}
            </p>
          </div>
        </div>

        <div className=" flex mt-5 flex-col w-fill gap-5 bg-white p-6 shadow-md rounded-lg">
          <div className="flex items-center justify-between   w-full">
            <h2 className="flex text-xl font-semibold mb-4">
              Personal information
            </h2>
            <button
              type="submit"
              className={`hover:bg-[#19303d] hover:text-[#fff] cursor-pointer border-[1px]  border-[#19303d] flex font-bold justify-center items-center   text-[#19303d] py-1 px-4 rounded-md shadow-sm `}
            >
              Edit
            </button>
          </div>

          <div className="rounded-md px-5 flex items-center   h-20  bg-gray-100">
            <div className="flex flex-col w-1/2">
              <p className="flex gap-8">
                <strong>First Name</strong>
              </p>

              <p className="flex gap-8">{member?.name.split(" ")[0]}</p>
            </div>
            <div>
              <p className="flex gap-8">
                <strong>Last Name</strong>
              </p>

              <p className="flex gap-8">{member?.name.split(" ")[1]}</p>
            </div>
          </div>
          <div className="rounded-md px-5 flex items-center  h-20  bg-gray-100">
            <div className="flex flex-col w-1/2">
              <p className="flex gap-8">
                <strong>Email Address</strong>
              </p>

              <p className="flex gap-8">{member?.email_address}</p>
            </div>
            <div>
              <p className="flex gap-8">
                <strong>Phone</strong>
              </p>

              <p className="flex gap-8">(213)55-1234</p>
            </div>
          </div>
          <div className="rounded-md px-5 gap-100 flex items-center h-20  bg-gray-100">
            <div className="flex flex-col w-1/2">
              <p className="flex gap-8">
                <strong>Role</strong>
              </p>

              <p className="flex gap-8">
                {member?.roles?.map((role) => {
                  return `  ${role.role_id}   ,`;
                })}
              </p>
            </div>
            <div>
              <p className="flex gap-8">
                <strong>SAML Configured</strong>
              </p>

              <p className="flex gap-8">
                {organization && organization?.sso_active_connections
                  ? "True"
                  : "False"}
              </p>
            </div>
          </div>
        </div>

        <div className=" flex mt-5 flex-col w-fill gap-5 bg-white p-6 shadow-md rounded-lg">
          <div className="flex items-center justify-between   w-full">
            <h2 className="flex text-xl font-semibold mb-4">Address</h2>
            <button
              type="submit"
              className={`hover:bg-[#19303d] hover:text-[#fff] cursor-pointer border-[1px]  border-[#19303d] flex font-bold justify-center items-center   text-[#19303d] py-1 px-4 rounded-md shadow-sm `}
            >
              Edit
            </button>
          </div>

          <div className="rounded-md px-5 flex items-center   h-20  bg-gray-100">
            <div className="flex flex-col w-1/2">
              <p className="flex gap-8">
                <strong>Country</strong>
              </p>

              <p className="flex gap-8">United States of America</p>
            </div>
            <div>
              <p className="flex gap-8">
                <strong>City/state</strong>
              </p>

              <p className="flex gap-8">Carlifonia</p>
            </div>
          </div>

          <div className="rounded-md px-5 gap-100 flex items-center h-20  bg-gray-100">
            <div className="flex flex-col w-1/2">
              <p className="flex gap-8">
                <strong>Postal Code</strong>
              </p>

              <p className="flex gap-8">ERT 62574</p>
            </div>
            <div>
              <p className="flex gap-8">
                <strong>Tax Id</strong>
              </p>

              <p className="flex gap-8">AS564178969</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
