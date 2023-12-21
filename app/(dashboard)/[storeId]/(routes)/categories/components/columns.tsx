'use client';

import { ColumnDef } from '@tanstack/react-table';

import  CellAction  from './cell-action';

export interface ICategoryColumn {
  id: string
  name: string;
  billboardLabel: string;
  createdAt: string;
}

export const columns: ColumnDef<ICategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'billboard',
    header: 'Quadro',
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: 'createdAt',
    header: 'Data',
  },
  {
    id: 'Ações',
    cell: ({ row }) => <CellAction data={row.original} />
  },
];