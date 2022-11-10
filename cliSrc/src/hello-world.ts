import { Command } from '@oclif/core';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const style = require('cli-color');

export default class HelloWorld extends Command {
    static summary = 'Says Hello World';

    async run (): Promise<void> {
        this.log(style.cyan('Hello World'));
    }
}
