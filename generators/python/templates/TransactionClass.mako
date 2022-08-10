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

# pylint: disable=unused-import

% for a in python_lib_import_statements:
${a}
% endfor
from .GeneratorUtils import GeneratorUtils
% for a in catbuffer_lib_import_statements:
${a}
% endfor

def to_hex_string(bin):
    return hexlify(bin).decode('utf-8')

class ${generator.generated_class_name}${'(' + str(generator.generated_base_class_name) + ')' if generator.generated_base_class_name is not None else ''}:
    """${helper.capitalize_first_character(generator.comments)}.

    Attributes:
% for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_is_reserved and a.attribute_name != 'size']:
    % if a.attribute_name.endswith('TransactionBody'):
        body: ${helper.capitalize_first_character(a.attribute_comment)}.
    % else:
        ${helper.camel_to_snake(a.attribute_name)}: ${helper.capitalize_first_character(a.attribute_comment)}.
    % endif
% endfor
    """
% if not generator.name.endswith('TransactionBody'):
    type_hints = {
% for a in [a for a in generator.attributes if  not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_is_reserved and a.attribute_name != 'size']:
    % if not a.attribute_name.endswith('TransactionBody') and a.attribute_var_type != 'TransactionBuilder':
      % if a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'enum':
        '${helper.camel_to_snake(a.attribute_name)}' : 'enum:${a.attribute_var_type}',
      % elif a.kind == helper.AttributeKind.CUSTOM:
        '${helper.camel_to_snake(a.attribute_name)}' : '${a.attribute_var_type}',
      % elif a.kind  == helper.AttributeKind.ARRAY:
          % if a.attribute_base_type == 'enum':
        '${helper.camel_to_snake(a.attribute_name)}' : 'array[enum:${a.attribute_class_name}]',
        % else:
        '${helper.camel_to_snake(a.attribute_name)}' : 'array',
        % endif
      % elif a.kind in (helper.AttributeKind.VAR_ARRAY, helper.AttributeKind.FILL_ARRAY):
        '${helper.camel_to_snake(a.attribute_name)}' : 'array',
      % elif a.kind == helper.AttributeKind.FLAGS:
        '${helper.camel_to_snake(a.attribute_name)}': '${a.attribute_class_name}',
      % endif
    % endif
% endfor
    }

% endif
##  CONSTRUCTORS
% if generator.name.endswith('TransactionBody'):
    def __init__(self):
        """ Constructor."""
% for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_is_reserved and a.attribute_name != 'size']:
<%
    formatted_attribute_name = helper.camel_to_snake(a.attribute_name)
%>\
    % if a.kind == helper.AttributeKind.ARRAY:
        self.${formatted_attribute_name} = []
      % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        self.${formatted_attribute_name} = []
      % elif a.kind == helper.AttributeKind.FILL_ARRAY:
        self.${formatted_attribute_name} = []
      % elif a.kind == helper.AttributeKind.BUFFER:
        self.${formatted_attribute_name} = bytes()
      % elif a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'byte' and a.attribute_size > 8:
        self.${formatted_attribute_name} = bytes(${a.attribute_size})
      % elif a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'enum':
        self.${formatted_attribute_name} = ${a.attribute_var_type}(0).value
      % elif a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'struct':
        self.${formatted_attribute_name} = None # ${a.attribute_var_type}
      % elif a.kind == helper.AttributeKind.FLAGS:
        self.${formatted_attribute_name} = []
      %elif a.attribute_var_type != 'int':
        self.${formatted_attribute_name} = ${a.attribute_var_type}().${helper.decapitalize_first_character(a.attribute['type'])}
      % else:
        self.${formatted_attribute_name} = ${a.attribute_var_type}()
      % endif
% endfor

