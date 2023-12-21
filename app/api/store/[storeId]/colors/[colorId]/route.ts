import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prisma-db';
import { StatusCodes } from 'http-status-codes';

export async function GET(req: Request, { params }: { params: { colorId: string } }) {
  try {
    if (!params.colorId) {
      return new NextResponse('colorId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_GET]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export async function DELETE(req: Request, { params }: { params: { colorId: string, storeId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: StatusCodes.UNAUTHORIZED });
    }

    if (!params.colorId) {
      return new NextResponse('colorId é obrigatório', { status: StatusCodes.BAD_REQUEST });
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

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_DELETE]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};


export async function PATCH( req: Request,{ params }: { params: { colorId: string, storeId: string } }) {
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


    if (!params.colorId) {
      return new NextResponse('colorId é obrigatório', { status: StatusCodes.BAD_REQUEST });
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

    const color = await prismadb.color.update({
      where: {
        id: params.colorId
      },
      data: {
        name,
        value
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLOR_PATCH]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};