import { slugifyAll } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getShortsByTag = (shorts: CollectionEntry<"short">[], tag: string) =>
  shorts.filter(post => slugifyAll(post.data.tags).includes(tag));

export default getShortsByTag;
