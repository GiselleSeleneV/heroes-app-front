import { CustomMenu } from "@/components/custom/CustomMenu";
import { Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] p-4 text-white">
      <div className="max-w-7xl mx-auto">
        <CustomMenu />

        <Outlet />
      </div>
    </div>
  );
};
