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
    * Binary layout for a balance transfer receipt
    */
    [Serializable]
    public class BalanceTransferReceiptBuilder: ReceiptBuilder {

        /* Mosaic. */
        public MosaicBuilder mosaic;
        /* Mosaic sender address. */
        public AddressDto senderAddress;
        /* Mosaic recipient address. */
        public AddressDto recipientAddress;
        
        /*
        * Constructor - Creates an object from stream.
        *
        * @param stream Byte stream to use to serialize the object.
        */
        internal BalanceTransferReceiptBuilder(BinaryReader stream)
            : base(stream)
        {
            try {
                mosaic = MosaicBuilder.LoadFromBinary(stream);
                senderAddress = AddressDto.LoadFromBinary(stream);
                recipientAddress = AddressDto.LoadFromBinary(stream);
            } catch (Exception e) {
                throw new Exception(e.ToString());
            }
        }

        /*
        * Creates an instance of BalanceTransferReceiptBuilder from a stream.
        *
        * @param stream Byte stream to use to serialize the object.
        * @return Instance of BalanceTransferReceiptBuilder.
        */
        public new static BalanceTransferReceiptBuilder LoadFromBinary(BinaryReader stream) {
            return new BalanceTransferReceiptBuilder(stream);
        }

        
        /*
        * Constructor.
        *
        * @param version Receipt version.
        * @param type Receipt type.
        * @param mosaic Mosaic.
        * @param senderAddress Mosaic sender address.
        * @param recipientAddress Mosaic recipient address.
        */
        internal BalanceTransferReceiptBuilder(short version, ReceiptTypeDto type, MosaicBuilder mosaic, AddressDto senderAddress, AddressDto recipientAddress)
            : base(version, type)
        {
            GeneratorUtils.NotNull(version, "version is null");
            GeneratorUtils.NotNull(type, "type is null");
            GeneratorUtils.NotNull(mosaic, "mosaic is null");
            GeneratorUtils.NotNull(senderAddress, "senderAddress is null");
            GeneratorUtils.NotNull(recipientAddress, "recipientAddress is null");
            this.mosaic = mosaic;
            this.senderAddress = senderAddress;
            this.recipientAddress = recipientAddress;
        }
        
        /*
        * Creates an instance of BalanceTransferReceiptBuilder.
        *
        * @param version Receipt version.
        * @param type Receipt type.
        * @param mosaic Mosaic.
        * @param senderAddress Mosaic sender address.
        * @param recipientAddress Mosaic recipient address.
        * @return Instance of BalanceTransferReceiptBuilder.
        */
        public static  BalanceTransferReceiptBuilder Create(short version, ReceiptTypeDto type, MosaicBuilder mosaic, AddressDto senderAddress, AddressDto recipientAddress) {
            return new BalanceTransferReceiptBuilder(version, type, mosaic, senderAddress, recipientAddress);
        }

        /*
        * Gets mosaic.
        *
        * @return Mosaic.
        */
        public MosaicBuilder GetMosaic() {
            return mosaic;
        }

        /*
        * Gets mosaic sender address.
        *
        * @return Mosaic sender address.
        */
        public AddressDto GetSenderAddress() {
            return senderAddress;
        }

        /*
        * Gets mosaic recipient address.
        *
        * @return Mosaic recipient address.
        */
        public AddressDto GetRecipientAddress() {
            return recipientAddress;
        }

    
        /*
        * Gets the size of the object.
        *
        * @return Size in bytes.
        */
        public new int GetSize() {
            var size = base.GetSize();
            size += mosaic.GetSize();
            size += senderAddress.GetSize();
            size += recipientAddress.GetSize();
            return size;
        }



    
        /*
        * Serializes an object to bytes.
        *
        * @return Serialized bytes.
        */
        public new byte[] Serialize() {
            var ms = new MemoryStream();
            var bw = new BinaryWriter(ms);
            var superBytes = base.Serialize();
            bw.Write(superBytes, 0, superBytes.Length);
            var mosaicEntityBytes = (mosaic).Serialize();
            bw.Write(mosaicEntityBytes, 0, mosaicEntityBytes.Length);
            var senderAddressEntityBytes = (senderAddress).Serialize();
            bw.Write(senderAddressEntityBytes, 0, senderAddressEntityBytes.Length);
            var recipientAddressEntityBytes = (recipientAddress).Serialize();
            bw.Write(recipientAddressEntityBytes, 0, recipientAddressEntityBytes.Length);
            var result = ms.ToArray();
            return result;
        }
    }
}
