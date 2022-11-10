import GetTotalPosts from './GetTotalPosts.mjs';
import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';

const templatePath = path.join(process.cwd(), 'pages', 'blog', 'Page.template');
const pagePath = path.join(process.cwd(), 'pages', 'blog', 'page');

const PublishBlogPages = async () => {
    const perPage = 12;
    const totalPosts = await GetTotalPosts();
    const totalPages = Math.ceil(totalPosts / perPage);

    const template = String(fs.readFileSync(templatePath)).toString();

    let currentPageNum = 2;

    fsExtra.emptydirSync(pagePath);

    fs.writeFileSync(
        `${pagePath}/.gitignore`,
        `*
!.gitignore
`
    );

    while (currentPageNum <= totalPages) {
        const localTemplate = template.replace(
            '{pageNum}',
            String(currentPageNum).toString()
        );

        fs.writeFileSync(
            `${pagePath}/${currentPageNum}.route.tsx`,
            localTemplate,
        );

        currentPageNum++;
    }
}

export default PublishBlogPages;
