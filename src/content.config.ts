import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 記事は src/content/articles/ に Markdown で置く。
// ファイル名の先頭が _ のもの（_template.md など）は公開されない。
const articles = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    komari: z.array(z.enum(['yomu', 'kaku', 'kiku', 'tsutaeru', 'sousa', 'mitoosu'])).default([]),
    tachiba: z.array(z.enum(['sensei', 'honnin', 'tsukuru'])).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
