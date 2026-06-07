# Adding a New Blog Post

## Steps

1. Copy the template:
   ```bash
   cp src/posts/_template.mdx src/posts/your-post-name.mdx
   ```

2. Edit the frontmatter at the top of the file:
   ```
   ---
   title: "Your Post Title"
   date: "Jun 7, 2026"
   category: "Deep Learning"
   slug: "your-post-name"
   image: "/images/your-cover.png"
   desc: "One sentence shown on the blog card."
   readTime: "~5 min read"
   ---
   ```
   - `slug` must be unique — becomes the URL `/#/blog/your-post-name`
   - `image` is optional — put the file in `public/images/`

3. Write the content below the frontmatter.

   Available extras:
   - ` ```python `, ` ```bash `, ` ```terraform `, ` ```shell `, ` ```markdown ` — syntax-highlighted code blocks
   - ` ```mermaid ` — renders as an actual diagram
   - `<Callout label="Key Insight">your text</Callout>` — highlighted callout box

4. Commit and push:
   ```bash
   git add src/posts/your-post-name.mdx
   git commit -m "Add blog post: Your Post Title"
   git push origin feature/updating-ui
   ```

GitHub Actions will deploy automatically after the push (~1–2 min).

## Notes

- Files starting with `_` are ignored (e.g. `_template.mdx`) — safe to keep as drafts
- No imports or config changes needed — posts are auto-discovered
- Preview locally: `npm run dev` then open `http://localhost:5174/#/blog/your-post-name`
