import * as dateFns from 'date-fns';

import prismadb from '@/lib/prisma-db';

import { IBillboardColumn } from './components/columns';
import  BillboardClient  from './components/client';

export default async function BillboardsPage({
  params
}: {
  params: { storeId: string }
}) {

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBillboards: IBillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: dateFns.format(item.createdAt, 'dd/MM/yyyy')
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};