% elif generator.name.endswith('Transaction'):
  % if generator.name == 'Transaction':
    def __init__(self, signer_public_key, version, network, type):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            version: Entity version.
            network: Entity network.
            type: Entity type.
        """
        self.signature = bytes(${next(a for a in generator.attributes if a.attribute_name == 'signature').attribute_size})
        self.signer_public_key = signer_public_key
        self.version = version
        self.network = network
        self.type = type

        self.fee = 0
        self.deadline = 0

  % elif generator.name == 'EmbeddedTransaction':
    def __init__(self, signer_public_key, version, network: NetworkTypeDto, type):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            version: Entity version.
            network: Entity network.
            type: Entity type.

        """
        self.signer_public_key = signer_public_key
        self.version = version
        self.network = network
        self.type = type

  % else:
    % for a in generator.immutable_attributes:
    % if a.attribute_base_type == 'enum':
    ${helper.snake_case(a.attribute_name).upper()} = 0x${'{:x}'.format(a.attribute_value)}
    % else:
    ${helper.snake_case(a.attribute_name).upper()} = ${a.attribute_value}
    % endif
    % endfor

    def __init__(self, signer_public_key, network: NetworkTypeDto):
        """Constructor.
        Args:
            signer_public_key: Entity signer's public key.
            network: Entity network.
        """
        super().__init__(signer_public_key, self.VERSION, network, self.ENTITY_TYPE)

        self.body = ${ next(a for a in generator.attributes if a.attribute_name.endswith('TransactionBody')).attribute_class_name }()
  % endif

% endif # TransactionBody
% if 'AggregateTransactionBody' in generator.generated_class_name:
    @staticmethod
    def _load_embedded_transactions(transactions, payload: bytes, payload_size: int):
        remaining_byte_sizes = payload_size
        while remaining_byte_sizes > 0:
            item = EmbeddedTransactionBuilderFactory.create_from_payload(payload)
            transactions.append(item)
            item_size = item.get_size() + GeneratorUtils.get_transaction_padding_size(item.get_size(), 8)
            remaining_byte_sizes -= item_size
            payload = payload[item_size:]
        return payload

% endif
##  LOAD FROM BINARY:
<%def name="renderReader(a)" filter="trim" buffered="True">
<%
    formatted_attribute_name = helper.camel_to_snake(a.attribute_name)
