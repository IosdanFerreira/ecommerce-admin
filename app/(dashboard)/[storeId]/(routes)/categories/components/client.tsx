'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';

import { columns, ICategoryColumn } from './columns';
import ApiList from '@/components/ui/api-list';
import Heading from '@/components/ui/heading';

interface ICategoriesClientProps {
  data: ICategoryColumn[];
}

export default function CategoriesClient({ data }: ICategoriesClientProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Categorias (${data.length})`} description="Gerencie as categorias da sua loja" />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar novo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="Endpoints das categorias" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};