import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../middleware/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 检查权限
  const authResponse = await withAuth(req, ['users:create']);
  if (authResponse.status !== 200) {
    return res.status(authResponse.status).json(authResponse.body);
  }

  // 处理请求
  res.json({ message: '成功访问受保护的路由' });
}
