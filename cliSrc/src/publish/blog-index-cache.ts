import { Command } from '@oclif/core';
import style from 'cli-color';
import fs from 'fs-extra';
import path from 'path';
import { getPosts } from '../../../pages/blog/BlogData';

const projectRoot = process.cwd();
const blogPath = path.join(projectRoot, 'pages', 'blog');
const blogIndexCachePath = path.join(blogPath, 'BlogData', 'IndexCache.json');

export default class BlogIndexCache extends Command {
    static summary = 'Publishes blog index cache';

    async run (): Promise<void> {
        this.log(style.cyan(
            'Publishing blog index cache…',
        ));

        const posts = await getPosts({
            limit: 999999999999999,
        });

        fs.writeFileSync(blogIndexCachePath, JSON.stringify(posts));

        this.log(style.green(
            'Blog index cache published',
        ));
    }
}
