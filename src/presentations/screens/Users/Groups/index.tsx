import { Breadcrumbs } from '@/components/breadcrumbs';
import { GroupTable } from '@/components/tables/group-tables/group';
import { useEffect, useState } from 'react';
import { Group } from '@/data/const/data';
import { useQuery } from '@tanstack/react-query';
import { getGroupsSa } from '@/services/application/user.sa';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Users', link: '/dashboard/users' },
  { title: 'Groups', link: '/dashboard/users/groups' }
];
export  function ListGroup() {
  const {data: groups} = useQuery({queryKey:['groups'], queryFn: getGroupsSa, initialData:[]});

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <GroupTable data={groups} />
      </div>
    </>
  );
}
