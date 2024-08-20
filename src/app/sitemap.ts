import { db } from "@/db";
import { siteConfig } from "@/lib/site-config";
import type { MetadataRoute } from "next";

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

  //   return a sitemap object for each blog post
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/${post.author?.username}/${post.slug}`,
    lastModified: post.updatedAt,
  }));
  const userProfiles: MetadataRoute.Sitemap = users.map((user) => ({
    url: `${siteConfig.url}/${user.username}/`,
    lastModified: user.updatedAt,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/home`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },

    ...postPages, ...userProfiles
  ];
}