'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { Globe } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: '请输入有效的邮箱地址' }),
  password: z.string().min(6, { message: '密码长度不能少于6位' }),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (result?.error) {
      alert(result.error);
    } else {
      window.location.href = '/';
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Google 登录失败，请稍后再试');
    } finally {
      setLoading(false);
    }
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
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/4 w-32 h-32 bg-[#FFD7BA]/20 rounded-lg" />
        <div className="absolute right-0 bottom-1/4 w-32 h-32 bg-[#FFD7BA]/20 rounded-lg" />

        {/* Login Form */}
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Agent Login</h2>
            <p className="text-gray-600">Hey, Enter your details to get sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter Email / Phone No"
              className="rounded-xl border-gray-200"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <div className="relative">
              <Input
                type="password"
                placeholder="Passcode"
                className="rounded-xl border-gray-200"
                {...register('password')}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                Hide
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors?.password?.message}</p>}
            <div className="text-sm">
              <Link href="/trouble-signin" className="text-gray-600 hover:underline">
                Having trouble in sign in?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FFD7BA] text-black hover:bg-[#FFD7BA]/90 rounded-xl"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or Sign in with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="rounded-xl" onClick={handleGoogleSignIn}>
              <FcGoogle className="h-5 w-5" />
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
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-gray-900">
              Request Now
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
