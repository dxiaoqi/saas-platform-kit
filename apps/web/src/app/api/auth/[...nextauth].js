import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { prisma } from '@saas-platform/database';

export default NextAuth({
  providers: [
    Providers.Credentials({
      // 账号密码登录
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        // 在这里验证用户
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (user && user.password === credentials.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
    Providers.Google({
      // Google 登录
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: process.env.DATABASE_URL,
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
  },
});
