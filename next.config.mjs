import remarkFrontmatter from 'remark-frontmatter';
import smartypants from 'remark-smartypants';
import remarkGfm from 'remark-gfm';

const remarkMDXNext = await import('remark-mdx-next');

export default {
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['.jpg', 'route.ts', 'route.tsx', 'route.md', 'route.mdx'],
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(md|mdx)?$/,
            use: [
                options.defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                    options: {
                        providerImportSource: '@mdx-js/react',
                        remarkPlugins: [
                            remarkFrontmatter,
                            remarkGfm,
                            smartypants,
                            remarkMDXNext.remarkMdxNext,
                        ],
                    },
                },
            ],
        });

        return config;
    },
};
