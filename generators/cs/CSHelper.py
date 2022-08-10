from generators.common.Helper import Helper, AttributeKind

class CSHelper(Helper):

    def get_body_class_name(self, name):
        body_name = name if not name.startswith('Embedded') else name[8:]
        if name.startswith('Aggregate') and name.endswith('Transaction'):
            body_name = 'AggregateTransaction'
        return '{0}Body'.format(body_name)

    def get_builtin_type(self, size):
        builtin_types = {1: 'byte', 2: 'short', 4: 'int', 8: 'long'}
        builtin_type = builtin_types[size]
        return builtin_type

    def get_read_method_name(self, size):
        if isinstance(size, str) or size > 8:
            method_name = 'ReadBytes'
        else:
            type_size_method_name = {1: 'ReadByte', 2: 'ReadInt16', 4: 'ReadInt32', 8: 'ReadInt64'}
            method_name = type_size_method_name[size]
        return method_name

    def get_load_from_binary_factory(self, attribute_class_name):
        if attribute_class_name == 'EmbeddedTransactionBuilder':
            return 'EmbeddedTransactionHelper'
        return attribute_class_name

    def get_condition_operation_text(self, op):
        if op == 'has':
            return '{0}.Contains({1})'
        return '{0} == {1}'

    def get_write_method_name(self, size):
        method_name = 'Write'
        return method_name

    def get_generated_type(self, schema, attribute, attribute_kind):
        typename = attribute['type']
        if attribute_kind in (AttributeKind.SIMPLE, AttributeKind.SIZE_FIELD):
            return self.get_builtin_type(self.get_attribute_size(schema, attribute))
        if attribute_kind == AttributeKind.BUFFER:
            return 'byte[]'
        if not self.is_byte_type(typename):
            typename = self.get_generated_class_name(typename, attribute, schema)
        if self.is_any_array_kind(attribute_kind):
            return 'List<{0}>'.format(typename)
        if attribute_kind == AttributeKind.FLAGS:
            return 'List<{0}>'.format(typename)
        return typename
