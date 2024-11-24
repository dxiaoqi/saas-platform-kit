import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateAuth } from '../middleware/auth';
import prisma from '../db';
const router = Router();

// 注册
router.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 验证输入
    if (!email || !password || !username) {
      return res.status(400).json({ message: '所有字段都是必填的' });
    }

    // 检查用户是否存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: '用户名或邮箱已被使用' });
    }

    // 创建用户
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    res.status(201).json({ message: '注册成功', user });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '注册失败' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password ?? '');
    if (!isValidPassword) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'default-secret', {
      expiresIn: '24h',
    });

    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '登录失败' });
  }
});

// 获取当前用户信息
router.get('/me', validateAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.userId) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    res.json({ user });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ message: '获取用户信息失败' });
  }
});

export const authRouter = router;
