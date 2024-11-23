'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const signupSchema = z
  .object({
    fullName: z.string().min(1, { message: '请输入您的全名' }),
    email: z.string().email({ message: '请输入有效的邮箱地址' }),
    password: z.string().min(6, { message: '密码长度不能少于6位' }),
    confirmPassword: z.string().min(6, { message: '密码长度不能少于6位' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setLoading(true);
    // 模拟注册请求
    setTimeout(() => {
      setLoading(false);
      alert('注册成功');
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Razor</h1>
          <div className="text-gray-600">
            Sales@Razor.uk
            <span className="ml-2">→</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
          </button>
          <Link href="/login" className="text-gray-800">
            Log in
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-12 mb-12">
        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/4 w-32 h-32 bg-[#FFD7BA]/20 rounded-lg" />
        <div className="absolute right-0 bottom-1/4 w-32 h-32 bg-[#FFD7BA]/20 rounded-lg" />

        {/* Signup Form */}
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
            <p className="text-gray-600">Join Razor and start managing your projects efficiently</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              className="rounded-xl border-gray-200"
              {...register('fullName')}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            <Input
              type="email"
              placeholder="Email Address"
              className="rounded-xl border-gray-200"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <div className="relative">
              <Input
                type="password"
                placeholder="Create Password"
                className="rounded-xl border-gray-200"
                {...register('password')}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                Hide
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <div className="relative">
              <Input
                type="password"
                placeholder="Confirm Password"
                className="rounded-xl border-gray-200"
                {...register('confirmPassword')}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                Hide
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#FFD7BA] text-black hover:bg-[#FFD7BA]/90 rounded-xl"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or Sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="rounded-xl">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="sr-only">Google</span>
            </Button>
            <Button variant="outline" className="rounded-xl">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" className="rounded-xl">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="sr-only">Apple</span>
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-gray-900">
              Log in
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-6 text-center text-sm text-gray-600">
        <div className="flex justify-center items-center space-x-4">
          <span>Copyright @wework 2022</span>
          <span>|</span>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
