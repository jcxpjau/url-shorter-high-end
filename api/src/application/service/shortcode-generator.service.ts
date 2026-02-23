import { Injectable } from "@nestjs/common";

@Injectable()
export class ShortCodeGenerator {
    private readonly length: number;

    constructor() {
        this.length = 7;
    }

    generate(): string {
        const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let code = '';
        for (let i = 0; i < this.length; i++) {
            const index = Math.floor(Math.random() * BASE62.length);
            code += BASE62[index];
        }
        return code;
    }
}