import { NextResponse } from 'next/server';

import prismadb from '@/lib/prisma-db';
import { auth } from '@clerk/nextjs';
import { StatusCodes } from 'http-status-codes';

export async function GET(req: Request, { params }: { params: { sizeId: string } }) {
  try {
    if (!params.sizeId) {
      return new NextResponse('sizeId é obrigatório', { status: StatusCodes.UNAUTHORIZED });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_GET]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: StatusCodes.UNAUTHORIZED });
    }

    if (!params.sizeId) {
      return new NextResponse('sizeId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 405 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_DELETE]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};


export async function PATCH(req: Request, { params }: { params: { sizeId: string, storeId: string } }) {
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


    if (!params.sizeId) {
      return new NextResponse('sizeId é obrigatório', { status: StatusCodes.BAD_REQUEST });
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

    const size = await prismadb.size.update({
      where: {
        id: params.sizeId
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE_PATCH]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};