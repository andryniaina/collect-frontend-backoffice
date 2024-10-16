import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProjectFormTable } from "@/components/tables/projectform-tables/projectform";
import { useQuery } from "@tanstack/react-query";
import { getProjectForm } from "@/services/application/projectform.sa";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Project Form", link: "/dashboard/projectform" },
];
export default function ProjectForm() {
  const { data, isLoading } = useQuery({
    queryKey: ["project"],
    queryFn: getProjectForm,
  });
  return (
    <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />
      {!isLoading && <ProjectFormTable data={data} />}
    </div>
  );
}
