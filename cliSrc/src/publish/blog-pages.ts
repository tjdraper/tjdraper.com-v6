import { Command } from '@oclif/core';
import style from 'cli-color';
import path from 'path';
import fs from 'fs-extra';
import { DefaultPerPage } from '../../../pages/blog/BlogData/constants';
import { getTotalPosts } from '../../../pages/blog/BlogData';

const projectRoot = process.cwd();
const templatePath = path.join(projectRoot, 'pages', 'blog', 'Page.template');
const pagePath = path.join(projectRoot, 'pages', 'blog', 'page');

export default class BlogPages extends Command {
    static summary = 'Publishes blog pagination pages';

    async run (): Promise<void> {
        this.log(style.cyan(
            'Publishing blog pagination pages…',
        ));

        const totalPosts = await getTotalPosts();

        const totalPages = Math.ceil(totalPosts / DefaultPerPage);

        const template = String(fs.readFileSync(templatePath)).toString();

        fs.emptyDirSync(pagePath);

        fs.writeFileSync(
            `${pagePath}/.gitignore`,
            `*
!.gitignore
`,
        );

        let currentPageNum = 2;

        while (currentPageNum <= totalPages) {
            const localTemplate = template
                .split('{projectRoot}').join(projectRoot)
                .split('{pageNum}').join(String(currentPageNum).toString())
                .split('{tag}')
                .join('null');

            fs.writeFileSync(
                `${pagePath}/${currentPageNum}.route.tsx`,
                localTemplate,
            );

            currentPageNum += 1;
        }

        this.log(style.green(
            'Blog pagination pages published',
        ));
    }
}
