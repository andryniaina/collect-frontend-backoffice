import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/data/const/data' ;
import { useEffect, useState } from 'react';

interface ProductsClientProps {
  data: Project[];
  submissions: any[];
}
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { add } from 'date-fns';

export const DataTableClient: React.FC<ProductsClientProps> = ({ data, submissions }) => {

  const [projects, setProjects] = useState(data);

  const [columns, setColumns] = useState<ColumnDef<Project>[]>([
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    }
  ]);
  

  useEffect(() => {
    console.log(submissions);
    if(submissions.length > 0) {
      let additionnalColumnKeys: string[] = [] ;
      submissions.forEach((submission: any) => {
        const columnsKeys = Object.keys(submission) ;
        additionnalColumnKeys= [...additionnalColumnKeys, ...columnsKeys] ;
      })
      let columnKeys = [...new Set(additionnalColumnKeys)]
      setColumns([
        ...columns,
        ...columnKeys.map((key: string) => ({
          accessorKey: key,
          header: key
        })),
        {
          id: 'actions',
          cell: ({ row }) => <CellAction data={row.original} />
        }
      ])
    } 
  }, [submissions]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Data`}
        />
      </div>
      <Separator />
      <DataTable searchKey="_id" columns={columns} data={submissions} />
    </>
  );
};
