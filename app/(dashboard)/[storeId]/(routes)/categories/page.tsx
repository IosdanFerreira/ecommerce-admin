import * as dateFns from 'date-fns';

import prismadb from '@/lib/prisma-db';

import { ICategoryColumn } from './components/columns';
import  CategoriesClient  from './components/client';

export default async function CategoriesPage({ params }: { params: { storeId: string }}) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: ICategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: dateFns.format(item.createdAt, 'dd/MM/yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};