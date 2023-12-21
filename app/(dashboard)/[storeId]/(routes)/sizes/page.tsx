import * as dateFns from 'date-fns';

import prismadb from '@/lib/prisma-db';

import { SizeColumn } from './components/columns';
import  SizesClient  from './components/client';

export default async function SizesPage ({
  params
}: {
  params: { storeId: string }
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizeColumn[] = sizes.map((item: any) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: dateFns.format(item.createdAt, 'dd/MM/yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};