%>\
    % if a.kind == helper.AttributeKind.SIMPLE:
        ${formatted_attribute_name} = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, ${a.attribute_size}))  # kind:SIMPLE
        bytes_ = bytes_[${a.attribute_size}:]
    % elif a.kind == helper.AttributeKind.BUFFER:
        ${formatted_attribute_name} = GeneratorUtils.get_bytes(bytes_, ${helper.camel_to_snake(a.attribute_size)})  # kind:BUFFER
        bytes_ = bytes_[${helper.camel_to_snake(a.attribute_size)}:]
    % elif a.kind == helper.AttributeKind.SIZE_FIELD:
        ${formatted_attribute_name} = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, ${a.attribute_size}))  # kind:SIZE_FIELD
        bytes_ = bytes_[${a.attribute_size}:]
    % elif a.kind == helper.AttributeKind.ARRAY:
        ${formatted_attribute_name} = []  # kind:ARRAY
        for _ in range(${helper.camel_to_snake(a.attribute_size)}):
            item = ${a.attribute_class_name}.load_from_binary(bytes_)
        % if a.attribute_base_type == 'struct':
            ${formatted_attribute_name}.append(item.as_tuple())
        % elif a.attribute_base_type == 'enum':
            ${formatted_attribute_name}.append(item)
        % else:
            ${formatted_attribute_name}.append(item.${helper.decapitalize_first_character(a.attribute['type'])})
        % endif
            bytes_ = bytes_[item.get_size():]
    % elif a.kind == helper.AttributeKind.CUSTOM and a.conditional_read_before:
        ${formatted_attribute_name} = ${a.attribute_class_name}.load_from_binary(${a.attribute['condition']}Condition).${helper.decapitalize_first_character(a.attribute['type'])}  # kind:CUSTOM3
    % elif a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'enum':
        ${formatted_attribute_name}_ = ${a.attribute_class_name}.load_from_binary(bytes_)  # kind:CUSTOM2
        ${formatted_attribute_name} = ${formatted_attribute_name}_.value
        bytes_ = bytes_[${formatted_attribute_name}_.get_size():]
    % elif a.kind == helper.AttributeKind.CUSTOM and a.attribute_base_type == 'byte':
        ${formatted_attribute_name}_ = ${a.attribute_class_name}.load_from_binary(bytes_)  # kind:CUSTOM1_byte
        ${formatted_attribute_name} = ${formatted_attribute_name}_.${helper.decapitalize_first_character(a.attribute['type'])}
        bytes_ = bytes_[${formatted_attribute_name}_.get_size():]
    % elif a.kind == helper.AttributeKind.CUSTOM:
      % if a.attribute_is_aggregate:
        body = ${a.attribute_class_name}.load_from_binary(bytes_)  # kind:CUSTOM1_nonbyte
        bytes_ = bytes_[body.get_size():]
      % else:
        ${formatted_attribute_name} = ${a.attribute_class_name}.load_from_binary(bytes_)  # kind:CUSTOM1_nonbyte
        bytes_ = bytes_[${formatted_attribute_name}.get_size():]
        ${formatted_attribute_name} = ${formatted_attribute_name}.as_tuple()
      % endif
    % elif a.kind == helper.AttributeKind.FILL_ARRAY:
        ${formatted_attribute_name}_ = []
        bytes_ = GeneratorUtils.load_from_binary(${a.attribute_class_name}, ${formatted_attribute_name}_, bytes_, len(bytes_))
        ${formatted_attribute_name} = list(map(lambda e: e.as_tuple(), ${formatted_attribute_name}_))
    % elif a.kind == helper.AttributeKind.FLAGS:
        ${formatted_attribute_name} = ${a.attribute_class_name}.bytesToFlags(bytes_, ${a.attribute_size})  # kind:FLAGS
        bytes_ = bytes_[${a.attribute_size}:]
    % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        transactions = []
        bytes_ = ${generator.generated_class_name}._load_embedded_transactions(transactions, bytes_, ${helper.camel_to_snake(a.attribute_size)})
    % else:
        FIX ME!
    % endif
</%def>\
<%def name="renderCondition(a, useSelf=True)" filter="trim">
    ${helper.get_condition_operation_text(a.attribute['condition_operation']).format(('self.' if useSelf else '') + helper.camel_to_snake(a.attribute['condition']), helper.get_generated_class_name(a.condition_type_attribute['type'], a.condition_type_attribute, generator.schema) + '.' + helper.create_enum_name(a.attribute['condition_value']) + '.value')}
</%def>\
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
        assert cls.VERSION == superObject.version, 'Invalid entity version ({})'.format(superObject.version)
        assert cls.ENTITY_TYPE == superObject.type, 'Invalid entity type ({})'.format(superObject.type)
        bytes_ = bytes_[superObject.get_size():]
    % endif
    % for a in set([(a.attribute['condition'], a.attribute_size, a.conditional_read_before) for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and a.conditional_read_before and a.attribute_is_conditional]):
        ${a[0]}Condition = bytes_[0:${a[1]}]
        bytes_ = bytes_[${a[1]}:]
    % endfor

    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.conditional_read_before]:
        %if a.attribute_is_conditional:
        ${helper.camel_to_snake(a.attribute_name)} = None
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
        ${helper.camel_to_snake(a.attribute_name)} = None
        if ${renderCondition(a, useSelf=False) | trim}:
            ## handle py indents
            % for line in map(lambda a: a.strip(), renderReader(a).splitlines()):
            ${line}
            % endfor
    % endfor

% if generator.name == 'EmbeddedTransaction':
        # create object and call
        result = EmbeddedTransactionBuilder(signer_public_key, version, network, type)
        return result
