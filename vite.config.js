import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeShiki from '@shikijs/rehype'

const shikiOptions = {
  themes: { light: 'github-light', dark: 'github-dark' },
  langs: ['python', 'bash', 'shell', 'markdown', 'terraform', 'hcl', 'mermaid',
          'json', 'yaml', 'toml', 'javascript', 'typescript', 'jsx', 'tsx', 'css'],
}

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
        rehypePlugins: [[rehypeShiki, shikiOptions]],
      }),
    },
    react(),
  ],
  base: '/',
})
