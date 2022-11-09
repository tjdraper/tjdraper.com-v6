import path from 'path';

const BlogFolderName = 'blog';
const BlogDirectory = path.join(process.cwd(), 'pages', BlogFolderName);

export {
    BlogFolderName,
    BlogDirectory,
};
