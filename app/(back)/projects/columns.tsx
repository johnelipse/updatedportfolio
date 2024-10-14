"use client";

import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import { Project } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

const trimTitle = (title: string, maxLength: number = 45) => {
  if (title.length <= maxLength) return title;
  return title.slice(0, maxLength) + "...";
};

export const columns: ColumnDef<Project>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "imageUrl",
    header: "Project Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span title={title}>{trimTitle(title)}</span>;
    },
  },

  // {
  //   accessorKey: "link",
  //   header: "Article Link",
  //   cell: ({ row }) => {
  //     const data = row.original;
  //     return (
  //       <Link
  //         href={`/detailed//${data.slug}`}
  //         className="text-blue-600 hover:underline"
  //       >
  //         View Article
  //       </Link>
  //     );
  //   },
  // },

  {
    accessorKey: "createdAt",
    header: "Date published",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <ActionColumn
          row={row}
          model="news"
          editEndpoint={`/update-project/${data.id}`}
          id={data.id}
        />
      );
    },
  },
];
