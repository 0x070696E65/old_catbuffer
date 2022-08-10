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

/**
 * Enumeration of receipt types
 **/
export enum ReceiptTypeDto {
    /** reserved receipt type. */
    RESERVED = 0,

    /** mosaic rental fee receipt type. */
    MOSAIC_RENTAL_FEE = 4685,

    /** namespace rental fee receipt type. */
    NAMESPACE_RENTAL_FEE = 4942,

    /** harvest fee receipt type. */
    HARVEST_FEE = 8515,

    /** lock hash completed receipt type. */
    LOCK_HASH_COMPLETED = 8776,

    /** lock hash expired receipt type. */
    LOCK_HASH_EXPIRED = 9032,

    /** lock secret completed receipt type. */
    LOCK_SECRET_COMPLETED = 8786,

    /** lock secret expired receipt type. */
    LOCK_SECRET_EXPIRED = 9042,

    /** lock hash created receipt type. */
    LOCK_HASH_CREATED = 12616,

    /** lock secret created receipt type. */
    LOCK_SECRET_CREATED = 12626,

    /** mosaic expired receipt type. */
    MOSAIC_EXPIRED = 16717,

    /** namespace expired receipt type. */
    NAMESPACE_EXPIRED = 16718,

    /** namespace deleted receipt type. */
    NAMESPACE_DELETED = 16974,

    /** inflation receipt type. */
    INFLATION = 20803,

    /** transaction group receipt type. */
    TRANSACTION_GROUP = 57667,

    /** address alias resolution receipt type. */
    ADDRESS_ALIAS_RESOLUTION = 61763,

    /** mosaic alias resolution receipt type. */
    MOSAIC_ALIAS_RESOLUTION = 62019,
}
