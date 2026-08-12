"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  icon: React.ReactNode;
}

export const HeroStatCard = ({ title, icon, children }: Props) => {
  return (
    <Card className="text-[#0F172A]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base sm:text-lg font-medium text-[#0F172A]">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
