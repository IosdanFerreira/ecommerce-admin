import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prisma-db';
import { StatusCodes } from 'http-status-codes';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse('productId é obrigatório', { status: StatusCodes.BAD_REQUEST });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: StatusCodes.UNAUTHORIZED });
    }

    if (!params.productId) {
      return new NextResponse('productId é obrigatório', { status: StatusCodes.BAD_REQUEST });
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, price, categoryId, images, colorId, sizeId, isFeatured, isArchived } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: StatusCodes.UNAUTHORIZED });
    }

    if (!params.productId) {
      return new NextResponse('productId é obrigatório', { status: StatusCodes.BAD_REQUEST });
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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: StatusCodes.UNAUTHORIZED });
    }

    await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
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
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse('Internal error', { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
};