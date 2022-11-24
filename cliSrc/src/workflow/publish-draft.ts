import { Command } from '@oclif/core';
import path from 'path';
import fs from 'fs-extra';
import style from 'cli-color';
import getFilesFromDirectory from '../../../pages/FileSystem/getFilesFromDirectory';
import { BlogDirectory } from '../../../pages/blog/BlogData/constants';

const projectRoot = process.cwd();
const draftsPath = path.join(projectRoot, 'pages', 'blog', 'drafts');

export default class PublishDraft extends Command {
    static summary = 'Publishes a draft post';

    async run (): Promise<void> {
        // eslint-disable-next-line no-eval
        const { default: InputPrompt } = await (eval('import("inquirer")') as Promise<typeof import('inquirer')>);

        const files = await getFilesFromDirectory({
            directory: draftsPath,
            allowedExtensions: ['.route.md', '.route.mdx'],
        });

        const choices = files.map((file) => {
            const fileName = path.basename(file);

            return fileName.split('.')[0];
        });

        const { slug } = await InputPrompt.prompt({
            name: 'slug',
            message: 'Select post to publish:',
            type: 'list',
            choices,
        });

        const { success } = await this.publishFromSlug(slug);

        if (!success) {
            return;
        }

        this.log(style.green('Post published'));
    }

    async publishFromSlug (slug: string): Promise<{
        success: boolean;
        publishedDir: string;
        finalPostPath: string;
    }> {
        const selectedDir = `${draftsPath}/${slug}`;

        const currentDate = new Date();

        const year = currentDate.getFullYear();

        const yyyy = year.toString();

        const month = currentDate.getMonth() + 1;

        const mm = month.toString().padStart(2, '0');

        const day = currentDate.getDate();

        const dd = day.toString().padStart(2, '0');

        const publishedDir = `${BlogDirectory}/${yyyy}/${mm}/${dd}`;

        const finalPostPath = `${publishedDir}/${slug}.route.mdx`;

        if (fs.existsSync(finalPostPath)) {
            this.error(style.red('Publish path exists'));

            return {
                success: false,
                publishedDir: '',
                finalPostPath: '',
            };
        }

        const filesToPublish = await getFilesFromDirectory({
            directory: selectedDir,
        });

        filesToPublish.forEach((file) => {
            const fileName = path.basename(file);

            fs.moveSync(
                file,
                `${publishedDir}/${fileName}`,
            );
        });

        fs.removeSync(selectedDir);

        return {
            success: true,
            publishedDir,
            finalPostPath,
        };
    }
}
