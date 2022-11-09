import getFilesFromDirectory from '../../FileSystem/getFilesFromDirectory';
import { BlogDirectory } from './constants';

const getTotalPosts = async () => {
    const files = await getFilesFromDirectory({
        directory: BlogDirectory,
        allowedExtensions: ['.route.md', '.route.mdx'],
    });

    return files.length;
};

export default getTotalPosts;
