/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Badge } from "../ui/badge";

export default function StatusColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const status = row.getValue(`${accessorKey}`);

  return <Badge variant="outline">{status ? "Active" : "Disabled"}</Badge>;
}
