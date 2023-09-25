import { slugifyAll } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getShortsByTag = (shorts: CollectionEntry<"short">[], tag: string) =>
  shorts.filter(
    short => short.data.tags && slugifyAll(short.data.tags).includes(tag)
  );

export default getShortsByTag;
