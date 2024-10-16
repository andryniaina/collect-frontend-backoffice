"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Group } from "@/data/const/data";
import { Plus, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { columns } from "./columns";

interface GroupClientProps {
  data: Group[];
}

export const GroupTable: React.FC<GroupClientProps> = ({ data }) => {
  const router = useNavigate();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Groups (${data.length})`} />
          <Button
            className="text-xs md:text-sm"
            onClick={() => router(`/dashboard/users/groups/create`)}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Group
          </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
