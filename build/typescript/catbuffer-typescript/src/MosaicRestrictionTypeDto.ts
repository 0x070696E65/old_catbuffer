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
 * Enumeration of mosaic restriction types
 **/
export enum MosaicRestrictionTypeDto {
    /** uninitialized value indicating no restriction. */
    NONE = 0,

    /** allow if equal. */
    EQ = 1,

    /** allow if not equal. */
    NE = 2,

    /** allow if less than. */
    LT = 3,

    /** allow if less than or equal. */
    LE = 4,

    /** allow if greater than. */
    GT = 5,

    /** allow if greater than or equal. */
    GE = 6,
}
