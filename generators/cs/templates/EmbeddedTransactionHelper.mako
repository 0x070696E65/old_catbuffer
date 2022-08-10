using System;
using System.IO;

/* Factory in charge of creating the right transaction builder from the streamed data. */

namespace Symbol.Builders {
    [Serializable]
    public class EmbeddedTransactionHelper {

        /* Deserialize an embedded transaction builder from binary */
        public static EmbeddedTransactionBuilder LoadFromBinary(BinaryReader stream) {

            EmbeddedTransactionBuilder header = EmbeddedTransactionBuilder.LoadFromBinary(stream);
    % for name in generator.schema:
        <%
            layout = generator.schema[name].get("layout", [{type:""}])
            entityTypeValue = next(iter([x for x in layout if x.get('name','') == 'entityType']),{}).get('value',0)
            entityTypeVersion = next(iter([x for x in layout if x.get('name','') == 'version']),{}).get('value',0)
        %>\
        %if (entityTypeValue > 0 and 'Aggregate' not in name and 'Block' not in name and name.startswith('Embedded')):

            if ((int)header.type == ${entityTypeValue} && header.version == ${entityTypeVersion}) {
                ${name[8:]}BodyBuilder body = ${name[8:]}BodyBuilder.LoadFromBinary(stream);
                byte[] headerSerialized = header.Serialize();
                byte[] bodySerialized = body.Serialize();
                byte[] newArray = new byte[headerSerialized.Length + bodySerialized.Length];
                headerSerialized.CopyTo(newArray, 0);
                bodySerialized.CopyTo(newArray, headerSerialized.Length);
                MemoryStream ms = new MemoryStream(newArray);
                return ${name}Builder.LoadFromBinary(new BinaryReader(ms));
            }
        %endif
    % endfor
            return header;
        }
    }
}