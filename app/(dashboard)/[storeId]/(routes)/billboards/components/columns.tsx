'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export interface IBillboardColumn {
  id: string
  label: string;
  createdAt: string;
}

export const columns: ColumnDef<IBillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Titulo',
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