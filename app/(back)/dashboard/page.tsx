import ActivityCard from "@/components/back/activityCard";
import DashboardCards from "@/components/back/dashboardCards";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <DashboardCards />
      <div
        className="flex mt-8 flex-1 py-4 bg-white items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Manage Your Projects.
          </h3>
          <p className="text-sm text-muted-foreground">
            Start publishing your projects to engage your audience.
          </p>
          <Link href="/create-project">
            <Button className="mt-2 bg-[#f53b07]">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Article
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <ActivityCard />
      </div>
    </div>
  );
}
