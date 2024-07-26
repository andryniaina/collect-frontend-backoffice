'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Project } from '@/data/const/data' ;
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { columns } from './columns';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from 'react';

interface ProductsClientProps {
  data: Project[];
}

export const ProjectClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useNavigate();

  const [projects, setProjects] = useState(data);

  const handleTabChange = (value: string) => {
    if(value === 'All') {
      setProjects(data);
    }
    if(value === 'Deployed') {
      setProjects(data.filter((project:any) => project.status === 'Deployed'));
    }
    if(value === 'Draft') {
      setProjects(data.filter((project:any) => project.status === 'Draft'));
    }
    if(value === 'Archived') {
      setProjects(data.filter((project:any) => project.status === 'Archived'));
    }
    console.log(value);
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Projects (${data.length})`}
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router(`/dashboard/project/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <Tabs defaultValue="all" onValueChange={handleTabChange}>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Deployed">Deployed</TabsTrigger>
                <TabsTrigger value="Draft">Draft</TabsTrigger>
                <TabsTrigger value="Archived" className="hidden sm:flex">
                  Archived
                </TabsTrigger>
              </TabsList>
            </div>
      </Tabs>
      <DataTable searchKey="name" columns={columns} data={projects} />
    </>
  );
};
