import fs from 'fs';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import rehypeRaw from 'rehype-raw';
import Post, { MetaData } from './Post';
import getFilesFromDirectory from '../../FileSystem/getFilesFromDirectory';
import { BlogDirectory, BlogFolderName } from './constants';

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

    const limit = props?.limit || 12;

    const start = props?.offset || 0;

    const end = start + limit;

    files = files.slice(start, end);

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
            .use(remarkParse)
            .use(remarkFrontmatter)
            .use(remarkParseFrontmatter)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeSanitize)
            .use(rehypeStringify)
            .process(rawMarkdown);

        const frontMatter = renderedMarkdown.data.frontmatter as unknown;

        const metaData: MetaData = frontMatter as MetaData;

        let imagePath = null;

        if (metaData.image) {
            const uriArray = uri.split('/');

            uriArray.pop();

            const uriDir = uriArray.join('/');

            imagePath = `/images${uriDir}/${metaData.image}`;
        }

        return {
            ...metaData,
            uri,
            imagePath,
            body: String(renderedMarkdown).toString(),
        };
    })) as Array<Post>;
};

export default getPosts;
