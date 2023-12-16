import prismadb from '@/lib/prisma-db';
import React from 'react';

interface IDashboardPage {
  params: {storeId: string}
}

export default async function DashboardPage({params}: IDashboardPage) {

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  });

  return (
    <div>{store?.name}</div>
  );
}
