import { Command } from '@oclif/core';
import style from 'cli-color';
import CreateDraft from './create-draft';
import PublishDraft from './publish-draft';

export default class CreatePost extends Command {
    static summary = 'Creates a post';

    async run (): Promise<void> {
        const CreateDraftInstance = new CreateDraft(this.argv, this.config);

        const { slug, success } = await CreateDraftInstance.create();

        if (!success) {
            return;
        }

        const PublishDraftInstance = new PublishDraft(this.argv, this.config);

        const { finalPostPath } = await PublishDraftInstance.publishFromSlug(
            slug,
        );

        this.log(style.green(`Post created at ${finalPostPath}`));
    }
}
