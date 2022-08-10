using System;
using System.IO;

/*
* ${helper.capitalize_first_character(generator.comments)}
*/

namespace Symbol.Builders {

    [Serializable]
    public enum ${generator.generated_class_name} {
    % for i, (name, (value, comment)) in enumerate(generator.enum_values.items()):
        /* ${comment}. */
        ${name} = ${value},
    % endfor
    }
    
    public static class ${generator.generated_class_name}Extensions
    {
        /* Enum value. */
        private static ${generator.enum_type} value(this ${generator.generated_class_name} self) {
            return (${generator.enum_type})self;
        }

        /*
        * Gets enum value.
        *
        * @param value Raw value of the enum.
        * @return Enum value.
        */
        public static ${generator.generated_class_name} RawValueOf(this ${generator.generated_class_name} self, ${generator.enum_type} value) {
            foreach (${generator.generated_class_name} current in Enum.GetValues(typeof(${generator.generated_class_name}))) {
                if (value == (current.value()) {
                    return current;
                }
            }
            throw new Exception(value + " was not a backing value for ${generator.generated_class_name}.");
        }

        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public static int GetSize(this ${generator.generated_class_name} type)
        {
            return ${generator.size};
        }

        /*
        * Creates an instance of ${generator.generated_class_name} from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of ${generator.generated_class_name}.
        */
        public static ${generator.generated_class_name} LoadFromBinary(this ${generator.generated_class_name} self, BinaryReader stream) {
            try {
                ${generator.enum_type} streamValue = ${'stream.' + generator.helper.get_read_method_name(generator.size) + '()'};
                return RawValueOf(self, streamValue);
            } catch(Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public static byte[] Serialize(this ${generator.generated_class_name} self) {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            bw.${helper.get_write_method_name(generator.size)}(self.value());
            var result = ms.ToArray();
            return result;
        }
    }
}