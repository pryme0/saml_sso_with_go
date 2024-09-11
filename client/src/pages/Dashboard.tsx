import React, { useCallback, useEffect, useState } from "react";

import { useStytchMemberSession } from "@stytch/react/b2b";
import { Sidebar, Profile, Settings } from "../components";
import { useNavigate } from "react-router-dom";

export const Dashboard: React.FC = () => {
  const { session } = useStytchMemberSession();
  const [activeSection, setActiveSection] = useState("Profile");
  const navigate = useNavigate(); // Initialize useNavigate

  const checkSession = useCallback(() => {
    if (!session) {
      navigate("/");
    }
  }, [session, navigate]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex justify-center w-full flex-grow p-6">
        {activeSection === "Profile" && <Profile />}
        {activeSection === "Settings" && <Settings />}
      </div>
    </div>
  );
};
