import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProjectClient } from '@/components/tables/project-tables/client';
import { projects } from '@/data/const/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Project', link: '/dashboard/project' }
];
export default function Project() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ProjectClient data={projects} />
      </div>
    </>
  );
}
