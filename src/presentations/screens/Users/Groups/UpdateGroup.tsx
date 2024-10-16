import { Breadcrumbs } from "@/components/breadcrumbs";
import { GroupForm } from "@/components/forms/group-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGroupSa, getUsersSA } from "@/services/application/user.sa";
import { useParams } from "react-router-dom";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users", link: "/dashboard/users" },
  { title: "Groups", link: "/dashboard/users/groups" },
];
export default function UpdateGroup() {
   const params = useParams() ;
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersSA,
  });
  const {data: group, isLoading: isGroupLoading} = useQuery({queryKey:["group"+params.id], queryFn: ()=>getGroupSa(params.id ?? "")});

  if(group) {
    console.log(group)
  }
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        {data && !isGroupLoading &&  (
          <GroupForm
            categories={[
              { _id: "Public", name: "Public" },
              { _id: "Private", name: "Private" },
            ]}
            initialData={group}
            users={data.data}
            key={null}
          />
        )}
      </div>
    </ScrollArea>
  );
}
