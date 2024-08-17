import {
  boolean,
  timestamp,
  pgTable,
  text,
  integer,
  primaryKey,
  json,
} from 'drizzle-orm/pg-core';
import { InferSelectModel, relations } from 'drizzle-orm';
import type { AdapterAccountType } from 'next-auth/adapters';

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text('username').unique(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  password: text('password'),
  image: text('image'),
  role: text('role').default('Blogger'),
  bio: text('bio'),
  location: text('location'),
  pronouns: text('pronouns'),
  work: text('work'),
  github: text('github'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
export type User = InferSelectModel<typeof users>; // export a type for the posts table just incase

// Accounts table
export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

// Sessions table
export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const posts = pgTable('posts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  coverImage: text('coverImage'),
  summary: text('summary'), // for seo purposes we fit use ai generate am later user doesnt need to care about this
  body: text('body').notNull(),
  featured: boolean('featured').default(false).notNull(),
  views: integer('views').default(0).notNull(),
  tags: json('tags').$type<string[]>(), // Tags are stored as a JSON array
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
export type Post = InferSelectModel<typeof posts>; // export a type for the posts table just incase

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

// Join table for post likes
export const postLikes = pgTable('post_likes', {
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  primaryKey: (text('post_id'), text('user_id')),
});

// Join table for post bookmarks
export const postBookmarks = pgTable('post_bookmarks', {
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  primaryKey: (text('post_id'), text('user_id')),
});

// Comments table
export const comments = pgTable('comments', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  body: text('body').notNull(),
  // Use JSON for storing likes as an array
  likes: json('likes').$type<string[]>(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Recursive relation for comment replies
export const commentReplies = pgTable('comment_replies', {
  commentId: text('comment_id').references(() => comments.id, {
    onDelete: 'cascade',
  }),
  replyId: text('reply_id').references(() => comments.id, {
    onDelete: 'cascade',
  }),
  primaryKey: (text('comment_id'), text('reply_id')),
});

// Tags table
export const tags = pgTable('tags', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').unique().notNull(),
});

// Join table for posts and tags (many-to-many relationship)
export const postTags = pgTable('post_tags', {
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  tagId: text('tag_id').references(() => tags.id, { onDelete: 'cascade' }),
  primaryKey: (text('post_id'), text('tag_id')),
});
