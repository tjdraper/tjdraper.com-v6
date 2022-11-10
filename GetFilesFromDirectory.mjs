import { promisify } from 'util';
import { resolve } from 'path';
import fs  from 'fs';

const readdir = promisify(fs.readdir);

const stat = promisify(fs.stat);

const GetFilesFromDirectory = async ({
    directory,
    allowedExtensions,
}) => {
    const subDirs = await readdir(directory, {
        withFileTypes: true,
    });

    const intermediateFiles = await Promise.all(
        subDirs.map(async (subDir) => {
            const res = resolve(directory, subDir.name);

            return (await stat(res)).isDirectory() ? GetFilesFromDirectory({
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

export default GetFilesFromDirectory;
