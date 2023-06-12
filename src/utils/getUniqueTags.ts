import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getUniqueTags = (
  posts: CollectionEntry<"blog">[],
  shorts: CollectionEntry<"short">[]
) => {
  const filteredPosts = posts.filter(({ data }) => !data.draft);
  const filteredShorts = shorts.filter(({ data }) => !data.draft);
  const tags: string[] = [...filteredShorts, ...filteredPosts]
    .flatMap(post => post.data.tags)
    .map(tag => slugifyStr(tag))
    .filter(
      (value: string, index: number, self: string[]) =>
        self.indexOf(value) === index
    )
    .sort((tagA: string, tagB: string) => tagA.localeCompare(tagB));
  return tags;
};

export default getUniqueTags;
