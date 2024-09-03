import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Map from './Map';
import { useParams } from 'react-router-dom';


export default function ProjectStats() {
  const { id } = useParams();
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Project', link: '/dashboard/project' },
    { title: 'Stats', link: '/dashboard/project/stats/table/'+id },
    { title: 'Map', link: '/dashboard/project/stats/map/'+id }
  ];
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
        <Heading
          title={`Map`}
        />
      </div>
      <Separator />
      
      <Map />
      </div>
    </ScrollArea>
  );
}
