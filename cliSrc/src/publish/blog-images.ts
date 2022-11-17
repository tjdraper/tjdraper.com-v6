import { Command } from '@oclif/core';
import style from 'cli-color';
import fs from 'fs-extra';
import path from 'path';
import getFilesFromDirectory from '../../../pages/FileSystem/getFilesFromDirectory';
import { BlogDirectory, BlogFolderName } from '../../../pages/blog/BlogData/constants';

const PublicDirectory = path.join(process.cwd(), 'public');
const ImagesDirectory = path.join(PublicDirectory, 'images');

export default class BlogImages extends Command {
    static summary = 'Publishes blog images to the public directory';

    async run (): Promise<void> {
        this.log(style.cyan(
            'Publishing blog images to the public directory…',
        ));

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

        fs.emptyDirSync(`${ImagesDirectory}/${BlogFolderName}`);

        fs.writeFileSync(
            `${ImagesDirectory}/${BlogFolderName}/.gitignore`,
            `*
!.gitignore
`,
        );

        files.forEach((file) => {
            let hasStarted = false;

            const filePath = file.split('/').filter((part) => {
                if (!hasStarted && part !== BlogFolderName) {
                    return false;
                }

                hasStarted = true;

                return true;
            }).join('/');

            const pathDirArr = filePath.split('/');

            pathDirArr.pop();

            const pathDir = pathDirArr.join('/');

            fs.mkdirSync(
                `${ImagesDirectory}/${pathDir}`,
                { recursive: true },
            );

            fs.copyFileSync(
                file,
                `${ImagesDirectory}/${filePath}`,
            );
        });

        this.log(style.green(
            'Blog images published',
        ));
    }
}