% elif generator.name == 'Transaction':
        # create object and call
        result = TransactionBuilder(signer_public_key, version, network, type)
        result.signature = signature
        result.fee = fee
        result.deadline = deadline
        return result
% else:
        # create object and call
    % if generator.name.endswith('TransactionBody'):
        result = ${generator.generated_class_name}()
    % else:
        result = ${generator.generated_class_name}(superObject.signer_public_key, superObject.network)
        % if generator.base_class_name.endswith('EmbeddedTransaction'):
        # nothing needed to copy into EmbeddedTransaction
        % else:
        result.signature = superObject.signature
        result.fee = superObject.fee
        result.deadline = superObject.deadline
        % endif:
    % endif
    % for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline and not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_is_reserved and a.attribute_name != 'size']:
      % if a.attribute_name.endswith('TransactionBody'):
        result.body = body
      % else:
        result.${helper.camel_to_snake(a.attribute_name)} = ${helper.camel_to_snake(a.attribute_name)}
      % endif
    % endfor
        return result
% endif

% for a in [a for a in generator.attributes if a.attribute_is_inline and not a.kind == helper.AttributeKind.SIZE_FIELD and not a.attribute_is_reserved and a.attribute_name != 'size']:
<%
    formatted_attribute_name = helper.camel_to_snake(a.attribute_name)
%>\
    @property
    def ${formatted_attribute_name}(self):
        return self.body.${formatted_attribute_name}

  % if a.kind != helper.AttributeKind.ARRAY and a.kind != helper.AttributeKind.VAR_ARRAY and a.kind != helper.AttributeKind.FILL_ARRAY:
    @${formatted_attribute_name}.setter
    def ${formatted_attribute_name}(self, ${formatted_attribute_name}): # MARKER1 ${a.kind}
        self.body.${formatted_attribute_name} = ${formatted_attribute_name}

  % endif
% endfor
% if 'AggregateTransactionBody' in generator.generated_class_name:
    @classmethod
    def _serialize_aligned(cls, transaction: EmbeddedTransactionBuilder) -> bytes:
        """Serializes an embeded transaction with correct padding.
        Returns:
            Serialized embedded transaction.
        """
        bytes_ = transaction.serialize()
        padding = bytes(GeneratorUtils.get_transaction_padding_size(len(bytes_), 8))
        return GeneratorUtils.concat_typed_arrays(bytes_, padding)

    @classmethod
    def _get_size_aligned(cls, transaction: EmbeddedTransactionBuilder) -> int:
        """Serializes an embeded transaction with correct padding.
        Returns:
            Serialized embedded transaction.
        """
        size = transaction.get_size()
        paddingSize = GeneratorUtils.get_transaction_padding_size(size, 8)
        return size + paddingSize
% endif
## SIZE:
<%def name="renderSize(a)" filter="trim"  buffered="True">\
<%
    formatted_attribute_name = helper.camel_to_snake(a.attribute_name)
%>\
    % if a.kind == helper.AttributeKind.SIMPLE:
        size += ${a.attribute_size}  # ${formatted_attribute_name}
    % elif a.kind == helper.AttributeKind.SIZE_FIELD:
        size += ${a.attribute_size}  # ${formatted_attribute_name}
    % elif a.kind == helper.AttributeKind.BUFFER:
        size += len(self.${formatted_attribute_name})
    % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        for _ in self.${formatted_attribute_name}:
            size += self._get_size_aligned(_)
    % elif a.kind == helper.AttributeKind.ARRAY or a.kind == helper.AttributeKind.FILL_ARRAY:
        for _ in self.${formatted_attribute_name}:
        % if a.attribute_base_type == 'struct':
            size += ${a.attribute_class_name}.from_tuple(_).get_size()
        % else:
            size += ${a.attribute_class_name}(_).get_size()
        % endif
    % elif a.kind == helper.AttributeKind.FLAGS:
        size += ${a.attribute_size}  # ${formatted_attribute_name}
    % else:
      % if a.attribute_name.endswith('TransactionBody'):
        size += self.body.get_size()
      % else:
        % if a.attribute_base_type == 'struct':
        size += ${a.attribute_class_name}.from_tuple(self.${formatted_attribute_name}).get_size()
        % else:
        size += ${a.attribute_class_name}(self.${formatted_attribute_name}).get_size()
        % endif
      % endif
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
<%
    formatted_attribute_name = helper.camel_to_snake(a.attribute_name)
