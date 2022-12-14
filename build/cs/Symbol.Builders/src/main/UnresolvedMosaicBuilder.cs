/**
*** Copyright (c) 2016-2019, Jaguar0625, gimre, BloodyRookie, Tech Bureau, Corp.
*** Copyright (c) 2020-present, Jaguar0625, gimre, BloodyRookie.
*** All rights reserved.
***
*** This file is part of Catapult.
***
*** Catapult is free software: you can redistribute it and/or modify
*** it under the terms of the GNU Lesser General Public License as published by
*** the Free Software Foundation, either version 3 of the License, or
*** (at your option) any later version.
***
*** Catapult is distributed in the hope that it will be useful,
*** but WITHOUT ANY WARRANTY; without even the implied warranty of
*** MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
*** GNU Lesser General Public License for more details.
***
*** You should have received a copy of the GNU Lesser General Public License
*** along with Catapult. If not, see <http://www.gnu.org/licenses/>.
**/

using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace Symbol.Builders {
    /*
    * Binary layout for an unresolved mosaic
    */
    [Serializable]
    public class UnresolvedMosaicBuilder: ISerializer {

        /* Mosaic identifier. */
        public UnresolvedMosaicIdDto mosaicId;
        /* Mosaic amount. */
        public AmountDto amount;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal UnresolvedMosaicBuilder(BinaryReader stream)
        {
            try {
                mosaicId = UnresolvedMosaicIdDto.LoadFromBinary(stream);
                amount = AmountDto.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of UnresolvedMosaicBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of UnresolvedMosaicBuilder.
        */
        public static UnresolvedMosaicBuilder LoadFromBinary(BinaryReader stream) {
            return new UnresolvedMosaicBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param mosaicId Mosaic identifier.
        * @param amount Mosaic amount.
        */
        internal UnresolvedMosaicBuilder(UnresolvedMosaicIdDto mosaicId, AmountDto amount)
        {
            GeneratorUtils.NotNull(mosaicId, "mosaicId is null");
            GeneratorUtils.NotNull(amount, "amount is null");
            this.mosaicId = mosaicId;
            this.amount = amount;
        }
        
        /*
        * Creates an instance of UnresolvedMosaicBuilder.
        *
        * @param mosaicId Mosaic identifier.
        * @param amount Mosaic amount.
        * @return Instance of UnresolvedMosaicBuilder.
        */
        public static  UnresolvedMosaicBuilder Create(UnresolvedMosaicIdDto mosaicId, AmountDto amount) {
            return new UnresolvedMosaicBuilder(mosaicId, amount);
        }

        /*
        * Gets mosaic identifier.
        *
        * @return Mosaic identifier.
        */
        public UnresolvedMosaicIdDto GetMosaicId() {
            return mosaicId;
        }

        /*
        * Gets mosaic amount.
        *
        * @return Mosaic amount.
        */
        public AmountDto GetAmount() {
            return amount;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public int GetSize() {
            var size = 0;
            size += mosaicId.GetSize();
            size += amount.GetSize();
            return size;
        }



    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            var mosaicIdEntityBytes = (mosaicId).Serialize();
            bw.Write(mosaicIdEntityBytes, 0, mosaicIdEntityBytes.Length);
            var amountEntityBytes = (amount).Serialize();
            bw.Write(amountEntityBytes, 0, amountEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}
