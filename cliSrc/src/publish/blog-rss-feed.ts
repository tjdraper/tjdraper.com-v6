import { Command } from '@oclif/core';
import path from 'path';
import style from 'cli-color';
import RSS from 'rss';
import fs from 'fs-extra';
import getPostsFromIndexCache from '../../../pages/blog/BlogData/getPostsFromIndexCache';

const projectRoot = process.cwd();
const feedPath = path.join(projectRoot, '/public/blog/feed.xml');

export default class BlogRssFeed extends Command {
    static summary = 'Publishes blog rss feed';

    async run (): Promise<void> {
        this.log(style.cyan(
            'Publishing blog rss feed…',
        ));

        const siteUrl = 'https://www.tjdraper.com';

        const feed = new RSS({
            title: 'TJDraper.com',
            description: 'The thoughts, writings, and grandstanding of TJ Draper.',
            site_url: siteUrl,
            feed_url: `${siteUrl}/blog/feed.xml`,
            pubDate: new Date(),
            copyright: `Copyright © TJDraper. ${new Date().getFullYear()}. All rights reserved.`,
            generator: 'TJDraper.com',
        });

        const results = await getPostsFromIndexCache({
            limit: 50,
        });

        results.posts.forEach((post) => {
            const { yyyy, mm, dd } = post;

            const date = new Date(`${yyyy}-${mm}-${dd}T13:00:00`);

            feed.item({
                title: post.title,
                description: post.body,
                url: siteUrl + post.uri,
                date,
                categories: post.tags,
                author: post.author || 'TJ',
            });
        });

        fs.writeFileSync(feedPath, feed.xml({ indent: true }));

        this.log(style.green(
            'Blog rss feed published',
        ));
    }
}
