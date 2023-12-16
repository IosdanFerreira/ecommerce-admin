import { NextResponse } from 'next/server';
import {auth} from '@clerk/nextjs';
import { StatusCodes } from 'http-status-codes';
import prismadb from '@/lib/prisma-db';


export async function PATCH(req: Request, { params } : { params: {storeId: string} }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if(!userId){
      return new NextResponse('Unauthorized', {status: StatusCodes.UNAUTHORIZED});
    }
    
    if(!name) {
      return new NextResponse('O Nome é obrigatório', {status: StatusCodes.BAD_REQUEST});
    }
    
    if(!params.storeId) {
      return new NextResponse('O ID da loja é obrigatório', {status: StatusCodes.BAD_REQUEST});
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId
      },
      data: {
        name
      }
    });

    return NextResponse.json(store);    
  } catch (error) {
    console.log('[STORE_PATCH]', error); 
    return new NextResponse('Erro interno', {status: StatusCodes.INTERNAL_SERVER_ERROR});
  }
}

export async function DELETE(req: Request, { params } : { params: {storeId: string} }) {
  try {
    const { userId } = auth();
  
    if(!userId){
      return new NextResponse('Unauthorized', {status: StatusCodes.UNAUTHORIZED});
    }
      
    if(!params.storeId) {
      return new NextResponse('O ID da loja é obrigatório', {status: StatusCodes.BAD_REQUEST});
    }
  
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId
      }
    });
  
    return NextResponse.json(store);    
  } catch (error) {
    console.log('[STORE_PATCH]', error); 
    return new NextResponse('Erro interno', {status: StatusCodes.INTERNAL_SERVER_ERROR});
  }
}