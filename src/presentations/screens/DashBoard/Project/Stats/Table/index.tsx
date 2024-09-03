import { Breadcrumbs } from "@/components/breadcrumbs";
import { DataTableClient } from "@/components/tables/data-tables/client";
import { getForms } from "@/services/application/form.sa";
import { getSubmissionsByFormId } from "@/services/application/submissions.sa";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Project() {
  const { data, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: getForms,
  });
  const { id }  = useParams() as {id : string};
  const {data: submissions, isLoading: isLoadingSubmissions} = useQuery({
    queryKey: ["submissions",id],
    queryFn: () => getSubmissionsByFormId(id),
  });
  const breadcrumbItems = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Project", link: "/dashboard/project" },
    { title: "Stats", link: "/dashboard/project/stats/map/" + id },
    { title: "Table", link: "/dashboard/project/stats/table/" + id },
  ];
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        {!isLoading && <DataTableClient data={data} submissions={submissions} />}
      </div>
    </>
  );
}
