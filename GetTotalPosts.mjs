import GetFilesFromDirectory from './GetFilesFromDirectory.mjs';
import {  BlogDirectory } from './Constants.mjs';

const GetTotalPosts = async () => {
    const files = await GetFilesFromDirectory({
        directory: BlogDirectory,
        allowedExtensions: ['.route.md', '.route.mdx'],
    });

    return files.length;
}

export default GetTotalPosts;
