import Link from 'next/link';
import { AuthForm } from '@/components/auth-form';
import { Button } from '@nextui-org/react';
import { SiteLogo } from '@/components/Icons';
import { ArrowLeft } from 'lucide-react';
import { SignupAuthForm } from '@/components/signup-auth-form';

export const metadata = {
  title: 'Create account',
  description: 'Create an account to get started.',
};

export default function RegisterPage() {
  
  return (
    <div className='grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 px-6 lg:px-0'>
      <Button
        radius='sm'
        variant='ghost'
        className='absolute right-4 top-4 md:right-8 lg:hidden md:top-8 flex items-center gap-2'
      >
        <ArrowLeft className='h-4 w-4' />
        <Link href='/login'>Back</Link>
      </Button>
      <div className='hidden h-full bg-slate-100 dark:bg-slate-900 lg:grid place-content-center'>
        <div className='flex items-center gap-3'>
          <SiteLogo className="size-12" />
          <p className='font-bold text-inherit text-4xl uppercase'>quillstash</p>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>
            <p className='text-sm text-foreground-500'>
              Enter your email below to create your account
            </p>
          </div>
          <SignupAuthForm /> 
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              href='/sign-in'
              className='hover:text-brand underline underline-offset-2'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
