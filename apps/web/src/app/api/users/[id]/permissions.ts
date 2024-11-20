import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@saas-platform/database';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({ error: '未授权' });
  }

  const userId = parseInt(req.query.id as string);

  try {
    const permissions = await getUserPermissions(userId);
    res.json({ permissions });
  } catch (error) {
    res.status(500).json({ error: '获取权限失败' });
  }
}

async function getUserPermissions(userId: number): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
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
  user.roles.forEach(userRole => {
    userRole.role.permissions.forEach(permission => {
      permissions.add(permission.name);
    });
  });

  return Array.from(permissions);
}
