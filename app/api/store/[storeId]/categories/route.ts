import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prisma-db';
import { StatusCodes } from 'http-status-codes';
 
export async function POST( req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: StatusCodes.UNAUTHORIZED });
    }

    if (!name) {
      return new NextResponse('nome é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }
    
    if (!billboardId) {
      return new NextResponse('billboardId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!params.storeId) {
      return new NextResponse('storeId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      }
    });
  
    return NextResponse.json(category);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse('Internal error', { status: StatusCodes.UNAUTHORIZED });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('store é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(categories);
  } catch (error) {
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse('Internal error', { status: StatusCodes.UNAUTHORIZED });
  }
};