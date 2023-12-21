'use client';

import { Loader } from '@/components/ui/loader';

export default function Loading() {
  return ( 
    <div className="flex h-full pt-10 w-full items-center justify-center">
      <Loader />
    </div>
  );
};