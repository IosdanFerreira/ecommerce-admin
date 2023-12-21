import { NextResponse } from 'next/server';

import prismadb from '@/lib/prisma-db';
import { auth } from '@clerk/nextjs';
import { StatusCodes } from 'http-status-codes';
 
export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: StatusCodes.UNAUTHORIZED });
    }

    if (!name) {
      return new NextResponse('name é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!value) {
      return new NextResponse('value é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!params.storeId) {
      return new NextResponse('storeId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: StatusCodes.UNAUTHORIZED });
    }

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLORS_POST]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
  try {
    if (!params.storeId) {
      return new NextResponse('storeId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId: params.storeId
      }
    });
  
    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};