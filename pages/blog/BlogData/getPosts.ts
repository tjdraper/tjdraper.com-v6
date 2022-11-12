import fs from 'fs';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import Post, { MetaData } from './Post';
import getFilesFromDirectory from '../../FileSystem/getFilesFromDirectory';
import { BlogDirectory, BlogFolderName, DefaultPerPage } from './constants';
import transformFrontMatterToMetaData from './transformFrontMatterToMetaData';

interface GetPostsProps {
    limit?: number;
    offset?: number;
}

const getPosts = async (props?: GetPostsProps): Promise<Array<Post>> => {
    let files = await getFilesFromDirectory({
        directory: BlogDirectory,
        allowedExtensions: ['.route.md', '.route.mdx'],
    });

    files = files.reverse();

    const limit = props?.limit || DefaultPerPage;

    const start = props?.offset || 0;

    const end = start + limit;

    files = files.slice(start, end);

    const { unified } = await import('unified');

    const remarkParse = await import('remark-parse');

    const remarkRehype = await import('remark-rehype');

    const rehypeSanitize = await import('rehype-sanitize');

    const rehypeStringify = await import('rehype-stringify');

    const remarkFrontmatter = await import('remark-frontmatter');

    const rehypeRaw = await import('rehype-raw');

    const remarkGfm = await import('remark-gfm');

    return await Promise.all(files.map(async (file) => {
        let hasStarted = false;

        const uri = `/${file.split('/').filter((part) => {
            if (!hasStarted && part !== BlogFolderName) {
                return false;
            }

            hasStarted = true;

            return true;
            // eslint-disable-next-line newline-per-chained-call
        }).join('/').split('.').at(0)}`;

        const rawMarkdown = String(fs.readFileSync(file)).toString();

        const renderedMarkdown = await unified()
            .use(remarkParse.default)
            .use(remarkFrontmatter.default)
            .use(remarkParseFrontmatter)
            .use(remarkGfm.default)
            .use(remarkRehype.default, { allowDangerousHtml: true })
            .use(rehypeRaw.default)
            .use(rehypeSanitize.default)
            .use(rehypeStringify.default)
            .process(rawMarkdown);

        const frontMatter = renderedMarkdown.data.frontmatter as MetaData;

        const metaData = transformFrontMatterToMetaData(
            frontMatter,
            uri,
        );

        return {
            ...metaData,
            body: String(renderedMarkdown).toString(),
        };
    })) as Array<Post>;
};

export default getPosts;
