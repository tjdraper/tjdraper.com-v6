import path from 'path';

const DefaultPerPage = 12;
const BlogFolderName = 'blog';
const BlogDirectory = path.join(process.cwd(), 'pages', BlogFolderName);

export {
    DefaultPerPage,
    BlogFolderName,
    BlogDirectory,
};