%>\
    % if a.kind == helper.AttributeKind.SIMPLE and a.attribute_is_reserved:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, ${a.attribute_size}))
    % elif a.kind == helper.AttributeKind.SIMPLE and a.attribute_name != 'size':
        % if a.attribute_is_reserved:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(0, ${a.attribute_size}))  # kind:SIMPLE
        % else:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.${formatted_attribute_name}, ${a.attribute_size}))  # serial_kind:SIMPLE
        % endif
    % elif a.kind == helper.AttributeKind.SIMPLE and a.attribute_name == 'size':
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_size(), ${a.attribute_size}))  # serial_kind:SIMPLE
    % elif a.kind == helper.AttributeKind.BUFFER:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.${formatted_attribute_name})  # kind:BUFFER
    % elif a.kind == helper.AttributeKind.SIZE_FIELD:
        ## note: it would be best to access parent 'kind'
      % if 'AggregateTransactionBody' in generator.generated_class_name and a.attribute_name == 'payloadSize':
        # calculate payload size
        size_value = 0
        for _ in self.${a.parent_attribute['name']}:
            size_value += self._get_size_aligned(_)
      % else:
        size_value = len(self.${helper.camel_to_snake(a.parent_attribute['name'])})
      % endif
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(size_value, ${a.attribute_size}))  # kind:SIZE_FIELD
    % elif a.kind == helper.AttributeKind.ARRAY or a.kind == helper.AttributeKind.FILL_ARRAY:
        for _ in self.${formatted_attribute_name}: # kind:ARRAY|FILL_ARRAY
        % if a.attribute_base_type == 'struct':
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, ${a.attribute_class_name}.from_tuple(_).serialize())
        % else:
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, ${a.attribute_class_name}(_).serialize())
        % endif
    % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        for _ in self.${formatted_attribute_name}: # kind:VAR_ARRAY
            bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self._serialize_aligned(_))
    % elif a.kind == helper.AttributeKind.CUSTOM:
      % if a.attribute_name.endswith('TransactionBody'):
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.body.serialize())  # kind:CUSTOM
      % else:
        % if a.attribute_base_type == 'struct':
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, ${a.attribute_class_name}.from_tuple(self.${formatted_attribute_name}).serialize())  # kind:CUSTOM
        % else:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, ${a.attribute_class_name}(self.${formatted_attribute_name}).serialize())  # kind:CUSTOM
        % endif
      % endif
    % elif a.kind == helper.AttributeKind.FLAGS:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(${a.attribute_class_name}.flagsToInt(self.${formatted_attribute_name}), ${a.attribute_size}))  # kind:FLAGS
    % else:
        # Ignored serialization: ${formatted_attribute_name} ${a.kind}
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

## STRINGIFY:
<%def name="renderStr(a)" filter="trim" buffered="True">\
<%
    attribute_name_f = '<reserved>' if 'Reserved' in a.attribute_name else helper.camel_to_snake(a.attribute_name)
