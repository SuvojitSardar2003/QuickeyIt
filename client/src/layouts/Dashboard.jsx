import React from "react";
import UserMenu from "../components/UserMenu";
import Divider from "../components/Divider";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto grid lg:grid-cols-[250px_1fr]">
        {/*left for menu*/}
        <div className="py-4 sticky top-28 max-h-[calc(100vh-112px)] overflow-y-auto hidden lg:block border-r border-[#f1f4f8]">
          <UserMenu />
        </div>

        {/*right for content*/}
        <div className="bg-white p-1 min-h-[80vh]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
