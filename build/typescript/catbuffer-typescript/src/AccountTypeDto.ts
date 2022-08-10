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
 * Enumeration of account types
 **/
export enum AccountTypeDto {
    /** account is not linked to another account. */
    UNLINKED = 0,

    /** account is a balance-holding account that is linked to a remote harvester account. */
    MAIN = 1,

    /** account is a remote harvester account that is linked to a balance-holding account. */
    REMOTE = 2,

    /** account is a remote harvester eligible account that is unlinked \note this allows an account that has previously been used as remote to be reused as a remote. */
    REMOTE_UNLINKED = 3,
}
