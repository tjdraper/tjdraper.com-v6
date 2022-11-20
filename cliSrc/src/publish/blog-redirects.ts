import { Command } from '@oclif/core';
import style from 'cli-color';
import fs from 'fs-extra';
import getPostsFromIndexCache from '../../../pages/blog/BlogData/getPostsFromIndexCache';

const projectRoot = process.cwd();

interface Redirect {
    source: string;
    destination: string;
    permanent: boolean;
}

export default class BlogRedirects extends Command {
    static summary = 'Publishes blog redirects for the transition to next.js';

    async run (): Promise<void> {
        this.log(style.cyan(
            'Publishing blog redirects for the transition to next.js…',
        ));

        const blogResults = await getPostsFromIndexCache({
            limit: 999999999,
        });

        const redirects = [] as Array<Redirect>;

        blogResults.posts.forEach((post) => {
            const { yyyy, mm } = post;

            if (parseInt(yyyy, 10) > 2015) {
                return;
            }

            redirects.push({
                source: `/entry/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });

            redirects.push({
                source: `/site/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });

            redirects.push({
                source: `/home/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });

            redirects.push({
                source: `/home/render/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });

            redirects.push({
                source: `/article/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });

            redirects.push({
                source: `/blog/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });

            redirects.push({
                source: `/article/${yyyy}/${mm}/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });

            redirects.push({
                source: `/linkedlist/${yyyy}/${mm}/${post.slug}`,
                destination: post.uri,
                permanent: true,
            });
        });

        fs.writeFileSync(
            `${projectRoot}/redirects.json`,
            JSON.stringify(redirects),
        );

        this.log(style.green(
            'Blog redirects for the transition to next.js published',
        ));
    }
}
