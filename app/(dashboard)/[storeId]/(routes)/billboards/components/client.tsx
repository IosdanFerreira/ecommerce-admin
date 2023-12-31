'use client';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { IBillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface IBillboardClient {
  data: IBillboardColumn[]
}

export default function BillboardClient({ data }: IBillboardClient) {
  const params = useParams();
  const router = useRouter();
  
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
          title={`Quadros (${data.length})`}
          description='Gerencie os quadros da sua loja'
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className='mr-2 h-4 w-4' />  
        Adicionar
        </Button>
      </div>
      <Separator />

      <DataTable 
        columns={columns}
        data={data}
        searchKey='label'
      /> 

      <Heading title="API" description="Endpoints dos quadros" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
