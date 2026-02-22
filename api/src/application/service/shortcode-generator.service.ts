const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class ShortCodeGenerator {
    constructor(
        private readonly length: number = 7,
    ) { }

    generate(): string {
        let code = '';

        for (let i = 0; i < this.length; i++) {
            const index = Math.floor(Math.random() * BASE62.length);
            code += BASE62[index];
        }

        return code;
    }
}