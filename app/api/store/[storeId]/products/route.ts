import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prisma-db';
import { StatusCodes } from 'http-status-codes';

export async function POST( req: Request, { params }: { params: { storeId: string } }) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: StatusCodes.UNAUTHORIZED });
    }

    if (!name) {
      return new NextResponse('name é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!images || !images.length) {
      return new NextResponse('images é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!price) {
      return new NextResponse('price é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!categoryId) {
      return new NextResponse('categoryId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!colorId) {
      return new NextResponse('colorId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    if (!sizeId) {
      return new NextResponse('sizeId é obrigatório', { status: StatusCodes.BAD_REQUEST });
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

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('storeId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};