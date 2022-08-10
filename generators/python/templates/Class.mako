## NOTE: do *not* touch `buffered` in render definitions, it will completely break output
<%
    python_lib_import_statements = []
    catbuffer_lib_import_statements = []
    for a in sorted(generator.required_import):
        if str(a).startswith('from .'):
            catbuffer_lib_import_statements.append(a)
        else:
            python_lib_import_statements.append(a)
%>\
from __future__ import annotations
% for a in python_lib_import_statements:
${a}
% endfor
from .GeneratorUtils import GeneratorUtils
% for a in catbuffer_lib_import_statements:
${a}
% endfor

class ${generator.generated_class_name}${'(' + str(generator.generated_base_class_name) + ')' if generator.generated_base_class_name is not None else ''}:
    """${helper.capitalize_first_character(generator.comments)}.

    Attributes:
% for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_is_reserved and a.attribute_name != 'size']:
        ${a.attribute_name}: ${helper.capitalize_first_character(a.attribute_comment)}.
% endfor
    """
<%def name="renderCondition(a, useSelf=True)" filter="trim">
    ${helper.get_condition_operation_text(a.attribute['condition_operation']).format(('self.' if useSelf else '') + a.attribute['condition'], helper.get_generated_class_name(a.condition_type_attribute['type'], a.condition_type_attribute, generator.schema) + '.' + helper.create_enum_name(a.attribute['condition_value']))}
</%def>\
##  CONSTRUCTOR:
<%
    def filter_param(a):
        return a.attribute_condition_value is None and not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.attribute_name == 'size'

    def arg_to_signature(a):
        return '{}: {}'.format(a.attribute_name, a.attribute_var_type)

    constructor_params = generator.all_constructor_params
    constructor_params_CSV = ', '.join(map(arg_to_signature, filter(filter_param, constructor_params)))
    super_arguments_CSV = ', '.join([str(a.attribute_name) for a in filter(filter_param, constructor_params) if a.attribute_is_super])

    def filter_own(a):
        return not a.attribute_is_inline and not a.attribute_is_super and not a.attribute_is_reserved and not a.attribute_name == 'size'

    own_constructor_params = list(filter(filter_own, constructor_params))

    def generate_accessor(a):
        if a.kind == helper.AttributeKind.SIMPLE:
            return a.attribute_name
        elif a.kind == helper.AttributeKind.FLAGS:
            return a.attribute_name + '.flagsToInt()'

        return a.attribute_name + '.' + helper.decapitalize_first_character(a.attribute['type'])

    def generate_obj(id, a):
        if a.kind == helper.AttributeKind.SIMPLE:
            return 't[{}]'.format(id)
        elif a.kind == helper.AttributeKind.FLAGS:
            return '{}.intToFlags(t[{}])'.format(a.attribute_class_name, id)

        return '{}(t[{}])'.format(a.attribute_var_type, id)
%>
## condition should be the same as condition in ctor
% if 0 == len(own_constructor_params):
    # pylint: disable=useless-super-delegation
% endif
    def __init__(self, ${constructor_params_CSV}):
        """Constructor.
        Args:
% for a in [a for a in constructor_params if a.attribute_condition_value is None and not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_name == 'size']:
            ${a.attribute_name}: ${helper.capitalize_first_character(a.attribute_comment)}.
% endfor
        """
    % if generator.base_class_name is not None:
        super().__init__(${super_arguments_CSV})
    % endif
    % for a in own_constructor_params:
        % if a.attribute_is_aggregate:
        self.${a.attribute_name} = ${a.attribute_var_type}(${', '.join([str(inline.attribute_name) for inline in constructor_params if inline.attribute_aggregate_attribute_name == a.attribute_name and not inline.attribute_is_reserved and not inline.kind == helper.AttributeKind.SIZE_FIELD and inline.attribute_condition_value is None and not inline.attribute_is_aggregate])})
        % else:
        self.${a.attribute_name} = ${a.attribute_name}
        % endif
    % endfor

## note: doing it in general, would require possibly calling .from_tuple() recursively in some cases
## in a similar fashion, .as_tuple() would require calling some ctors recursively.
## right now, this is only needed for transactions, so both are limited only to builders specified below
% if generator.name in ('Cosignature', 'UnresolvedMosaic'):
## if not generator.name.endswith('BlockHeader'):
  % if len(own_constructor_params) > 1:
    @staticmethod
    def from_tuple(t):
        return ${generator.generated_class_name}(${', '.join([generate_obj(pair[0], pair[1]) for pair in enumerate(own_constructor_params)])})

    def as_tuple(self):
        return (${', '.join(['self.' + generate_accessor(a) for a in own_constructor_params])})
  % endif
