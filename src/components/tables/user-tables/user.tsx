"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/data/const/data";
import { Plus, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { columns } from "./columns";

interface ProductsClientProps {
  data: Project[];
}

export const UsersTable: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useNavigate();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Users (${data.length})`} />
        <div className="flex gap-3">
          <Button
            className="text-xs md:text-sm"
            onClick={() => router(`/dashboard/users/groups`)}
          >
            <List className="mr-2 h-4 w-4" /> View Groups
          </Button>
          <Button
            className="text-xs md:text-sm"
            onClick={() => router(`/dashboard/adduser`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add User
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
