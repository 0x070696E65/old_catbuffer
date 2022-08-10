using System;
using System.IO;

namespace Symbol.Builders {

    /* ${generator.comments}. */
    [Serializable]
    public struct ${generator.generated_class_name} : ISerializer
    {
        /* ${generator.comments}. */
        private readonly ${generator.attribute_type} ${generator.attribute_name};

        /*
         * Constructor.
         *
         * @param ${generator.attribute_name} ${generator.comments}.
         */
        public ${generator.generated_class_name}(${generator.attribute_type} ${generator.attribute_name})
        {
            this.${generator.attribute_name} = ${generator.attribute_name};
        }

        /*
         * Constructor - Creates an object from stream.
         *
         * @param stream Byte stream to use to serialize.
         */
        public ${generator.generated_class_name}(BinaryReader stream)
        {
            try
            {
            % if generator.attribute_kind == helper.AttributeKind.BUFFER:
                this.${generator.attribute_name} = ${'stream.' + helper.get_read_method_name(generator.size)}(${generator.size});
            % else:
                this.${generator.attribute_name} = stream.${generator.helper.get_read_method_name(generator.size)}();
            % endif
            }
            catch
            {
                throw new Exception("${generator.generated_class_name}: ERROR");
            }
        }

        /*
         * Gets ${generator.comments}.
         *
         * @return ${generator.comments}.
         */
        public ${generator.attribute_type} Get${generator.name}()
        {
            return this.${generator.attribute_name};
        }

        /*
         * Gets the size of the object.
         *
         * @return Size in bytes.
         */
        public int GetSize()
        {
            return ${generator.size};
        }

        /*
         * Creates an instance of ${generator.generated_class_name} from a stream.
         *
         * @param stream Byte stream to use to serialize the object.
         * @return Instance of ${generator.generated_class_name}.
         */
        public static ${generator.generated_class_name} LoadFromBinary(BinaryReader stream)
        {
            return new ${generator.generated_class_name}(stream);
        }

        /*
         * Serializes an object to bytes.
         *
         * @return Serialized bytes.
         */
        public byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
        % if generator.attribute_kind == helper.AttributeKind.BUFFER:
            bw.Write(this.${generator.attribute_name}, 0, this.${generator.attribute_name}.Length);
        % else:
            bw.${helper.get_write_method_name(generator.size)}(${'this.Get' + generator.name + '()'});
        % endif
            var result = ms.ToArray();
            return result;
        }
    }
}