%>
    % if a.kind == helper.AttributeKind.SIMPLE and a.attribute_is_reserved:
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(GeneratorUtils.uint_to_buffer(0, ${a.attribute_size})))
    % elif a.kind == helper.AttributeKind.SIMPLE and a.attribute_name != 'size':
        % if a.attribute_is_reserved:
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(GeneratorUtils.uint_to_buffer(0, ${a.attribute_size})))
        % else:
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(GeneratorUtils.uint_to_buffer(self.${helper.camel_to_snake(a.attribute_name)}, ${a.attribute_size})))
        % endif
    % elif a.kind == helper.AttributeKind.SIMPLE and a.attribute_name == 'size':
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(GeneratorUtils.uint_to_buffer(self.get_size(), ${a.attribute_size})))
    % elif a.kind == helper.AttributeKind.BUFFER:
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(self.${helper.camel_to_snake(a.attribute_name)}))
    % elif a.kind == helper.AttributeKind.SIZE_FIELD:
      % if 'AggregateTransactionBody' in generator.generated_class_name and a.attribute_name == 'payloadSize':
        # calculate payload size
        size_value = 0
        for _ in self.${a.parent_attribute['name']}:
            size_value += self._get_size_aligned(_)
      % else:
        size_value = len(self.${helper.camel_to_snake(a.parent_attribute['name'])})
      % endif
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(GeneratorUtils.uint_to_buffer(size_value, ${a.attribute_size})))
    % elif a.kind == helper.AttributeKind.ARRAY or a.kind == helper.AttributeKind.FILL_ARRAY:
        result += '{:24s} : [\n'.format('${attribute_name_f}')
        for _ in self.${helper.camel_to_snake(a.attribute_name)}: # kind:ARRAY|FILL_ARRAY
        % if a.attribute_base_type == 'struct':
            result += '  {}\n'.format(${a.attribute_class_name}.from_tuple(_).__str__())
        % else:
            result += '  {}\n'.format(${a.attribute_class_name}(_).__str__())
        % endif
        result += ']\n'
    % elif a.kind == helper.AttributeKind.VAR_ARRAY:
        for subtransaction in self.${helper.camel_to_snake(a.attribute_name)}: # kind:VAR_ARRAY
            result += ''.join(map(lambda e: '  ' + e + '\n', subtransaction.__str__().split('\n')))
            size = subtransaction.get_size()
            paddingSize = GeneratorUtils.get_transaction_padding_size(size, 8)
            result += '  {:24s} : {} (len: {})\n'.format('<padding>', to_hex_string(bytes(paddingSize)), paddingSize)
    % elif a.kind == helper.AttributeKind.CUSTOM:
      % if a.attribute_name.endswith('TransactionBody'):
        result += self.body.__str__()
      % else:
        % if a.attribute_base_type == 'struct':
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(${a.attribute_class_name}.from_tuple(self.${helper.camel_to_snake(a.attribute_name)}).serialize()))
        % else:
        result += '{:24s} : {}\n'.format('${attribute_name_f}', to_hex_string(${a.attribute_class_name}(self.${helper.camel_to_snake(a.attribute_name)}).serialize()))
        % endif
      % endif
    % elif a.kind == helper.AttributeKind.FLAGS:
        _serializedFlags = GeneratorUtils.uint_to_buffer(${a.attribute_class_name}.flagsToInt(self.${helper.camel_to_snake(a.attribute_name)}), ${a.attribute_size})
        result += '{:24s} : {} {}\n'.format('${attribute_name_f}', to_hex_string(_serializedFlags), self.${helper.camel_to_snake(a.attribute_name)})
    % else:
        # Ignored serialization: ${a.attribute_name} ${a.kind}
    % endif
</%def>\
    def __str__(self):
        """Returns nice representation.
        Returns:
            Printable string
        """
        result = ''
% if generator.base_class_name is not None:
        result += super().__str__()
% endif
% for a in [a for a in generator.attributes if not a.attribute_is_super and not a.attribute_is_inline]:
    % if a.attribute_is_conditional:
        if ${renderCondition(a) | trim}:
            ## handle py indents
            % for line in map(lambda a: a.strip(), renderStr(a).splitlines()):
            ${line}
            % endfor
    % else:
        ${renderStr(a)}
    % endif
% endfor
        return result