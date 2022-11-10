import { promisify } from 'util';
import path, { resolve } from 'path';
import fs, { Dirent } from 'fs';

const BlogFolderName = 'blog';
const BlogDirectory = path.join(process.cwd(), 'pages', BlogFolderName);
const PublicDirectory = path.join(process.cwd(), 'public');
const ImagesDirectory = path.join(PublicDirectory, 'images');

const readdir = promisify(fs.readdir);

const stat = promisify(fs.stat);

const getFilesFromDirectory = async ({
    directory,
    allowedExtensions,
}) => {
    const subDirs = await readdir(directory, {
        withFileTypes: true,
    });

    const intermediateFiles = await Promise.all(
        subDirs.map(async (subDir) => {
            const res = resolve(directory, subDir.name);

            return (await stat(res)).isDirectory() ? getFilesFromDirectory({
                directory: res,
            }) : res;
        }),
    );

    let files = intermediateFiles.reduce((
        a,
        f,
    ) => a.concat(f), []);

    if (allowedExtensions) {
        files = files.filter((file) => {
            const hasExt = allowedExtensions.map((ext) => file.endsWith(ext));

            return hasExt.indexOf(true) > -1;
        });
    }

    return files;
};

const PublishBlogImages = async () => {
    const files = await getFilesFromDirectory({
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