%endif
##  LOAD FROM BINARY:
<%def name="renderReader(a)" filter="trim" buffered="True">
    % if a.kind == helper.AttributeKind.SIMPLE:
        ${a.attribute_name} = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, ${a.attribute_size}))  # kind:SIMPLE
        bytes_ = bytes_[${a.attribute_size}:]
    % elif a.kind == helper.AttributeKind.BUFFER:
        ${a.attribute_name} = GeneratorUtils.get_bytes(bytes_, ${a.attribute_size})  # kind:BUFFER
        bytes_ = bytes_[${a.attribute_size}:]
    % elif a.kind == helper.AttributeKind.SIZE_FIELD:
        ${a.attribute_name} = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, ${a.attribute_size}))  # kind:SIZE_FIELD
        bytes_ = bytes_[${a.attribute_size}:]
    % elif a.kind == helper.AttributeKind.ARRAY:
        ${a.attribute_name}: ${a.attribute_var_type} = []  # kind:ARRAY
        for _ in range(${a.attribute_size}):
            item = ${a.attribute_class_name}.load_from_binary(bytes_)
            ${a.attribute_name}.append(item)
            bytes_ = bytes_[item.get_size():]
    % elif a.kind == helper.AttributeKind.CUSTOM and a.conditional_read_before:
        ${a.attribute_name} = ${a.attribute_class_name}.load_from_binary(${a.attribute['condition']}Condition)  # kind:CUSTOM3
    % elif a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'enum':
        ${a.attribute_name} = ${a.attribute_class_name}.load_from_binary(bytes_)  # kind:CUSTOM2
        bytes_ = bytes_[${a.attribute_name}.get_size():]
    % elif a.kind == helper.AttributeKind.CUSTOM:
        ${a.attribute_name} = ${a.attribute_class_name}.load_from_binary(bytes_)  # kind:CUSTOM1
        bytes_ = bytes_[${a.attribute_name}.get_size():]
    % elif a.kind == helper.AttributeKind.FILL_ARRAY:
        ${a.attribute_name}: List[${a.attribute_class_name}] = []
        bytes_ = GeneratorUtils.load_from_binary(${a.attribute_class_name}, ${a.attribute_name}, bytes_, len(bytes_))
    % elif a.kind == helper.AttributeKind.FLAGS:
        ${a.attribute_name} = ${a.attribute_class_name}.bytesToFlags(bytes_, ${a.attribute_size})  # kind:FLAGS
        bytes_ = bytes_[${a.attribute_size}:]
    % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        transactions: List[${a.attribute_class_name}] = []
        bytes_ = ${generator.generated_class_name}._load_embedded_transactions(transactions, bytes_, ${a.attribute_size})
    % else:
        FIX ME!
    % endif
</%def>\
<%
    possible_constructor_params = generator.constructor_attributes[0]
    if generator.base_class_name is None:
        constructor_arguments_CSV = ', '.join([str(a.attribute_name)
        for a in possible_constructor_params if not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.attribute_name == 'size'])
    else:
        constructor_arguments_CSV = ', '.join(['{0}{1}'.format('superObject.' if a.attribute_is_super else ('' if a.attribute_aggregate_attribute_name is None else a.attribute_aggregate_attribute_name + '.'), a.attribute_name)
        for a in possible_constructor_params if not a.attribute_is_aggregate and not a.attribute_is_reserved and not a.attribute_name == 'size'])
%>
    @classmethod
    def load_from_binary(cls, payload: bytes) -> ${generator.generated_class_name}:
        """Creates an instance of ${generator.generated_class_name} from binary payload.
        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of ${generator.generated_class_name}.
        """
        bytes_ = bytes(payload)
    % if generator.base_class_name is not None:
        superObject = ${generator.generated_base_class_name}.load_from_binary(bytes_)
        bytes_ = bytes_[superObject.get_size():]
    % endif
    % for a in set([(a.attribute['condition'], a.attribute_size, a.conditional_read_before) for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and a.conditional_read_before and a.attribute_is_conditional]):
        ${a[0]}Condition = bytes_[0:${a[1]}]
        bytes_ = bytes_[${a[1]}:]
    % endfor

    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.conditional_read_before]:
        %if a.attribute_is_conditional:
        ${a.attribute_name} = None
        if ${renderCondition(a, useSelf=False) | trim}:
            ## handle py indents
            % for line in map(lambda a: a.strip(), renderReader(a).splitlines()):
            ${line}
            % endfor
        % else:
        ${renderReader(a) | trim}
        %endif
    % endfor
    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and a.conditional_read_before]:
        ${a.attribute_name} = None
        if ${renderCondition(a, useSelf=False) | trim}:
            ## handle py indents
            % for line in map(lambda a: a.strip(), renderReader(a).splitlines()):
            ${line}
            % endfor
    % endfor
        return ${generator.generated_class_name}(${constructor_arguments_CSV})

