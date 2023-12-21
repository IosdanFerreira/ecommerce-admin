'use client';

import { DataTable } from '@/components/ui/data-table';
import  Heading  from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { columns, OrderColumn } from './columns';

interface OrderClientProps {
  data: OrderColumn[];
}

export default function OrderClient({
  data
}:OrderClientProps) {
  return (
    <>
      <Heading title={`Pedidos (${data.length})`} description="Gerencie aqui seus pedidos" />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};