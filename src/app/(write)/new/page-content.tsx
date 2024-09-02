'use client';

import Container from '@/components/Container';
import TextEditor from '@/components/editor/TextEditor';
import { postSchema, PostValues } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Link } from '@nextui-org/react';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ConfirmModal from '@/components/editor/confirm-modal';

function PageContent() {
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const form = useForm<PostValues>({
    resolver: zodResolver(postSchema),
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    control,
    formState: { isSubmitting, errors },
  } = form;

  async function onSubmit(values: PostValues) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        toast.success('Post created successfully');
        router.push('/home');
      } else {
        toast.error('Failed to create post');
      }
    } catch {
      toast.error('Something went wrong, please try again.');
    }
  }

  // DRAFT CURRENTLY REQIRES A TITLE BUT WE ARE NOT SHOWING ANY ERROR MESSAGE
  // We will use a toast for now
  const handleSaveDraft = async () => {
    if (getValues().title.trim().length === 0) {
      return toast.error('Please add a title to save the draft');
    }
    setSaving(true);
    const draftData = getValues();

    try {
      // create a new draft
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/draft`, {
        method: 'POST',
        body: JSON.stringify({ ...draftData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        toast.success('Draft saved successfully');
      } else {
        toast.error('Failed to save draft');
      }
    } catch {
      toast.error('Something went wrong, please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEditorChange = (html: string) => {
    if (html.length > 0) {
      clearErrors('body');
    }
    setValue('body', html);
  };

  return (
    <>
      <nav className='sticky top-0 flex w-full justify-between gap-6 bg-background z-10 py-6'>
        <Button variant='light' href='/home' as={Link}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
        <div className='flex gap-6'>
          <ConfirmModal
            control={control}
            formRef={formRef}
            register={register}
            setValue={setValue}
            errors={errors}
            isSubmitting={isSubmitting}
          />
          <Button
            onClick={handleSaveDraft}
            variant={'ghost'}
            type='button'
            radius='sm'
            disabled={saving}
            isLoading={saving}
            className='border'
          >
            {saving ? 'Saving...' : 'Save to drafts'}
          </Button>
          <Button
            variant={'ghost'}
            type='button'
            isIconOnly
            radius='sm'
            className='border '
          >
            <HelpCircle size={16} />
          </Button>
        </div>
      </nav>

      {/* editor */}
      <Container className='grid pt-4 pb-20 max-w-screen-lg'>
        <div className='p-4 flex flex-col col-span-3'>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8 border dark:border-foreground-50 rounded-md pt-10 px-4'
          >
            <div className='flex flex-col'>
              <label htmlFor='title' className='sr-only' />
              <input
                placeholder='Title'
                {...register('title')}
                className=' w-full h-20 text-4xl font-bold bg-transparent focus:ring-0 focus:outline-none px-4'
              />
              {errors.title && (
                <p className='px-1 text-xs text-red-600'>
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-3'>
              <TextEditor value={watch('body')} onChange={handleEditorChange} />
              {errors.body && (
                <p className='px-1 text-xs text-red-600'>
                  {errors.body.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default PageContent;