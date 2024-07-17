import { Breadcrumbs } from '@/components/breadcrumbs';
import { UsersTable } from '@/components/tables/user-tables/user';
import { projects } from '@/data/const/data';
import { useEffect, useState } from 'react';
import { getUsersSA } from '@/services/application/user.sa';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/users' }
];
export  function ListUser() {
  const [users, setUsers] = useState([]);

  const getListUsers = () => {
    getUsersSA().then(resp => {
      if (resp?.status == 200) {
        setUsers(resp.data);
      }
    });
  }

  useEffect(() => {
    getListUsers();
  }, [])

  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <UsersTable data={users} />
      </div>
    </>
  );
}
