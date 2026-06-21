import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeShiki from '@shikijs/rehype'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import { visit } from 'unist-util-visit'

// Converts ```mermaid blocks to <Mermaid chart="..." /> before Shiki runs
function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid') return
      parent.children.splice(index, 1, {
        type: 'mdxJsxFlowElement',
        name: 'Mermaid',
        attributes: [{ type: 'mdxJsxAttribute', name: 'chart', value: node.value }],
        children: [],
      })
    })
  }
}

const shikiOptions = {
  themes: { light: 'github-light', dark: 'github-dark' },
  langs: ['python', 'bash', 'shell', 'markdown', 'terraform', 'hcl',
          'json', 'yaml', 'toml', 'javascript', 'typescript', 'jsx', 'tsx', 'css'],
  transformers: [
    {
      name: 'add-data-language',
      pre(node) { node.properties.dataLanguage = this.options.lang },
    },
  ],
}

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm, remarkMath, remarkMermaid],
        rehypePlugins: [rehypeSlug, rehypeKatex, [rehypeShiki, shikiOptions]],
      }),
    },
    react(),
  ],
  base: '/',
})
