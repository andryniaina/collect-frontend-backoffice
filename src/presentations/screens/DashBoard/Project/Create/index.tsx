import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Project', link: '/dashboard/project' },
  { title: 'Create', link: '/dashboard/project/new' }
];
export default function CreateProject() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductForm
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
