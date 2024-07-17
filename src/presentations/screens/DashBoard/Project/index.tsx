import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProjectClient } from "@/components/tables/project-tables/client";
import { getForms } from "@/services/application/form.sa";
import { useQuery } from "@tanstack/react-query";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Project", link: "/dashboard/project" },
];
export default function Project() {
  const { data, isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: getForms,
  });
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        {!isLoading && <ProjectClient data={data} />}
      </div>
    </>
  );
}
