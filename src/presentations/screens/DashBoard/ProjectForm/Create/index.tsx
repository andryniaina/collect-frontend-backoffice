import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProjectFormular } from '@/components/forms/project-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Project Form', link: '/dashboard/projectform' },
  { title: 'Create', link: '/dashboard/projectform/new' }
];
export default function CreateProjectForm() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <ProjectFormular
          categories={[
            { _id: 'Public', name: 'Public' },
            { _id: 'Private', name: 'Private' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
