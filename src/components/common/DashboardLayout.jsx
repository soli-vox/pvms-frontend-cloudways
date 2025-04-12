import React from "react";
import { Outlet, useParams } from "react-router-dom";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import { useAuth } from "../../contexts/AuthContext";

const DashboardLayout = ({ role }) => {
  const { slug } = useParams();
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-700">
      <SideBar role={role} user={user} />
      <div className="flex-1 flex flex-col h-full">
        <TopNav role={role} user={user} />
        <main className="flex-1 p-6 overflow-auto bg-gray-700">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
