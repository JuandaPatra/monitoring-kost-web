"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Leads = {
  id: string
  name: string
  status: number
  property_id : number,
  property_name: string
  email: string 
}

export const columns: ColumnDef<Leads>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "property_name",
    header: "Properti",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
