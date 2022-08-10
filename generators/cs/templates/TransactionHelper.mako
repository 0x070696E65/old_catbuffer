using System;
using System.IO;

/* Factory in charge of creating the right transaction builder from the streamed data. */

namespace Symbol.Builders {
    [Serializable]
    public class TransactionHelper {

        /*
        * It creates the right transaction builder from the stream data.
        *
        * @param stream the stream
        * @return the TransactionBuilder subclass
        */
        public static TransactionBuilder LoadFromBinary(BinaryReader stream) {

            TransactionBuilder headerBuilder = TransactionBuilder.LoadFromBinary(stream);
    % for name in generator.schema:
        <%
            layout = generator.schema[name].get("layout", [{type:""}])
            entityTypeValue = next(iter([x for x in layout if x.get('name','') == 'entityType']),{}).get('value',0)
            entityTypeVersion = next(iter([x for x in layout if x.get('name','') == 'version']),{}).get('value',0)
        %>\
        %if (entityTypeValue > 0 and 'Block' not in name and not name.startswith('Embedded')):
            if ((int)headerBuilder.type == ${entityTypeValue} && headerBuilder.version == ${entityTypeVersion}) {
                return  ${name}Builder.LoadFromBinary(stream);
            }
        %endif
    % endfor
        return headerBuilder;
        }
    }
}
