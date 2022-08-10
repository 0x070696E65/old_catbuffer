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
 * Enumeration of mosaic property flags
 **/
export enum MosaicFlagsDto {
    /** no flags present. */
    NONE = 0,

    /** mosaic supports supply changes even when mosaic owner owns partial supply. */
    SUPPLY_MUTABLE = 1,

    /** mosaic supports transfers between arbitrary accounts \note when not set, mosaic can only be transferred to and from mosaic owner. */
    TRANSFERABLE = 2,

    /** mosaic supports custom restrictions configured by mosaic owner. */
    RESTRICTABLE = 4,
}
