# pylint: disable=R0911,R0912

# Imports for creating transaction builders
from .TransactionBuilder import TransactionBuilder
% for name in sorted(generator.schema):
<%
    layout = generator.schema[name].get("layout", [{type:""}])
    entityTypeValue = next(iter([x for x in layout if x.get('name','') == 'entityType']),{}).get('value',0)
%>\
% if entityTypeValue > 0 and 'Block' not in name and not name.startswith('Embedded'):
from .${name}Builder import ${name}Builder
% endif
% endfor


class TransactionBuilderFactory:
    """Factory in charge of creating the specific transaction builder from the binary payload.
    """

    @classmethod
    def create_from_payload(cls, payload) -> TransactionBuilder:
        """
        It creates the specific transaction builder from the payload bytes.
        Args:
            payload: bytes
        Returns:
            the TransactionBuilder subclass
        """
        headerBuilder = TransactionBuilder.load_from_binary(payload)
        entityType = headerBuilder.type
        entityTypeVersion = headerBuilder.version
% for name in generator.schema:
<%
    layout = generator.schema[name].get("layout", [{type:""}])
    entityTypeValue = next(iter([x for x in layout if x.get('name','') == 'entityType']),{}).get('value',0)
    entityTypeVersion = next(iter([x for x in layout if x.get('name','') == 'version']),{}).get('value',0)
%>\
    % if entityTypeValue > 0 and 'Block' not in name and not name.startswith('Embedded'):
        if entityType == 0x${'{:x}'.format(entityTypeValue)} and entityTypeVersion == ${entityTypeVersion}:
            return ${name}Builder.load_from_binary(payload)
    % endif
% endfor
        return headerBuilder


    @classmethod
    def create_by_name(cls, transaction_name, signer_public_key, network) -> TransactionBuilder:
        """
        It creates the specific transaction builder given name, network and signer.
        Args:
            transaction_name: transaction name
            signer_public_key: signer
            network: network
        Returns:
            the TransactionBuilder subclass
        """
        mapping = {
% for name in generator.schema:
<%
    def decapitalize(str):
        return str[:1].lower() + str[1:]

    layout = generator.schema[name].get("layout", [{type:""}])
    entityTypeValue = next(iter([x for x in layout if x.get('name','') == 'entityType']),{}).get('value',0)
    entityTypeVersion = next(iter([x for x in layout if x.get('name','') == 'version']),{}).get('value',0)
%>\
    % if entityTypeValue > 0 and 'Block' not in name and not name.startswith('Embedded'):
            '${'{}'.format(decapitalize(name[:-len('Transaction')]))}': ${name}Builder,
    % endif
% endfor
        }
        if transaction_name not in mapping:
            raise ValueError('transaction named {} is not supported'.format(transaction_name))

        return mapping[transaction_name](signer_public_key, network)