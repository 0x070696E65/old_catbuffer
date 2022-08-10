using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace Symbol.Builders {
    /*
    * ${helper.capitalize_first_character(generator.comments)}
    */
    [Serializable]
    public class ${generator.generated_class_name}${(': ' + str(generator.generated_base_class_name)) if generator.generated_base_class_name is not None else ': ISerializer'} {

    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.kind == helper.AttributeKind.SIZE_FIELD]:
        /* ${helper.capitalize_first_character(a.attribute_comment)}. */
        public ${a.attribute_var_type}${('?' if a.attribute_is_conditional else '')} ${a.attribute_name};

    % endfor\

    <%def name="renderCondition(a)" filter="trim">
        ${helper.get_condition_operation_text(a.attribute['condition_operation']).format(a.attribute['condition'], helper.get_generated_class_name(a.condition_type_attribute['type'], a.condition_type_attribute, generator.schema) + '.' + helper.create_enum_name(a.attribute['condition_value']))}
    </%def>\
    ##     STREAM CONSTRUCTORS
    <%def name="renderReader(a)" filter="trim">
        % if a.kind == helper.AttributeKind.SIMPLE:
                this.${a.attribute_name} = ${'stream.' + helper.get_read_method_name(a.attribute_size) + '()'};
        % elif a.kind == helper.AttributeKind.BUFFER:
                this.${a.attribute_name} = GeneratorUtils.ReadBytes(stream, ${a.attribute_size});
        % elif a.kind == helper.AttributeKind.SIZE_FIELD:
                ${a.attribute_var_type} ${a.attribute_name} = ${'stream.' + helper.get_read_method_name(a.attribute_size) + '()'};
        % elif a.kind == helper.AttributeKind.ARRAY and a.attribute_base_type == 'enum':
                //this.${a.attribute_name} = GeneratorUtils.LoadFromBinaryArray(${helper.get_load_from_binary_factory(a.attribute_class_name)}.LoadFromBinary, stream, ${a.attribute_size}, 0);
                this.${a.attribute_name} = new List<${a.attribute_class_name}>(){};
                for (var i = 0; i < ${a.attribute_size}; i++)
                {
                    int ${a.attribute_name}Stream = stream.ReadInt16();
                    foreach (${a.attribute_class_name} tt in Enum.GetValues(typeof(${a.attribute_class_name}))) {
                        if ((int)(object)tt == ${a.attribute_name}Stream)
                        {
                            this.${a.attribute_name}.Add(tt);
                            GeneratorUtils.SkipPadding(tt.GetSize(), stream, 0);
                            break;
                        }
                    }
                }
        % elif a.kind == helper.AttributeKind.ARRAY:
                //this.${a.attribute_name} = ${a.attribute_class_name}.LoadFromBinary(stream);
                this.${a.attribute_name} = new List<${a.attribute_class_name}>(){};
                //for (int i = 0; i < ${a.attribute_name}Count; i++) {
                for (int i = 0; i < ${a.attribute_size}; i++) {
                    ${a.attribute_class_name} tt = ${a.attribute_class_name}.LoadFromBinary(stream);
                    this.${a.attribute_name}.Add(tt);
                    GeneratorUtils.SkipPadding(tt.GetSize(), stream, 0);
                }
        % elif a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'enum':
                this.${a.attribute_name} = (${a.attribute_class_name})Enum.ToObject(typeof(${a.attribute_class_name}), (${helper.get_builtin_type(a.attribute_size)})stream.${helper.get_read_method_name(a.attribute_size)}());
        % elif a.kind == helper.AttributeKind.CUSTOM and (not a.attribute_is_conditional or not a.conditional_read_before):
                this.${a.attribute_name} = ${helper.get_load_from_binary_factory(a.attribute_class_name)}.LoadFromBinary(stream);
        % elif a.kind == helper.AttributeKind.CUSTOM:
                this.${a.attribute_name} = new ${helper.get_load_from_binary_factory(a.attribute_class_name)}(${a.attribute['condition']}Condition);
        % elif a.kind == helper.AttributeKind.FILL_ARRAY:
                this.${a.attribute_name} = GeneratorUtils.LoadFromBinaryArrayRemaining(${helper.get_load_from_binary_factory(a.attribute_class_name)}.LoadFromBinary, stream, 0);
        % elif a.kind == helper.AttributeKind.FLAGS:
                this.${a.attribute_name} = GeneratorUtils.ToSet<${a.attribute_class_name}>(stream.${helper.get_read_method_name(a.attribute_size)}());
        % elif a.kind == helper.AttributeKind.VAR_ARRAY:
                this.${a.attribute_name} = GeneratorUtils.LoadFromBinaryArrayRemaining(${helper.get_load_from_binary_factory(a.attribute_class_name)}.LoadFromBinary, stream, payloadSize, ${helper.resolve_alignment(a)});
        % else:
                FIX ME!
        % endif
    </%def>\
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal ${generator.generated_class_name}(BinaryReader stream)
        % if generator.base_class_name is not None:
            : base(stream)
        % endif
        {
            try {
        % for a in set([(a.attribute['condition'], a.attribute_size, a.conditional_read_before) for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and a.conditional_read_before and a.attribute_is_conditional]):
                ${helper.get_builtin_type(a[1])} ${a[0]}Condition = ${'(' + helper.get_builtin_type(a[1]) + ')stream.' + helper.get_read_method_name(a[1]) + '()'};
        % endfor
        % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.conditional_read_before]:
            %if a.attribute_is_conditional:
                if (this.${renderCondition(a) | trim}) {
                    ${renderReader(a) | trim}
                }
                % else:
                ${renderReader(a) | trim}
            %endif
        % endfor
        % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and a.conditional_read_before]:
                if (this.${renderCondition(a) | trim}) {
                    ${renderReader(a) | trim}
                }
        % endfor
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of ${generator.generated_class_name} from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of ${generator.generated_class_name}.
        */
        public static ${generator.generated_class_name} LoadFromBinary(BinaryReader stream) {
            return new ${generator.generated_class_name}(stream);
        }
        <%
            constructor_params = generator.all_constructor_params
            constructor_params_CSV = ', '.join([str(a.attribute_var_type + ('?' if a.attribute_is_conditional else '')) + ' ' + str(a.attribute_name) for a in constructor_params if a.attribute_condition_value == None and not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.attribute_name == 'size'])
            super_arguments_CSV = ', '.join([str(a.attribute_name) for a in constructor_params if a.attribute_is_super and not a.attribute_is_reserved and not a.attribute_is_aggregate  and not a.attribute_name == 'size'])
        %>
        /*
        * Constructor.
        *
    % for a in [a for a in constructor_params if a.attribute_condition_value == None and not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_name == 'size']:
        * @param ${a.attribute_name} ${helper.capitalize_first_character(a.attribute_comment)}.
    % endfor
        */
        internal ${generator.generated_class_name}(${constructor_params_CSV})
        % if generator.base_class_name is not None:
            : base(${super_arguments_CSV})
        % endif
        {
        % for a in [a for a in constructor_params if a.attribute_condition_value == None and not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.attribute_name == 'size']:
        % if a.attribute_is_conditional:
            if (${renderCondition(a) | trim}) {
                GeneratorUtils.NotNull(${a.attribute_name}, "${a.attribute_name} is null");
            }
        %else:
            GeneratorUtils.NotNull(${a.attribute_name}, "${a.attribute_name} is null");
        % endif
        % endfor
        % for a in [a for a in constructor_params if not a.attribute_is_inline and not a.attribute_is_super and not a.attribute_name == 'size']:
            % if a.attribute_is_aggregate:
            this.${a.attribute_name} = new ${a.attribute_var_type}(${', '.join([str(inline.attribute_name) for inline in constructor_params if inline.attribute_aggregate_attribute_name == a.attribute_name and not inline.attribute_is_reserved and not inline.kind == helper.AttributeKind.SIZE_FIELD and inline.attribute_condition_value is None and not inline.attribute_is_aggregate])});
            % else:
            this.${a.attribute_name} = ${a.attribute_name if not a.attribute_is_reserved else '0'};
            % endif
        % endfor
        }
    ## CONDITIONAL CONSTRUCTORS
    % for possible_constructor_params in generator.constructor_attributes:
        <%
            constructor_params = [a for a in possible_constructor_params if a.attribute_condition_value is None and a.attribute_condition_provide and not a.attribute_is_reserved and not a.attribute_is_aggregate]
            constructor_params_CSV = ', '.join([str(a.attribute_var_type) + ' ' + str(a.attribute_name) for a in constructor_params])
            default_value_attributes = [a for a in possible_constructor_params if a.attribute_condition_value is not None]
            create_name_suffix = ''.join([helper.capitalize_first_character(a.attribute_condition_value) for a in default_value_attributes])
            constructor_arguments_CSV = ', '.join([str(a.attribute_name)
            if a.attribute_condition_value is not None or a.attribute_condition_provide else 'null'
            for a in possible_constructor_params if not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.attribute_name == 'size'])
        %>
        /*
        * Creates an instance of ${generator.generated_class_name}.
        *
    % for a in [a for a in constructor_params if a.attribute_condition_value == None and not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.attribute_name == 'size']:
        * @param ${a.attribute_name} ${helper.capitalize_first_character(a.attribute_comment)}.
    % endfor
        * @return Instance of ${generator.generated_class_name}.
        */
        public static ${generator.generated_class_name} Create${create_name_suffix}(${constructor_params_CSV}) {
        % for a in default_value_attributes:
            ${helper.get_generated_class_name(a.attribute['type'], a.attribute, generator.schema)} ${a.attribute_name} = ${helper.get_generated_class_name(a.attribute['type'], a.attribute, generator.schema)}.${helper.create_enum_name(a.attribute_condition_value)};
        % endfor
            return new ${generator.generated_class_name}(${constructor_arguments_CSV});
        }
    % endfor

    ## GETTERS:
    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_aggregate and not a.kind == helper.AttributeKind.SIZE_FIELD and (not a.attribute_is_reserved or not a.attribute_is_inline)]:
        /*
        * Gets ${a.attribute_comment}.
        *
        * @return ${helper.capitalize_first_character(a.attribute_comment)}.
        */
        ${'private' if a.attribute_is_reserved else 'public'} ${a.attribute_var_type}${('?' if a.attribute_is_conditional else '')} Get${helper.capitalize_first_character(a.attribute_name) if a.attribute_name != 'size' else 'StreamSize'}() {
        % if a.attribute_is_conditional and not a.attribute_is_inline:
            if (!(this.${renderCondition(a) | trim})) {
                throw new Exception("${a.attribute['condition']} is not set to ${helper.create_enum_name(a.attribute['condition_value'])}.");
            }
        % endif
        % if a.attribute_is_inline:
            return this.${a.attribute_aggregate_attribute_name}.Get${helper.capitalize_first_character(a.attribute_name)}();
        % else:
            return this.${a.attribute_name};
        % endif
        }

    % endfor
    ## SIZE:
    <%def name="renderSize(a)" filter="trim">\
        % if a.kind == helper.AttributeKind.SIMPLE:
            size += ${a.attribute_size}; // ${a.attribute_name}
        % elif a.kind == helper.AttributeKind.SIZE_FIELD:
            size += ${a.attribute_size}; // ${a.attribute_name}
        % elif a.kind == helper.AttributeKind.BUFFER:
            size += this.${a.attribute_name}.Length;
        % elif a.kind == helper.AttributeKind.ARRAY:
            int ${a.attribute_name}Size = 0;
            foreach (${a.attribute_class_name} tt in this.${a.attribute_name})
            {
                ${a.attribute_name}Size += tt.GetSize() + GeneratorUtils.GetPadding(${a.attribute_name}Size, 0);
            }
            size += ${a.attribute_name}Size;
        % elif a.kind == helper.AttributeKind.FILL_ARRAY:
            int ${a.attribute_name}Size = 0;
            foreach (${a.attribute_class_name} tt in this.${a.attribute_name})
            {
                ${a.attribute_name}Size += tt.GetSize() + GeneratorUtils.GetPadding(${a.attribute_name}Size, 0);
            }
        % elif a.kind == helper.AttributeKind.VAR_ARRAY:
            size +=  GeneratorUtils.GetSumSize(this.${a.attribute_name}, ${helper.resolve_alignment(a)});
        % elif a.kind == helper.AttributeKind.FLAGS:
            size += ${a.attribute_size}; // ${a.attribute_name}
        % elif a.attribute_is_conditional:
            if (this.${a.attribute_name} != null) {
                size += ((${a.attribute_class_name}) this.${a.attribute_name}).GetSize();
            }
        % else:
            size += this.${a.attribute_name}.GetSize();
        % endif
    </%def>\

        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
    % if generator.base_class_name == "EmbeddedTransaction":
        public override int GetSize() {
    % elif generator.generated_class_name == "EmbeddedTransactionBuilder":
        public virtual int GetSize() {
    % else:
        public int GetSize() {
    % endif
            int size = ${'base.GetSize()' if generator.base_class_name is not None else '0'};
    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline]:
        % if a.attribute_is_conditional:
            if (this.${renderCondition(a) | trim}) {
                ${renderSize(a).strip()}
            }
        % else:
            ${renderSize(a).strip()}
        % endif
    % endfor
            return size;
        }

    % if generator.base_class_name in ['Transaction', 'EmbeddedTransaction']:
        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public ${generator.body_class_name}Builder GetBody() {
            return this.${helper.decapitalize_first_character(generator.body_class_name)};
        }
    % endif

    % if generator.name in ['Transaction', 'EmbeddedTransaction']:
        /*
        * Gets the body builder of the object.
        *
        * @return Body builder.
        */
        public ISerializer GetBody() {
            return null;
        }
    % endif

    <%def name="renderSerialize(a)" filter="trim">\
        % if a.kind == helper.AttributeKind.SIMPLE and a.attribute_name == 'size':
            bw.${helper.get_write_method_name(a.attribute_size)}((${helper.get_builtin_type(a.attribute_size)})this.GetStreamSize());
        % elif a.kind == helper.AttributeKind.SIMPLE and (generator.name != 'Receipt' or a.attribute_name != 'size'):
            bw.${helper.get_write_method_name(a.attribute_size)}((${helper.get_builtin_type(a.attribute_size)})${'this.Get' + helper.capitalize_first_character(a.attribute_name)}());
        % elif a.kind == helper.AttributeKind.BUFFER:
            bw.Write(this.${a.attribute_name}, 0, this.${a.attribute_name}.Length);
        % elif a.kind == helper.AttributeKind.SIZE_FIELD and 'disposition' in a.parent_attribute and a.parent_attribute['disposition'] == 'var':
            int size = 0;
            foreach (var i in this.Get${helper.capitalize_first_character(a.parent_attribute['name'])}())
            {
                size += i.GetStreamSize();
                size += GeneratorUtils.GetPadding(size, ${str(helper.resolve_alignment(a))});
            }
            bw.${helper.get_write_method_name(a.attribute_size)}(size);
            //bw.${helper.get_write_method_name(a.attribute_size)}((${a.attribute_var_type})GeneratorUtils.GetSumSize(this.Get${helper.capitalize_first_character(a.parent_attribute['name'])}(),${str(helper.resolve_alignment(a))}));
        % elif a.kind == helper.AttributeKind.SIZE_FIELD:
            bw.${helper.get_write_method_name(a.attribute_size)}((${a.attribute_var_type})GeneratorUtils.GetSize(this.Get${helper.capitalize_first_character(a.parent_attribute['name'])}()));
        % elif a.kind == helper.AttributeKind.ARRAY:
            foreach (${a.attribute_class_name} entity in this.${a.attribute_name})
            {
                byte[] entityBytes = entity.Serialize();
                bw.Write(entityBytes, 0, entityBytes.Length);
                GeneratorUtils.AddPadding(entityBytes.Length, bw, 0);
            }
            //GeneratorUtils.WriteList(bw, this.${a.attribute_name}, 0);
        % elif a.kind == helper.AttributeKind.FILL_ARRAY:
            GeneratorUtils.WriteList(bw, this.${a.attribute_name}, 0);
        % elif a.kind == helper.AttributeKind.VAR_ARRAY:
            GeneratorUtils.WriteList(bw, this.${a.attribute_name}, ${helper.resolve_alignment(a)});
        % elif a.kind == helper.AttributeKind.CUSTOM:
            byte[] ${a.attribute_name}EntityBytes = ((${a.attribute_class_name})this.${a.attribute_name}).Serialize();
            bw.Write(${a.attribute_name}EntityBytes, 0, ${a.attribute_name}EntityBytes.Length);
        % elif a.kind == helper.AttributeKind.FLAGS:
            //byte flagsByte = (byte)GeneratorUtils.ToLong<${a.attribute_class_name}>(this.flags);
            //bw.${helper.get_write_method_name(a.attribute_size)}(flagsByte);
            //bw.${helper.get_write_method_name(a.attribute_size)}(BitConverter.ToInt16(BitConverter.GetBytes(GeneratorUtils.ToLong<${a.attribute_class_name} >(this.${a.attribute_name}))));
            bw.${helper.get_write_method_name(a.attribute_size)}((${helper.get_builtin_type(a.attribute_size)})GeneratorUtils.ToLong<${a.attribute_class_name} >(this.${a.attribute_name}));
        % else:
            // Ignored serialization: ${a.attribute_name} ${a.kind}
        % endif
    </%def>\
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
    % if generator.base_class_name == "EmbeddedTransaction":
        public override byte[] Serialize() {
    % elif generator.generated_class_name == "EmbeddedTransactionBuilder":
        public virtual byte[] Serialize() {
    % else:
        public byte[] Serialize() {
    % endif
            MemoryStream ms = new MemoryStream();
            BinaryWriter bw = new BinaryWriter(ms);
    % if generator.base_class_name is not None:
            byte[] superBytes = base.Serialize();
            bw.Write(superBytes, 0, superBytes.Length);
    % endif
    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline]:
        % if a.attribute_is_conditional:
            if (this.${renderCondition(a) | trim}) {
                ${renderSerialize(a)}
            }
        % else:
            ${renderSerialize(a)}
        % endif
    % endfor
            byte[] result = ms.ToArray();
            return result;
        }
    }
}