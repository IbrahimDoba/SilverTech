import { MDXRemote } from 'next-mdx-remote/rsc';
import { getMdxContent } from '@/utils/get-content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Quillstash',
};

export default async function Page() {
  const { content } = await getMdxContent('privacy');

  return (
   <article className='prose mx-auto py-6 lg:py-12 xl:prose-lg dark:prose-invert px-6'>
      <MDXRemote source={content} />
   </article>
  );
}
