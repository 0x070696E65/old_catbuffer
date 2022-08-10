from __future__ import annotations
from binascii import hexlify
% if generator.name == 'UnresolvedAddress':
from base64 import b32encode
% endif
from .GeneratorUtils import GeneratorUtils

class ${generator.generated_class_name}:
    """${generator.comments}.

    Attributes:
        ${generator.attribute_name}: ${generator.comments}.
    """
% if generator.attribute_kind == helper.AttributeKind.BUFFER:
    def __init__(self, ${generator.attribute_name}: ${generator.attribute_type} = bytes(${generator.size})):
% else:
    def __init__(self, ${generator.attribute_name}: ${generator.attribute_type} = 0):
% endif
        """Constructor.

        Args:
            ${generator.attribute_name}: ${generator.comments}.
        """
% if generator.attribute_kind == helper.AttributeKind.BUFFER:
        assert len(${generator.attribute_name}) == ${generator.size}, 'required argument bytes({})'.format(${generator.size})
% endif
        self.${generator.attribute_name} = ${generator.attribute_name}

    @classmethod
    def load_from_binary(cls, payload: bytes) -> ${generator.generated_class_name}:
        """Creates an instance of ${generator.generated_class_name} from binary payload.

        Args:
            payload: Byte payload to use to serialize the object.
        Returns:
            Instance of ${generator.generated_class_name}.
        """
        bytes_ = bytes(payload)
% if generator.attribute_kind == helper.AttributeKind.BUFFER:
        ${generator.attribute_name} = GeneratorUtils.get_bytes(bytes_, ${generator.size})
% else:
        ${generator.attribute_name} = GeneratorUtils.buffer_to_uint(GeneratorUtils.get_bytes(bytes_, ${generator.size}))
% endif
        return ${generator.generated_class_name}(${generator.attribute_name})

    @classmethod
    def get_size(cls) -> int:
        """Gets the size of the object.
        Returns:
            Size in bytes.
        """
        return ${generator.size}

    def get_${helper.camel_to_snake(generator.name)}(self) -> ${generator.attribute_type}:
        """Gets ${generator.comments}.

        Returns:
            ${generator.comments}.
        """
        return self.${generator.attribute_name}

    def serialize(self) -> bytes:
        """Serializes self to bytes.

        Returns:
            Serialized bytes.
        """
        bytes_ = bytes()
% if generator.attribute_kind == helper.AttributeKind.BUFFER:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, self.${generator.attribute_name})
% else:
        bytes_ = GeneratorUtils.concat_typed_arrays(bytes_, GeneratorUtils.uint_to_buffer(self.get_${helper.camel_to_snake(generator.name)}(), ${generator.size}))
% endif
        return bytes_

    def __str__(self):
% if generator.attribute_kind == helper.AttributeKind.BUFFER:
    % if generator.name == 'UnresolvedAddress':
        result = '{} ({})'.format(hexlify(self.${generator.attribute_name}).decode('utf-8'), b32encode(self.${generator.attribute_name}).decode('utf-8')[:-1])
    % else:
        result = hexlify(self.${generator.attribute_name}).decode('utf-8') # ${generator.name}
    % endif
% else:
        result = hexlify(GeneratorUtils.uint_to_buffer(self.get_${helper.camel_to_snake(generator.name)}(), ${generator.size})).decode('utf-8')
% endif
        return result