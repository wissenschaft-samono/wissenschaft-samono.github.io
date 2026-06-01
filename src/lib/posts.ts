import { getCollection } from 'astro:content';

export type Post = Awaited<ReturnType<typeof getAllPosts>>[number];

export const isProduction = import.meta.env.PROD;

export async function getAllPosts() {
  const posts = await getCollection('posts');
  return posts
    .filter((post) => !isProduction || !post.data.draft)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export async function getRecentPosts(limit = 10) {
  return (await getAllPosts()).slice(0, limit);
}

export async function getCategories() {
  const counts = new Map<string, number>();
  for (const post of await getAllPosts()) {
    counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ja'));
}

export function getArchiveYears(posts: Post[]) {
  const years = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.publishedAt.getFullYear();
    years.set(year, [...(years.get(year) ?? []), post]);
  }
  return [...years.entries()].sort((a, b) => b[0] - a[0]);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('ja-JP', {
    dateStyle: 'medium',
    timeZone: 'Asia/Tokyo',
  }).format(date);
}

export function categoryPath(category: string) {
  return `/categories/${encodeURIComponent(category)}/`;
}
