import { FMOD, Out } from './index.d';
export let fmod: FMOD = {};
/**
 * A helper function that parses an IFMOD.GUID from a hexadecimal string. 
 * It can include or omit the '{', '}', '-' characters as formatted 
 * in the GUIDs.txt file exported by FMOD Studio (File -> Export GUIDs...)
 * It must contain 32 total hex digits, or it will return a zero-value GUID.
 */
 export function parseGUID(guid: string): FMOD.GUID {
 	guid = guid
 		.trim()
 		.replace(/[^a-fA-F0-9 ]/g, ''); // Removes all chars besides a-f, A-F, 0-9

 	let returnguid: FMOD.GUID = { // Init zero-value GUID
 		Data1: 0, Data2: 0, Data3: 0,
 		Data4: [0, 0, 0, 0, 0, 0, 0, 0]
 	};

 	if (guid.length === 32) {
 		returnguid.Data1 = parseInt(guid.substring(0, 8), 16);
 		returnguid.Data2 = parseInt(guid.substring(8, 12), 16);
 		returnguid.Data3 = parseInt(guid.substring(12, 16), 16);
 		for (let i = 0; i < 8; i++) {
 			returnguid.Data4[i] = parseInt(guid.substring(16 + i*2, 18 + i*2), 16);
 		}
 	} else {
 		alert('Warning! Invalid GUID stringToFMODGUID. Returning a zero-value GUID');
 	}
 	return returnguid;		
 }

export class Outval implements Out<any> {
 	get<T>(): T {
 		return this.val as T;
 	}
 	val: any;
 }

 /** Check the FMOD.RESULT to see if there are any errors
 * @function CHECK_RESULT
 * @param result The error code
 * @param string The attempted task
 * @returns void
 */
export function CHECK_RESULT (result: FMOD.RESULT, string: string) {
    if (result != FMOD.RESULT.OK) {
        alert("FMOD ERROR! [" + fmod.ErrorString(result) + "]\n" + "=> Problem while " + string);
    }
 }