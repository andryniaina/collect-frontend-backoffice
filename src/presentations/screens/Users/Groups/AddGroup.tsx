import { Breadcrumbs } from "@/components/breadcrumbs";
import { GroupForm } from "@/components/forms/group-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsersSA } from "@/services/application/user.sa";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users", link: "/dashboard/users" },
  { title: "Groups", link: "/dashboard/users/groups" },
];
export default function CreateGroup() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersSA,
  });
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        {data && (
          <GroupForm
            categories={[
              { _id: "Public", name: "Public" },
              { _id: "Private", name: "Private" },
            ]}
            initialData={null}
            users={data.data}
            key={null}
          />
        )}
      </div>
    </ScrollArea>
  );
}
