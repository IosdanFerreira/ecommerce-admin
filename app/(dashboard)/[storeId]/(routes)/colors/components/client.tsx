'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import  Heading  from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import  ApiList  from '@/components/ui/api-list';

import { columns, ColorColumn } from './columns';

interface ColorClientProps {
  data: ColorColumn[];
}

export default function ColorClient({
  data
}: ColorClientProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Colors (${data.length})`} description="Gerencie as cores dos seus produtos" />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Endpoints das cores" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};