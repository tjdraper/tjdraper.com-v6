import fs from 'fs';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import Post, { MetaData } from './Post';
import getFilesFromDirectory from '../../FileSystem/getFilesFromDirectory';
import { BlogDirectory, BlogFolderName, DefaultPerPage } from './constants';
import transformFrontMatterToMetaData from './transformFrontMatterToMetaData';

interface GetPostsProps {
    limit?: number;
    offset?: number;
    tag?: string | null | undefined;
}

interface Results {
    totalPosts: number;
    posts: Array<Post>;
}

const getPosts = async (props?: GetPostsProps): Promise<Results> => {
    let files = await getFilesFromDirectory({
        directory: BlogDirectory,
        allowedExtensions: ['.route.md', '.route.mdx'],
    });

    files = files.reverse();

    // We have to do this weird stuff to stop typescript from converting to
    // require statements, which effs up particularly in oclif, which must run
    // as commonjs
    // eslint-disable-next-line no-eval
    const { unified } = await (eval('import("unified")') as Promise<typeof import('unified')>);

    // eslint-disable-next-line no-eval
    const remarkParse = await (eval('import("remark-parse")') as Promise<typeof import('remark-parse')>);

    // eslint-disable-next-line no-eval
    const remarkRehype = await (eval('import("remark-rehype")') as Promise<typeof import('remark-rehype')>);

    // eslint-disable-next-line no-eval
    const rehypeSanitize = await (eval('import("rehype-sanitize")') as Promise<typeof import('rehype-sanitize')>);

    // eslint-disable-next-line no-eval
    const rehypeStringify = await (eval('import("rehype-stringify")') as Promise<typeof import('rehype-stringify')>);

    // eslint-disable-next-line no-eval
    const remarkFrontmatter = await (eval('import("remark-frontmatter")') as Promise<typeof import('remark-frontmatter')>);

    // eslint-disable-next-line no-eval
    const rehypeRaw = await (eval('import("rehype-raw")') as Promise<typeof import('rehype-raw')>);

    // eslint-disable-next-line no-eval
    const remarkGfm = await (eval('import("remark-gfm")') as Promise<typeof import('remark-gfm')>);

    let posts = await Promise.all(files.map(async (file) => {
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

    if (props?.tag) {
        posts = posts.filter((post) => {
            const tagIndex = post.tags?.indexOf(String(props.tag));

            if (tagIndex === undefined) {
                return false;
            }

            return tagIndex >= 0;
        });
    }

    const limit = props?.limit || DefaultPerPage;

    const start = props?.offset || 0;

    const end = start + limit;

    const results = posts.slice(start, end);

    return {
        totalPosts: posts.length,
        posts: results,
    };
};

export default getPosts;
