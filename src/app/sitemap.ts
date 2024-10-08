import { db } from '@/db';
import { siteConfig } from '@/lib/site-config';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fetch all blog posts to index their urls
  const posts = await db.query.posts.findMany({
    with: {
      author: {
        columns: {
          username: true,
        },
      },
    },
  });
  const users = await db.query.users.findMany();
  const tags = await db.query.tags.findMany();

   // Return a sitemap object for each blog post
   const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/${post.author?.username}/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Return a sitemap object for each tag 
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${siteConfig.url}/tag/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Return a sitemap object for each user
  const userProfiles: MetadataRoute.Sitemap = users.map((user) => ({
    url: `${siteConfig.url}/${user.username}`,
    lastModified: user.updatedAt,
    changeFrequency: 'yearly',
    priority: 0.4,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/home`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/sign-in`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/sign-up`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },

    ...postPages,
    ...tagPages,
    ...userProfiles,
  ];
}
