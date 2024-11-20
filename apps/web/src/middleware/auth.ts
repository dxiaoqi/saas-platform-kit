import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@saas-platform/database';

export async function withAuth(request: NextRequest, requiredPermissions: string[] = []) {
  const session = await getSession({ req: request as any });

  if (!session?.user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (requiredPermissions.length > 0) {
    const userPermissions = await getUserPermissions(session.user.id);

    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return NextResponse.json({ error: '没有足够的权限' }, { status: 403 });
    }
  }

  return NextResponse.next();
}

async function getUserPermissions(userId: number): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      userRole: {
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      },
    },
  });

  if (!user) return [];

  const permissions = new Set<string>();
  user.userRole.forEach(userRole => {
    userRole.role.permissions.forEach(permission => {
      permissions.add(permission.name);
    });
  });

  return Array.from(permissions);
}
