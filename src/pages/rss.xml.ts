import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import getSortedShorts from "@utils/getSortedShorts";
import slugify from "@utils/slugify";
import { SITE } from "@config";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  const shorts = await getCollection("short");
  const sortedShorts = getSortedShorts(shorts);

  const itemsPost = sortedPosts.map(({ data }) => ({
    link: `posts/${slugify(data)}`,
    title: data.title,
    description: data.description,
    pubDate: new Date(data.pubDatetime),
  }));
  const itemsShort = sortedShorts.map(({ data, body }) => ({
    link: `shorts/${slugify(data)}`,
    title: data.title,
    description: body.substring(0, 45) + "...",
    pubDate: new Date(data.pubDatetime),
  }));

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: [...itemsPost, ...itemsShort],
  });
}
