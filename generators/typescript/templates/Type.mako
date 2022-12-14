import { Serializer } from './Serializer';
import { GeneratorUtils } from './GeneratorUtils';

/** ${generator.comments}. */
export class ${generator.generated_class_name} implements Serializer {
    /** ${generator.comments}. */
    public readonly ${generator.attribute_name}: ${generator.attribute_type};

    /**
     * Constructor.
     *
     * @param ${generator.attribute_name} ${generator.comments}.
     */
    constructor(${generator.attribute_name}: ${generator.attribute_type}) {
        this.${generator.attribute_name} = ${generator.attribute_name};
    }

    /**
     * Creates an instance of ${generator.generated_class_name} from binary payload.
     *
     * @param payload Byte payload to use to serialize the object.
     * @return Instance of ${generator.generated_class_name}.
     */
    public static loadFromBinary(payload: Uint8Array): ${generator.generated_class_name} {
        const ${generator.attribute_name} = ${helper.get_read_method_name(generator.size, 'payload')};
        return new ${generator.generated_class_name}(${generator.attribute_name});
    }

    /**
     * Creates an 'empty' instance of ${generator.generated_class_name}
     *
     * @return ${generator.generated_class_name} instance.
     */
    public static createEmpty(): ${generator.generated_class_name} {
        return new ${generator.generated_class_name}(${helper.get_empty_value(generator.size)});
    }

    /**
     * Gets the size of the object.
     *
     * @return Size in bytes.
     */
    public get size(): number {
        return ${generator.size};
    }

    /**
     * Serializes an object to bytes.
     *
     * @return Serialized bytes.
     */
    public serialize(): Uint8Array {
        return ${helper.get_serialize_method_name(generator.size)}(${'this.' + generator.attribute_name});
    }
}
