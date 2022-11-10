import path from "path";

export const BlogFolderName = 'blog';
export const BlogDirectory = path.join(process.cwd(), 'pages', BlogFolderName);
export const PublicDirectory = path.join(process.cwd(), 'public');
export const ImagesDirectory = path.join(PublicDirectory, 'images');
