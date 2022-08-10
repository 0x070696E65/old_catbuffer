"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const YAML = require("yaml");
const fs = require("fs");
const fromHexString = (hexString) => new Uint8Array((hexString.match(/.{1,2}/g) || []).map(byte => parseInt(byte, 16)));
const toHexString = (bytes) => bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '').toUpperCase();
const vectorDirectory = 'test/vector';
const files = fs.readdirSync(vectorDirectory);
const items = files.map(filename => {
    const yamlText = fs.readFileSync(vectorDirectory + '/' + filename, 'utf8');
    const yamlList = YAML.parse(yamlText);
    return yamlList.map((a) => {
        const builder = a.builder;
        return {
            ...a, builder: builder, filename
        };
    });
}).reduce((acc, val) => acc.concat(val), []);
console.log(items.length);
//# sourceMappingURL=Test.js.map