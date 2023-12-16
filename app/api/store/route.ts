import { NextResponse } from 'next/server';
import {auth} from '@clerk/nextjs';
import { StatusCodes } from 'http-status-codes';
import prismadb from '@/lib/prisma-db';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if(!userId){
      return new NextResponse('Unauthorized', {status: StatusCodes.UNAUTHORIZED});
    }
    
    if(!name) {
      return new NextResponse('O Campo Nome é obrigatório', {status: StatusCodes.BAD_REQUEST});
    }

    const store = await prismadb.store.create({
      data:{
        name,
        userId
      }
    });

    return NextResponse.json(store);
        
  } catch (error) {
    console.log('[STORES_POST]', error); 
    return new NextResponse('Erro interno', {status: StatusCodes.INTERNAL_SERVER_ERROR});
  }
}