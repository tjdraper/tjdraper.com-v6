import { promisify } from 'util';
import { resolve } from 'path';
import fs, { Dirent } from 'fs';

const readdir = promisify(fs.readdir);

const stat = promisify(fs.stat);

const getFilesFromDirectory = async ({
    directory,
    allowedExtensions,
}: {
    directory: string;
    allowedExtensions?: Array<string>;
}) => {
    const subDirs = await readdir(directory, {
        withFileTypes: true,
    });

    const intermediateFiles = await Promise.all(
        subDirs.map(async (subDir: Dirent) => {
            const res = resolve(directory, subDir.name);

            return (await stat(res)).isDirectory() ? getFilesFromDirectory({
                directory: res,
            }) : res;
        }),
    ) as Array<Array<string>>;

    let files = intermediateFiles.reduce((
        a,
        f,
    ) => a.concat(f), []) as Array<string>;

    if (allowedExtensions) {
        files = files.filter((file) => {
            const hasExt = allowedExtensions.map((ext) => file.endsWith(ext));

            return hasExt.indexOf(true) > -1;
        });
    }

    return files;
};

export default getFilesFromDirectory;
