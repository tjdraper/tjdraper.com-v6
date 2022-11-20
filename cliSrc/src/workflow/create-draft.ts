import { Command } from '@oclif/core';
import slugify from 'slugify';
import style from 'cli-color';
import path from 'path';
import fs from 'fs-extra';

const projectRoot = process.cwd();
const draftsPath = path.join(projectRoot, 'pages', 'blog', 'drafts');

export default class CreateDraft extends Command {
    static summary = 'Creates a draft post';

    async run (): Promise<void> {
        // eslint-disable-next-line no-eval
        const { default: InputPrompt } = await (eval('import("inquirer")') as Promise<typeof import('inquirer')>);

        const { title } = await InputPrompt.prompt({
            name: 'title',
            message: 'Title:',
            type: 'input',
        });

        if (!title) {
            this.error(style.red('Title is required'));

            return;
        }

        let { slug } = await InputPrompt.prompt({
            name: 'slug',
            message: 'Slug (derived from title if blank):',
            type: 'input',
        });

        const {
            author,
            linkTitle,
            linkUrl,
            imagePath,
            tags,
        } = await InputPrompt.prompt([
            {
                name: 'author',
                message: 'Author:',
                type: 'input',
            },
            {
                name: 'linkTitle',
                message: 'Link Title:',
                type: 'input',
            },
            {
                name: 'linkUrl',
                message: 'Link Url:',
                type: 'input',
            },
            {
                name: 'imagePath',
                message: 'Image Path (fully qualified):',
                type: 'input',
            },
            {
                name: 'tags',
                message: 'Comma Seperated Tags',
                type: 'input',
            },
        ]);

        if (!slug) {
            slug = slugify(title).toLowerCase();
        }

        const type = linkTitle && linkUrl ? 'linkedList' : 'article';

        const thisDraftPath = `${draftsPath}/${slug}`;

        const draftFilePath = `${thisDraftPath}/${slug}.route.mdx`;

        if (fs.existsSync(draftFilePath)) {
            this.error(style.red('Draft path exists'));

            return;
        }

        fs.mkdirSync(
            thisDraftPath,
            { recursive: true },
        );

        let image = '';

        if (imagePath) {
            image = path.basename(imagePath.trim()).trim();

            fs.copyFileSync(
                imagePath.trim(),
                `${thisDraftPath}/${image}`,
            );
        }

        let fileContent = `---
`;

        if (author) {
            fileContent += `author: ${author.trim()}
`;
        }

        if (
            title.includes('"')
            || title.includes("'")
            || title.includes(':')
        ) {
            fileContent += `title: >
  ${title.trim()}
`;
        } else {
            fileContent += `title: ${title.trim()}
`;
        }

        fileContent += `type: ${type}
`;

        if (image) {
            fileContent += `image: ${image}
`;
        }

        if (type === 'linkedList') {
            fileContent += `linkTitle: ${linkTitle.trim()}
linkUrl: ${linkUrl.trim()}
`;
        }

        if (tags) {
            const tagsArray = tags.split(',');

            fileContent += `tags:
`;

            tagsArray.forEach((tag: string) => {
                fileContent += `  - ${tag.trim()}
`;
            });
        }

        fileContent += `---


`;

        fs.writeFileSync(draftFilePath, fileContent);

        this.log(style.green(`Draft created at ${draftFilePath}`));

        this.log(style.green(`Run \`yarn dev\` and view at http://localhost:3000/blog/drafts/${slug}/${slug}`));
    }
}
