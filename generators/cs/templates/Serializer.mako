using System;

/* Objects of this interface knows how to serialize a catbuffer object. */
namespace Symbol.Builders {
	
	public interface ISerializer {

		/*
		* Serializes an object to bytes.
		*
		* @return Serialized bytes.
		*/

		byte[] Serialize();

		/*
		* Gets the size of the object.
		*
		* @return Size in bytes.
		*/
		int GetSize();
	}
}