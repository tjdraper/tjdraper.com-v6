import fs  from 'fs';
import { BlogFolderName, BlogDirectory, ImagesDirectory } from './Constants.mjs';
import GetFilesFromDirectory from './GetFilesFromDirectory.mjs';

const PublishBlogImages = async () => {
    const files = await GetFilesFromDirectory({
        directory: BlogDirectory,
        allowedExtensions: [
            '.jpg',
            '.JPG',
            '.jpeg',
            '.JPEG',
            '.png',
            '.PNG',
            '.gif',
            '.GIF',
        ],
    });

    files.forEach((file) => {
        let hasStarted = false;

        const path = file.split('/').filter((part) => {
            if (!hasStarted && part !== BlogFolderName) {
                return false;
            }

            hasStarted = true;

            return true;
        }).join('/');

        const pathDirArr = path.split('/');

        pathDirArr.pop();

        const pathDir = pathDirArr.join('/');

        fs.mkdirSync(
            ImagesDirectory + '/' + pathDir,
            { recursive: true },
        );

        fs.copyFileSync(
            file,
            ImagesDirectory + '/' + path,
        );
    });
}

export default PublishBlogImages;
