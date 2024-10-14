import DataTable from "@/components/DataTableComponents/DataTable";
import TableHeader from "@/components/DataTableComponents/TableHeader";
import React from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { fetchProjects } from "@/Actions/ProjectActions";

export default async function page() {
  const projects = (await fetchProjects()) || [];
  return (
    <div>
      <div className="lg:p-8 md:p-8 ">
        <TableHeader
          title="My Projects"
          linkTitle="Create Project"
          href="/create-project"
          data={projects}
          model="project"
        />
        <div className="py-8">
          <DataTable data={projects} columns={columns} />
        </div>
      </div>
      <Button>
        <Link href="/create-project">Create</Link>
      </Button>
    </div>
  );
}
