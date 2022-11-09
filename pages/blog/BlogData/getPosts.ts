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
import { BlogDirectory } from './constants';

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

    return await Promise.all(files.map(async (post) => {
        const rawMarkdown = String(fs.readFileSync(post)).toString();

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

        return {
            ...metaData,
            body: String(renderedMarkdown).toString(),
        };
    })) as Array<Post>;
};

export default getPosts;