## GETTERS:
% for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_reserved and not a.attribute_is_aggregate and not a.kind == helper.AttributeKind.SIZE_FIELD and (not a.attribute_is_reserved or not a.attribute_is_inline) and not a.attribute_name == 'size']:
    def get_${helper.camel_to_snake(a.attribute_name) if a.attribute_name != 'size' else 'bytes_size'}(self) -> ${a.attribute_var_type}:
        """Gets ${a.attribute_comment}.
        Returns:
            ${helper.capitalize_first_character(a.attribute_comment)}.
        """
    % if a.attribute_is_conditional and not a.attribute_is_inline:
        if not ${renderCondition(a) | trim}:
            raise Exception('${a.attribute['condition']} is not set to ${helper.create_enum_name(a.attribute['condition_value'])}.')
    % endif
    % if a.attribute_is_inline:
        return self.${a.attribute_aggregate_attribute_name}.get_${helper.camel_to_snake(a.attribute_name)}()
    % else:
        return self.${a.attribute_name}
    % endif

% endfor
## SIZE:
<%def name="renderSize(a)" filter="trim"  buffered="True">\
    % if a.kind == helper.AttributeKind.SIMPLE:
        size += ${a.attribute_size}  # ${a.attribute_name}
    % elif a.kind == helper.AttributeKind.SIZE_FIELD:
        size += ${a.attribute_size}  # ${a.attribute_name}
    % elif a.kind == helper.AttributeKind.BUFFER:
        size += len(self.${a.attribute_name})
    % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        for _ in self.${a.attribute_name}:
            size += self._get_size_aligned(_)
    % elif a.kind == helper.AttributeKind.ARRAY or a.kind == helper.AttributeKind.FILL_ARRAY:
        for _ in self.${a.attribute_name}:
            size += _.get_size()
    % elif a.kind == helper.AttributeKind.FLAGS:
        size += ${a.attribute_size}  # ${a.attribute_name}
    % else:
        size += self.${a.attribute_name}.get_size()
    % endif
</%def>\
    def get_size(self) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        size = ${'super().get_size()' if generator.base_class_name is not None else '0'}
% for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline]:
    % if a.attribute_is_conditional:
        if ${renderCondition(a) | trim}:
            ## handle py indents
            % for line in map(lambda a: a.strip(), renderSize(a).splitlines()):
            ${line}
            % endfor
    % else:
        ${renderSize(a).strip()}
    % endif
% endfor
        return size

##  SERIALIZE:
<%def name="renderSerialize(a)" filter="trim" buffered="True">\
    % if a.kind == helper.AttributeKind.SIMPLE and a.attribute_is_reserved:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, ${a.attribute_size}))
    % elif a.kind == helper.AttributeKind.SIMPLE and (generator.name != 'Receipt' or a.attribute_name != 'size'):
        % if a.attribute_is_reserved:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, ${a.attribute_size}))  # kind:SIMPLE
        % else:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_${helper.camel_to_snake(a.attribute_name)}(), ${a.attribute_size}))  # kind:SIMPLE
        % endif
    % elif a.kind == helper.AttributeKind.BUFFER:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.${a.attribute_name})  # kind:BUFFER
    % elif a.kind == helper.AttributeKind.SIZE_FIELD:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(len(self.get_${helper.camel_to_snake(a.parent_attribute['name'])}()), ${a.attribute_size}))  # kind:SIZE_FIELD
    % elif a.kind == helper.AttributeKind.ARRAY or a.kind == helper.AttributeKind.FILL_ARRAY:
        for _ in self.${a.attribute_name}: # kind:ARRAY|FILL_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, _.serialize())
    % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        for _ in self.${a.attribute_name}: # kind:VAR_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self._serialize_aligned(_))
    % elif a.kind == helper.AttributeKind.CUSTOM:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.${a.attribute_name}.serialize())  # kind:CUSTOM
    % elif a.kind == helper.AttributeKind.FLAGS:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(${a.attribute_class_name}.flagsToInt(self.get_${helper.camel_to_snake(a.attribute_name)}()), ${a.attribute_size}))  # kind:FLAGS
    % else:
        # Ignored serialization: ${a.attribute_name} ${a.kind}
    % endif
</%def>\
    def serialize(self) -> bytes:
        """Serializes self to bytes.
        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
 % if generator.base_class_name is not None:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, super().serialize())
% endif
% for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline]:
    % if a.attribute_is_conditional:
        if ${renderCondition(a) | trim}:
            ## handle py indents
            % for line in map(lambda a: a.strip(), renderSerialize(a).splitlines()):
            ${line}
            % endfor
    % else:
        ${renderSerialize(a)}
    % endif
% endfor
        return bytes_
## type it manually to have mosaic ids in hex
% if generator.name == 'UnresolvedMosaic':

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        return '(0x{:x}, {})'.format(self.mosaicId.unresolvedMosaicId, self.amount.amount)
% elif generator.name == 'Cosignature':

    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = '('
        result += '{}, '.format(self.version)
        result += '{}, '.format(hexlify(self.signerPublicKey.key).decode('utf-8'))
        result += '{}'.format(hexlify(self.signature.signature).decode('utf-8'))
        result += ')'
        return result
% endif
    # end of class