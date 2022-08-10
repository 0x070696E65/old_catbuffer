"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneratorUtils = void 0;
class GeneratorUtils {
    static bufferToBigInt(array) {
        const input = array.slice(0, 8).reverse();
        const Nibble_To_Char_Map = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        let s = '';
        for (const byte of input) {
            s += Nibble_To_Char_Map[byte >> 4];
            s += Nibble_To_Char_Map[byte & 0x0f];
        }
        return BigInt('0x' + s);
    }
    static readUint32At(bytes, index) {
        return (bytes[index] + (bytes[index + 1] << 8) + (bytes[index + 2] << 16) + (bytes[index + 3] << 24)) >>> 0;
    }
    static uintToBuffer(uintValue, bufferSize) {
        const buffer = new ArrayBuffer(bufferSize);
        const dataView = new DataView(buffer);
        try {
            if (1 === bufferSize) {
                dataView.setUint8(0, uintValue);
            }
            else if (2 === bufferSize) {
                dataView.setUint16(0, uintValue, true);
            }
            else if (4 === bufferSize) {
                dataView.setUint32(0, uintValue, true);
            }
            else {
                throw new Error('Unexpected bufferSize ' + bufferSize);
            }
            return new Uint8Array(buffer);
        }
        catch (e) {
            throw new Error(`Converting uint value ` + uintValue + ` into buffer with error: ` + e);
        }
    }
    static uint8ToBuffer(uintValue) {
        return GeneratorUtils.uintToBuffer(uintValue, 1);
    }
    static uint16ToBuffer(uintValue) {
        return GeneratorUtils.uintToBuffer(uintValue, 2);
    }
    static uint32ToBuffer(uintValue) {
        return GeneratorUtils.uintToBuffer(uintValue, 4);
    }
    static notNull(value, message) {
        if (value === undefined || value === null) {
            throw new Error(message);
        }
    }
    static bufferToUint(buffer, size) {
        const dataView = new DataView(buffer.buffer);
        try {
            if (1 === size) {
                return dataView.getUint8(0);
            }
            else if (2 === size) {
                return dataView.getUint16(0, true);
            }
            else if (4 === size) {
                return dataView.getUint32(0, true);
            }
            throw new Error('Unexpected size ' + size);
        }
        catch (e) {
            throw new Error(`Converting buffer into number with error:` + e);
        }
    }
    static bufferToUint8(buffer) {
        return GeneratorUtils.bufferToUint(buffer, 1);
    }
    static bufferToUint16(buffer) {
        return GeneratorUtils.bufferToUint(buffer, 2);
    }
    static bufferToUint32(buffer) {
        return GeneratorUtils.bufferToUint(buffer, 4);
    }
    static bigIntToBuffer(uintValue) {
        const hex = uintValue.toString(16).padStart(16, '0');
        const len = hex.length / 2;
        const uint8 = new Uint8Array(len);
        let i = 0;
        let j = 0;
        while (i < len) {
            uint8[i] = parseInt(hex.slice(j, j + 2), 16);
            i += 1;
            j += 2;
        }
        return uint8.reverse();
    }
    static concatTypedArrays(array1, array2) {
        const newArray = new Uint8Array(array1.length + array2.length);
        newArray.set(array1);
        newArray.set(array2, array1.length);
        return newArray;
    }
    static getBytes(binary, size) {
        if (size > binary.length) {
            throw new RangeError();
        }
        const bytes = binary.slice(0, size);
        return bytes;
    }
    static getPaddingSize(size, alignment) {
        if (alignment === 0) {
            return 0;
        }
        return 0 === size % alignment ? 0 : alignment - (size % alignment);
    }
    static getSizeWithPadding(size, alignment) {
        return size + GeneratorUtils.getPaddingSize(size, alignment);
    }
    static compact(bigInt) {
        if (bigInt > Number.MAX_SAFE_INTEGER) {
            throw new Error('bigint ' + bigInt + ' is greater then Number.MAX_SAFE_INTEGER. It cannot be converted to number!');
        }
        return Number(bigInt);
    }
    static fromUint(number) {
        return BigInt(number);
    }
    static loadFromBinary(loadFromBinary, payload, count) {
        const byteArray = Array.from(payload);
        const values = [];
        for (let i = 0; i < GeneratorUtils.compact(count); i++) {
            const item = loadFromBinary(Uint8Array.from(byteArray));
            const itemSize = item.size;
            values.push(item);
            byteArray.splice(0, itemSize);
        }
        console.log(values);
        return values;
    }
    static loadFromBinaryEnums(payload, count, itemSize) {
        const byteArray = Array.from(payload);
        const values = [];
        for (let i = 0; i < GeneratorUtils.compact(count); i++) {
            values.push(GeneratorUtils.bufferToUint(payload, 2));
            byteArray.splice(0, itemSize);
        }
        return values;
    }
    static loadFromBinaryRemaining(loadFromBinary, payload, payloadSize, alignment) {
        const byteArray = Array.from(payload);
        let remainingByteSizes = payloadSize;
        const transactions = [];
        while (remainingByteSizes > 0) {
            const item = loadFromBinary(Uint8Array.from(byteArray));
            transactions.push(item);
            const size = item.size;
            const itemSize = size + GeneratorUtils.getPaddingSize(item.size, alignment);
            remainingByteSizes -= itemSize;
            byteArray.splice(0, itemSize);
        }
        return transactions;
    }
    static writeList(elements, alignment) {
        return elements.reduce((newArray, item) => {
            const byte = item.serialize();
            const padding = new Uint8Array(GeneratorUtils.getPaddingSize(byte.length, alignment));
            return GeneratorUtils.concatTypedArrays(newArray, GeneratorUtils.concatTypedArrays(byte, padding));
        }, Uint8Array.from([]));
    }
    static writeListEnum(elements, alignment) {
        return elements.reduce((newArray, item) => {
            const byte = GeneratorUtils.uint16ToBuffer(item);
            const padding = new Uint8Array(GeneratorUtils.getPaddingSize(byte.length, alignment));
            return GeneratorUtils.concatTypedArrays(newArray, GeneratorUtils.concatTypedArrays(byte, padding));
        }, Uint8Array.from([]));
    }
    static toFlags(enumClass, bitMaskValue) {
        const values = Object.keys(enumClass)
            .map((key) => enumClass[key])
            .filter((k) => parseInt(k) >= 0)
            .map((k) => parseInt(k));
        return values.filter((value) => (value & bitMaskValue) !== 0);
    }
    static fromFlags(enumClass, flags) {
        const values = Object.keys(enumClass)
            .map((key) => enumClass[key])
            .filter((k) => parseInt(k) >= 0)
            .map((k) => parseInt(k));
        return flags.filter((f) => values.indexOf(f) > -1).reduce((a, b) => a + b, 0);
    }
}
exports.GeneratorUtils = GeneratorUtils;
GeneratorUtils.uint8ToInt8 = (input) => {
    if (0xff < input) {
        throw Error(`input '` + input + `' is out of range`);
    }
    return (input << 24) >> 24;
};
//# sourceMappingURL=GeneratorUtils.js.map