import path from 'path';
import getFilesFromDirectory from '../FileSystem/getFilesFromDirectory';

const BlogFolderName = 'blog';
const BlogDirectory = path.join(process.cwd(), 'pages', BlogFolderName);

const getTotalPosts = async () => {
    const files = await getFilesFromDirectory({
        directory: BlogDirectory,
        allowedExtensions: ['.route.md', '.route.mdx'],
    });

    return files.length;
};

const getPostBySlug = (slug: string) => {};

export {
    getTotalPosts,
    getPostBySlug,
};
