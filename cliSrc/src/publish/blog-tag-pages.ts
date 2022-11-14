import { Command } from '@oclif/core';
import style from 'cli-color';
import path from 'path';
import fs from 'fs-extra';
import { getPosts } from '../../../pages/blog/BlogData';
import Post from '../../../pages/blog/BlogData/Post';
import { DefaultPerPage } from '../../../pages/blog/BlogData/constants';

const projectRoot = process.cwd();
const templatePath = path.join(projectRoot, 'pages', 'blog', 'Page.template');
const tagPath = path.join(projectRoot, 'pages', 'blog', 'tag');

export default class BlogTagPages extends Command {
    static summary = 'Publishes blog tag pages';

    async run (): Promise<void> {
        this.log(style.cyan(
            'Publishing blog tag pages…',
        ));

        const posts = await getPosts({
            limit: 999999999999999,
        });

        const tags = [] as Array<string>;

        posts.posts.forEach((post) => {
            post.tags?.forEach((tag) => {
                if (tags.indexOf(tag) >= 0) {
                    return;
                }

                tags.push(tag);
            });
        });

        const template = String(fs.readFileSync(templatePath)).toString();

        fs.emptyDirSync(tagPath);

        fs.writeFileSync(
            `${tagPath}/.gitignore`,
            `*
!.gitignore
`,
        );

        tags.forEach((tag) => {
            this.processTag(tag, template, posts.posts);
        });

        this.log(style.green(
            'blog tag pages published',
        ));
    }

    // eslint-disable-next-line class-methods-use-this
    private processTag (tag: string, template: string, posts: Array<Post>) {
        const taggedPosts = posts.filter((post) => {
            const tagIndex = post.tags?.indexOf(String(tag));

            if (tagIndex === undefined) {
                return false;
            }

            return tagIndex >= 0;
        });

        const totalPosts = taggedPosts.length;

        const totalPages = Math.ceil(totalPosts / DefaultPerPage);

        const indexTemplate = template
            .split('{projectRoot}').join(projectRoot)
            .split('{pageNum}').join('1')
            .split('{tag}')
            .join(`'${tag}'`);

        const dashedTag = tag.replace(' ', '-');

        const thisTagPath = `${tagPath}/${dashedTag}`;

        fs.mkdirSync(thisTagPath);

        fs.writeFileSync(
            `${thisTagPath}/index.route.tsx`,
            indexTemplate,
        );

        let currentPageNum = 2;

        const pagePath = `${thisTagPath}/page`;

        while (currentPageNum <= totalPages) {
            const localTemplate = template
                .split('{projectRoot}').join(projectRoot)
                .split('{pageNum}').join(String(currentPageNum).toString())
                .split('{tag}')
                .join(`'${tag}'`);

            fs.mkdirSync(pagePath);

            fs.writeFileSync(
                `${pagePath}/${currentPageNum}.route.tsx`,
                localTemplate,
            );

            currentPageNum += 1;
        }
    }
}
