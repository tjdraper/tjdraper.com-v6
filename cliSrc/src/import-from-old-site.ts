import { Command } from '@oclif/core';
import fs from 'fs-extra';
import path from 'path';
import { WritableStream } from 'node:stream/web';
import sanitizeHtml from 'sanitize-html';
import TurndownService from 'turndown';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { gfm } from 'turndown-plugin-gfm';
import { BlogDirectory } from '../../pages/blog/BlogData/constants';

const unpublishedDir = path.join(process.cwd(), 'blog-unpublished');

const years = [
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
];

interface Post {
    placeholder?: boolean;
    title: string;
    slug: string;
    status: string;
    date: string;
    author: string;
    type: string;
    linkTitle: string;
    linkUrl: string;
    hero: string;
    body: string;
    tags: Array<string>;
    gallery: Array<{
        url: string;
        title: string;
        description: string;
        placeholder?: boolean;
    }>;
}

export default class ImportFromOldSite extends Command {
    static summary = 'Imports from the old site';

    async run (): Promise<void> {
        years.forEach((year) => {
            const dir = `${BlogDirectory}/${year}`;
            const dir2 = `${unpublishedDir}/${year}`;

            if (fs.existsSync(dir)) {
                fs.removeSync(dir);
            }

            if (fs.existsSync(dir2)) {
                fs.removeSync(dir2);
            }
        });

        const response = await fetch(
            'http://tjdraper.localtest.me:18886/site/export-blog-static',
        );

        const data = await response.json() as Array<Post>;

        data.forEach((post) => {
            if (post.placeholder) {
                return;
            }

            if (post.tags.length > 0) {
                post.tags = post.tags.filter((tag) => tag !== 'placeholder');
            }

            if (post.gallery.length > 0) {
                post.gallery = post.gallery.filter((gallery) => !gallery.placeholder);
            }

            this.processPost(post);
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async processPost (post: Post) {
        const date = new Date(post.date);

        const year = date.getFullYear();

        const month = String(date.getMonth() + 1).padStart(2, '0');

        const day = String(date.getDate()).padStart(2, '0');

        let fileDir = `${BlogDirectory}/${year}/${month}/${day}`;

        if (post.status !== 'open') {
            fileDir = `${unpublishedDir}/${year}/${month}/${day}`;
        }

        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, {
                recursive: true,
            });
        }

        const filePath = `${fileDir}/${post.slug}.route.mdx`;

        let fileContent = `---
`;

        if (post.title.includes('"') || post.title.includes("'") || post.title.includes(':')) {
            fileContent += `title: >
  ${post.title}
`;
        } else {
            fileContent += `title: ${post.title}
`;
        }

        fileContent += `type: ${post.type}
`;

        if (post.linkTitle) {
            if (post.linkTitle.includes('"') || post.linkTitle.includes("'") || post.linkTitle.includes(':')) {
                fileContent += `linkTitle: >
  ${post.linkTitle}
`;
            } else {
                fileContent += `linkTitle: ${post.linkTitle}
`;
            }
        }

        if (post.linkUrl) {
            fileContent += `linkUrl: ${post.linkUrl}
`;
        }

        if (post.hero) {
            const imageName = path.basename(post.hero);

            const downloadWriteStream = fs.createWriteStream(
                `${fileDir}/${imageName}`,
            );

            const stream = new WritableStream({
                write (chunk) {
                    downloadWriteStream.write(chunk);
                },
            });

            const imageResponse = await fetch(post.hero);

            const imageBody = await imageResponse.body;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            await imageBody.pipeTo(stream);

            fileContent += `image: ${imageName}
`;
        } else if (post.gallery.length > 0) {
            const imageName = path.basename(post.gallery[0].url);

            fileContent += `image: ${imageName}
`;
        }

        if (post.tags.length > 0) {
            fileContent += `tags:
`;
            post.tags.forEach((tag) => {
                if (tag === 'placeholder') {
                    return;
                }

                fileContent += `  - ${tag}
`;
            });
        }

        fileContent += `---

`;

        const allowedAttr = sanitizeHtml.defaults.allowedAttributes;

        allowedAttr.iframe = ['*'];

        allowedAttr.script = ['*'];

        allowedAttr.audio = ['*'];

        let html = '';

        if (post.body.trim()) {
            html = sanitizeHtml(post.body, {
                allowVulnerableTags: true,
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                    'img',
                    'iframe',
                    'script',
                    'audio',
                ]),
                allowedAttributes: allowedAttr,
            });

            // html = jsBeautify.html(html);

            const turndown = new TurndownService({
                codeBlockStyle: 'fenced',
                bulletListMarker: '-',
            });

            turndown.keep(['iframe', 'script', 'audio']);

            turndown.use(gfm);

            html = turndown.turndown(html);

            html = html.split('charset=').join('charSet=');

            fileContent += html;
        }

        if (post.gallery.length) {
            // eslint-disable-next-line no-restricted-syntax
            for (const item of post.gallery) {
                const imageName = path.basename(item.url);

                const downloadWriteStream = fs.createWriteStream(
                    `${fileDir}/${imageName}`,
                );

                const stream = new WritableStream({
                    write (chunk) {
                        downloadWriteStream.write(chunk);
                    },
                });

                // eslint-disable-next-line no-await-in-loop
                const imageResponse = await fetch(item.url);

                // eslint-disable-next-line no-await-in-loop
                const imageBody = await imageResponse.body;

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line no-await-in-loop
                await imageBody.pipeTo(stream);

                fileContent += `![${item.title}](/images/blog/${year}/${month}/${day}/${imageName})

`;
            }

            fileContent = fileContent.trim();
        }

        fileContent += `
`;

        fs.writeFileSync(filePath, fileContent);
    }
}
