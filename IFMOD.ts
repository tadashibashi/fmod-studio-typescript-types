export var FMOD:any = {};

export class Outval<T> {
	val: T;
	constructor() {}
}

/**
 * A helper function that parses an IFMOD.GUID from a hexadecimal string. 
 * It can include or omit the '{', '}', '-' characters as formatted 
 * in the GUIDs.txt file exported by FMOD Studio (File -> Export GUIDs...)
 * It must contain 32 total hex digits, or it will return a zero-value GUID.
 */
 export function parseGUID(guid: string): IFMOD.GUID {
 	guid = guid
 		.trim()
 		.replace(/[^a-fA-F0-9 ]/g, ''); // Removes all chars besides a-f, A-F, 0-9

 	let returnguid: IFMOD.GUID = { // Init zero-value GUID
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

/** Check the FMOD.RESULT to see if there are any errors
* @function CHECK_RESULT
* @param result The error code
* @param string The attempted task
* @returns void
*/
export function CHECK_RESULT (result: IFMOD.RESULT, string: string) {
   if (result != IFMOD.RESULT.OK) {
       alert("FMOD ERROR! [" + FMOD.ErrorString(result) + "]\n" + "=> Problem while " + string);
   }
}

export namespace IFMOD { 

    // #region Namespace Functions Wrap FMOD functions ///////////////////////////////////////////////////////////////////////

    // #region Low Level System Functions ////////////////////////////
    /**
     * Specify the level and delivery method of log messages when using the logging version of FMOD.
     * @param flags Mask of bits representing the desired log information. Note: LOG implies WARN and WARN implies ERROR.
     */
    export function Debug_Initialize(flags:DEBUG_FLAGS) {
        let result: RESULT = FMOD.Debug_Initialize(flags);
        return result;
    }

    /**
     * Helper function to close a file manually, that is preloaded with FMOD.FS_createPreloadedFile
     * @param handle 
     */
    export function file_close(handle:object) { 
        let result: RESULT = FMOD.file_close(handle);
        return result;
    }
    /**
     * Helper function to open a file manually, that is preloaded with FMOD.FS_createPreloadedFile 
     * @param system FMOD::System object handle
     * @param filename path and filename which matches the path/filename set up in FMOD.FS_createPreloadedFile if this is the system being used (ie not file callbacks)
     * @param filesize_out an integer with the size of the file is put in filesize_out.val
     * @param handle_out an object with the file handle is put in handle_out.val
     */
    export function file_open(system:System, filename:string, filesize_out: Outval<number>, handle_out: Outval<object>) {
        let result: RESULT = FMOD.file_open(system, filename, filesize_out, handle_out);
        return result;
    }
    /**
     * Helper function to read a file manually, that is preloaded with FMOD.FS_createPreloadedFile 
     * @param handle Handle returned by the FMOD.file_open function
     * @param buffer memory address that would come from an internal FMOD memory address, not an array or string type object declared in the JS scope.  See Remarks
     * @param sizebytes Integer value with the number of bytes requested to be read from the file handle.
     * @param bytesread_out An integer with the number of bytes actually read is put in bytesread_out.val
     */
    export function file_read(handle:object, buffer:number, sizebytes:number, bytesread_out: Outval<number>) {
        let result: RESULT = FMOD.file_read(handle, buffer, sizebytes, bytesread_out);
        return result;
    }
    /**
     * Helper function to seek a file manually, that is preloaded with FMOD.FS_createPreloadedFile 
     * @param handle Handle returned by the FMOD.file_open function
     * @param pos offset in bytes to seek into the file, relatve to the start
     */
    export function file_seek(handle:object, pos:number) {
        let result: RESULT = FMOD.file_seek(handle, pos);
        return result;
    }
    /**
     * Returns a more verbose string version of the error code returned by any FMOD function. 
     * @param result error code
     */
    export function ErrorString(result: RESULT) {
        FMOD.ErrorString(result);
    }

    /**
     * Information function to retreive the state of fmod's disk access.
     * @param busy Address of an integer to receive the busy state of the disk at the current time.
     */
    export function File_GetDiskBusy(busy:Outval<number>) {
        let result: RESULT = FMOD.File_GetDiskBusy(busy);
        return result;
    }
    /**
     * Mutex function to synchronize user file reads with FMOD's file reads. This function tells fmod that you are using the disk so that it will block until you are finished with it.
     * @description This function also blocks if FMOD is already using the disk, so that you cannot do a read at the same time FMOD is reading.
     * @param busy 1 = you are about to perform a disk access. 0 = you are finished with the disk.
     */
    export function File_SetDiskBusy(busy:number) {
        let result: RESULT = FMOD.File_SetDiskBusy(busy);
        return result;
    }

    /**
     * Returns information on the memory usage of FMOD. This information is byte accurate and counts all allocs and frees internally.
     * @param currentalloced Address of a variable that receives the currently allocated memory at time of call. Optional. Specify 0 or NULL to ignore.
     * @param maxalloced Address of a variable that receives the maximum allocated memory since System::init or Memory_Initialize. Optional. Specify 0 or NULL to ignore.
     * @param blocking Boolean indicating whether to favour speed or accuracy. Specifying true for this parameter will flush the DSP network to make sure all queued allocations happen immediately, which can be costly.
     */
    export function Memory_GetStats(currentalloced:Outval<number>, maxalloced:Outval<number>, blocking:boolean) {
        let result: RESULT = FMOD.Memory_GetStats(currentalloced, maxalloced, blocking);
        return result;
    }

    /**
     * Specifies a method for FMOD to allocate memory, either through callbacks or its own internal memory management. 
     * @description You can also supply a pool of memory for FMOD to work with and it will do so with no extra calls to malloc or free.
     * @param poolmem If you want a fixed block of memory for FMOD to use, pass it in here. Specify the length in poollen. Specifying NULL doesn't use internal management and it relies on callbacks.
     * @param poollen Length in bytes of the pool of memory for FMOD to use specified in poolmem. Specifying 0 turns off internal memory management and relies purely on callbacks. Length must be a multiple of 512.
     * @param userrealalloc Only supported if pool is NULL. Otherwise it overrides the FMOD internal calls to alloc. Compatible with ansi malloc().
     * @param userfree Only supported if pool is NULL. Otherwise it overrides the FMOD internal calls to free. Compatible with ansi free().
     */
    export function Memory_Initialize(poolmem, poollen:number, useralloc:MEMORY_ALLOC_CALLBACK, userrealloc:MEMORY_REALLOC_CALLBACK, userfree: MEMORY_FREE_CALLBACK, memtypeflags: MEMORY_TYPE) {
        let result: RESULT = FMOD.Memory_Initialize(poolmem, poollen, useralloc, userrealloc, userfree, memtypeflags);
        return result;
    }


    /**
     * FMOD System creation function. This must be called to create an FMOD System object before you can do anything else. Use this function to create 1, or multiple instances of FMOD System objects.
     * @param system Address of a pointer that receives the new FMOD System object. HTML5 Note - the object is written to system.val
     */
    export function System_Create(system:Outval<System>) {
        let result: RESULT = FMOD.System_Create(system);
        return result;
    }

    /**
     * Mounts a local file so that FMOD can recognize it when calling a function that uses a filename (ie while using loadBank/createSound)
		 * See https://kripken.github.io/emscripten-site/docs/api_reference/Filesystem-API.html#FS.createPreloadedFile for docs on FS_createPreloadedFile 
		 * ```typescript
		 * 
		 * ```
     * @param virtualfoldername Parent folder, ie '/'
     * @param filename Filename to preload.
     * @param fullurl Path inside parent folder. ie the subdirectory.
     * @param canread Whether the file should have read permissions set from the program’s point of view
     * @param canwrite Whether the file should have write permissions set from the program’s point of view. 
     */
    export function FS_createPreloadedFile(virtualfoldername:string, filename:string, fullurl:string, canread:boolean,canwrite:boolean) {
        let result: RESULT = FMOD.FS_createPreloadedFile(virtualfoldername, filename, fullurl, canread, canwrite);
        return result;
    }    

    /**
     * 
     * @param dsp_state FMOD_DSP_STATE handle passed into the DSP callback
     * @param blocksize offset in bytes to seek into the file, relatve to the start
     */
    export function getblocksize(dsp_state:DSP_STATE, blocksize:number) {
        let result: RESULT = FMOD.getblocksize(dsp_state, blocksize);
        return result;
    }
    /**
     * 
     * @param dsp_state FMOD_DSP_STATE handle passed into the DSP callback
     * @param samplerate FMOD_DSP_STATE handle passed into the DSP callback
     */
    export function getsamplerate(dsp_state:DSP_STATE, samplerate:number) {
        let result: RESULT = FMOD.getsamplerate(dsp_state, samplerate);
        return result;
    }

    /**
     * 
     * @param dsp_state FMOD_DSP_STATE handle passed into the DSP callback
     * @param clock this DSP's current clock value in PCM samples.
     * @param offset this DSP's current mix offset value in PCM samples.  This may be a DSP that is only writing to part of the buffer.  Typically 0.  See length.
     * @param length this DSP's current mix length value in PCM samples.  This may be a DSP that is only writing to part of the buffer.  Typically the length of the DSP buffer.  See offset

     */
    export function getspeakermode(dsp_state:DSP_STATE, clock:number, offset:number, length:number) {
        let result: RESULT = FMOD.getspeakermode(dsp_state, clock, offset, length);
        return result;
    }

    /**
     * Returns a value memory managed by FMOD. This sort of value is typically sound data that is passed to the user as an 'address' which is internal to FMOD. This avoids duplication of large buffers which waste memory, because everything is passed by reference in JS. 
     * @param address 
     * @param value 
     * @param format 
     * @description See https://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html#accessing-memory for docs on getValue.
     * 'address' is a memory address, and only FMOD functions will return a memory address. Examples of this would be 
    1. buffer parameter of FMOD_FILE_READ_CALLBACK
    2. data parameter of FMOD_CREATESOUNDEXINFO::pcmreadcallback, 
    3. buffer parameter of FMOD_STUDIO_BANK_INFO::readcallback
    4. inbuffer parameter of FMOD_DSP::readcallback.
    'format' can be values like 'i8', 'i16', 'i32', 'i64', 'float', 'double' typically.
     */
    export function getValue(address, value:number, format:string) {
        let result: RESULT = FMOD.getValue(address, value, format);
        return result;
    }
    /**
     * Frees memory that was allocated by FMOD internally.
     * @param memory Note! Currently FMOD.ReadFile is the only function that returns an object with memory allocated by FMOD
     */
    export function Memory_Free(memory:object) {
        let result: RESULT = FMOD.Memory_Free(memory);
        return result;
    }
    /**
     * Read the entire contents of a file into memory, as a JS variable that contains nothing but a memory address. 
     * @param system FMOD::System object handle
     * @param filename Filename of the file that is to be loaded, that has the path and filename that matches the preloaded path/filename if loaded in that fashion.
     * @param output The variable with the allocated memory containing the contents of the file.
     */
    export function ReadFile(system:System, filename:string, output:object) {
        let result: RESULT = FMOD.ReadFile(system, filename, output);
        return result;
    }
    /**
     * Writes a value to memory managed by FMOD. This sort of value is typically sound data that is passed to the user as an 'address' which is internal to FMOD. This avoids duplication of large buffers which waste memory, because everything is passed by reference in JS. 
     * @param address Memory address returned by an FMOD function.  See remarks.
     * @param value A value which can be an integer or a real/floating point number.
     * @param format A format 'string' which identifies which type of value it is.  See Remarks
     */
    export function setValue(address, value:number, format:string) {
        let result: RESULT = FMOD.setValue(address, value, format);
        return result;
    }
    /**
     * Creates a Studio System object. This must be called before you do anything else. Special JS version of Studio::System::create.
     * @param studioSystem Address of a variable to receive the new Studio System object. 
     */
    export function Studio_System_Create(studioSystem: Outval<StudioSystem>) {
        let result: RESULT = FMOD.Studio_System_Create(studioSystem);
        return result;
    }
    // #endregion Low Level System Functions
    // #region Studio System Functions ////////////////////////////////
    export interface ParseID {
        (idString:string, id:Outval<GUID>): RESULT;
    }
    //#endregion Studio System Functions
    // #endregion Namespace Functions

    // #region System Objects /////////////////////////////////////////////////////////////////////////////////////////////////
    export interface System {
        attachChannelGroupToPort(portType, portIndex, channelgroup:Outval<ChannelGroup>): RESULT;

        attachFileSystem(useropen, userclose, userread, userseek): RESULT;
        /** 
         * Closes the system object without freeing the object's memory, so the system handle will still be valid. 
         */
        close(): RESULT;

        createChannelGroup(name:string, channelgroup:ChannelGroup): RESULT;
        /** Creates a user defined DSP unit object to be inserted into a DSP network, for the purposes of sound filtering or sound generation. */
        createDSP(description:DSP_DESCRIPTION, dsp:Outval<any>): RESULT;

        createDSPByPlugin(handle:number, dsp:Outval<DSP>): RESULT;

        createDSPByType(type:DSP_TYPE, dsp:Outval<DSP>): RESULT;

        createGeometry(maxpolygons:number, maxvertices:number, geometry:Geometry): RESULT;

        createReverb3D(reverb:Outval<Reverb3D>): RESULT;

        /** Loads a sound into memory, or opens it for streaming. */
        createSound(name_or_data:string, mode:MODE, exinfo:CREATESOUNDEXINFO, sound:Outval<any>): RESULT;

        createSoundGroup(name:string, soundgroup:Outval<SoundGroup>): RESULT;

        createStream(name_or_data:string, mode:MODE, sound:Outval<any>): RESULT;

        detachChannelGroupFromPort(name:string, soundgroup:Outval<SoundGroup>): RESULT;

        get3DListenerAttributes(listener:number, pos:Outval<VECTOR>, vel:Outval<VECTOR>, forward:Outval<VECTOR>, up:Outval<VECTOR>): RESULT;

        get3DNumListeners(numlisteners:Outval<number>): RESULT;
        /** Retrieves the global doppler scale, distance factor and rolloff scale for all 3D sound in FMOD. */
        get3DSettings(doplerscale:Outval<number>, distancefactor:Outval<number>, folloffscale:Outval<number>): RESULT;

        getAdvancedSetting(settings:Outval<ADVANCEDSETTINGS>): RESULT;

        getCPUUsage(dsp:Outval<number>, stream:Outval<number>, geometry:Outval<number>, update:Outval<number>, total:Outval<number>): RESULT;

        getChannel(channelid:number, channel:Outval<Channel>): RESULT;

        getChannelsPlaying(channels: Outval<number>, realchannels: Outval<number>): RESULT;

        getDSPBufferSize(bufferlength: Outval<number>, numbuffers: Outval<number>): RESULT;
        /**
         * Retrieve the description structure for a pre-existing DSP plugin.
         * @param handle Handle to a pre-existing DSP plugin, loaded by System::loadPlugin. 
         * @param description Address of a variable to receive the description structure for the DSP. 
         */
        getDSPInfoByPlugin(handle: number, description: Outval<DSP_DESCRIPTION>): RESULT;

        getDefaultMixMatrix(sourcespeakermode: SPEAKERMODE, targetspeakermode: SPEAKERMODE, matrix: Outval<number[]>, matrixhop: number): RESULT;
        /** Returns the currently selected driver number.  */
        getDriver(driver:Outval<number>): RESULT;

        getDriverInfo(id:number, name:Outval<string>, guid:Outval<GUID>, systemrate:Outval<number>, speakermode:Outval<SPEAKERMODE>, speakermodechannels:Outval<number>): RESULT;

        getFileUsage(sampleBytesRead: Outval<number>, streamBytesRead: Outval<number>, otherBytesRead: Outval<number>): RESULT;

        getGeometryOcclusion(listener: VECTOR, source: VECTOR, direct: Outval<number>, reverb: Outval<number>): RESULT;

        getGeometrySettings(maxworldsize: Outval<number>): RESULT;

        getMasterChannelGroup(channelgroup: Outval<ChannelGroup>): RESULT;

        getMasterSoundGroup(soundgroup: Outval<SoundGroup>): RESULT;

        getNestedPlugin(handle: number, index: number, nestedhandle: Outval<number>): RESULT;

        getNetworkProxy(): RESULT;

        getNetworkTimeout(): RESULT;

        getNumDrivers(numdrivers:Outval<number>): RESULT;

        getNumNestedPlugins(): RESULT;

        getNumPlugins(): RESULT;

        getOutput(): RESULT;

        getOutputByPlugin(): RESULT;

        getOutputHandle(): RESULT;

        getPluginHandle(plugintype:PLUGINTYPE, index:number, handle:Outval<number>): RESULT;

        getPluginInfo(handle:number, plugintype:Outval<PLUGINTYPE>, name:Outval<string>, version:Outval<number>): RESULT;

        getRecordDriverInfo(): RESULT;

        getRecordNumDrivers(): RESULT;

        getRecordPosition(): RESULT;

        getReverbProperties(): RESULT;

        getSoftwareChannels(): RESULT;

        getSoftwareFormat(samplerate: Outval<number>, speakermode: Outval<SPEAKERMODE>, numrawspeakers: Outval<number>): RESULT;

        getSoundRAM(currentalloced: Outval<number>, maxalloced: Outval<number>, total: Outval<number>): RESULT;

        getSpeakerModeChannels(mode: SPEAKERMODE, channels: Outval<number>): RESULT;

        getSpeakerPosition(speaker: SPEAKER, x: Outval<number>, y: Outval<number>, active: Outval<boolean>): RESULT;

        getStreamBufferSize(filebuffersize: Outval<number>, filebuffersizetype: Outval<TIMEUNIT>): RESULT;

        getUserData(userdata: Outval<any>): RESULT;

        getVersion(version: Outval<number>): RESULT;

        /** Initializes the system object, and the sound device. This has to be called at the start of the user's program. 
         * You must create a system object with FMOD::System_create. 
         * @param maxchannels
         * @param flags 
         * @param extradriverdata 
         */
        init(maxchannels:number, flags:INITFLAGS, extradriverdata): RESULT;
        /**
         * 
         * @param id 
         * @param recording 
         */
        isRecording(id:number, recording:Outval<boolean>): RESULT;
        /**
         * 
         * @param data 
         * @param datasize 
         * @param geometry 
         */
        loadGeometry(data, datasize:number, geometry:Outval<Geometry>): RESULT;
        /**
         * Currently not supported in JavaScript
         */
        loadPlugin(): RESULT;

        lockDSP(): RESULT;

        mixerResume(): RESULT;

        mixerSuspend(): RESULT;

        playDSP(dsp:DSP, channelgroup:ChannelGroup, paused:boolean, channel:Outval<any>): RESULT;

        playSound(sound, channelgroup, paused:boolean, channel:Outval<any>): RESULT;

        recordStart(id:number, sound:Sound, loop:boolean): RESULT;

        recordStop(id:number): RESULT;

        registerCodec(description:CODEC_DESCRIPTION, handle:Outval<number>, priority:number): RESULT;

        registerDSP(description:DSP_DESCRIPTION, handle:Outval<number>): RESULT;

        registerOutput(description: OUTPUT_DESCRIPTION, handle: Outval<number>): RESULT;
        /** Closes and frees a system object and its resources. */
        release(): RESULT;

        set3DListenerAttributes(listener: number, pos: VECTOR, vel: VECTOR, forward: VECTOR, up: VECTOR): RESULT;

        set3DNumListeners(numlisteners: number): RESULT;

        set3DRolloffCallback(callback: _3D_ROLLOFF_CALLBACK): RESULT;

        set3DSettings(dopplerscale: number, distancefactor: number, rolloffscale: number): RESULT;

        setAdvancedSetting(settings: ADVANCEDSETTINGS): RESULT;

        setCallback(callback: SYSTEM_CALLBACK, callbackmask:SYSTEM_CALLBACK_TYPE): RESULT;

        setDSPBufferSize(bufferlength: number, numbuffers: number): RESULT;

        setDriver(driver:number): RESULT;

        setFileSystem(useropen: FILE_OPEN_CALLBACK, userclose: FILE_CLOSE_CALLBACK, userread: FILE_READ_CALLBACK, userseek: FILE_SEEK_CALLBACK, userasyncread: FILE_ASYNCREAD_CALLBACK, userasynccancel: FILE_ASYNCCANCEL_CALLBACK, blockalign: number): RESULT;

        setGeometrySettings(maxworldsize: number): RESULT;

        setNetworkProxy(proxy: string): RESULT;

        setNetworkTimeout(timeout: number): RESULT;

        setOutput(output: OUTPUTTYPE): RESULT;

        setOutputByPlugin(handle: number): RESULT;
        /**
         * Specify a base search path for plugins so they can be placed somewhere else than the directory of the main executable.
         * @param path A character string containing a correctly formatted path to load plugins from encoded in a UTF-8 string. 
         */
        setPluginPath(path:string): RESULT;

        setReverbProperties(instance:number, prop:REVERB_PROPERTIES): RESULT;

        setSoftwareChannels(numbersoftwarechannels:number): RESULT;

        setSoftwareFormat(samplerate:number, speakermode:SPEAKERMODE, numrawspeakers:number): RESULT;

        setSpeakerPosition(speaker:SPEAKER, x:number, y:number, active:boolean): RESULT;

        setStreamBufferSize(filebuffersize:number, filebuffersizetype:TIMEUNIT): RESULT;

        setUserData(userdata:any): RESULT;

        unloadPlugin(hangle:number): RESULT;

        unlockDSP(): RESULT;

        update(): RESULT;

    }

    export interface Sound {
        /** 
         * Currently not supported in JavaScript 
         */
        addSyncPoint(offset:number, offsettype:TIMEUNIT, name:string, point): RESULT;
        /** 
         * Currently not supported in JavaScript 
         */
        deleteSyncPoint(point): RESULT;
        /**
         * Retrieves the inside and outside angles of the sound projection cone
         * @param insideconeangle Address of a variable that receives the inside angle of the sound projection cone, in degrees. This is the angle within which the sound is at its normal volume. Optional. Specify 0 or NULL to ignore. 
         * @param outsideconeangle Address of a variable that receives the outside angle of the sound projection cone, in degrees. This is the angle outside of which the sound is at its outside volume. Optional. Specify 0 or NULL to ignore. 
         * @param outsidevolume Address of a variable that receives the cone outside volume for this sound. Optional. Specify 0 or NULL to ignore. 
         */
        get3DConeSettings(insideconeangle:Outval<number>, outsideconeangle:Outval<number>, outsidevolume:Outval<number>): RESULT;
        /**
         * Retrieves a pointer to the sound's current custom rolloff curve
         * @param points Address of a variable to receive the pointer to the current custom rolloff point list. Optional. Specify 0 or NULL to ignore. 
         * @param numpoints Address of a variable to receive the number of points int he current custom rolloff point list. Optional. Specify 0 or NULL to ignore. 
         */
        get3DCustomRolloff(points:Outval<VECTOR[]>, numpoints:Outval<number>): RESULT;
        /**
         * Retrieve the minimum and maximum audible distance for a sound.
         * @param min Pointer to value to be filled with the minimum volume distance for the sound. See remarks for more on units. Optional. Specify 0 or NULL to ignore. 
         * @param max Pointer to value to be filled with the maximum volume distance for the sound. See remarks for more on units. Optional. Specify 0 or NULL to ignore.
         */
        get3DMinMaxDistance(min:Outval<number>, max:Outval<number>): RESULT;
        /**
         * Retrieves a sound's default attributes for when it is played on a channel with System::playSound.
         * @param frequency Address of a variable that receives the default frequency for the sound. Optional. Specify 0 or NULL to ignore.
         * @param priority priority Address of a variable that receives the default priority for the sound when played on a channel. Result will be from 0 to 256. 0 = most important, 256 = least important. Default = 128. Optional. Specify 0 or NULL to ignore. 
         */
        getDefaults(frequency:Outval<number>, priority:Outval<number>): RESULT;
        /**
         * Returns format information about the sound.
         * @param type Address of a variable that receives the type of sound. Optional. Specify 0 or NULL to ignore. 
         * @param format Address of a variable that receives the format of the sound. Optional. Specify 0 or NULL to ignore. 
         * @param channels Address of a variable that receives the number of channels for the sound. Optional. Specify 0 or NULL to ignore.
         * @param bits Address of a variable that receives the number of bits per sample for the sound. This corresponds to FMOD_SOUND_FORMAT but is provided as an integer format for convenience. Optional. Specify 0 or NULL to ignore. 
         */
        getFormat(type:Outval<SOUND_TYPE>, format:Outval<SOUND_FORMAT>, channels:Outval<number>, bits:Outval<number>): RESULT;
        /**
         * Retrieves the length of the sound using the specified time unit.
         * @param length Address of a variable that receives the length of the sound. 
         * @param lengthtype Time unit retrieve into the length parameter. See FMOD_TIMEUNIT. 
         */
        getLength(length:Outval<number>, lengthtype:TIMEUNIT): RESULT;
        /**
         * Retrieves the current loop count value for the specified sound.
         * @param loopcount Address of a variable that receives the number of times a sound will loop by default before stopping. 0 = oneshot. 1 = loop once then stop. -1 = loop forever. Default = -1 
         */
        getLoopCount(loopcount:Outval<number>): RESULT;
        /**
         * Retrieves the loop points for a sound.
         * @param loopstart Address of a variable to receive the loop start point. This point in time is played, so it is inclusive. Optional. Specify 0 or NULL to ignore.
         * @param loopstarttype The time format used for the returned loop start point. See FMOD_TIMEUNIT. 
         * @param loopend Address of a variable to receive the loop end point. This point in time is played, so it is inclusive. Optional. Specify 0 or NULL to ignore. 
         * @param loopendtype The time format used for the returned loop end point. See FMOD_TIMEUNIT. 
         */
        getLoopPoints(loopstart:Outval<number>, loopstarttype:TIMEUNIT, loopend:Outval<number>, loopendtype:TIMEUNIT): RESULT;
        /**
         * Retrieves the mode bits set by the codec and the user when opening the sound.
         * @param mode Address of a variable that receives the current mode for this sound. 
         */
        getMode(mode: MODE): RESULT;
        /**
         * Retrieves the volume of a MOD/S3M/XM/IT/MIDI music channel volume.
         * @param channel MOD/S3M/XM/IT/MIDI music subchannel to retrieve the volume for. 
         * @param volume Address of a variable to receive the volume of the channel from 0.0 to 1.0. Default = 1.0. 
         */
        getMusicChannelVolume(channel:number, volume:Outval<number>): RESULT;
        /**
         * Gets the number of music channels inside a MOD/S3M/XM/IT/MIDI file.
         * @param numchannels Address of a variable to receive the number of music channels used in the song. 
         */
        getMusicNumChannels(numchannels:Outval<number>): RESULT;
        /**
         * Gets the relative speed of MOD/S3M/XM/IT/MIDI music.
         * @param speed Address of a variable to receive the relative speed of the song from 0.01 to 100.0. 0.5 = half speed, 2.0 = double speed. Default = 1.0.
         */
        getMusicSpeed(speed:Outval<number>): RESULT;
        /**
         * Retrieves the name of a sound
         * @param name Address of a variable that receives the name of the sound encoded in a UTF-8 string.
         */
        getName(name:Outval<string>): RESULT;
        /**
         * Retrieves the number of subsounds stored within a sound.
         * @param numsubsounds Address of a variable that receives the number of subsounds stored within this sound. 
         */
        getNumSubSounds(numsubsounds:Outval<number>): RESULT;
        /**
         * Retrieves the number of sync points stored within a sound. These points can be user generated or can come from a wav file with embedded markers.
         * @param numsyncpoints Address of a variable to receive the number of sync points within this sound. 
         */
        getNumSyncPoints(numsyncpoints:Outval<number>): RESULT;
        /**
         * Retrieves the number of tags belonging to a sound.
         * @param numtags Address of a variable that receives the number of tags in the sound. Optional. Specify 0 or NULL to ignore. 
         * @param numtagsupdated Address of a variable that receives the number of tags updated since this function was last called. Optional. Specify 0 or NULL to ignore. 
         */
        getNumTags(numtags:Outval<number>, numtagsupdated:Outval<number>): RESULT;
        /**
         * Retrieves the state a sound is in after FMOD_NONBLOCKING has been used to open it, or the state of the streaming buffer.
         * @param openstate Address of a variable that receives the open state of a sound. Optional. Specify 0 or NULL to ignore. 
         * @param percentbuffered Address of a variable that receives the percentage of the file buffer filled progress of a stream. Optional. Specify 0 or NULL to ignore. 
         * @param isStarving Address of a variable that receives the starving state of a sound. If a stream has decoded more than the stream file buffer has ready for it, it will return TRUE. Optional. Specify 0 or NULL to ignore. 
         * @param isDiskBusy Address of a variable that receives the disk busy state of a sound. That is, whether the disk is currently being accessed for the sound.
         */
        getOpenState(openstate:Outval<OPENSTATE>, percentbuffered:Outval<number>, isStarving:Outval<boolean>, isDiskBusy:Outval<boolean>): RESULT;
        /**
         * 
         * @param soundgroup 
         */
        getSoundGroup(soundgroup:Outval<SoundGroup>): RESULT;
        /**
         * Retrieves a handle to a Sound object that is contained within the parent sound.
         * @param index Index of the subsound to retrieve within this sound. 
         * @param subsound Address of a variable that receives the sound object specified.
         */
        getSubSound(index:number, subsound:Outval<Sound>): RESULT;
        /**
         * Retrieves a handle to the parent Sound object that contains our subsound.
         * @param parentsound Address of a variable that receives the sound object specified. 
         */
        getSubSoundParent(parentsound:Outval<Sound>): RESULT;
        /** 
         * Currently not supported in JavaScript 
         */
        getSyncPoint(): RESULT;
        /** 
         * Currently not supported in JavaScript 
         */
        getSyncPointInfo(): RESULT;
        /**
         * Retrieves the parent System object that was used to create this object.
         * @param system Address of a pointer that receives the System object. 
         */
        getSystemObject(system:Outval<System>): RESULT;

        getTag(name:string, index:number, tag): RESULT;
        /**
         * Retrieves the user value that that was set by calling the Sound::setUserData function.
         * @param userdata Address of a pointer that receives the data specified with the Sound::setUserData function. 
         */
        getUserData(userdata:Outval<any>): RESULT;
        /**
         * Returns a pointer to the beginning of the sample data for a sound.
         * @param offset Offset in bytes to the position you want to lock in the sample buffer
         * @param length Number of bytes you want to lock in the sample buffer. 
         * @param ptr1 Address of a pointer that will point to the first part of the locked data. 
         * @param ptr2 Address of a pointer that will point to the second part of the locked data. This will be null if the data locked hasn't wrapped at the end of the buffer.
         * @param len1 Length of data in bytes that was locked for ptr1. 
         * @param len2 Length of data in bytes that was locked for ptr2. This will be 0 if the data locked hasn't wrapped at the end of the buffer. 
         */
        lock(offset:number, length:number, ptr1:Outval<any>, ptr2:Outval<any>, len1:Outval<number>, len2:Outval<number>): RESULT;
        /**
         * Reads data from an opened sound to a specified pointer, using the FMOD codec created internally.
         * @param buffer Address of a buffer that receives the decoded data from the sound. 
         * @param length Number of bytes to read into the buffer. 
         * @param read Number of bytes actually read. 
         */
        readData(buffer:Outval<any>, length:Outval<number>, read:Outval<number>): RESULT;
        /**
         * Frees a sound object
         */
        release(): RESULT;
        /**
         * Seeks a sound for use with data reading. This is not a function to 'seek a sound' for normal use. This is for use in conjunction with Sound::readData.
         * @param pcm Offset to seek to in PCM samples
         */
        seekData(pcm:number): RESULT;
        /**
         * Sets the inside and outside angles of the sound projection cone, as well as the volume of the sound outside the outside angle of the sound projection cone.
         * @param insideconeangle Inside cone angle, in degrees, from 0 to 360. This is the angle within which the sound is at its normal volume. Must not be greater than outsideconeangle. Default = 360. 
         * @param outsideconeangle Outside cone angle, in degrees, from 0 to 360. This is the angle outside of which the sound is at its outside volume. Must not be less than insideconeangle. Default = 360. 
         * @param outsidevolume Cone outside volume, from 0 to 1.0. Default = 1.0. 
         */
        set3DConeSettings(insideconeangle:number, outsideconeangle:number, outsidevolume:number): RESULT;
        /**
         * Point a sound to use a custom rolloff curve. Must be used in conjunction with FMOD_3D_CUSTOMROLLOFF flag to be activated.
         * @param points An array of FMOD_VECTOR structures where x = distance and y = volume from 0.0 to 1.0. z should be set to 0. 
         * @param numpoints 
         */
        set3DCustomRolloff(points:VECTOR[], numpoints:number): RESULT;
        /**
         * Sets the minimum and maximum audible distance for a sound.
         * @param min The sound's minimum volume distance in "units". See remarks for more on units.
         * @param max The sound's maximum volume distance in "units". See remarks for more on units. 
         */
        set3DMinMaxDistance(min:number, max:number): RESULT;
        /**
         * Sets a sounds's default attributes, so when it is played it uses these values without having to specify them later for each channel each time the sound is played.
         * @param frequency Default playback frequency for the sound, in hz. (ie 44100hz).
         * @param priority Default priority for the sound when played on a channel. 0 to 256. 0 = most important, 256 = least important. Default = 128. 
         */
        setDefaults(frequency:number, priority:number): RESULT;
        /**
         * Sets a sound, by default, to loop a specified number of times before stopping if its mode is set to FMOD_LOOP_NORMAL or FMOD_LOOP_BIDI.
         * @param loopcount Number of times to loop before stopping. 0 = oneshot. 1 = loop once then stop. -1 = loop forever. Default = -1 
         */
        setLoopCount(loopcount:number): RESULT;
        /**
         * Sets the loop points within a sound.
         * @param loopstart The loop start point. This point in time is played, so it is inclusive. 
         * @param loopstarttype The time format used for the loop start point. See FMOD_TIMEUNIT. 
         * @param loopend The loop end point. This point in time is played, so it is inclusive. 
         * @param loopendtype The time format used for the loop end point. See FMOD_TIMEUNIT. 
         */
        setLoopPoints(loopstart:number, loopstarttype:TIMEUNIT, loopend:number, loopendtype:TIMEUNIT): RESULT;
        /**
         * Sets or alters the mode of a sound.
         * @param mode Mode bits to set. 
         */
        setMode(mode:MODE): RESULT;
        /** 
         * Sets the volume of a MOD/S3M/XM/IT/MIDI music channel volume. 
         * @param channel MOD/S3M/XM/IT/MIDI music subchannel to set a linear volume for. 
         * @param volume Volume of the channel from 0.0 to 1.0. Default = 1.0. 
         */
        setMusicChannelVolume(channel:number, volume:number): RESULT;
        /** 
         * Sets the relative speed of MOD/S3M/XM/IT/MIDI music. 
         * @param speed Relative speed of the song from 0.01 to 100.0. 0.5 = half speed, 2.0 = double speed. Default = 1.0. 
        */
        setMusicSpeed(speed:number): RESULT;
        /**
         * Moves the sound from its existing SoundGroup to the specified sound group.
         * @param soundgroup Address of a SoundGroup object to move the sound to. 
         */
        setSoundGroup(soundgroup:SoundGroup): RESULT;
        /**
         * Sets a user value that the Sound object will store internally. Can be retrieved with Sound::getUserData.
         * @param userdata Address of user data that the user wishes stored within the Sound object. 
         */
        setUserData(userdata:any): RESULT;
        /** Releases previous sample data lock from Sound::lock
         * @param ptr1 Pointer to the 1st locked portion of sample data, from Sound::lock. 
         * @param ptr2 Pointer to the 2nd locked portion of sample data, from Sound::lock. 
         * @param len1 Length of data in bytes that was locked for ptr1
         * @param len2 Length of data in bytes that was locked for ptr2. This will be 0 if the data locked hasn't wrapped at the end of the buffer.
         */
        unlock(ptr1, ptr2, len1:number, len2:number): RESULT;
    }

    export interface ChannelControl {
        addDSP(index:number, dsp:DSP): RESULT;

        addFadePoint(dspclock:number, volume:number): RESULT;

        get3DAttributes(pos:Outval<VECTOR>, vel:Outval<VECTOR>, alt_pan_pos:Outval<VECTOR>): RESULT;

        get3DConeOrientation(orientation:Outval<VECTOR>): RESULT;

        get3DConeSettings(insideconeangle:Outval<number>, outsideconeangle:Outval<number>, outsidevolume:Outval<number>): RESULT;

        get3DCustomRolloff(points:Outval<VECTOR[]>, numpoints:Outval<number>): RESULT;

        get3DDistanceFilter(): RESULT;

        get3DDopplerLevel(): RESULT;

        get3DLevel(): RESULT;

        get3DMinMaxDistance(): RESULT;

        get3DOcclusion(): RESULT;

        get3DSpread(): RESULT;

        getAudibility(): RESULT;

        getDSP(): RESULT;

        getDSPClock(): RESULT;

        getDSPIndex(): RESULT;

        getDelay(): RESULT;

        getFadePoints(): RESULT;

        getLowPassGain(): RESULT;

        getMixMatrix(): RESULT;

        getMode(): RESULT;

        getMute(): RESULT;

        getNumDSPs(): RESULT;

        getPaused(): RESULT;

        getPitch(): RESULT;

        getReverbProperties(): RESULT;

        getSystemObject(): RESULT;

        getUserData(): RESULT;

        getVolume(): RESULT;

        getVolumeRamp(): RESULT;

        isPlaying(): RESULT;

        removeDSP(): RESULT;

        removeFadePoints(): RESULT;

        set3DAttributes(): RESULT;

        set3DConeOrientation(): RESULT;

        set3DConeSettings(): RESULT;

        set3DCustomRolloff(): RESULT;

        set3DDistanceFilter(): RESULT;

        set3DDopplerLevel(): RESULT;

        set3DLevel(): RESULT;

        set3DMinMaxDistance(): RESULT;

        set3DOcclusion(): RESULT;

        set3DSpread(): RESULT;

        setCallback(): RESULT;

        setDSPIndex(): RESULT;

        setDelay(): RESULT;

        setFadePointRamp(): RESULT;

        setLowPassGain(): RESULT;

        setMixLevelsInput(): RESULT;

        setMixLevelsOutput(): RESULT;

        setMixMatrix(): RESULT;

        setMode(): RESULT;

        setMute(): RESULT;

        setPan(): RESULT;

        setPaused(): RESULT;

        setPitch(): RESULT;

        setReverbProperties(): RESULT;

        setUserData(): RESULT;

        setVolume(): RESULT;

        setVolumeRamp(): RESULT;

        stop(): RESULT;

    }

    export interface Channel {
        addDSP(): RESULT;

        addFadePoint(): RESULT;

        get3DAttributes(): RESULT;

        get3DConeOrientation(): RESULT;

        get3DConeSettings(): RESULT;

        get3DCustomRolloff(): RESULT;

        get3DDistanceFilter(): RESULT;

        get3DDopplerLevel(): RESULT;

        get3DLevel(): RESULT;

        get3DMinMaxDistance(): RESULT;

        get3DOcclusion(): RESULT;

        get3DSpread(): RESULT;

        getAudibility(): RESULT;

        getChannelGroup(): RESULT;

        getCurrentSound(): RESULT;

        getDSP(): RESULT;

        getDSPClock(): RESULT;

        getDSPIndex(): RESULT;

        getDelay(): RESULT;

        getFadePoints(): RESULT;

        getFrequency(): RESULT;

        getIndex(): RESULT;

        getLoopCount(): RESULT;

        getLoopPoints(): RESULT;

        getLowPassGain(): RESULT;

        getMixMatrix(): RESULT;

        getMode(): RESULT;

        getMute(): RESULT;

        getNumDSPs(): RESULT;

        getPaused(): RESULT;

        getPitch(): RESULT;

        getPosition(): RESULT;

        getPriority(): RESULT;

        getReverbProperties(): RESULT;

        getSystemObject(): RESULT;

        getUserData(): RESULT;

        getVolume(): RESULT;

        getVolumeRamp(): RESULT;

        isPlaying(): RESULT;

        isVirtual(): RESULT;

        removeDSP(): RESULT;

        removeFadePoints(): RESULT;

        set3DAttributes(): RESULT;

        set3DConeOrientation(): RESULT;

        set3DConeSettings(): RESULT;

        set3DCustomRolloff(): RESULT;

        set3DDistanceFilter(): RESULT;

        set3DDopplerLevel(): RESULT;

        set3DLevel(): RESULT;

        set3DMinMaxDistance(): RESULT;

        set3DOcclusion(): RESULT;

        set3DSpread(): RESULT;

        setCallback(): RESULT;

        setChannelGroup(): RESULT;

        setDSPIndex(): RESULT;

        setDelay(): RESULT;

        setFadePointRamp(): RESULT;

        setFrequency(): RESULT;

        setLoopCount(): RESULT;

        setLoopPoints(): RESULT;

        setLowPassGain(): RESULT;

        setMixLevelsInput(): RESULT;

        setMixLevelsOutput(): RESULT;

        setMixMatrix(): RESULT;

        setMode(): RESULT;

        setMute(): RESULT;

        setPan(): RESULT;

        setPaused(): RESULT;

        setPitch(): RESULT;

        setPosition(): RESULT;

        setPriority(): RESULT;

        setReverbProperties(): RESULT;

        setUserData(): RESULT;

        setVolume(): RESULT;

        setVolumeRamp(): RESULT;

        stop(): RESULT;


    }

    export interface ChannelGroup {
        addDSP(): RESULT;

        addFadePoint(): RESULT;

        addGroup(): RESULT;

        get3DAttributes(): RESULT;

        get3DConeOrientation(): RESULT;

        get3DConeSettings(): RESULT;

        get3DCustomRolloff(): RESULT;

        get3DDistanceFilter(): RESULT;

        get3DDopplerLevel(): RESULT;

        get3DLevel(): RESULT;

        get3DMinMaxDistance(): RESULT;

        get3DOcclusion(): RESULT;

        get3DSpread(): RESULT;

        getAudibility(): RESULT;

        getChannel(): RESULT;

        getDSP(): RESULT;

        getDSPClock(): RESULT;

        getDSPIndex(): RESULT;

        getDelay(): RESULT;

        getFadePoints(): RESULT;

        getGroup(): RESULT;

        getLowPassGain(): RESULT;

        getMixMatrix(): RESULT;

        getMode(): RESULT;

        getMute(): RESULT;

        getName(): RESULT;

        getNumChannels(): RESULT;

        getNumDSPs(): RESULT;

        getNumGroups(): RESULT;

        getParentGroup(): RESULT;

        getPaused(): RESULT;

        getPitch(): RESULT;

        getReverbProperties(): RESULT;

        getSystemObject(): RESULT;

        getUserData(): RESULT;

        getVolume(): RESULT;

        getVolumeRamp(): RESULT;

        isPlaying(): RESULT;

        release(): RESULT;

        removeDSP(): RESULT;

        removeFadePoints(): RESULT;

        set3DAttributes(): RESULT;

        set3DConeOrientation(): RESULT;

        set3DConeSettings(): RESULT;

        set3DCustomRolloff(): RESULT;

        set3DDistanceFilter(): RESULT;

        set3DDopplerLevel(): RESULT;

        set3DLevel(): RESULT;

        set3DMinMaxDistance(): RESULT;

        set3DOcclusion(): RESULT;

        set3DSpread(): RESULT;

        setCallback(): RESULT;

        setDSPIndex(): RESULT;

        setDelay(): RESULT;

        setFadePointRamp(): RESULT;

        setLowPassGain(): RESULT;

        setMixLevelsInput(): RESULT;

        setMixLevelsOutput(): RESULT;

        setMixMatrix(): RESULT;

        setMode(): RESULT;

        setMute(): RESULT;

        setPan(): RESULT;

        setPaused(): RESULT;

        setPitch(): RESULT;

        setReverbProperties(): RESULT;

        setUserData(): RESULT;

        setVolume(): RESULT;

        setVolumeRamp(): RESULT;

        stop(): RESULT;

    }

    export interface SoundGroup {
        getMaxAudible(): RESULT;

        getMaxAudibleBehavior(): RESULT;

        getMuteFadeSpeed(): RESULT;

        getName(): RESULT;

        getNumPlaying(): RESULT;

        getNumSounds(): RESULT;

        getSound(): RESULT;

        getSystemObject(): RESULT;

        getUserData(): RESULT;

        getVolume(): RESULT;

        release(): RESULT;

        setMaxAudible(): RESULT;

        setMaxAudibleBehavior(): RESULT;

        setMuteFadeSpeed(): RESULT;

        setUserData(): RESULT;

        setVolume(): RESULT;

        stop(): RESULT;

    }

    export interface DSP {
        /**
         * Adds the specified DSP unit as an input of the DSP object.
         * @param input The DSP unit to add as an input of the current unit. 
         * @param connection The connection between the 2 units. Optional. Specify 0 or NULL to ignore. 
         * @param type The type of connection between the 2 units. See FMOD_DSPCONNECTION_TYPE.
         */
        addInput(input:DSP, connection:Outval<DSPConnection>, type:DSPCONNECTION_TYPE): RESULT;
        /**
         * Helper function to disconnect either all inputs or all outputs of a dsp unit.
         * @param inputs true = disconnect all inputs to this DSP unit. false = leave input connections alone
         * @param outputs true = disconnect all outputs to this DSP unit. false = leave output connections alone. 
         */
        disconnectAll(inputs:boolean, outputs:boolean): RESULT;
        /**
         * Disconnect the DSP unit from the specified input.
         * @param target The input unit that this unit is to be disconnected from. Specify 0 or NULL to disconnect the unit from all outputs and inputs. 
         * @param connection If there is more than one connection between 2 dsp units, this can be used to define which of the connections should be disconnected. 
         */
        disconnectFrom(target:DSP, connection:DSPConnection): RESULT;
        /**
         * Retrieves the active state of a DSP unit
         * @param isActive Address of a variable that receives the active state of the unit.
         */
        getActive(isActive:Outval<boolean>): RESULT;
        /**
         * Retrieves the bypass state of the DSP unit.
         * @param isBypassed Address of a variable that receieves the bypass state for a DSP unit.
         */
        getBypass(isBypassed:Outval<boolean>): RESULT;
        /**
         * Retrieve the CPU usage for a particular DSP
         * @param exclusive Address of a variable to receive exclusive CPU usage. Optional. Specify 0 or NULL to ignore. 
         * @param inclusive Address of a variable to receive inclusive CPU usage. Optional. Specify 0 or NULL to ignore. 
         */
        getCPUUsage(exclusive:Outval<number>, inclusive:Outval<number>): RESULT;
        /**
         * Gets the input signal format for a dsp units read/process callback, to determine which speakers the signal will be processed on and how many channels will be processed.
         * @param channelmask Address of a variable that receives the FMOD_CHANNELMASK which determines which speakers are represented by the channels in the input signal. 
         * @param numchannels Address of a variable that receives the number of channels to be processed on this unit. 
         * @param source_speakermode Address of a variable that receives the source speaker mode where the signal came from. 
         */
        getChannelFormat(channelmask:Outval<CHANNELMASK>, numchannels:Outval<number>, source_speakermode:Outval<SPEAKERMODE>): RESULT;
        /**
         * Retrieve the index of the first data parameter of a particular data type.
         * @param datatype The type of data to find. This would usually be set to a value defined in FMOD_DSP_PARAMETER_DATA_TYPE but can be any value for custom types.
         * @param index Contains the index of the first data parameter of type 'datatype' after the function is called. Will be -1 if no matches were found. Can be null. 
         */
        getDataParameterIndex(datatype:DSP_PARAMETER_DATA_TYPE, index:Outval<number>): RESULT;
        /**
         * Retrieves the idle state of a DSP. A DSP is idle when no signal is coming into it. This can be a useful method of determining if a DSP sub branch is finished processing, so it can be disconnected for example.
         * @param isIdle Address of a variable to receive the idle state for the DSP
         */
        getIdle(isIdle:Outval<boolean>): RESULT;
        /**
         * Retrieves information about the current DSP unit, including name, version, default channels and width and height of configuration dialog box if it exists
         * @param name Address of a variable that receives the name of the unit. This will be a maximum of 32bytes. If the DSP unit has filled all 32 bytes with the name with no terminating \0 null character it is up to the caller to append a null character. Optional. Specify 0 or NULL to ignore.
         * @param version Address of a variable that receives the version number of the DSP unit. Version number is usually formated as hex AAAABBBB where the AAAA is the major version number and the BBBB is the minor version number. Optional. Specify 0 or NULL to ignore. 
         * @param channels Address of a variable that receives the number of channels the unit was initialized with. 0 means the plugin will process whatever number of channels is currently in the network. >0 would be mostly used if the unit is a unit that only generates sound, or is not flexible enough to take any number of input channels. Optional. Specify 0 or NULL to ignore
         * @param configwidth Address of a variable that receives the width of an optional configuration dialog box that can be displayed with DSP::showConfigDialog. 0 means the dialog is not present. Optional. Specify 0 or NULL to ignore. 
         * @param configheight Address of a variable that receives the height of an optional configuration dialog box that can be displayed with DSP::showConfigDialog. 0 means the dialog is not present. Optional. Specify 0 or NULL to ignore. 
         */
        getInfo(name:Outval<string>, version:Outval<number>, channels:Outval<number>, configwidth:Outval<number>, configheight:Outval<number>): RESULT;
        /**
         * Retrieves a pointer to a DSP unit which is acting as an input to this unit
         * @param index Index of the input unit to retrieve
         * @param input Address of a variable that receieves the pointer to the desired input unit. 
         * @param inputconnection The connection between the 2 units. Optional. Specify 0 or NULL to ignore.
         */
        getInput(index:number, input:Outval<DSP>, inputconnection:Outval<DSPConnection>): RESULT;
        /**
         * Retrieve the information about metering for a particular DSP to see if it is enabled or not.
         * @param inputEnabled Address of a variable to receive the metering enabled state for the DSP, for the intput signal (pre-processing). true = on, false = off. Optional. Specify 0 or NULL to ignore. 
         * @param outputEnabled Address of a variable to receive the metering enabled state for the DSP, for the output signal (post-processing). true = on, false = off. Optional. Specify 0 or NULL to ignore. 
         */
        getMeteringEnabled(inputEnabled:Outval<boolean>, outputEnabled:Outval<boolean>): RESULT;
        /**
         * Retrieve the metering information for a particular DSP
         * @param inputInfo Address of a variable to receive metering information for the DSP, for the intput signal (pre-processing). true = on, false = off. Optional. Specify 0 or NULL to ignore. 
         * @param outputInfo Address of a variable to receive metering information for the DSP, for the output signal (post-processing). true = on, false = off. Optional. Specify 0 or NULL to ignore.
         */
        getMeteringInfo(inputInfo:Outval<DSP_METERING_INFO>, outputInfo:Outval<DSP_METERING_INFO>): RESULT;
        /**
         * Retrieves the number of inputs connected to the DSP unit.
         * @param numinputs Address of a variable that receives the number of inputs connected to this unit. 
         */
        getNumInputs(numinputs:Outval<number>): RESULT;
        /**
         * Retrieves the number of outputs connected to the DSP unit.
         * @param numoutputs Address of a variable that receives the number of outputs connected to this unit. 
         */
        getNumOutputs(numoutputs:Outval<number>): RESULT;
        /**
         * Retrieves the number of parameters a DSP unit has to control its behaviour.
         * @param numparams Address of a variable that receives the number of parameters contained within this DSP unit. 
         */
        getNumParameters(numparams:Outval<number>): RESULT;
        /**
         * Retrieves a pointer to a DSP unit which is acting as an output to this unit.
         * @param index Index of the output unit to retrieve. 
         * @param output Address of a variable that receieves the pointer to the desired output unit
         * @param outputconnection The connection between the 2 units. Optional. Specify 0 or NULL to ignore. 
         */
        getOutput(index:number, output:Outval<DSP>, outputconnection:Outval<DSPConnection>): RESULT;
        /**
         * Call the DSP process function to retrieve the output signal format for a DSP based on input values.
         * @param inmask Channel bitmask representing the speakers enabled for the incoming signal. For example a 5.1 signal could have inchannels 2 that represent FMOD_CHANNELMASK_SURROUND_LEFT and FMOD_CHANNELMASK_SURROUND_RIGHT. 
         * @param inchannels Number of channels for the incoming signal
         * @param inspeakermode Speaker mode for the incoming signal. 
         * @param outmask Address of a variable to receive the DSP unit's output mask, based on the DSP units preference and settings. 
         * @param outchannels Address of a variable to receive the DSP unit's output channel count, based on the DSP units preference and settings. 
         * @param outspeakermode Address of a variable to receive the DSP unit's output speaker mode, based on the DSP units preference and settings. 
         */
        getOutputChannelFormat(inmask: CHANNELMASK, inchannels:number, inspeakermode:SPEAKERMODE, outmask:Outval<CHANNELMASK>, outchannels:Outval<number>, outspeakermode:Outval<SPEAKERMODE>): RESULT;
        /**
         * Retrieves a DSP unit's boolean parameter by index. To find out the parameter names and range, see the see also field.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param value Address of a variable that receives the boolean parameter value for the parameter specified. 
         * @param valuestr Address of a variable that receives the string containing a formatted or more meaningful representation of the DSP parameter's value. For example if a switch parameter has on and off (0.0 or 1.0) it will display "ON" or "OFF" by using this parameter. Optional. Specify 0 or NULL to ignore. 
         */
        getParameterBool(index:number, value:Outval<boolean>, valuestr:Outval<string>): RESULT;
        /**
         * Retrieves a DSP unit's data block parameter by index. To find out the parameter names and range, see the see also field.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param data Address of a variable that receives binary data for the parameter specified. 
         * @param length Address of a variable that receives the length of data block in bytes. Optional. 
         * @param valuestr Address of a variable that receives the string containing a formatted or more meaningful representation of the DSP parameter's value. For example if a switch parameter has on and off (0.0 or 1.0) it will display "ON" or "OFF" by using this parameter. Optional. Specify 0 or NULL to ignore. 
         */  
        getParameterData(index:number, data:Outval<any>, length:Outval<number>, valuestr:Outval<string>): RESULT;
        /**
         * Retrieves a DSP unit's floating point parameter by index. To find out the parameter names and range, see the see also field.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param value Address of a variable that receives the floating point parameter value for the parameter specified. 
         * @param valuestr Address of a variable that receives the string containing a formatted or more meaningful representation of the DSP parameter's value. For example if a switch parameter has on and off (0.0 or 1.0) it will display "ON" or "OFF" by using this parameter. Optional. Specify 0 or NULL to ignore. 
         */
        getParameterFloat(index:number, value:Outval<string>, valuestr:Outval<string>): RESULT;
        /**
         * Retrieve information about a specified parameter within the DSP unit.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param desc Address of a variable to receive the contents of an array of FMOD_DSP_PARAMETER_DESC structures for this DSP unit.
         */
        getParameterInfo(index:number, desc:Outval<DSP_PARAMETER_DESC>): RESULT;
        /**
         * 
         * @param index Retrieves a DSP unit's integer parameter by index. To find out the parameter names and range, see the see also field.
         * @param value Address of a variable that receives the integer parameter value for the parameter specified. 
         * @param valuestr Address of a variable that receives the string containing a formatted or more meaningful representation of the DSP parameter's value. For example if a switch parameter has on and off (0.0 or 1.0) it will display "ON" or "OFF" by using this parameter. Optional. Specify 0 or NULL to ignore. 
         */
        getParameterInt(index:number, value:Outval<number>, valuestr:Outval<string>): RESULT;
        /**
         * Retrieves the parent System object that was used to create this object.
         * @param system Address of a variable that receives the System object. 
         */
        getSystemObject(system:Outval<System>): RESULT;
        /**
         * Retrieves the pre-defined type of a FMOD registered DSP unit
         * @param type Address of a variable to receive the FMOD dsp type
         */
        getType(type:Outval<DSP_TYPE>): RESULT;
        /**
         * Retrieves the user value that that was set by calling the DSP::setUserData function.
         * @param userdata Address of a pointer that receives the user data specified with the DSP::setUserData function. 
         */
        getUserData(userdata:Outval<any>): RESULT;
        /**
         * Retrieves the wet/dry scale of a DSP effect, through the 'wet' mix, which is the post-processed signal and the 'dry' mix which is the pre-processed signal
         * @param prewet Address of a floating point value, to receive typically 0 to 1, describing a linear scale of the 'wet' (pre-processed signal) mix of the effect. Default = 1.0. Scale can be lower than 0 (negating) and higher than 1 (amplifying).
         * @param postwet Address of a floating point value, to receive typically 0 to 1, describing a linear scale of the 'wet' (post-processed signal) mix of the effect. Default = 1.0. Scale can be lower than 0 (negating) and higher than 1 (amplifying). 
         * @param dry Address of a floating point value, to receive typically 0 to 1, describing a linear scale of the 'dry' (pre-processed signal) mix of the effect. Default = 0.0. Scale can be lower than 0 and higher than 1 (amplifying). 
         */
        getWetDryMix(prewet:Outval<number>, postwet:Outval<number>, dry:Outval<number>): RESULT;
        /**
         * Frees a DSP object
         */
        release(): RESULT;
        /**
         * Calls the DSP unit's reset function, which will clear internal buffers and reset the unit back to an initial state.
         */
        reset(): RESULT;
        /**
         * Enables or disables a unit for being processed.
         * @param isActive true = unit is activated, false = unit is deactivated
         */
        setActive(isActive:boolean): RESULT;
        /**
         * Enables or disables the read callback of a DSP unit so that it does or doesn't process the data coming into it.
A DSP unit that is disabled still processes its inputs, it will just be 'dry'.
         * @param isBypassed Boolean to cause the read callback of the DSP unit to be bypassed or not. Default = false. 
         */
        setBypass(isBypassed:boolean): RESULT;
        /**
         * Sets the signal format of a dsp unit so that the signal is processed on the speakers specified.
Also defines the number of channels in the unit that a read callback will process, and the output signal of the unit.
         * @param channelmask A series of bits specified by FMOD_CHANNELMASK to determine which speakers are represented by the channels in the signal. 
         * @param numchannels The number of channels to be processed on this unit and sent to the outputs connected to it. Maximum of FMOD_MAX_CHANNEL_WIDTH. 
         * @param source_speakermode The source speaker mode where the signal came from. See description.
         * @description Setting the number of channels on a unit will force a down or up mix to that channel count before processing the DSP read callback. This channelcount is then sent to the outputs of the unit. source_speakermode is informational, when channelmask describes what bits are active, and numchannels describes how many channels are in a buffer, source_speakermode describes where the channels originated from. For example if numchannels = 2 then this could describe for the DSP if the original signal started from a stereo signal or a 5.1 signal. It could also describe the signal as all monaural, for example if numchannels was 16 and the speakermode was FMOD_SPEAKERMODE_MONO.
         */
        setChannelFormat(channelmask:CHANNELMASK, numchannels:number, source_speakermode:SPEAKERMODE): RESULT;
        /**
         * Enable metering for a DSP unit so that DSP::getMeteringInfo will return metering information, and so that FMOD Studio profiler tool can visualize the levels.
         * @param inputEnabled Enable metering for the input signal (pre-processing). Specify true to turn on input level metering, false to turn it off.
         * @param outputEnabled Enable metering for the output signal (post-processing). Specify true to turn on output level metering, false to turn it off. 
         */
        setMeteringEnabled(inputEnabled:boolean, outputEnabled:boolean): RESULT;
        /**
         * Sets a DSP unit's boolean parameter by index. To find out the parameter names and range, see the see also field.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param value Boolean parameter value to be passed to the DSP unit. Should be TRUE or FALSE. 
         */
        setParameterBool(index:number, value:boolean): RESULT;
        /**
         * Sets a DSP unit's binary data parameter by index. To find out the parameter names and range, see the 'see also' field in the documentation.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param data Data block parameter. This will be raw binary data to be passed to the DSP unit. An array of bytes.
         * @param length Length of data block in bytes being passed in. 
         */
        setParameterData(index:number, data:number[], length:number): RESULT;
        /**
         * Sets a DSP unit's floating point parameter by index. To find out the parameter names and range, see the see also field.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param value Floating point parameter value to be passed to the DSP unit. 
         */
        setParameterFloat(index:number, value:number): RESULT;
        /**
         * Sets a DSP unit's integer parameter by index. To find out the parameter names and range, see the see also field.
         * @param index Parameter index for this unit. Find the number of parameters with DSP::getNumParameters. 
         * @param value Integer parameter value to be passed to the DSP unit.  
         */
        setParameterInt(index:number, value:number): RESULT;
        /**
         * Sets a user value that the DSP object will store internally. Can be retrieved with DSP::getUserData.
         * @param userdata Address of user data that the user wishes stored within the DSP object. 
         */
        setUserData(userdata:any): RESULT;
        /**
         * Allows the user to scale the affect of a DSP effect, through control of the 'wet' mix, which is the post-processed signal and the 'dry' which is the pre-processed signal.
         * @param prewet Floating point value from 0 to 1, describing a linear scale of the 'wet' (pre-processed signal) mix of the effect. Default = 1.0. Scale can be lower than 0 (negating) and higher than 1 (amplifying). 
         * @param postwet Floating point value from 0 to 1, describing a linear scale of the 'wet' (post-processed signal) mix of the effect. Default = 1.0. Scale can be lower than 0 (negating) and higher than 1 (amplifying). 
         * @param dry Floating point value from 0 to 1, describing a linear scale of the 'dry' (pre-processed signal) mix of the effect. Default = 0.0. Scale can be lower than 0 and higher than 1 (amplifying). 
         */
        setWetDryMix(prewet:number, postwet:number, dry:number): RESULT;
        /**
         * Display or hide a DSP unit configuration dialog box inside the target window.
         * @param hwnd Target HWND in windows to display configuration dialog
         * @param show true = show dialog box inside target hwnd. false = remove dialog from target hwnd. 
         */
        showConfigDialog(hwnd:any, show:boolean): RESULT;


    }

    export interface DSPConnection {
        /**
         * Retrieves the DSP unit that is the input of this connection.
         * @param input Address of a pointer that receives the pointer to the DSP unit that is the input of this connection. 
         */
        getInput(input:Outval<DSP>): RESULT;
        /**
         * Retrieves the volume of the connection - the scale level of the input before being passed to the output.
         * @param volume Address of a variable to receive the volume or mix level of the specified input. 0.0 = silent, 1.0 = full volume. 
         */
        getMix(volume:Outval<number>): RESULT;
        /**
         * Returns the panning matrix set by the user, for a connection.
         * @param matrix Address of a variable to recieve an array of floating point matrix data, where rows represent output speakers, and columns represent input channels.
         * @param outchannels Address of a variable to receive the number of output channels in the set matrix. 
         * @param inchannels Address of a variable to receive the number of input channels in the set matrix. 
         * @param inchannel_hop Number of floating point values available in the destination n memory for a row, so that the destination memory can be skipped through correctly to write the right values, if the intended matrix memory to be written to is wider than the matrix stored in the DSPConnection.
         */
        getMixMatrix(matrix:Outval<number[]>, outchannels:Outval<number>, inchannels:Outval<number>, inchannel_hop:number): RESULT;
        /**
         * Retrieves the DSP unit that is the output of this connection.
         * @param output Address of a pointer that receives the pointer to the DSP unit that is the output of this connection. 
         */
        getOutput(output:Outval<DSP>): RESULT;
        /**
         * Returns the type of the connection between 2 DSP units. This can be FMOD_DSPCONNECTION_TYPE_STANDARD, FMOD_DSPCONNECTION_TYPE_SIDECHAIN, FMOD_DSPCONNECTION_TYPE_SEND or FMOD_DSPCONNECTION_TYPE_SEND_SIDECHAIN.
         * @param type Address of the variable to receive the type of connection between 2 DSP units. See FMOD_DSPCONNECTION_TYPE.  
         */
        getType(type:Outval<DSPCONNECTION_TYPE>): RESULT;
        /**
         * Sets a user value that the DSPConnection object will store internally. Can be retrieved with DSPConnection::getUserData.
         * @param userdata Address of user data that the user wishes stored within the DSPConnection object. 
         */
        getUserData(userdata:Outval<any>): RESULT;
        /**
         * Sets the volume of the connection so that the input is scaled by this value before being passed to the output.
         * @param volume Volume or mix level of the connection. 0.0 = silent, 1.0 = full volume.
         */
        setMix(volume:number): RESULT;
        /**
         * Sets a NxN panning matrix on a DSP connection. Skipping/hop is supported, so memory for the matrix can be wider than the width of the inchannels parameter.
         * @param matrix Pointer to an array of floating point matrix data, where rows represent output speakers, and columns represent input channels.
         * @param outchannels Number of output channels in the matrix being specified. 
         * @param inchannels Number of input channels in the matrix being specified. 
         * @param inchannel_hop Number of floating point values stored in memory for a row, so that the memory can be skipped through correctly to read the right values, if the intended matrix memory to be read from is wider than the matrix stored in the DSPConnection. 
         */
        setMixMatrix(matrix: number[], outchannels:number, inchannels:number, inchannel_hop:number): RESULT;
        /**
         * Sets a user value that the DSPConnection object will store internally. Can be retrieved with DSPConnection::getUserData.
         * @param userdata Address of user data that the user wishes stored within the DSPConnection object. 
         */
        setUserData(userdata:any): RESULT;
    
    }

    /** Currently not supported in JavaScript */
    export interface Geometry {
        addPolygon(): RESULT;

        getActive(): RESULT;

        getMaxPolygons(): RESULT;

        getNumPolygons(): RESULT;

        getPolygonAttributes(): RESULT;

        getPolygonNumVertices(): RESULT;

        getPolygonVertex(): RESULT;

        getPosition(): RESULT;

        getRotation(): RESULT;

        getScale(): RESULT;

        getUserData(): RESULT;

        release(): RESULT;

        save(): RESULT;

        setActive(): RESULT;

        setPolygonAttributes(): RESULT;

        setPolygonVertex(): RESULT;

        setPosition(): RESULT;

        setRotation(): RESULT;

        setScale(): RESULT;

        setUserData(): RESULT;

    }
    
    export interface Reverb3D {
        get3DAttributes(): RESULT;

        getActive(): RESULT;

        getProperties(): RESULT;

        getUserData(): RESULT;

        release(): RESULT;

        set3DAttributes(): RESULT;

        setActive(): RESULT;

        setProperties(): RESULT;

        setUserData    (): RESULT;

    }
    //#endregion System Objects
    // #region Studio System Objects  //Command Replay needs parameters in functions /////////////////////////////////////////
    export interface StudioSystem {
        // Functions

        /** 
         * Creates a Studio System object. This must be called before you do anything else.
         * @param system Address of a variable to receive the new Studio System object.
         * @param headerversion The expected FMOD Studio API version, to ensure the library matches the headers. For the C API, pass in FMOD_VERSION. For the C++ API, it defaults to FMOD_VERSION, so you don't need to pass it in explicitly. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        create(system:Outval<StudioSystem>, headerversion:number): RESULT;

        /** 
         * Waits until all pending commands have been executed.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        flushCommands(): RESULT;
        /** 
         * Waits until all sample loading and unloading has completed.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        flushSampleLoading(): RESULT;
        /** 
         * Retrieves the advanced settings assigned to the studio system object.
         * @param settings Address of a variable to receive the contents of the FMOD_STUDIO_ADVANCEDSETTINGS structure specified by the user. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getAdvancedSettings(settings:Outval<STUDIO_ADVANCEDSETTINGS>): RESULT;
        /** 
         * Retrieves an already loaded Bank object by path, filename or ID string.
         * @param path The bank path, filename, or the ID string that identifies the bank. 
         * @param bankOut Address of a variable to receive the Bank object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBank(path:string, bankOut:Outval<Bank>): RESULT;

        /** 
         * Retrieves an already loaded Bank object by ID.
         * @param id The 128-bit GUID which identifies the bank. FMOD.GUID type
         * @param bankOut Address of a variable to receive the Bank object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBankByID(id:GUID, bankOut:Outval<Bank>): RESULT;

        /** 
         * Retrieves the number of loaded banks.
         * @param countOut Address of a variable to receive the number of loaded Banks.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBankCount(countOut:Outval<number>): RESULT;
        /** 
         * Retrieves the loaded Banks.
         * @param arrayOut An array of memory allocated by the user. 
         * @param capacity The capacity of the array passed in as the first parameter 
         * @param countOut Address of a variable to receive the number of Banks written to the array 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBankList(arrayOut:Outval<Bank[]>, capacity:number, countOut:Outval<number>): RESULT;

        /** 
         * Retrieves information about various memory buffers used by FMOD Studio.
         * @param usageOut Address of a variable to receive the performance information. 
         * Struct passed out is of FMOD_STUDIO_BUFFER_USAGE type.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBufferUsage(usageOut:Outval<STUDIO_BUFFER_USAGE>): RESULT;
        /** 
         * Retrieves a bus by path or ID string.
         * @param path The bus path or the ID string that identifies the bus. 
         * @param busOut Address of a variable to receive the bus object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBus(path:string, busOut:Outval<Bus>): RESULT;
        /** 
         * Retrieves a bus by ID.
         * @param id The 128-bit GUID which identifies the bus. Type FMOD_GUID
         * @param busOut Address of a variable to receive the bus object.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBusByID(id:GUID, busOut:Outval<Bus>): RESULT;
        /** 
         * Retrieves performance information for FMOD Studio and low level systems  
         * @param usageOut Address of a variable to receive the performance info. 
         * FMOD_STUDIO_CPU_USAGE. Cast .val to IFMOD.STUDIO_CPU_USAGE
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getCPUUsage(usageOut:Outval<STUDIO_CPU_USAGE>): RESULT;
        /** 
         * Retrieves an EventDescription by path or ID string.
         * @param path The path or the ID string that identifies the event or snapshot
         * @param eventOut Address of a variable to receive the EventDescription object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getEvent(path:string, eventOut:Outval<EventDescription>): RESULT;
        /** Retrieves an EventDescription by ID.
         * @param id The 128-bit GUID which identifies the event or snapshot.
         * @param eventOut Address of a variable to receive the EventDescription object.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getEventByID(id:GUID, event:Outval<EventDescription>): RESULT;
        /** 
         * Retrieves the position, velocity and orientation of the 3D sound listener.
         * @param listener Listener index. Specify 0 if there is only 1 listener. 
         * @param attributes Address of a variable to receive the 3D attributes for the listener. See FMOD_3D_ATTRIBUTES. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getListenerAttributes(listener:number, attributes:Outval<_3D_ATTRIBUTES>): RESULT;
        /** 
         * Gets the listener weighting, which allows listeners to fade in and out
         * @param listner Listener index.
         * @param weightOut Address of a variable to receive the weighting value. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getListenerWeight(listener:number, weightOut:Outval<number>): RESULT;
        /** 
         * Retrieves the Studio System's internal Low Level System object for 
         * access to the Low Level API.
         * @param systemOut Address of a variable to pass the low level System to
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getCoreSystem(systemOut:Outval<System>): RESULT;
        /** 
         * Gets the number of listeners that have been set into in the 3D sound scene.
         * @param numlistenersOut Number of listeners that have been set. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getNumListeners(numlistenersOut:Outval<number>): RESULT;
        /** 
         * Retrieves information for loading a sound from an audio table.
         * @param key The key that identifies the sound, listed in FMOD Studio
         * @param infoOut Address of a variable to receive the sound loading information. SOUND_INFO type.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         * @description Input each field into lowLevelSystem.createSound(info.name_or_data, 
         * info.mode, nullSinceNoExsoundinfoInJavascriptStruct, soundOut) to receive the parent sound. You can then retrieve
         * the subsound with Sound.getSubSound( info.subsoundindex, Outval );
         */
        getSoundInfo(key:string,infoOut:Outval<STUDIO_SOUND_INFO>): RESULT;
        /** 
         * Retrieves the user data that is set on the system.
         * @param userdataOut Address of a variable to receive the user data. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getUserData(userdataOut:Outval<any>): RESULT;
        /** 
         * Retrieves a VCA by path or ID string.
         * @param path The VCA path or the ID string that identifies the VCA. 
         * @param vcaOut Address of a variable to receive the VCA object.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getVCA(path:string, vcaOut:Outval<VCA>): RESULT;
        /** 
         * Retrieves a VCA by ID
         * @param id The 128-bit GUID which identifies the VCA. 
         * @param vcaOut Address of a variable to receive the VCA object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getVCAByID(id:GUID, vcaOut:Outval<VCA>): RESULT;
        /** 
         * Initializes the Studio System, the Low Level System, and the sound device.
         * @param maxchannels The maximum number of channels to be used in FMOD. These are also called 'virtual channels', as you can play as many of these as you want, even if you only have a small number of real voices. 
         * @param studioflags See FMOD_STUDIO_INITFLAGS. This can be a selection of flags bitwise OR'ed together to change the behaviour of the Studio System. 
         * @param lowlevelflags See FMOD_INITFLAGS. This can be a selection of flags bitwise OR'ed together to change the behaviour of the Low Level System. 
         * @param extradriverdata Driver specific data that can be passed to the output plugin. For example the filename for the wav writer plugin. See FMOD_OUTPUTTYPE for what each output mode might take here. Optional. Specify 0 or NULL to ignore. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        initialize(maxchannels: number, studioflags:STUDIO_INITFLAGS, 
        lowlevelflags:INITFLAGS, extradriverdata:any): RESULT;
        /** 
         * Loads a Studio event bank using custom read callbacks.
         * @param info Information for loading the bank
         * @param flags Flags to control bank loading
         * @param bankOut Address of a variable to receive the Bank object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadBankCustom(info:STUDIO_BANK_INFO, flags:STUDIO_LOAD_BANK_FLAGS, bankOut:Outval<Bank>): RESULT;
        /** 
         * Loads a Studio event bank from a file.
         * @param filename Name of the file on disk
         * @param flags Flags to control bank loading
         * @param bankOut Address of a variable to receive the Bank object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadBankFile(filename:string, flags:STUDIO_LOAD_BANK_FLAGS, bankOut:Outval<Bank>): RESULT;
        /** 
         * Loads a Studio event bank from memory.
         * @param buffer Memory buffer to load from. This should be 32-byte aligned 
         * if mode is FMOD_STUDIO_LOAD_MEMORY_POINT. 
         * @param length Length of the memory buffer. 
         * @param mode Loading mode to use.
         * @param flags Flags to control bank loading.
         * @param bankOut Address of a variable to receive the Bank object.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadBankMemory(buffer:number[], length:number, mode:STUDIO_LOAD_MEMORY_MODE, flags:STUDIO_LOAD_BANK_FLAGS, bankOut:Outval<Bank>): RESULT;
        /** 
         * Playback Studio commands that have previously been recorded to file.
         * @param filename The filename to load the command replay file from. 
         * @param flags Flags that control the command replay. 
         * @param playback Address of a variable to receive the CommandReplay object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadCommandReplay(filename:string, flags:STUDIO_COMMANDREPLAY_FLAGS, playback:Outval<CommandReplay>): RESULT;
        /** 
         * Retrieves the ID for a bank, event, snapshot, bus or VCA
         * @param path The path to the object as shown in FMOD Studio.
         * @param id Address of a variable to receive the 128-bit GUID.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         * @description This function will return FMOD_ERR_EVENT_NOTFOUND unless string
         * data for the requested object is loaded (by loading the "Master Bank.strings.bank" file).
         * e.g. "event:/UI/Cancel", "snapshot:/IngamePause", "bus:/SFX/Ambience", "vca:/Mega Strip", "bank:/Vehicles" 
         */
        lookupID(path:string, id:Outval<GUID>): RESULT;
        /** 
         * Retrieves the path for a bank, event, snapshot, bus or VCA.
         * @param id The 128-bit GUID which identifies the bank, event, snapshot, bus or VCA. 
         * @param path Address of a buffer to receive the path. Specify 0 or NULL to ignore.
         * @param size Size of the path buffer in bytes. Required if path parameter is not NULL.
         * @param retrieved Address of a variable to receive the size of the retrieved path in bytes, 
         * including the terminating null character. Optional. Specify 0 or NULL to ignore.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        lookupPath(id:GUID, path:string, size:number, retrieved:Outval<number>): RESULT;
        /** 
         * Registers a third party plugin DSP for use by events loaded by the Studio API.
         * @param description The description of the DSP. See FMOD_DSP_DESCRIPTION
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        registerPlugin(description:DSP_DESCRIPTION): RESULT;
        /** 
         * Shuts down and frees the Studio System
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        release(): RESULT;
        /** 
         * Resets information about memory buffers used by FMOD Studio.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        resetBufferUsage(): RESULT;
        /** 
         * Sets advanced features like configuring memory and cpu usage.
         * @param settings Pointer to FMOD_STUDIO_ADVANCEDSETTINGS structure. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setAdvancedSettings(settings:ADVANCEDSETTINGS): RESULT;
        /** 
         * Sets a callback to hook into various informational events.
         * @param callback
         * @param callbackmask
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setCallback(callback:STUDIO_SYSTEM_CALLBACK, callbackmask:STUDIO_SYSTEM_CALLBACK_TYPE): RESULT;
        /** 
         * Sets the position, velocity and orientation of the 3D sound listener.
         * @param listener index. Specify 0 if there is only 1 listener.
         * @param attributes The 3D attributes for the listener. See FMOD_3D_ATTRIBUTES. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setListenerAttributes(listener:number, attributes:_3D_ATTRIBUTES): RESULT;
        /** 
         * Sets the listener weighting, allowing listeners to fade in and out.
         * @param listner Listener index. 
         * @param weight The weighting value from 0 to 1. 
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        setListenerWeight(listener:number, weight:number): RESULT;
        /** 
         * Sets the number of listeners in the 3D sound scene. 
         * This function is useful mainly for split-screen game purposes.
         * @param numlisteners Number of listeners in the scene. Valid values are from 1
         *  to FMOD_MAX_LISTENERS inclusive. Default = 1. 
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        setNumListners(numlisteners:number): RESULT;
        /** 
         * Sets arbitrary user data on the system
         * @param userdata
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        setUserData(userdata:any): RESULT;
        /** 
         * Start recording all Studio commands to a file with the given path.
         * @param filename The filename where the write the command replay file.
         * @param flags Flags that control command capturing. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        startCommandCapture(filename:string, flags:STUDIO_COMMANDCAPTURE_FLAGS): RESULT;
        /** 
         * Stop recording Studio commands.
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        stopCommandCapture(): RESULT;
        /** 
         * Unloads all currently loaded banks.
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        unloadAll(): RESULT;
        /** 
         * Unregisters a previously registered third party plugin DSP.
         * @param name The name of the DSP. This should match the description passed 
         * to Studio::System::registerPlugin. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        unregisterPlugin(name:string): RESULT;
        /** 
         * Updates the Studio System. This should be called once per 'game' tick, 
         * or once per frame in your application.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        update(): RESULT;
    }

    export interface EventDescription {
        createInstance(instance:Outval<EventInstance>): RESULT;

        getID(id:Outval<GUID>): RESULT;

        getInstanceCount(count:Outval<number>): RESULT;

        getInstanceList(array:Outval<EventInstance[]>, capacity:number, count:Outval<number>): RESULT;

        /** Retrieves the length of the event's timeline in milliseconds
         * @param length Address of a variable to receive the timeline length in milliseconds. */
        getLength(length:Outval<number>): RESULT;

        getMaximumDistance(distance:Outval<number>): RESULT;

        getMinimumDistance(distance:Outval<number>): RESULT;

        getParameter(name:string, parameter:Outval<STUDIO_PARAMETER_DESCRIPTION>): RESULT;

        getParameterByIndex(index:number, parameter:Outval<STUDIO_PARAMETER_DESCRIPTION>): RESULT;

        getParameterCount(count:Outval<number>): RESULT;

        getPath(path:Outval<string>, size:number, retrived:Outval<number>): RESULT;
        
        getSampleLoadingState(state:Outval<STUDIO_LOADING_STATE>): RESULT;

        getSoundSize(size:Outval<number>): RESULT;

        getUserData(userdata:Outval<any>): RESULT;

        getUserProperty(name:string, property:Outval<STUDIO_USER_PROPERTY>): RESULT;

        getUserPropertyByIndex(index:number, property:Outval<STUDIO_USER_PROPERTY>): RESULT;

        getUserPropertyCount(count:Outval<number>): RESULT;

        hasCue(hasCue:Outval<boolean>): RESULT;

        is3D(is3D:Outval<boolean>): RESULT;

        isOneshot(isOneshot:Outval<boolean>): RESULT;

        isSnapshot(isSnapshot:Outval<boolean>): RESULT;

        isStream(isStream:Outval<boolean>): RESULT;
        /** You can use this function to preload sample data ahead of time so that events can be played immediately when required. */
        loadSampleData(): RESULT;

        releaseAllInstances(): RESULT;

        setCallback(callback:STUDIO_EVENT_CALLBACK, callbackmask:STUDIO_EVENT_CALLBACK_TYPE): RESULT;

        setUserData(userdata:any): RESULT;

        unloadSampleData(): RESULT;
    }

    export interface EventInstance {
        /** 
         * Retrieves the 3D position, velocity and orientation of the event instance 
         * @param attributes writes the value to attributes.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
        */
        get3DAttributes(attributes:Outval<_3D_ATTRIBUTES>): RESULT;
        /** 
         * Retrives the Low level ChannelGroup for the event instance 
         * @description Remarks: The retrieved ChannelGroup corresponds to the master track of the event instance.
         * @param group Address of a variable to receive the ChannelGroup. Writes value to group.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
        */
        getChannelGroup(group): RESULT;  
        /** 
         * Retrieves the EventDescription for the event instance 
         * @param description Address of a variable to receive the EventDescription object. Writes value to description.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
        */
        getDescription(description): RESULT;
        /** 
         * Get the mask of what listeners apply to this event instance 
         * @param mask Address of a variable to receive the mask. Writes value to mask.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
        */
        getListenerMask(mask:number): RESULT;
        /** 
         * Retrieves a parameter instance by name 
         * @param name Name of the parameter (case-insensitive).
         * @param parameter Address of a variable to receive the ParameterInstance object. Writes value to parameter.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
        */
        getParameter(name:string, parameter): RESULT;
        /** 
         * Retrieves a parameter instance by name 
         * @deprecated Please get and set parameter values using Studio.EventInstance.getParameterValue, setParameterValue, getParameterValueByIndex, setParameterValueByIndex
         * @param index Index the parameter (case-insensitive).
         * @param parameter Address of a variable to receive the ParameterInstance object. Writes value to parameter.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
        */
        getParameterByIndex(index:number, parameter): RESULT;
        /** 
         * Retrieves the number of parameters in the event instance.
         * @param count Address of a variable to receive the parameter count. Writes value to count.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getParameterCount(count:Outval<number>): RESULT;
        /** 
         * Gets a parameter instance value by name.
         * @param name Name of the parameter (case-insensitive)
         * @param valueOut Address of a variable to receive the value as set from the public API. Specify 0 or NULL to ignore. Writes a number to value.val
         * @param finalvalueOut Address of a variable to receive the final combined value. Specify 0 or NULL to ignore. Writes a number to finalvalue.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */        
        getParameterValue(name:string, valueOut:Outval<number>, finalvalueOut:Outval<number>): RESULT;
        /** 
         * Gets a parameter instance value by index.
         * @param index Index of the parameter. 
         * @param valueOut Address of a variable to receive the value as set from the public API. Specify 0 or NULL to ignore. Writes a number to value.val
         * @param finalvalueOut Address of a variable to receive the final combined value. Specify 0 or NULL to ignore. Writes a number to finalvalue.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getParameterValueByIndex(index:number, valueOut:Outval<number>, finalvalueOut:Outval<number>): RESULT;
        /** 
         * Retrieves the pause state of the event instance.
         * @param isPausedOut Address of a variable to receive the pause state. Writes a boolean to isPaused.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getPaused(isPausedOut:Outval<boolean>): RESULT;
        /** 
         * Retrieves the pitch multiplier set by the API on the event instance.
         * @param pitchOut Address of a variable to receive the pitch as set from the public API. Specify 0 or NULL to ignore. 
         * @param finalpitchOut Address of a variable to receive the final combined pitch. Specify 0 or NULL to ignore.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getPitch(pitchOut:Outval<number>, finalpitchOut:Outval<number>): RESULT;
        /** 
         * Retrieves the playback state of the event instance.
         * @param stateOut Address of a variable to receive the current playback state of the event instance. See FMOD_STUDIO_PLAYBACK_STATE. Writes value to state.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getPlaybackState(stateOut:Outval<STUDIO_PLAYBACK_STATE>): RESULT;
        /** 
         * Retrieves the value of a built-in event instance property.
         * @param index The index of the property to retrieve. 
         * @param valueOut Address of a variable to receive the property value. Writes value to value.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getProperty(index:number, valueOut:Outval<number>): RESULT;
        /** 
         * Retrieves the send level to a Low Level reverb instance.
         * @param index Index of the Low Level reverb instance to target, from 0 to 3. 
         * @param levelOut Address of a variable to receive the send level for the signal to the reverb, from 0 (none) to 1 (full). Writes value to level.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getReverbLevel(index:number, levelOut:Outval<number>): RESULT;
        /** 
         * Retrieves the position of the event instance's timeline playback cursor.
         * @param positionOut Address of a variable to receive the timeline position in milliseconds. Writes value to position.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getTimelinePosition(positionOut:Outval<number>): RESULT;
        /** Retrieves the user data that is set on the event instance.
         * @param userdata Address of a variable to receive the user data. Writes value to userdata.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getUserData(userdata:Outval<any>): RESULT;
        /** 
         * Retrieves the volume level of the event instance.
         * @param volumeOut Address of a variable to receive the volume as set from the public API. Specify 0 or NULL to ignore. Writes to volume.val 
         * @param finalvolumeOut Address of a variable to receive the final combined volume. Specify 0 or NULL to ignore. Writes to finalvolume.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getVolume(volumeOut:Outval<number>, finalvolumeOut:Outval<number>): RESULT;
        /** 
         * Retrieves the virtualization state of the event instance.
         * @param virtualStateOut Address of a variable to receive the virtualization state. Writes boolean to virtualState.val
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        isVirtual(virtualStateOut:Outval<boolean>): RESULT;
        /** 
         * Schedules the event instance to be destroyed when it stops.
         * @description Remarks: If the instance is already stopped when release is called, it will be destroyed after the next update.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        release(): RESULT;
        /** 
         * Sets the 3D position, velocity and orientation for the event instance.
         * @param attributes The 3D attributes to set. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        set3DAttributes(attributes:_3D_ATTRIBUTES): RESULT;
        /** 
         * Sets a user callback for the event instance.
         * @param callback Pointer to a callback function
         * @param callbackmask A bitfield specifying which callback types are required. Masking out some callback types can help avoid a flood of irrelevant callbacks being triggered. Defaults to FMOD_STUDIO_EVENT_CALLBACK_ALL. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setCallback(callback: STUDIO_EVENT_CALLBACK, callbackmask:STUDIO_EVENT_CALLBACK_TYPE): RESULT;
        /** 
         * Set the mask of what listeners apply to this event instance.
         * @param mask Mask of listeners that apply to this event instance. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setListenerMask(mask:number): RESULT;
        /** 
         * Sets a parameter instance value by name.
         * @param name Name of the parameter (case-insensitive)
         * @param value Value to set
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setParameterValue(name:string, value:number): RESULT;
        /** 
         * Sets a parameter instance value by index.
         * @param index Index of the parameter
         * @param value Value to set
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setParameterValueByIndex(index:number, value:number): RESULT;
        /** 
         * Sets multiple parameter instance values by index.
         * @description Remarks: If any index is an automatic parameter an error will return without setting the values of any parameters. If an index is set to -1, then its index and corresponding value will be ignored. Use getParameter to see indices.
         * @param indices Indices of the parameters. 
         * @param values Values to set. 
         * @param count Number of indices and values.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setParameterValuesByIndices(indices:number[], values:number[], count:number): RESULT;
        /** 
         * Sets the pause state of the event instance.
         * @param paused The desired pause state. true = pause, false = unpause. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setPaused(paused:boolean): RESULT;
        /** 
         * Sets the pitch multiplier for the event instance.
         * @param pitch The pitch multiplier. 1 = normal pitch. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setPitch(pitch:number): RESULT;
        /** 
         * Sets the value of a built-in event instance property.
         * @param index The index of the property to set. See FMOD_STUDIO_EVENT_PROPERTY
         * @param value The property value to set.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setProperty(index:number, value:number): RESULT;
        /** 
         * Sets the send level to a Low Level reverb instance.
         * @param index Index of the Low Level reverb instance to target, from 0 to 3.
         * @param level Send level for the signal to the reverb, from 0 (none) to 1 (full). Default = 0. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setReverbLevel(index:number, level:number): RESULT;
        /** 
         * Sets the position of the event instance's timeline playback cursor.
         * @param position Desired timeline position in milliseconds. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setTimelinePosition(position:number): RESULT;
        /** 
         * Sets arbitrary user data on the event instance.
         * @param userdata Address of user data to be stored within the event instance object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setUserData(userdata): RESULT;
        /** 
         * Sets the volume level of the event instance.
         * @param volume The volume as a linear gain. 0 = silent, 1 = full volume. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setVolume(volume:number): RESULT;
        /** Starts replay of the event instance.
         * @description Remarks: If the instance was already playing it will 
         * restart the event.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        start(): RESULT;
        /** 
         * Stops playback of the event instance.
         * @param mode The desired stop mode. See FMOD_STUDIO_STOP_MODE.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        stop(mode:STUDIO_STOP_MODE): RESULT;
        /** 
         * Triggers a cue on the event, which allows the timeline cursor to move past sustain points.
         * @description Triggering cues makes the timeline cursor continue past sustain points. The cue can be triggered ahead of time; for each time it is triggered, the timeline cursor will continue past one more sustain point.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        triggerCue(): RESULT;

    }

    export interface Bus {
        /**
         * Retrieves the Low Level ChannelGroup used by the bus.
         * @param channelgroup Address of a variable to receive a pointer to the Low Level ChannelGroup.
         */
        getChannelGroup(channelgroup:Outval<ChannelGroup>): RESULT;
        /**
         * Retrieves the ID of the bus.
         * @param id Address of a variable to receive the 128-bit GUID. 
         */
        getID(id:Outval<GUID>): RESULT;
        /**
         * Retrieves the mute state of the bus.
         * @param mute Address of a variable to receive the mute state. 
         */
        getMute(mute:Outval<boolean>): RESULT;
        /**
         * Retrieves the path of the bus.
         * @param path Address of a buffer to receive the path. Specify 0 or NULL to ignore. 
         * @param size Size of the path buffer in bytes. Required if path parameter is not NULL. 
         * @param retrieved Address of a variable to receive the size of the retrieved path in bytes, including the terminating null character. Optional. Specify 0 or NULL to ignore. 
         */
        getPath(path:Outval<string>, size:number, retrieved:Outval<number>): RESULT;
        /**
         * Retrieves the pause state of the bus.
         * @param isPaused Address of a variable to receive the pause state. 
         */
        getPaused(isPaused:Outval<boolean>): RESULT;
        /**
         * Retrieves the volume level of the bus.
         * @param volume Address of a variable to receive the volume as set from the public API. Specify 0 or NULL to ignore.
         * @param finalvolume Address of a variable to receive the final combined volume. Specify 0 or NULL to ignore. 
         */
        getVolume(volume:Outval<number>, finalvolume:Outval<number>): RESULT;
        /**
         * Locks the Low Level ChannelGroup used by the bus.
         */
        lockChannelGroup(): RESULT;
        /**
         * Sets the mute state of the bus.
         * @param mute The desired mute state. true = mute, false = unmute. 
         */
        setMute(mute:boolean): RESULT;
        /**
         * Sets the pause state of the bus.
         * @param paused The desired pause state. true = pause, false = unpause.
         */
        setPaused(paused:boolean): RESULT;
        /**
         * Sets the volume level of the bus.
         * @param volume The volume level to set as a linear gain. 0 = silent, 1 = full volume. 
         */
        setVolume(volume:number): RESULT;
        /**
         * Stops all EventInstances routed into the bus.
         * @param mode The desired stop mode. See FMOD_STUDIO_STOP_MODE. 
         */
        stopAllEvents(mode:STUDIO_STOP_MODE): RESULT;
        /**
         * Releases the Low Level ChannelGroup locked by Studio::Bus::lockChannelGroup.
         */
        unlockChannelGroup(): RESULT;
    }
    
    export interface ParameterInstance {
        /** 
         * Retrieves the description for the parameter
         * @param description Address of a variable to receive the parameter description. 
         */
        getDescription(description:Outval<STUDIO_PARAMETER_DESCRIPTION>): RESULT;
        /** 
         * Retrieves the value of the parameter 
         * @param value Address of a variable to receive the parameter value. 
        */
        getValue(value:Outval<number>): RESULT;
        /** 
         * Sets the value of the parameter 
         */
        setValue(value:number): RESULT;
    }

    export interface VCA {
        /** 
         * Retrieves the ID of the VCA.
         * @param id Address of a variable to receive the 128-bit GUID. 
         */
        getID (id:Outval<GUID>) : RESULT;
        /** 
         * Retrieves the path of the VCA.
         * @param path Address of a buffer to receive the path. Specify 0 or NULL to ignore.
         * @param size Size of the path buffer in bytes. Required if path parameter is not NULL. 
         * @param retrieved Address of a variable to receive the size of the retrieved path in bytes, 
         * including the terminating null character. Optional. Specify 0 or NULL to ignore. 
         */
        getPath (path:Outval<string>, size:number, retrieved:Outval<number>) : RESULT;
        /** 
         * Retrieves the volume level of the VCA 
         * @param volume Address of a variable to receive the volume as set from the public API. Specify 0 or NULL to ignore. 
         * @param finalvolume Address of a variable to receive the final combined volume. Specify 0 or NULL to ignore.
        */
        getVolume (volume:Outval<number>, finalvolume:Outval<number>) : RESULT;
        /** 
         * Sets the volume level of the VCA.
         * @param volume The volume level to set as a linear gain. 0 = silent, 1 = full volume.
         */
        getsetVolume (volume:number) : RESULT;
    }

    export interface Bank {
        /**
         * Retrieves the number of buses in the bank.
         * @param count Address of a variable to receive the number of buses.
         */
        getBusCount(count:Outval<number>): RESULT;
        /**
         * Retrieves the buses in the bank.
         * @param array An array of memory allocated by the user. 
         * @param capacity The capacity of the array passed in as the first parameter 
         * @param count Address of a variable to receive the number of buses written to the array 
         */
        getBusList(array:Outval<Bus[]>, capacity:number, count:Outval<number>): RESULT;
        /**
         * Retrieves the number of EventDescriptions in the bank.
         * @param count Address of a variable to receive the number of EventDescriptions. 
         */
        getEventCount(count:Outval<number>): RESULT;
        /**
         * Retrieves the EventDescriptions in the bank.
         * @param array An array of memory allocated by the user. 
         * @param capacity The capacity of the array passed in as the first parameter
         * @param count Address of a variable to receive the number of Event Descriptions written to the array 
         */
        getEventList(array:Outval<EventDescription[]>, capacity:number, count:Outval<number>): RESULT;
        /**
         * Retrieves the ID of the bank.
         * @param id Address of a variable to receive the ID. 
         */
        getID(id:Outval<GUID>): RESULT;
        /**
         * Retrieves the bank loading state.
         * @param state Address of a variable to receive the loading state. 
         */
        getLoadingState(state:Outval<STUDIO_LOADING_STATE>): RESULT;
        /**
         * Retrieves the path of the bank.
         * @param path Address of a buffer to receive the path. Specify 0 or NULL to ignore. 
         * @param size Size of the path buffer in bytes. Required if path parameter is not NULL. 
         * @param retrieved Address of a variable to receive the size of the retrieved path in bytes, including the terminating null character. Optional. Specify 0 or NULL to ignore. 
         */
        getPath(path:Outval<string>, size:number, retrieved:Outval<number>): RESULT;
        /**
         * Retrieves the sample data loading state of the bank.
         * @param state Address of a variable to receive the loading state. 
         */
        getSampleLoadingState(state:Outval<STUDIO_LOADING_STATE>): RESULT;
        /**
         * Retrieves the number of string table entries in the bank.
         * @param count Address of a variable to receive the number of string table entries. 
         */
        getStringCount(count:Outval<number>): RESULT;
        /**
         * Retrieves the string table entry for the given index.
         * @param index Index of string table entry to retrieve. 
         * @param id Address of a variable to receive the ID. Specify 0 or NULL to ignore.
         * @param path Address of a buffer to receive the path. Specify 0 or NULL to ignore. 
         * @param size Size of the path buffer in bytes. Required if path parameter is not NULL. 
         * @param retrieved Address of a variable to receive the size of the retrieved path in bytes, including the terminating null character. Optional. Specify 0 or NULL to ignore. 
         */
        getStringInfo(index:number, id:Outval<GUID>, path:Outval<string>, size:number, retrieved:Outval<number>): RESULT;
        /**
         * Retrieves the user data that is set on the bank.
         * @param userdata Address of a variable to receive the user data. 
         */
        getUserData(userdata:Outval<any>): RESULT;
        /**
         * Retrieves the number of VCAs in the bank.
         * @param count Address of a variable to receive the number of VCAs. 
         */
        getVCACount(count:Outval<number>): RESULT;
        /**
         * Retrieves the VCAs in the bank.
         * @param array An array of memory allocated by the user.
         * @param capacity The capacity of the array passed in as the first parameter 
         * @param count Address of a variable to receive the number of VCAs written to the array 
         */
        getVCAList(array:Outval<VCA[]>, capacity:number, count:Outval<number>): RESULT;
        /**
         * Loads all non-streaming sample data used by events in the bank.
         * @description You can use this function to preload sample data ahead of time so that events can be played immediately when required. Each time this function is called, it will increment the reference count, so the sample data will not be unloaded until Studio::Bank::unloadSampleData is called the same number of times. It is valid to mix calls to Studio::Bank::loadSampleData with calls to Studio::EventDescription::loadSampleData. If you do this, the sample data will be loaded when either reference count is non-zero, and will be unloaded when both reference counts go to zero.
         */
        loadSampleData(): RESULT;
        /**
         * Sets arbitrary user data on the bank.
         * @param userdata Address of user data to store within the event description object.
         */
        setUserData(userdata:any): RESULT;
        /**
         * Unloads the bank and all of its data.
         */
        unload(): RESULT;
        /**
         * Unloads all non-streaming sample data used by events in the bank.
         * @description Each time this function is called, it will decrement the reference count. If the reference count goes to zero, the sample data will be unloaded. Any sample data that is being used by event instances will not be unloaded until the event instances are released.
         */
        unloadSampleData(): RESULT;
    }


    export interface CommandReplay {
        getCommandAtTime(): RESULT;

        getCommandCount(): RESULT;

        getCommandInfo(): RESULT;

        getCommandString(): RESULT;

        getCurrentCommand(): RESULT;

        getLength(): RESULT;

        getPaused(): RESULT;

        getPlaybackState(): RESULT;

        getSystem(): RESULT;

        getUserData(): RESULT;

        release(): RESULT;

        seekToCommand(): RESULT;

        seekToTime(): RESULT;

        setBankPath(): RESULT;

        setCreateInstanceCallback(): RESULT;

        setFrameCallback(): RESULT;

        setLoadBankCallback(): RESULT;

        setPaused(): RESULT;

        setUserData(): RESULT;

        start(): RESULT;

        stop(): RESULT;
    }

    //#endregion Studio System Objects \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    
    // #region LOW LEVEL CALLBACKS //Fill in all parameters//Not sure about the types///////////////////////////////////////////////////////////////

    export interface _3D_ROLLOFF_CALLBACK {
        /**
         * @function
         * @param channel
         * @param distance
         */
        (channel:Channel, distance:number): void;
    }
    export interface CHANNELCONTROL_CALLBACK {
        (channel, controltype, callbacktype, commanddata1, commanddata2): void;
    }
    export interface CODEC_CLOSE_CALLBACK {
        (codec_state): void;
    }
    export interface CODEC_GETLENGTH_CALLBACK {
        (codec_state, length, lengthtype): void;
    }
    export interface CODEC_GETPOSITION_CALLBACK {
        (codec_state, position, postype): void;
    }
    export interface CODEC_METADATA_CALLBACK {
        (codec_state, type, name, data, datalen, datatype, unique): void;
    }
    export interface CODEC_OPEN_CALLBACK {
        (codec_state, usermode, userexinfo): void;
    }
    export interface CODEC_READ_CALLBACK {
        (codec_state, buffer, samples_in, samples_out): void;
    }
    export interface CODEC_SETPOSITION_CALLBACK {
        (codec_state, subsound, position, postype): void;
    }
    export interface CODEC_SOUNDCREATE_CALLBACK {
        (codec_state, subsound, sound): void;
    }
    export interface DEBUG_CALLBACK {
        (flags:DEBUG_FLAGS, file:string, line:number, func:string, message:string): void;
    }
    export interface DSP_CREATE_CALLBACK {
        (dsp_state:DSP_STATE): void;
    }
    export interface DSP_DIALOG_CALLBACK {
        (dsp_state:DSP_STATE, hwnd, show:number): void;
    }
    export interface DSP_GETPARAM_BOOL_CALLBACK {
        (dsp_state:DSP_STATE, index:number, value:boolean, valuestr:string): void;
    }
    export interface DSP_GETPARAM_DATA_CALLBACK {
        (dsp_state:DSP_STATE, index:number, value, length:number, valuestr:string): void;
    }
    export interface DSP_GETPARAM_FLOAT_CALLBACK {
        (dsp_state:DSP_STATE, index:Outval<number>, value:Outval<number>, valuestr:Outval<string>): void;
    }
    export interface DSP_GETPARAM_INT_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_PROCESS_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_READ_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_RELEASE_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_RESET_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SETPARAM_BOOL_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SETPARAM_DATA_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SETPARAM_FLOAT_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SETPARAM_INT_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SETPOSITION_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SHOULDIPROCESS_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SYSTEM_DEREGISTER_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SYSTEM_MIX_CALLBACK {
        (callbackdata): void;
    }
    export interface DSP_SYSTEM_REGISTER_CALLBACK {
        (callbackdata): void;
    }
    export interface FILE_ASYNCCANCEL_CALLBACK {
        (callbackdata): void;
    }
    export interface FILE_ASYNCDONE_FUNC {
        (callbackdata): void;
    }
    export interface FILE_ASYNCREAD_CALLBACK {
        (callbackdata): void;
    }
    export interface FILE_CLOSE_CALLBACK {
        (callbackdata): void;
    }
    export interface FILE_OPEN_CALLBACK {
        (callbackdata): void;
    }
    export interface FILE_READ_CALLBACK {
        (callbackdata): void;
    }
    export interface FILE_SEEK_CALLBACK {
        (callbackdata): void;
    }
    export interface MEMORY_ALLOC_CALLBACK {
        (callbackdata): void;
    }
    export interface MEMORY_FREE_CALLBACK {
        (callbackdata): void;
    }
    export interface MEMORY_REALLOC_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_CLOSE_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_GETDRIVERINFO_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_GETHANDLE_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_GETNUMDRIVERS_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_GETPOSITION_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_INIT_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_LOCK_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_MIXER_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_OBJECT3DALLOC_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_OBJECT3DFREE_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_OBJECT3DGETINFO_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_OBJECT3DUPDATE_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_READFROMMIXER {
        (callbackdata): void;
    }
    export interface OUTPUT_START_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_STOP_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_UNLOCK_CALLBACK {
        (callbackdata): void;
    }
    export interface OUTPUT_UPDATE_CALLBACK {
        (callbackdata): void;
    }
    export interface SOUND_NONBLOCK_CALLBACK {
        (callbackdata): void;
    }
    export interface SOUND_PCMREAD_CALLBACK {
        (callbackdata): void;
    }
    export interface SOUND_PCMSETPOS_CALLBACK {
        (callbackdata): void;
    }
    export interface SYSTEM_CALLBACK {
        (callbackdata): void;
    }


    // #endregion LOW LEVEL CALLBACKS

    //#region LOW LEVEL DEFINES //Complete///////////////////////////////////////////////////////////////////////////////////////////

    /** These are bitfields to describe for a certain number of channels in a signal, which channels are being represented.
     * @description For example, a signal could be 1 channel, but contain the LFE channel only. */
    export enum CHANNELMASK {
        CHANNELMASK_FRONT_LEFT = 0x00000001,
        CHANNELMASK_FRONT_RIGHT = 0x00000002,
        CHANNELMASK_FRONT_CENTER = 0x00000004,
        CHANNELMASK_LOW_FREQUENCY = 0x00000008,
        CHANNELMASK_SURROUND_LEFT = 0x00000010,
        CHANNELMASK_SURROUND_RIGHT = 0x00000020,
        CHANNELMASK_BACK_LEFT = 0x00000040,
        CHANNELMASK_BACK_RIGHT = 0x00000080,
        CHANNELMASK_BACK_CENTER = 0x00000100,
        CHANNELMASK_MONO = CHANNELMASK_FRONT_LEFT,
        CHANNELMASK_STEREO = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT,
        CHANNELMASK_LRC = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT | CHANNELMASK_FRONT_CENTER,
        CHANNELMASK_QUAD = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT | CHANNELMASK_SURROUND_LEFT | CHANNELMASK_SURROUND_RIGHT,
        CHANNELMASK_SURROUND = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT | CHANNELMASK_FRONT_CENTER | CHANNELMASK_SURROUND_LEFT | CHANNELMASK_SURROUND_RIGHT,
        CHANNELMASK_5POINT1 = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT | CHANNELMASK_FRONT_CENTER | CHANNELMASK_LOW_FREQUENCY | CHANNELMASK_SURROUND_LEFT | CHANNELMASK_SURROUND_RIGHT,
        CHANNELMASK_5POINT1_REARS = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT | CHANNELMASK_FRONT_CENTER | CHANNELMASK_LOW_FREQUENCY | CHANNELMASK_BACK_LEFT | CHANNELMASK_BACK_RIGHT,
        CHANNELMASK_7POINT0 = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT | CHANNELMASK_FRONT_CENTER | CHANNELMASK_SURROUND_LEFT | CHANNELMASK_SURROUND_RIGHT | CHANNELMASK_BACK_LEFT | CHANNELMASK_BACK_RIGHT,
        CHANNELMASK_7POINT1 = CHANNELMASK_FRONT_LEFT | CHANNELMASK_FRONT_RIGHT | CHANNELMASK_FRONT_CENTER | CHANNELMASK_LOW_FREQUENCY | CHANNELMASK_SURROUND_LEFT | CHANNELMASK_SURROUND_RIGHT | CHANNELMASK_BACK_LEFT | CHANNELMASK_BACK_RIGHT
    }

    /** 
     * Specify the requested information to be output when using the logging version of FMOD. 
    */
    export enum DEBUG_FLAGS {
        /** Disable all messages */
        LEVEL_NONE = 0x00000000,
        /** Enable only error messages */
        LEVEL_ERROR = 0x00000001,
        /** Enable warning and error messages */
        LEVEL_WARNING = 0x00000002,
        /** Enable informational, warning and error messages (default) */
        LEVEL_LOG = 0x00000004,
        /** Verbose logging for memory operations. 
         * Only use this if you are debugging a memory related issue */
        TYPE_MEMORY = 0x00000100,
        /** Verbose logging for file access, only use this if you are
         * debugging a file related issue.  */
        TYPE_FILE = 0x00000200,
        /** Verbose logging for codec initialization.
         * Only use this if you are debugging a codec related issue. */
        TYPE_CODEC = 0x00000400,
        /** Verbose logging for internal errors, use this for tracking
         * the origin of error codes.  */
        TYPE_TRACE = 0x00000800,
        /** Display the time stamp of the log message in milliseconds */
        DISPLAY_TIMESTAMPS = 0x00010000,
        /** Display the source code file and line number for where the message originated */
        DISPLAY_LINENUMBERS = 0x00020000,
        /** Display the thread ID of the calling function that generated the message */
        DISPLAY_THREAD = 0x00040000
    }

    /** Version number of FMOD_CODEC_WAVEFORMAT structure. 
     * @description Should be set into FMOD_CODEC_STATE in the FMOD_CODEC_OPEN_CALLBACK.
     * Use this for binary compatibility and for future expansion. */
    export const CODEC_WAVEFORMAT_VERSION = 3;

    /** Flags that provide additional information about a particular driver */
    export enum DRIVER_STATE {
        CONNECTED = 1,
        DEFAULT = 2
    }

    /** Length in bytes of the buffer pointed to by the valuestr argument of FMOD_DSP_GETPARAM_XXXX_CALLBACK functions. DSP plugins should not copy more than this number of bytes into the buffer or memory corruption will occur. */
    export const DSP_GETPARAM_VALUESTR_LENGTH = 32;

    /** Initialization flags. Use them with System::init in the flags parameter to change various behavior. Use System::setAdvancedSettings to adjust settings for some of the features that are enabled by these flags. */
    export enum INITFLAGS {
        /** Initialize normally */
        NORMAL = 0,
        /** No stream thread is created internally. Streams are driven from System.update. Mainly used with non-realtime outputs. */
        STREAM_FROM_UPDATE = 1,
        /** No mixer thread is created internally. Mixing is driven from System.update. Only applies to polling based output modes such as FMOD_OUTPUTTYPE_NOSOUND,  FMOD_OUTPUTTYPE_WAVWRITER, FMOD_OUTPUTTYPE_DSOUND, FMOD_OUTPUTTYPE_WINMM, FMOD_OUTPUTTYPE_XAUDIO. */
        MIX_FROM_UPDATE = 2,
        /** 3D calculations will be performed in right-handed coordinates. */
        _3D_RIGHTHANDED = 4,
        /** Enables usage of Channel::setLowPassGain, Channel::set3DOcclusion, or automatic usage by the Geometry API. All voices will add a software lowpass filter effect into the DSP chain which is idle unless one of the previous functions/features are used. */
        CHANNEL_LOWPASS = 256,
        /** All FMOD_3D based voices will add a software lowpass and highpass filter effect into the DSP chain which will act as a distance-automated bandpass filter. Use System::setAdvancedSettings to adjust the center frequency. */
        CHANNEL_DISTANCEFILTER = 512,
        /** Enable TCP/IP based host which allows FMOD Designer or FMOD Profiler to connect to it, and view memory, CPU and the DSP network graph in real-time. */
        PROFILE_ENABLE = 65536,
        /** Any sounds that are 0 volume will go virtual and not be processed except for having their positions updated virtually. Use System::setAdvancedSettings to adjust what volume besides zero to switch to virtual at. */
        VOL0_BECOMES_VIRTUAL = 131072,
        /** With the geometry engine, only process the closest polygon rather than accumulating all polygons the sound to listener line intersects. (Feature removed in HTML5) */
        GEOMETRY_USECLOSEST = 262144,
        /** When using FMOD_SPEAKERMODE_5POINT1 with a stereo output device, use the Dolby Pro Logic II downmix algorithm instead of the SRS Circle Surround algorithm.  */
        PREFER_DOLBY_DOWNMIX = 524288,
        /** Disables thread safety for API calls. Only use this if FMOD low level is
         * being called from a single thread, and if Studio API is not being used! */
        THREAD_UNSAFE = 1048576,
        /** Slower, but adds level metering for every single DSP unit in the graph.
         *  Use DSP::setMeteringEnabled to turn meters off individually. */
        PROFILE_METER_ALL = 2097152 
    }
    
    /** The maximum number of channels per frame of audio supported by audio files, buffers, 
     * connections and DSPs. */
    export const MAX_CHANNEL_WIDTH = 32;

    /** The maximum number of listeners supported */
    export const MAX_LISTENERS = 8;

    /** The maximum number of FMOD::System objects allowed */
    export const MAX_SYSTEMS = 8;

    /** Bit fields for memory allocation type being passed into FMOD memory callbacks.
     * @description Remember this is a bitfield. You may get more than 1 bit set (ie physical + persistent) so do not simply switch on the types! You must check each bit individually or clear out the bits that you do not want within the callback. Bits can be excluded if you want during Memory_Initialize so that you never get them. */
    export enum MEMORY_TYPE {
        /** Standard memory. */
        MEMORY_NORMAL = 0x00000000,
        /** Stream file buffer, size controllable with System::setStreamBufferSize. */
        MEMORY_STREAM_FILE = 0x00000001,
        /** Stream decode buffer, size controllable with 
         * FMOD_CREATESOUNDEXINFO::decodebuffersize. */
        MEMORY_STREAM_DECODE = 0x00000002,
        /** Sample data buffer. Raw audio data, usually PCM/MPEG/ADPCM/XMA data */
        MEMORY_SAMPLEDATA = 0x00000004,
        /** DSP memory block allocated when more than 1 output exists on a DSP node. */
        MEMORY_DSP_BUFFER = 0x00000008,
        /** Memory allocated by a third party plugin. */
        MEMORY_PLUGIN = 0x00000010,
        /** Requires XPhysicalAlloc / XPhysicalFree.  */
        MEMORY_XBOX360_PHYSICAL = 0x00100000,
        /** Persistent memory. Memory will be freed when System::release is called. */
        MEMORY_PERSISTENT = 0x00200000,
        /** Secondary memory. Allocation should be in secondary memory. 
         * For example RSX on the PS3.  */
        MEMORY_SECONDARY = 0x00400000,
        MEMORY_ALL = 0xFFFFFFFF
    }

    /** Sound description bitfields, bitwise OR them together for loading and describing sounds.
     * @description By default a sound will open as a static sound that is decompressed fully into memory to PCM. (ie equivalent of FMOD_CREATESAMPLE) To have a sound stream instead, use FMOD_CREATESTREAM, or use the wrapper function System::createStream. Some opening modes (ie FMOD_OPENUSER, FMOD_OPENMEMORY, FMOD_OPENMEMORY_POINT, FMOD_OPENRAW) will need extra information. This can be provided using the FMOD_CREATESOUNDEXINFO structure. Specifying FMOD_OPENMEMORY_POINT will POINT to your memory rather allocating its own sound buffers and duplicating it internally. This means you cannot free the memory while FMOD is using it, until after Sound::release is called. With FMOD_OPENMEMORY_POINT, for PCM formats, only WAV, FSB, and RAW are supported. For compressed formats, only those formats supported by FMOD_CREATECOMPRESSEDSAMPLE are supported. With FMOD_OPENMEMORY_POINT and FMOD_OPENRAW or PCM, if using them together, note that you must pad the data on each side by 16 bytes. This is so fmod can modify the ends of the data for looping/interpolation/mixing purposes. If a wav file, you will need to insert silence, and then reset loop points to stop the playback from playing that silence. Xbox 360 memory On Xbox 360 Specifying FMOD_OPENMEMORY_POINT to a virtual memory address will cause FMOD_ERR_INVALID_ADDRESS to be returned. Use physical memory only for this functionality. FMOD_LOWMEM is used on a sound if you want to minimize the memory overhead, by having FMOD not allocate memory for certain features that are not likely to be used in a game environment. These are : 1. Sound::getName functionality is removed. 256 bytes per sound is saved
     */
    export enum MODE {
        /** Default for all modes listed below. FMOD_LOOP_OFF, FMOD_2D, FMOD_3D_WORLDRELATIVE, 
         * FMOD_3D_INVERSEROLLOFF  */
        DEFAULT = 0,
        /** For non looping sounds. (DEFAULT). Overrides FMOD_LOOP_NORMAL / FMOD_LOOP_BIDI */
        LOOP_OFF = 1,
        /** For forward looping sounds */
        LOOP_NORMAL = 2,
        /** For bidirectional sounds. (only works on software mixed static sounds). */
        LOOP_BIDI = 4,
        /** Ignores any 3D processing. (DEFAULT) */
        _2D = 8,
        /** Makes the sound positionable in 3D. Overrides FMOD_2D */
        _3D = 16,
        /** Decompress at runtime, streaming from the source provided (ie from disk)  
         * Overrides FMOD_CREATESAMPLE and FMOD_CREATECOMPRESSEDSAMPLE. 
         * Note a stream can only be played once at a time due to a stream only having 
         * 1 stream buffer and file handle. Open multiple streams to have them play concurrently. */
        CREATESTREAM = 128,
        /** Decompress at loadtime, decompressing or decoding whole file into memory as the 
         * target sample format (ie PCM). Fastest for playback and most flexible.  */
        CREATESAMPLE = 256,
        /** Load MP2/MP3/FADPCM/IMAADPCM/Vorbis/AT9 or XMA into memory and leave it compressed. 
         * Vorbis/AT9/FADPCM encoding only supported in the .FSB container format. 
         * During playback the FMOD software mixer will decode it in realtime as a 'compressed sample'. 
         * Overrides FMOD_CREATESAMPLE. If the sound data is not one of the supported formats, 
         * it will behave as if it was created with FMOD_CREATESAMPLE and decode the sound into PCM. */
        CREATECOMPRESSEDSAMPLE = 512,
        /** Opens a user created static sample or stream. 
         * Use FMOD_CREATESOUNDEXINFO to specify format, defaultfrequency, numchannels, 
         * and optionally a read callback. If a user created 'sample' is created with no read 
         * callback, the sample will be empty. Use Sound::lock and Sound::unlock to place sound 
         * data into the sound if this is the case. */
        OPENUSER = 1024,
        /** "name_or_data" will be interpreted as a pointer to memory instead of filename for 
         * creating sounds. Use FMOD_CREATESOUNDEXINFO to specify length. If used with 
         * FMOD_CREATESAMPLE or FMOD_CREATECOMPRESSEDSAMPLE, FMOD duplicates the memory into its 
         * own buffers. Your own buffer can be freed after open. If used with FMOD_CREATESTREAM, 
         * FMOD will stream out of the buffer whose pointer you passed in. In this case, your own 
         * buffer should not be freed until you have finished with and released the stream. */
        OPENMEMORY = 2048,
        /** "name_or_data" will be interpreted as a pointer to memory instead of filename for 
         * creating sounds. Use FMOD_CREATESOUNDEXINFO to specify length. This differs to 
         * FMOD_OPENMEMORY in that it uses the memory as is, without duplicating the memory 
         * into its own buffers. Cannot be freed after open, only after Sound::release. 
         * Will not work if the data is compressed and FMOD_CREATECOMPRESSEDSAMPLE is not used.  */
        OPENMEMORY_POINT = 268435456,
        /** Will ignore file format and treat as raw pcm. Use FMOD_CREATESOUNDEXINFO to 
         * specify format. Requires at least defaultfrequency, numchannels and format to be 
         * specified before it will open. Must be little endian data.  */
        OPENRAW = 4096,
        /** Just open the file, dont prebuffer or read. Good for fast opens for info, 
         * or when sound::readData is to be used.  */
        OPENONLY = 8192,
        /** For System::createSound - for accurate Sound::getLength/Channel::setPosition 
         * on VBR MP3, and MOD/S3M/XM/IT/MIDI files. Scans file first, so takes longer to open. 
         * FMOD_OPENONLY does not affect this.  */
        ACCURATETIME = 16384,
        /** For corrupted / bad MP3 files. This will search all the way through the file until 
         * it hits a valid MPEG header. Normally only searches for 4k.  */
        MPEGSEARCH = 32768,
        /** For opening sounds and getting streamed subsounds (seeking) asyncronously. 
         * Use Sound::getOpenState to poll the state of the sound as it opens or retrieves the 
         * subsound in the background. */
        NONBLOCKING = 65536,
        /** Unique sound, can only be played one at a time */
        UNIQUE = 131072,
        /** Make the sound's position, velocity and orientation relative to the listener. */
        _3D_HEADRELATIVE = 262144,
        /** Make the sound's position, velocity and orientation absolute 
         * (relative to the world). (DEFAULT)  */
        _3D_WORLDRELATIVE = 524288,
        /** This sound will follow the inverse rolloff model where mindistance = full volume, 
         * maxdistance = where sound stops attenuating, and rolloff is fixed according to the 
         * global rolloff factor. (DEFAULT) */
        _3D_INVERSEROLLOFF = 1048576,
        /** This sound will follow a linear rolloff model where mindistance = full volume, 
         * maxdistance = silence. */
        _3D_LINEARROLLOFF = 2097152,
        /** This sound will follow a linear-square rolloff model where mindistance = full volume, 
         * maxdistance = silence. */
        _3D_LINEARSQUAREROLLOFF = 4194304,
        /** This sound will follow the inverse rolloff model at distances close to mindistance 
         * and a linear-square rolloff close to maxdistance. */
        _3D_INVERSETAPEREDROLLOFF = 8388608,
        /** This sound will follow a rolloff model defined by Sound::set3DCustomRolloff / 
         * Channel::set3DCustomRolloff.  */
        _3D_CUSTOMROLLOFF = 67108864,
        /** This sound is not affect by geometry occlusion. If not specified in Sound::setMode, 
         * or Channel::setMode, the flag is cleared and it is affected by geometry again.  */
        _3D_IGNOREGEOMETRY = 1073741824,
        /** Skips id3v2/asf/etc tag checks when opening a sound, to reduce seek/read 
         * overhead when opening files (helps with CD performance).  */
        IGNORETAGS = 33554432,
        /** Removes some features from samples to give a lower memory overhead, 
         * like Sound::getName. See remarks.  */
        LOWMEM = 134217728,
        /** Load sound into the secondary RAM of supported platform. 
         * On PS3, sounds will be loaded into RSX/VRAM.  */
        LOADSECONDARYRAM = 536870912,
        /** For sounds that start virtual (due to being quiet or low importance), 
         * instead of swapping back to audible, and playing at the correct offset according to time, 
         * this flag makes the sound play from the start. */
        VIRTUAL_PLAYFROMSTART = 2147483648
    }

    export enum PORT_INDEX {
        NONE = 0xFFFFFFFFFFFFFFFF
    }

    export const REVERB_MAXINSTANCES = 4;

    /** Sets of predefined reverb properties, create your own or redefine these examples */
    export namespace REVERB_PRESETS {
        export const OFF: REVERB_PROPERTIES = { 
            DecayTime: 1000, 
            EarlyDelay: 7, 
            LateDelay: 11, 
            HFReference: 5000, 
            HFDecayRatio: 100, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 20, 
            EarlyLateMix: 96, 
            WetLevel: -80.0 
        };
        export const GENERIC: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 7, 
            LateDelay: 11, 
            HFReference: 5000, 
            HFDecayRatio: 83, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 14500, 
            EarlyLateMix: 96, 
            WetLevel: -8.0 
        };
        export const PADDEDCALL: REVERB_PROPERTIES = { 
            DecayTime: 170, 
            EarlyDelay: 1, 
            LateDelay: 2, 
            HFReference: 5000, 
            HFDecayRatio: 10, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 160, 
            EarlyLateMix: 84, 
            WetLevel: -7.8 
        };
        export const ROOM: REVERB_PROPERTIES = { 
            DecayTime: 400, 
            EarlyDelay: 2, 
            LateDelay: 3, 
            HFReference: 5000, 
            HFDecayRatio: 83, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 6050, 
            EarlyLateMix: 88, 
            WetLevel: -9.4 
        };
        export const BATHROOM: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 7, 
            LateDelay: 11, 
            HFReference: 5000, 
            HFDecayRatio: 54, 
            Diffusion: 100, 
            Density: 60, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 2900, 
            EarlyLateMix: 83, 
            WetLevel: 0.5
        };
        export const LIVINGROOM: REVERB_PROPERTIES = { 
            DecayTime: 500, 
            EarlyDelay: 3, 
            LateDelay: 4, 
            HFReference: 5000, 
            HFDecayRatio: 10, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 160, 
            EarlyLateMix: 58, 
            WetLevel: -19.0 
        };
        export const STONEROOM: REVERB_PROPERTIES = { 
            DecayTime: 2300, 
            EarlyDelay: 12, 
            LateDelay: 17, 
            HFReference: 5000, 
            HFDecayRatio: 64, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 7800, 
            EarlyLateMix: 71, 
            WetLevel: -8.5 
        };
        export const AUDITORIUM: REVERB_PROPERTIES = { 
            DecayTime: 4300, 
            EarlyDelay:20, 
            LateDelay: 30, 
            HFReference: 5000, 
            HFDecayRatio: 59, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 5850, 
            EarlyLateMix: 64, 
            WetLevel: -11.7 
        };
        export const CONCERTHALL: REVERB_PROPERTIES = { 
            DecayTime: 3900, 
            EarlyDelay: 20, 
            LateDelay: 29, 
            HFReference: 5000, 
            HFDecayRatio: 70, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 5650, 
            EarlyLateMix: 80, 
            WetLevel: -9.8 
        };
        export const CAVE: REVERB_PROPERTIES = { 
            DecayTime: 2900, 
            EarlyDelay: 15, 
            LateDelay: 22, 
            HFReference: 5000, 
            HFDecayRatio: 100, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 20000, 
            EarlyLateMix: 59, 
            WetLevel: -11.3 
        };
        export const HANGAR: REVERB_PROPERTIES = { 
            DecayTime: 10000, 
            EarlyDelay: 20, 
            LateDelay: 30, 
            HFReference: 5000, 
            HFDecayRatio: 23, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 3400, 
            EarlyLateMix: 72, 
            WetLevel: -7.4 
        };
        export const CARPETTEDHALLWAY: REVERB_PROPERTIES = { 
            DecayTime: 300, 
            EarlyDelay: 2, 
            LateDelay: 30, 
            HFReference: 5000, 
            HFDecayRatio: 10, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 500, 
            EarlyLateMix: 56, 
            WetLevel: -24.0 
        };
        export const HALLWAY: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 7, 
            LateDelay: 11, 
            HFReference: 5000, 
            HFDecayRatio: 59, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 7800, 
            EarlyLateMix: 87, 
            WetLevel: -5.5 
        };
        export const STONECORRIDOR: REVERB_PROPERTIES = { 
            DecayTime: 270, 
            EarlyDelay: 13, 
            LateDelay: 20, 
            HFReference: 5000, 
            HFDecayRatio: 79, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 9000, 
            EarlyLateMix: 86, 
            WetLevel: -6.0 
        };
        export const ALLEY: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 7, 
            LateDelay: 11, 
            HFReference: 5000, 
            HFDecayRatio: 86, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 8300, 
            EarlyLateMix: 80, 
            WetLevel: -9.8 
        };
        export const FOREST: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 162, 
            LateDelay: 88, 
            HFReference: 5000, 
            HFDecayRatio: 54, 
            Diffusion: 79, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 760, 
            EarlyLateMix: 94, 
            WetLevel: -12.3 
        };
        export const CITY: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 7, 
            LateDelay: 11, 
            HFReference: 5000, 
            HFDecayRatio: 67, 
            Diffusion: 50, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 4050, 
            EarlyLateMix: 66, 
            WetLevel: -26.0 
        };
        export const MOUNTAINS: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 300, 
            LateDelay: 100, 
            HFReference: 5000, 
            HFDecayRatio: 21, 
            Diffusion: 27, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 1220, 
            EarlyLateMix: 82, 
            WetLevel: -24.0 
        };
        export const QUARRY: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 61, 
            LateDelay: 25, 
            HFReference: 5000, 
            HFDecayRatio: 83, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 3400, 
            EarlyLateMix: 100, 
            WetLevel: -5.0 
        };
        export const PLAIN: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 179, 
            LateDelay: 100, 
            HFReference: 5000, 
            HFDecayRatio: 50, 
            Diffusion: 21, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 1670, 
            EarlyLateMix: 65, 
            WetLevel: -28.0 
        };
        export const PARKINGLOT: REVERB_PROPERTIES = { 
            DecayTime: 1700, 
            EarlyDelay: 8, 
            LateDelay: 12, 
            HFReference: 5000, 
            HFDecayRatio: 100, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 20000, 
            EarlyLateMix: 56, 
            WetLevel: -19.5 
        };
        export const SEWERPIPE: REVERB_PROPERTIES = { 
            DecayTime: 2800, 
            EarlyDelay: 14, 
            LateDelay: 21, 
            HFReference: 5000, 
            HFDecayRatio: 14, 
            Diffusion: 80, 
            Density: 60, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 3400, 
            EarlyLateMix: 66, 
            WetLevel: 1.2 
        };
        export const UNDERWATER: REVERB_PROPERTIES = { 
            DecayTime: 1500, 
            EarlyDelay: 7, 
            LateDelay: 11, 
            HFReference: 5000, 
            HFDecayRatio: 10, 
            Diffusion: 100, 
            Density: 100, 
            LowShelfFrequency: 250, 
            LowShelfGain: 0, 
            HighCut: 500, 
            EarlyLateMix: 92, 
            WetLevel: 7.0
        };
    }

    /** These callback types are used with System::setCallback. */
    export enum SYSTEM_CALLBACK_TYPE {
        DEVICELISTCHANGED = 0x00000001,
        DEVICELOST = 0x00000002,
        MEMORYALLOCATIONFAILED = 0x00000004,
        THREADCREATED = 0x00000008,
        BADDSPCONNECTION = 0x00000010,
        PREMIX = 0x00000020,
        POSTMIX = 0x00000040,
        ERROR = 0x00000080,
        MIDMIX = 0x00000100,
        THREADDESTROYED = 0x00000200,
        PREUPDATE = 0x00000400,
        POSTUPDATE = 0x00000800,
        RECORDLISTCHANGED = 0x00001000,
        ALL = 0xFFFFFFFF
    }

    /** List of time types that can be returned by Sound::getLength and used with 
     * Channel::setPosition or Channel::getPosition. */
    export enum TIMEUNIT {
        MS = 0x00000001,
        PCM = 0x00000002,
        PCMBYTES = 0x00000004,
        RAWBYTES = 0x00000008,
        PCMFRACTION = 0x00000010,
        MODORDER = 0x00000100,
        MODROW = 0x00000200,
        MODPATTERN = 0x00000400,
    }
 
    // #endregion LOW LEVEL SYSTEM DEFINES

    // #region LOW LEVEL SYSTEM STRUCTURES //Needs to be Typed//////////////////////////////////////////////////////////////////////////

    export interface _3D_ATTRIBUTES {
        position:VECTOR,
        velocity:VECTOR,
        forward:VECTOR,
        up: VECTOR
    }

    /** Settings for advanced features like configuring memory and cpu usage for the 
     * FMOD_CREATECOMPRESSEDSAMPLE feature. */
    export interface ADVANCEDSETTINGS {
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_CREATECOMPRESSEDSAMPLE only. MPEG codecs consume 22,216 bytes per instance and this number will determine how many MPEG channels can be played simultaneously. Default = 32.  */
        maxMPEGCodecs:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_CREATECOMPRESSEDSAMPLE only. ADPCM codecs consume 2,480 bytes per instance and this number will determine how many ADPCM channels can be played simultaneously. Default = 32.  */
        maxADPCMCodecs:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_CREATECOMPRESSEDSAMPLE only. XMA codecs consume 6,263 bytes per instance and this number will determine how many XMA channels can be played simultaneously. Default = 32.  */
        maxXMACodecs:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_CREATECOMPRESSEDSAMPLE only. Vorbis codecs consume 16,512 bytes per instance and this number will determine how many Vorbis channels can be played simultaneously. Default = 32.  */
        maxVorbisCodecs:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_CREATECOMPRESSEDSAMPLE only. AT9 codecs consume 20,664 bytes per instance and this number will determine how many AT9 channels can be played simultaneously. Default = 32.  */
        maxAT9Codecs:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_CREATECOMPRESSEDSAMPLE only. FADPCM codecs consume 2,232 bytes per instance and this number will determine how many FADPCM channels can be played simultaneously. Default = 32.  */
        maxFADPCMCodecs:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with PS3 only. PCM codecs consume 2,536 bytes per instance and this number will determine how many streams and PCM voices can be played simultaneously. Default = 32.  */
        maxPCMCodecs:number,
        /** [r/w] Optional. Specify 0 to ignore. Number of channels available on the ASIO device.  */
        ASIONumChannels:number,
        /** [r/w] Unsupported. Deprecated API feature. */
        HRTFMinAngle:number,
        /** [r/w] Unsupported. Deprecated API feature. */
        HRTFMaxAngle:number,
        /** [r/w] Unsupported. Deprecated API feature. */
        HRTFFreq:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_INIT_VOL0_BECOMES_VIRTUAL. If this flag is used, and the volume is below this, then the sound will become virtual. Use this value to raise the threshold to a different point where a sound goes virtual.  */
        vol0virtualvol:number,
        /** [r/w] Optional. Specify 0 to ignore. For streams. This determines the default size of the double buffer (in milliseconds) that a stream uses. Default = 400ms  */
        defaultDecodeBufferSize:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_INIT_PROFILE_ENABLE. Specify the port to listen on for connections by the profiler application.  */
        profilePort:number,
        /** [r/w] Optional. Specify 0 to ignore. The maximum time in miliseconds it takes for a channel to fade to the new level when its occlusion changes.  */
        geometryMaxFadeTime:number,
        /** [r/w] Optional. Specify 0 to ignore. For use with FMOD_INIT_CHANNEL_DISTANCEFILTER. The default center frequency in Hz for the distance filtering effect. Default = 1500.0.  */
        distanceFilterCenterFreq:number,
        /** [r/w] Optional. Specify 0 to ignore. Out of 0 to 3, 3d reverb spheres will create a phyical reverb unit on this instance slot. See FMOD_REVERB_PROPERTIES.  */
        reverb3Dinstance:number,
        /** [r/w] Optional. Specify 0 to ignore. Number of buffers in DSP buffer pool. Each buffer will be DSPBlockSize * sizeof(float) * SpeakerModeChannelCount. ie 7.1 @ 1024 DSP block size = 8 * 1024 * 4 = 32kb. Default = 8.  */
        DSPBufferPoolSize:number,
        /** [r/w] Optional. Specify 0 to ignore. Specify the stack size for the FMOD Stream thread in bytes. Useful for custom codecs that use excess stack. Default 49,152 (48kb)  */
        stackSizeStream:number,
        /** [r/w] Optional. Specify 0 to ignore. Specify the stack size for the FMOD_NONBLOCKING loading thread. Useful for custom codecs that use excess stack. Default 65,536 (64kb)  */
        stackSizeNonBlocking:number,
        /** [r/w] Optional. Specify 0 to ignore. Specify the stack size for the FMOD mixer thread. Useful for custom dsps that use excess stack. Default 49,152 (48kb)  */
        stackSizeMixer:number,
        /** [r/w] Optional. Specify 0 to ignore. Resampling method used with fmod's software mixer. See FMOD_DSP_RESAMPLER for details on methods.  */
        resamplerMethod:DSP_RESAMPLER,
        /** [r/w] Optional. Specify 0 to ignore. Specify the command queue size for thread safe processing. Default 2048 (2kb) */
        commandQueueSize:number,
        /** [r/w] Optional. Specify 0 to ignore. Seed value that FMOD will use to initialize its internal random number generators.  */
        randomSeed:number
    }

    /** NOT COMPATIBLE WITH HTML5 */
    export interface ASYNCREADINFO {
        /** [r] The file handle that was filled out in the open callback.  */
        handle:any,
        /** [r] Seek position, make sure you read from this file offset. */
        offset:number,
        /** [r] how many bytes requested for read.  */
        sizebytes:number,
        /** [r] 0 = low importance. 100 = extremely important (ie 'must read now or stuttering may occur')  */
        priority:number,
        /** [r/w] User data pointer specific to this request. Initially 0, can be ignored or set by the user. Not related to the file's main userdata member.  */
        userdata:any,
        /** [w] Buffer to read file data into.  */
        buffer:any,
        /**[w] Fill this in before setting result code to tell FMOD how many bytes were read.   */
        bytesread:number,
        /** [r] FMOD file system wake up function. Call this when user file read is finished. Pass result of file read as a parameter.  */
        done:FILE_ASYNCDONE_FUNC,      
    }

    /** When creating a codec, declare one of these and provide the relevant callbacks 
     * and name for FMOD to use when it opens and reads a file. */
    export interface CODEC_DESCRIPTION {
        name:string,
        version:number,
        defaultasstream:number,
        timeunits:TIMEUNIT,
        open,
        close,
        read,
        getlength,
        setposition,
        getposition,
        soundcreate,
        getwaveformat   
    }

    /** Codec plugin structure that is passed into each callback.
     * @description Optionally set the numsubsounds and waveformat members when called in 
     * FMOD_CODEC_OPEN_CALLBACK to tell fmod what sort of sound to create. */
    export interface CODEC_STATE {
        numsubsounds:number,
        plugindata,
        filehandle,
        filesize:number,
        fileread,
        fileseek,
        metadata,
        waveformatversion:number,
      
    }

    /** Set these values marked to tell fmod what sort of sound to create when the codec open callback is called.
     * @description The format, channels, frequency and lengthpcm tell FMOD what sort of sound buffer to create 
     * when you initialize your code. If you wrote an MP3 codec that decoded to stereo 16bit integer PCM for a 
     * 44khz sound, you would specify FMOD_SOUND_FORMAT_PCM16, and channels would be equal to 2, and frequency 
     * would be 44100. */
    export interface CODEC_WAVEFORAT {
        /** [w] Name of sound. Optional. If used, the codec must own the lifetime of the string memory until the codec is destroyed.  */
        name:string,
        /** [w] Format for (decompressed) codec output, ie FMOD_SOUND_FORMAT_PCM8, FMOD_SOUND_FORMAT_PCM16. Mandantory - Must be supplied.  */
        format:SOUND_FORMAT,
        /** [w] Number of channels used by codec, ie mono = 1, stereo = 2. Mandantory - Must be supplied.  */
        channels:number,
        /** [w] Default frequency in hz of the codec, ie 44100. Mandantory - Must be supplied.  */
        frequency:number,
        /** [w] Length in bytes of the source data. Used for FMOD_TIMEUNIT_RAWBYTES. Optional. Default = 0.  */
        lengthbytes:number,
        /** [w] Length in decompressed, PCM samples of the file, ie length in seconds * frequency. Used for Sound::getLength and for memory allocation of static decompressed sample data. Mandantory - Must be supplied.  */
        lengthpcm:number,
        /** [w] Minimum, optimal number of decompressed PCM samples codec can handle. 0 or 1 = no buffering. Anything higher means FMOD will allocate a PCM buffer of this size to read in chunks. The codec read callback will be called in multiples of this value. Optional. */
        pcmblocksize:number,
        /** [w] Loopstart in decompressed, PCM samples of file. Optional. Default = 0. */
        loopstart:number,
        /** [w] Loopend in decompressed, PCM samples of file. Optional. Default = 0. */
        loopend:number,
        /** [w] Mode to determine whether the sound should by default load as looping, non looping, 2d or 3d. Optional. Default = FMOD_DEFAULT.  */
        mode:MODE,
        /** [w] Defined channel order type, to describe where each sound channel should pan for the number of channels specified. See fmod_common.h. Optional. Leave at 0 to play in default speaker order.  */
        channelmask:CHANNELMASK,
        /** [w] Defined channel order type, to describe where each sound channel should pan for the number of channels specified. See fmod_common.h. Optional. Leave at 0 to play in default speaker order.  */
        channelorder:CHANNELORDER,
        /** [w] Peak volume of sound. Optional. Default = 0 if not used.  */
        peakvolume:number,
    }

    /** Complex number structure used for holding FFT frequency domain-data for FMOD_FFTREAL 
     * and FMOD_IFFTREAL DSP functions. */
    export interface COMPLEX {
        real:number,
        imag:number
    }

    /** Used in specifying extended info in Low Level Sound creation
     * Use FMOD.CREATESOUNDEXINFO() to instantiate a new structure.
     * Make sure to set it to this interface */
    export interface CREATESOUNDEXINFO {
        length:number; //unsigned int
        fileoffset:number; //unsigned int
        numchannels:number; //int
        defaultfrequency:number; //int
        format; //FMOD_SOUND_FORMAT type
        decodebuffersize:number; //unsigned int
        initialsubsound:number; //int
        numsubsounds:number; //int
        inclusionlistnum:number; //int
        pcmreadcallback; //FMOD_SOUND_PCMREAD_CALLBACK type
        pcmsetposcallback; //FMOD_SOUND_PCMSETPOS_CALLBACK type
        nonblockcallback; //FMOD_SOUND_NONBLOCK_CALLBACK
        dlsname:string;
        encryptionkey:string;
        maxpolyphony:number;
        userdata; //void
        suggestedsoundtype; //FMOD_SOUND_TYPE type
        fileuseropen; //FMOD_FILE_OPEN_CALLBACK
        fileuserclose; //FMOD_FILE_CLOSE_CALLBACK
        fileuserread; //FMOD_FILE_READ_CALLBACK
        fileuserseek; //FMOD_FILE_SEEK_CALLBACK
        fileuserasyncread; //FMOD_FILE_ASYNCREAD_CALLBACK
        fileuserasynccancel; //FMOD_FILE_ASYNCCANCEL_CALLBACK
        fileuserdata; //void
        filebuffersize:number; //int
        channelorder; //FMOD_CHANNELORDER
        channelmask:CHANNELMASK; //FMOD_CHANNELMASK
        initialsubsoundgroup; //FMOD_SOUNDGROUP
        initialseekposition:number; //unsigned int
        initialseekpostype:TIMEUNIT; //FMOD_TIMEUNIT
        ignoresetfilesystem:number; //int
        audioqueuepolicy:number; //unsigned int
        minmidigranularity:number; //unsigned int
        nonblockthreadid:number; //int
    }
    
    /** Structure for FMOD_DSP_PROCESS_CALLBACK input and output buffers. */
    export interface DSP_BUFFER_ARRAY {
        numbuffers:number,
        speakermode
    }

    /** When creating a DSP unit, declare one of these and provide the relevant callbacks and name for 
     * FMOD to use when it creates and uses a DSP unit of this type. */
    export interface DSP_DESCRIPTION {
        pluginsdkversion:number,
        name:string,
        version:number,
        numinputbuffers:number,
        numoutputbuffers:number,
        create,
        release,
        reset,
        read,
        process,
        setposition,
        numparameters:number,
        setparameterfloat,
        setparameterint,
        setparameterbool,
        setparameterdata,
        getparameterfloat,
        getparameterint,
        getparameterbool,
        getparameterdata,
        shouldiprocess,
        userdata,
        sys_register,
        sys_deregister,
        sys_mix    
    }

    /** DSP metering info used for retrieving metering info with DSP::getMeteringInfo */
    export interface DSP_METERING_INFO {
        numsamples:number,
        peaklevel:number[], //32 length limit
        rmslevel:number[],
        numchannels:number
    }

    export interface DSP_PARAMETER_3DATTRIBUTES {
        relative:_3D_ATTRIBUTES,
        absolute:_3D_ATTRIBUTES
    }

    export interface DSP_PARAMETER_3DATTRIBUTES_MULTI {
        numlisteners:number;
    }

    export interface DSP_PARAMETER_DESC {
        type;
        name;
        label;
        description;    
    }

    export interface DSP_PARAMETER_DESC_BOOL {
        defaultval;
    }

    export interface DSP_PARAMETER_DESC_DATA {
        datatype;
    }

    export interface DSP_PARAMETER_DESC_FLOAT {
        min;
        max;
        defaultval;
    }

    export interface DSP_PARAMETER_DESC_INT {
        min;
        max;
        defaultval;
        goestoinf; 
    }

    export interface DSP_PARAMETER_FFT {
        length;
        numchannels;
    }

    export interface DSP_PARAMETER_FLOAT_MAPPING {
        type;
    }

    export interface DSP_PARAMETER_FLOAT_MAPPING_PIECEWISE_LINEAR {
        numpoints;
    }

    export interface DSP_PARAMETER_OVERALLGAIN {
        linear_gain;
        linear_gain_additive;      
    }

    export interface DSP_PARAMETER_SIDECHAIN {
        sidechainenable;
    }

    export interface DSP_STATE {
        plugindata;
        channelmask;
        source_speakermode;
        sidechainchannels;
        systemobject;      
    }

    export interface DSP_STATE_DFT_FUNCTIONS {
        fftreal;
        inversefftreal;
    }

    export interface DSP_STATE_FUNCTIONS {
        alloc;
        realloc;
        free;
        getsamplerate;
        getblocksize;
        dft;
        pan;
        getspeakermode;
        getclock;
        getlistenerattributes;
        log;
        getuserdata;
    }

    export interface DSP_STATE_PAN_FUNCTIONS {
        summonomatrix;
        sumstereomatrix;
        sumsurroundmatrix;
        summonotosurroundmatrix;
        sumstereotosurroundmatrix;
        getrolloffgain;
    }

    export interface ERRORCALLBACK_INFO {
        result:RESULT;
        instancetype:ERRORCALLBACK_INSTANCETYPE;
        instance:any;
        functionname:string;
        functionparams:string;
    }

    export interface GUID {
        /** Specifies the first 8 hexadecimal digits of the GUID  */
        Data1:number,
        /** Specifies the first group of 4 hexadecimal digits.  */
        Data2:number,
        /** Specifies the second group of 4 hexadecimal digits. */
        Data3:number,
        /** Array of 8 bytes. The first 2 bytes contain the third group of 4 hexadecimal digits. 
         * The remaining 6 bytes contain the final 12 hexadecimal digits.  */
        Data4:number[]
    }


    export interface OUTPUT_DESCRIPTION {
        apiversion;
        name;
        version;
        polling;
        getnumdrivers;
        getdriverinfo;
        init;
        start;
        stop;
        close;
        update;
        gethandle;
        getposition;
        lock;
        unlock;
        mixer;
        object3dgetinfo;
        object3dalloc;
        object3dfree;
        object3dupdate;
        openport;
        closeport;      
    }

    export interface OUTPUT_OBJECT3DINFO {
        bufferlength;
        gain;
        spread;
        priority;
    }

    export interface OUTPUT_STATE {
        plugindata
    }

    export interface PLUGINLIST {
        type;
        description;
    }

    /** Structure defining a reverb environment.
     * @description In the documentation, each property description follows: \[r/w\] = read/write, <min> <max> <default> <description>
     * Not all fields are currently supported or may not work as expected at this time. 
     * To initialize an new instance in javascript use "FMOD.REVERB_PROPERTIES()", no 'new' keyword 
     * is required. */
    export interface REVERB_PROPERTIES {
        /** [r/w] 0.0 20000.0 1500.0 Reverberation decay time (ms) */
        DecayTime:number,
        /** [r/w] 0.0 300.0 7.0 Initial reflection delay time (ms)  */
        EarlyDelay:number,
        /** [r/w] 0.0 100 11.0 Late reverberation delay time relative to initial reflection (ms) */
        LateDelay:number,
        /** r/w] 20.0 20000.0 5000 Reference high frequency (Hz) */
        HFReference:number,
        /** [r/w] 10.0 100.0 50.0 High-frequency to mid-frequency decay time ratio (%)  */
        HFDecayRatio:number,
        /** [r/w] 0.0 100.0 100.0 Value that controls the echo density in the late reverberation decay (%) */
        Diffusion:number,
        /** [r/w] 0.0 100.0 100.0 Value that controls the modal density in the late reverberation decay (%)  */
        Density:number,
        /** [r/w] 20.0 1000.0 250.0 Reference low frequency (Hz) */
        LowShelfFrequency:number,
        /** [r/w] -36.0 12.0 0.0 Relative room effect level at low frequencies (dB) */
        LowShelfGain:number,
        /** [r/w] 20.0 20000.0 20000.0 Relative room effect level at high frequencies (Hz)  */
        HighCut:number,
        /** [r/w] 0.0 100.0 50.0 Early reflections level relative to room effect (%) */
        EarlyLateMix:number,
        /** [r/w] -80.0 20.0 -6.0 Room effect level at mid frequencies (dB) */
        WetLevel:number
    }

    export interface TAG {
        type;
        datatype;
        data;
        datalen;
        updated;
    }

    export interface VECTOR {
        x:number,
        y:number,
        z:number
    }

// #endregion LOW LEVEL SYSTEM STRUCTURES

    // #region LOW LEVEL SYSTEM ENUMERATIONS ///////////////////////////////////////////////////////////////////////////////////////
    /** These callback types are used with Channel::setCallback. */
    export enum CHANNELCONTROL_CALLBACK_TYPE {
        END,
        VIRTUALVOICE,
        SYNCPOINT,
        OCCLUSION,
        MAX,
        FORCEINT 
    }

    /** These enums denote special types of node within a DSP chain. */
    export enum CHANNELCONTROL_DSP_INDEX {
        HEAD,
        FADER,
        TAIL,
        INDEX,
        FORCEINT
    }

    /** Used to distinguish if a FMOD_CHANNELCONTROL parameter is actually a channel 
     * or a channelgroup. */
    export enum CHANNELCONTROL_TYPE {
        CHANNEL,
        CHANNELGROUP,
        FORCEINT
    }

    /** When creating a multichannel sound, FMOD will pan them to their default speaker
     * locations, for example a 6 channel sound will default to one channel per 5.1 output
     * speaker. Another example is a stereo sound. It will default to left = front left, right = front right. */
    export enum CHANNELORDER {
        DEFAULT,
        WAVEFORMAT,
        PROTOOLS,
        ALLMONO,
        ALLSTEREO,
        ALSA,
        MAX,
        FORCEINT
    }

    /** Specify the destination of log output when using the logging version of FMOD. */
    export enum DEBUG_MODE {
        /** Default log location per platform, i.e. Visual Studio output window, stderr, LogCat, etc. */
        TTY,
        /** Write log to specified file path */
        FILE,
        /** Call specified callback with log information */
        CALLBACK,
        FORCEINT
    }

    /** List of connection types between 2 DSP nodes. */
    export enum DSPCONNECTION_TYPE {
        STANDARD,
        SIDECHAIN,
        SEND,
        SEND_SIDECHAIN,
        MAX,
        FORCEINT
    }

    /** Parameter types for the FMOD_DSP_TYPE_CHANNELMIX filter. */
    export enum DSP_CHANNELMIX {
        OUTPUTGROUPING,
        GAIN_CH0,
        GAIN_CH1,
        GAIN_CH2,
        GAIN_CH3,
        GAIN_CH4,
        GAIN_CH5,
        GAIN_CH6,
        GAIN_CH7,
        GAIN_CH8,
        GAIN_CH9,
        GAIN_CH10,
        GAIN_CH11,
        GAIN_CH12,
        GAIN_CH13,
        GAIN_CH14,
        GAIN_CH15,
        GAIN_CH16,
        GAIN_CH17,
        GAIN_CH18,
        GAIN_CH19,
        GAIN_CH20,
        GAIN_CH21,
        GAIN_CH22,
        GAIN_CH23,
        GAIN_CH24,
        GAIN_CH25,
        GAIN_CH26,
        GAIN_CH27,
        GAIN_CH28,
        GAIN_CH29,
        GAIN_CH30,
        GAIN_CH31
    }

    /** Parameter types for the FMOD_DSP_CHANNELMIX_OUTPUTGROUPING parameter for
     * FMOD_DSP_TYPE_CHANNELMIX effect. */
    export enum DSP_CHANNELMIX_OUTPUT {
        DEFAULT,
        ALLMONO,
        ALLSTEREO,
        ALLQUAD,
        ALL5POINT1,
        ALL7POINT1,
        ALLFE
    }

    /** Parameter types for the FMOD_DSP_TYPE_CHORUS filter. */
    export enum DSP_CHORUS {
        MIX,
        RATE,
        DEPTH
    }

    /** Parameter types for the FMOD_DSP_TYPE_COMPRESSOR unit. 
     * This is a multichannel software limiter that is uniform across the whole spectrum. */
    export enum DSP_COMPRESSOR {
        THRESHOLD,
        RATIO,
        ATTACK,
        RELEASE,
        GAINMAKEUP,
        USESIDECHAIN,
        LINKED
    }

    /** Parameter types for the FMOD_DSP_TYPE_CONVOLUTIONREVERB filter. */
    export enum DSP_CONVOLUTION_REVERB {
        PARAM_IR,
        PARAM_WET,
        PARAM_DRY,
        PARAM_LINKED
    }

    /** Parameter types for the FMOD_DSP_TYPE_DELAY filter. */
    export enum DSP_DELAY {
        CH0,
        CH1,
        CH2,
        CH3,
        CH4,
        CH5,
        CH6,
        CH7,
        CH8,
        CH9,
        CH10,
        CH11,
        CH12,
        CH13,
        CH14,
        CH15,
        MAXDELAY  
    }

    /** Parameter types for the FMOD_DSP_TYPE_DISTORTION filter. */ 
    export enum DSP_DISTORTION {
        LEVEL
    }

    /** Parameter types for the FMOD_DSP_TYPE_ECHO filter. */
    export enum DSP_ECHO {
        DELAY,
        FEEDBACK,
        DRYLEVEL,
        WETLEVEL,
        FORCEINT
    }

    /** Parameter types for the FMOD_DSP_TYPE_ENVELOPEFOLLOWER unit. 
     * This is a simple envelope follower for tracking the signal level.
     * @deprecated */
    export enum DSP_EVELOPEFOLLOWER {
        ATTACK,
        RELEASE,
        ENVELOPE,
        USESIDECHAIN         
    }

    /** Parameter types for the FMOD_DSP_TYPE_FADER filter. */
    export enum DSP_FADER {
        GAIN,
        OVERALL_GAIN    
    }

    /** Parameter types for the FMOD_DSP_TYPE_FFT dsp effect. */
    export enum DSP_FFT {
        WINDOWSIZE,
        WINDOWTYPE,
        SPECTRUMDATA,
        DOMINANT_FREQ     
    }

    /** List of windowing methods for the FMOD_DSP_TYPE_FFT unit. 
     * Used in spectrum analysis to reduce leakage / transient signals
     * intefering with the analysis. 
     * @description This is a problem with analysis of continuous signals that 
     * only have a small portion of the signal sample (the fft window size).
     * Windowing the signal with a curve or triangle tapers the sides of the fft window 
     * to help alleviate this problem. */
    export enum DSP_FFT_WINDOW {
        RECT,
        TRIANGLE,
        HAMMING,
        HANNING,
        BLACKMAN,
        BLACKMANHARRIS 
    }

    /** Parameter types for the FMOD_DSP_TYPE_FLANGE filter. */
    export enum DSP_FLANGE {
        MIX,
        DEPTH,
        RATE
    }

    /** Parameter types for the FMOD_DSP_TYPE_HIGHPASS filter. */
    export enum DSP_HIGHPASS {
        CUTOFF,
        RESONANCE
    }

    /** Parameter types for the FMOD_DSP_TYPE_HIGHPASS_SIMPLE filter. */
    export enum DSP_HIGHPASS_SIMPLE {
        CUTOFF
    }

    /** Parameter types for the FMOD_DSP_TYPE_ITECHO filter.
     * @description This is effectively a software based echo filter that
     * emulates the DirectX DMO echo effect. Impulse tracker files can support
     *  this, and FMOD will produce the effect on ANY platform, not just those
     *  that support DirectX effects! */
    export enum DSP_ITECHO {
        WETDRYMIX,
        FEEDBACK,
        LEFTDELAY,
        RIGHTDELAY,
        PANDELAY
    }
    
    /** Parameter types for the FMOD_DSP_TYPE_ITLOWPASS filter. 
     * @description This is different to the default FMOD_DSP_TYPE_ITLOWPASS
     *  filter in that it uses a different quality algorithm and is the filter
     *  used to produce the correct sounding playback in .IT files. FMOD Studio's .IT
     *  playback uses this filter. */
    export enum DSP_ITLOWPASS {
        CUTOFF,
        RESONANCE   
    }

    /** Parameter types for the FMOD_DSP_TYPE_LIMITER filter. */
    export enum DSP_LIMITER {
        RELEASETIME,
        CEILING,
        MAXIMIZERGAIN,
        MODE
    }

    /** Parameter types for the FMOD_DSP_TYPE_LOWPASS filter. */
    export enum DSP_LOWPASS {
        CUTOFF,
        RESONANCE     
    }

    /** Parameter types for the FMOD_DSP_TYPE_LOWPASS_SIMPLE filter. */
    export enum DSP_LOWPASS_SIMPLE {
        CUTOFF
    }

    /** Parameter types for the FMOD_DSP_TYPE_MULTIBAND_EQ filter. */
    export enum DSP_MULTIBAND_EQ {
        A_FILTER,
        A_FREQUENCY,
        A_Q,
        A_GAIN,
        B_FILTER,
        B_FREQUENCY,
        B_Q,
        B_GAIN,
        C_FILTER,
        C_FREQUENCY,
        C_Q,
        C_GAIN,
        D_FILTER,
        D_FREQUENCY,
        D_Q,
        D_GAIN,
        E_FILTER,
        E_FREQUENCY,
        E_Q,
        E_GAIN    
    }

    /** Filter types for FMOD_DSP_MULTIBAND_EQ. */
    export enum DSP_MULTIBAND_EQ_FILTER_TYPE {
        DISABLED,
        LOWPASS_12DB,
        LOWPASS_24DB,
        LOWPASS_48DB,
        HIGHPASS_12DB,
        HIGHPASS_24DB,
        HIGHPASS_48DB,
        LOWSHELF,
        HIGHSHELF,
        PEAKING,
        BANDPASS,
        NOTCH,
        ALLPASS      
    }

    /** Parameter types for the FMOD_DSP_TYPE_NORMALIZE filter. */
    export enum DSP_NORMALIZE {
        FADETIME,
        THRESHHOLD,
        MAXAMP     
    }

    /** Parameter types for the FMOD_DSP_TYPE_OBJECTPAN DSP. 
     * @description 3D Object panners are meant for hardware 3d object systems
     *  like Dolby Atmos or Sony Morpheus. These object panners take input in,
     *  and send it to the 7.1 bed, but do not send the signal further down the
     *  DSP chain (the output of the dsp is silence). */
    export enum DSP_OBJECTPAN {
        _3D_POSITION,
        _3D_ROLLOFF,
        _3D_MIN_DISTANCE,
        _3D_MAX_DISTANCE,
        _3D_EXTENT_MODE,
        _3D_SOUND_SIZE,
        _3D_MIN_EXTENT,
        OVERALL_GAIN,
        OUTPUTGAIN   
    }

    /** Parameter types for the FMOD_DSP_TYPE_OSCILLATOR filter. */
    export enum DSP_OSCILLATOR {
        TYPE,
        RATE  
    }

    /** Parameter types for the FMOD_DSP_TYPE_PAN DSP. */
    export enum DSP_PAN {
        MODE,
        _2D_STEREO_POSITION,
        _2D_DIRECTION,
        _2D_EXTENT,
        _2D_ROTATION,
        _2D_LFE_LEVEL,
        _2D_STEREO_MODE,
        _2D_STEREO_SEPARATION,
        _2D_STEREO_AXIS,
        ENABLED_SPEAKERS,
        _3D_POSITION,
        _3D_ROLLOFF,
        _3D_MIN_DISTANCE,
        _3D_MAX_DISTANCE,
        _3D_EXTENT_MODE,
        _3D_SOUND_SIZE,
        _3D_MIN_EXTENT,
        _3D_PAN_BLEND,
        LFE_UPMIX_ENABLED,
        OVERALL_GAIN,
        SURROUND_SPEAKER_MODE,
        _2D_HEIGHT_BLEND     
    }

    /** Parameter values for the FMOD_DSP_PAN_2D_STEREO_MODE parameter
     *  of the FMOD_DSP_TYPE_PAN DSP. */
    export enum DSP_PAN_2D_STEREO_MODE_TYPE {
        DISTRIBUTED,
        DISCRETE     
    }

    /** Parameter values for the FMOD_DSP_PAN_3D_EXTENT_MODE parameter
     * of the FMOD_DSP_TYPE_PAN DSP */
    export enum DSP_PAN_3D_EXTENT_MODE_TYPE {
        AUTO,
        USER,
        OFF   
    }

    /** Parameter values for the FMOD_DSP_PAN_3D_ROLLOFF parameter of
     * the FMOD_DSP_TYPE_PAN DSP. */
    export enum DSP_PAN_3D_ROLLOFF_TYPE {
        LINEARSQUARED,
        LINEAR,
        INVERSE,
        INVERSETAPERED,
        CUSTOM
    }

    /** Parameter values for the FMOD_DSP_PAN_MODE parameter of the 
     * FMOD_DSP_TYPE_PAN DSP. */
    export enum DSP_PAN_MODE_TYPE {
        MONO,
        STEREO,
        SURROUND    
    }

    /** Flags for the FMOD_DSP_PAN_SUMSURROUNDMATRIX_FUNC function. */
    export enum DSP_PAN_SURROUND_FLAGS {
        DEFAULT,
        ROTATION_NOT_BIASED
    }

    /** Parameter types for the FMOD_DSP_TYPE_PARAMEQ filter. */
    export enum DSP_PARAMEQ {
        CENTER,
        BANDWIDTH,
        GAIN
    }

    /** Built-in types for the 'datatype' member of FMOD_DSP_PARAMETER_DESC_DATA. 
     * Data parameters of type other than FMOD_DSP_PARAMETER_DATA_TYPE_USER will be 
     * treated specially by the system. */
    export enum DSP_PARAMETER_DATA_TYPE {
        USER,
        OVERALLGAIN,
        _3DATTRIBUTES,
        SIDECHAIN,
        FFT,
        _3DATTRIBUTES_MULTI      
    }

    /** DSP float parameter mappings. These determine how values are mapped across 
     * dials and automation curves. */
    export enum DSP_PARAMETER_FLOAT_MAPPING_TYPE {
        LINEAR,
        AUTO,
        PIECEWISE_LINEAR     
    }

    /** DSP parameter types */
    export enum DSP_PARAMETER_TYPE {
        FLOAT,
        INT,
        BOOL,
        DATA,
        MAX   
    }

    /** Parameter types for the FMOD_DSP_TYPE_PITCHSHIFT filter */
    export enum DSP_PITCHSHIFT {
        PITCH,
        FFTSIZE,
        OVERLAP,
        MAXCHANNELS      
    }

    /** Operation type for FMOD_DSP_PROCESS_CALLBACK. */
    export enum DSP_PROCESS_OPERATION {
        PERFORM,
        QUERY 
    }

    /** List of interpolation types that the FMOD Studio software mixer supports. */
    export enum DSP_RESAMPLER {
        DEFAULT,
        NOINTERP,
        LINEAR,
        CUBIC,
        SPLINE,
        MAX 
    }

    /** Parameter types for the FMOD_DSP_TYPE_RETURN */
    export enum DSP_RETURN {
        ID,
        INPUT_SPEAKER_MODE  
    }

    /** Parameter types for the FMOD_DSP_TYPE_SEND DSP. */
    export enum DSP_SEND {
        RETURNID,
        LEVEL
    }

    /** Parameter types for the FMOD_DSP_TYPE_SFXREVERB unit. */
    export enum DSP_SFXREVERB {
        DECAYTIME,
        EARLYDELAY,
        LATEDELAY,
        HFREFERENCE,
        HFDECAYRATIO,
        DIFFUSION,
        DENSITY,
        LOWSHELFFREQUENCY,
        LOWSHELFGAIN,
        HIGHCUT,
        EARLYLATEMIX,
        WETLEVEL,
        DRYLEVEL 
    }

    /** Parameter types for the FMOD_DSP_TYPE_THREE_EQ filter. */
    export enum DSP_THREE_EQ {
        LOWGAIN,
        MIDGAIN,
        HIGHGAIN,
        LOWCROSSOVER,
        HIGHCROSSOVER,
        CROSSOVERSLOPE
    }

    /** Parameter values for the FMOD_DSP_THREE_EQ_CROSSOVERSLOPE parameter 
     * of the FMOD_DSP_TYPE_THREE_EQ DSP. */
    export enum DSP_THREE_EQ_CROSSOVERSLOPE_TYPE {
        _12DB,
        _24DB,
        _48DB
    }

    /** Parameter types for the FMOD_DSP_TYPE_TRANSCEIVER filter */
    export enum DSP_TRANSCEIVER {
        TRANSMIT,
        GAIN,
        CHANNEL,
        TRANSMITSPEAKERMODE
    }

    /** Parameter types for the FMOD_DSP_TRANSCEIVER_SPEAKERMODE parameter for 
     * FMOD_DSP_TYPE_TRANSCEIVER effect. */
    export enum DSP_TRANSCEIVER_SPEAKERMODE {
        AUTO,
        MONO,
        STEREO,
        SURROUND
    }

    /** Parameter types for the FMOD_DSP_TYPE_TREMOLO filter. */
    export enum DSP_TREMOLO {
        FREQUENCY,
        DEPTH,
        SHAPE,
        SKEW,
        DUTY,
        SQUARE,
        PHASE,
        SPREAD
    }
    /** These definitions can be used for creating FMOD defined special effects 
     * or DSP units. */
    export enum DSP_TYPE {
        UNKNOWN,
        MIXER,
        OSCILLATOR,
        LOWPASS,
        ITLOWPASS,
        HIGHPASS,
        ECHO,
        FADER,
        FLANGE,
        DISTORTION,
        NORMALIZE,
        LIMITER,
        PARAMEQ,
        PITCHSHIFT,
        CHORUS,
        VSTPLUGIN,
        WINAMPPLUGIN,
        ITECHO,
        COMPRESSOR,
        SFXREVERB,
        LOWPASS_SIMPLE,
        DELAY,
        TREMOLO,
        LADSPAPLUGIN,
        SEND,
        RETURN,
        HIGHPASS_SIMPLE,
        PAN,
        THREE_EQ,
        FFT,
        LOUDNESS_METER,
        ENVELOPEFOLLOWER,
        CONVOLUTIONREVERB,
        CHANNELMIX,
        TRANSCEIVER,
        OBJECTPAN,
        MULTIBAND_EQ,
        MAX 
    }
    
    /** Used to distinguish the instance type passed into FMOD_ERROR_CALLBACK */
    export enum ERRORCALLBACK_INSTANCETYPE {
        NONE,
        SYSTEM,
        CHANNEL,
        CHANNELGROUP,
        CHANNELCONTROL,
        SOUND,
        SOUNDGROUP,
        DSP,
        DSPCONNECTION,
        GEOMETRY,
        REVERB3D,
        STUDIO_SYSTEM,
        STUDIO_EVENTDESCRIPTION,
        STUDIO_EVENTINSTANCE,
        STUDIO_PARAMETERINSTANCE,
        STUDIO_BUS,
        STUDIO_VCA,
        STUDIO_BANK,
        STUDIO_COMMANDREPLAY
    }

    /** These values describe what state a sound is in after FMOD_NONBLOCKING
     *  has been used to open it. */
    export enum OPENSTATE {
        READY,
        LOADING,
        ERROR,
        CONNECTING,
        BUFFERING,
        SEEKING,
        PLAYING,
        SETPOSITION,
        MAX
    }

    /** These output types are used with System::setOutput / System::getOutput, 
     * to choose which output method to use. */
    export enum OUTPUTTYPE {
        AUTODETECT,
        UNKNOWN,
        NOSOUND,
        WAVWRITER,
        NOSOUND_NRT,
        WAVWRITER_NRT,
        DSOUND,
        WINMM,
        WASAPI,
        ASIO,
        PULSEAUDIO,
        ALSA,
        COREAUDIO,
        XAUDIO,
        PS3,
        AUDIOTRACK,
        OPENSL,
        WIIU,
        AUDIOOUT,
        AUDIO3D,
        ATMOS,
        WEBAUDIO,
        NNAUDIO,
        WINSONIC,
        MAX
    }

    /** These are plugin types defined for use with the System::getNumPlugins, 
     * System::getPluginInfo and System::unloadPlugin functions. */
    export enum PLUGINTYPE {
        OUTPUT,
        CODEC,
        DSP,
        MAX 
    }
 
    /** Error codes. Returned from every function. */
    export enum RESULT {
        OK,
        ERR_BADCOMMAND,
        ERR_CHANNEL_ALLOC,
        ERR_CHANNEL_STOLEN,
        ERR_DMA,
        ERR_DSP_CONNECTION,
        ERR_DSP_DONTPROCESS,
        ERR_DSP_FORMAT,
        ERR_DSP_INUSE,
        ERR_DSP_NOTFOUND,
        ERR_DSP_RESERVED,
        ERR_DSP_SILENCE,
        ERR_DSP_TYPE,
        ERR_FILE_BAD,
        ERR_FILE_COULDNOTSEEK,
        ERR_FILE_DISKEJECTED,
        ERR_FILE_EOF,
        ERR_FILE_ENDOFDATA,
        ERR_FILE_NOTFOUND,
        ERR_FORMAT,
        ERR_HEADER_MISMATCH,
        ERR_HTTP,
        ERR_HTTP_ACCESS,
        ERR_HTTP_PROXY_AUTH,
        ERR_HTTP_SERVER_ERROR,
        ERR_HTTP_TIMEOUT,
        ERR_INITIALIZATION,
        ERR_INITIALIZED,
        ERR_INTERNAL,
        ERR_INVALID_FLOAT,
        ERR_INVALID_HANDLE,
        ERR_INVALID_PARAM,
        ERR_INVALID_POSITION,
        ERR_INVALID_SPEAKER,
        ERR_INVALID_SYNCPOINT,
        ERR_INVALID_THREAD,
        ERR_INVALID_VECTOR,
        ERR_MAXAUDIBLE,
        ERR_MEMORY,
        ERR_MEMORY_CANTPOINT,
        ERR_NEEDS3D,
        ERR_NEEDSHARDWARE,
        ERR_NET_CONNECT,
        ERR_NET_SOCKET_ERROR,
        ERR_NET_URL,
        ERR_NET_WOULD_BLOCK,
        ERR_NOTREADY,
        ERR_OUTPUT_ALLOCATED,
        ERR_OUTPUT_CREATEBUFFER,
        ERR_OUTPUT_DRIVERCALL,
        ERR_OUTPUT_FORMAT,
        ERR_OUTPUT_INIT,
        ERR_OUTPUT_NODRIVERS,
        ERR_PLUGIN,
        ERR_PLUGIN_MISSING,
        ERR_PLUGIN_RESOURCE,
        ERR_PLUGIN_VERSION,
        ERR_RECORD,
        ERR_REVERB_CHANNELGROUP,
        ERR_REVERB_INSTANCE,
        ERR_SUBSOUNDS,
        ERR_SUBSOUND_ALLOCATED,
        ERR_SUBSOUND_CANTMOVE,
        ERR_TAGNOTFOUND,
        ERR_TOOMANYCHANNELS,
        ERR_TRUNCATED,
        ERR_UNIMPLEMENTED,
        ERR_UNINITIALIZED,
        ERR_UNSUPPORTED,
        ERR_VERSION,
        ERR_EVENT_ALREADY_LOADED,
        ERR_EVENT_LIVEUPDATE_BUSY,
        ERR_EVENT_LIVEUPDATE_MISMATCH,
        ERR_EVENT_LIVEUPDATE_TIMEOUT,
        ERR_EVENT_NOTFOUND,
        ERR_STUDIO_UNINITIALIZED,
        ERR_STUDIO_NOT_LOADED,
        ERR_INVALID_STRING,
        ERR_ALREADY_LOCKED,
        ERR_NOT_LOCKED,
        ERR_RECORD_DISCONNECTED,
        ERR_TOOMANYSAMPLES
      
    }

    /** These values are used with SoundGroup::setMaxAudibleBehavior to determine
     *  what happens when more sounds are played than are specified with
     *  SoundGroup::setMaxAudible. */
    export enum SOUNDGROUP_BEHAVIOR {
        FAIL,
        MUTE,
        STEALLOWEST,
        MAX,
        FORCEINT
    }

    /** These definitions describe the native format of the hardware or software 
     * buffer that will be used */
    export enum SOUND_FORMAT {
        NONE,
        PCM8,
        PCM16,
        PCM24,
        PCM32,
        PCMFLOAT,
        BITSTREAM,
        MAX,
        FORCEINT
    }

    /** These definitions describe the type of sound being played */
    export enum SOUND_TYPE {
        UNKNOWN,
        AIFF,
        ASF,
        DLS,
        FLAC,
        FSB,
        IT,
        MIDI,
        MOD,
        MPEG,
        OGGVORBIS,
        PLAYLIST,
        RAW,
        S3M,
        USER,
        WAV,
        XM,
        XMA,
        AUDIOQUEUE,
        AT9,
        VORBIS,
        MEDIA_FOUNDATION,
        MEDIACODEC,
        FADPCM,
        MAX
      
    }

    /** Assigns an enumeration for a speaker index. */
    export enum SPEAKER {
        FRONT_LEFT,
        FRONT_RIGHT,
        FRONT_CENTER,
        LOW_FREQUENCY,
        SURROUND_LEFT,
        SURROUND_RIGHT,
        BACK_LEFT,
        BACK_RIGHT,
        TOP_FRONT_LEFT,
        TOP_FRONT_RIGHT,
        TOP_BACK_LEFT,
        TOP_BACK_RIGHT,
        MAX
    }

    /** These are speaker types defined for use with the System::setSoftwareFormat command */
    export enum SPEAKERMODE {
        DEFAULT,
        RAW,
        MONO,
        STEREO,
        QUAD,
        SURROUND,
        _5POINT1,
        _7POINT1,
        _7POINT1POINT4,
        MAX
    }

    /** List of data types that can be returned by Sound::getTag  */
    export enum TAGDATATYPE {
        BINARY,
        INT,
        FLOAT,
        STRING,
        STRING_UTF16,
        STRING_UTF16BE,
        STRING_UTF8,
        CDTOC,
        MAX
    }

    /** List of tag types that could be stored within a sound. 
     * These include id3 tags, metadata from netstreams and vorbis/asf data. */
    export enum TAGTYPE {
        UNKNOWN,
        ID3V1,
        ID3V2,
        VORBISCOMMENT,
        SHOUTCAST,
        ICECAST,
        ASF,
        MIDI,
        PLAYLIST,
        FMOD,
        USER,
        MAX
    }
// #endregion LOW LEVEL SYSTEM ENUMERATIONS

    // #region Studio Callbacks ////////////////////////////////////////////////////////////////////////////////////////////////////
    /** Callback for command replay event instance creation 
     * @function STUDIO_COMMANDREPLAY_CREATE_INSTANCE_CALLBACK
     * @param replay Pointer to the command replay object
     * @param commandIndex The command that invoked this callback
     * @param eventDescription The event description to use
     * @param instance The resulting event instance
     * @param userdata The userdata assigned into the given replay, or NULL if not set */
    export interface STUDIO_COMMANDREPLAY_CREATE_INSTANCE_CALLBACK {
        (replay, commandIndex:number, eventDescription, instance: EventInstance, userdata:any): RESULT;
    }

    /** Callback for when the command replay goes to the next frame 
     * @function STUDIO_COMMANDREPLAY_FRAME_CALLBACK
     * @param replay Pointer to the command replay object.
     * @param commandIndex The current playback command index.
     * @param currentTime The current playback time.
     * @param userdata The userdata assigned into the given replay, or NULL if not set. */
    export interface STUDIO_COMMANDREPLAY_FRAME_CALLBACK {
        (replay, commandIndex:number, currentTime:number, userdata:any): RESULT;
    }
    /** 
     * Callback for command replay bank loading
     * @function STUDIO_COMMANDREPLAY_LOAD_BANK_CALLBACK
     * @param replay Pointer to the command replay object
     * @param commandIndex The command that invoked this callback
     * @param bankGuid The guid of the bank that needs to be loaded. May be all zero if not known.
     * @param bankFilename The filename of the bank that needs to be loaded. May be NULL if not known.
     * @param flags The flags to load the bank with
     * @param bank The resulting bank handle.
     * @param userdata The userata assigned into the given replay, or NULL if not set. */
    export interface STUDIO_COMMANDREPLAY_LOAD_BANK_CALLBACK {
        (replay, commandIndex:number, bankGuid, bankFilename, 
            flags:STUDIO_LOAD_BANK_FLAGS, bank, userdata:any): RESULT;
    }
    /** 
     * The Interface shape for Event Callback Handlers 
     * @function STUDIO_EVENT_CALLBACK
     * @param type The type of event that has occurred.
     * @param event The event instance that has changed state.
     * @param parameters The callback parameters. The data passed varies based 
     * on the callback type.
     * @returns an integer value defined in the FMOD_RESULT enumeration
     * @description This callback is used for tracking replay state and providing 
     * programmer sounds. The data passed to the callback function in the parameters 
     * argument varies based on the callback type. See FMOD_STUDIO_EVENT_CALLBACK_TYPE 
     * for more information. */
    export interface STUDIO_EVENT_CALLBACK {
        (type: STUDIO_EVENT_CALLBACK_TYPE, event: EventInstance, parameters: any): RESULT;
    }

    export interface STUDIO_SYSTEM_CALLBACK {
        (system:StudioSystem, type, commanddata:any, userdata:any): RESULT
    }

    // #endregion Studio Callbacks

    // #region Studio Structures ///////////////////////////////////////////////////////////////////////////////////////////////////

    /** 
     * Settings for advanced features like configuring memory and cpu usage. 
     */
    export interface STUDIO_ADVANCEDSETTINGS {
        /** [r/w] Optional. Specify 0 to ignore. Specify the command queue size for 
         * studio async processing. Default 32kB. */
        commandqueuesize:number;
        /** [r/w] Optional. Specify 0 to ignore. Specify the initial size to allocate
         * for handles. Memory for handles will grow as needed in pages. 
         * Default 8192 * sizeof(void*)  */
        handleinitialsize:number;
        /**  [r/w] Optional. Specify 0 to ignore. Specify the update period of Studio
         * when in async mode, in milliseconds. Will be quantised to the nearest multiple
         * of mixer duration. Default is 20ms. */
        studioupdateperiod:number;
        /** [r/w] Optional. Specify 0 to ignore. Specify the amount of sample data to
         *  keep in memory when no longer used, to avoid repeated disk IO. Use -1 to disable.
         *  Default is 256kB.  */
        idlesampledatapoolsize:number; 
    }

    export interface STUDIO_BANK_INFO {
        userdata:any;
        userdatalength:number;
        opencallback; //FMOD_FILE_OPEN_CALLBACK
        closecallback; //FMOD_FILECLOSE_CALLBACK
        readcallback; //FMOD_FILE_READ_CALLBACK
        seekcallback; //FMOD_FILE_SEEK_CALLBACK
    }

    /**  Information for a single buffer in FMOD Studio. */
    export interface STUDIO_BUFFER_INFO {
        /** Current buffer usage in bytes. */
        currentusage:number;
        /** Peak buffer usage in bytes.  */
        peakusage:number;
        /** Buffer capacity in bytes.  */
        capacity:number;
        /** Cumulative number of stalls due to buffer overflow.  */
        stallcount:number;
        /** Cumulative amount of time stalled due to buffer overflow, in seconds.  */
        stalltime:number;
    }

    /** Information for FMOD Studio buffer usage. */
    export interface STUDIO_BUFFER_USAGE {
        /** Information for the Studio Async Command buffer, controlled by 
         * FMOD_STUDIO_ADVANCEDSETTINGS commandQueueSize. */
        studiocommandqueue: STUDIO_BUFFER_INFO;
        /** Information for the Studio handle table, controlled by
         * FMOD_STUDIO_ADVANCEDSETTINGS handleInitialSize.  */
        studiohandle: STUDIO_BUFFER_INFO;
    }

    export interface STUDIO_COMMAND_INFO {
        /** The full name of the API function for this command. */
        commandname:string;
        /** For commands that operate on an instance, this is the
         * command that created the instance.  */
        parentcommandindex:number;
        /** The frame the command belongs to */
        framenumber:number;
        /** The playback time at which this command will be executed */
        frametime:number;
        /** The type of object that this command uses as an instance */
        instancetype;
        /** The type of object that this command outputs, if any. */
        outputtype;
        /** The original handle value of the instance. This will no longer
         * correspond to any actual object in playback */
        instancehandle:number;
        /** The original handle value of the command output. 
         * This will no longer correspond to any actual object in playback.  */
        outputhandle:number;
    }

    export interface STUDIO_CPU_USAGE {
        /** Returns the % CPU time taken by DSP processing on the low level mixer thread.  */
        dpsusage:number;
        /** Returns the % CPU time taken by stream processing on the low level stream thread. */
        streamusage:number;
        /** Returns the % CPU time taken by geometry processing on the low level geometry thread.  */
        geometryusage:number;
        /** Returns the % CPU time taken by low level update, called as part of the studio update.  */
        updateusage:number;
        /** Returns the % CPU time taken by studio update, called from the studio thread. 
         * Does not include low level update time.  */
        studiousage:number;
    }

    export interface STUDIO_PARAMETER_DESCRIPTION {
        name:string;
        index:number;
        minimum:number;
        maximum:number;
        defaultvalue:number;
        type;
    }

    export interface STUDIO_PLUGIN_INSTANCE_PROPERTIES {
        name:string;
    }

    /** The struct used to receive and send programmer sound data from event callbacks */
    export interface STUDIO_PROGRAMMER_SOUND_PROPERTIES {
        /** The name of the programmer instrument (set in FMOD Studio) */
        name:string;
        /** The programmer-created sound. This should be filled in by 
         * the create callback, and cleaned up by the destroy callback. The provided sound 
         * should be created with the FMOD_LOOP_NORMAL mode bit set.This can be cast to/from FMOD::Sound* type.  */
        sound; //FMOD Sound type
        /** The index of the subsound to use. This should be 
         * filled in by the create callback, or set to -1 if the provided sound should 
         * be used directly. Defaults to -1.  */
        subsoundIndex:number;
    }

    export interface STUDIO_SOUND_INFO {
        name_or_data:any,
        mode: MODE,
        subsoundindex:number
    }

    /** The struct used to receive timeline beat data upon receiving a Timeline Beat Event Callback 
     * @description Not all fields are currently supported or may not work as expected at 
     * this time. To initialize an new instance in javascript use 
     * "FMOD.STUDIO_TIMELINE_BEAT_PROPERTIES()", no 'new' keyword is required.  */
   export interface STUDIO_TIMELINE_BEAT_PROPERTIES {
        /** The bar number (starting from 1). */
        bar:number;
        /** The beat number within the bar (starting from 1) */
        beat:number;
        /** The position of the beat on the timeline in milliseconds. */
        position:number;
        /** The current tempo in beats per minute. */
        tempo:number;
        /** The current time signature upper number (beats per bar). */
        timesignatureupper:number;
        /** The current time signature lower number (beat unit). */
        timesignaturelower:number;
    }


    export interface STUDIO_TIMELINE_MARKER_PROPERTIES {
        /** The narker name */
        name:string;
        /** The position of the marker on the timeline in milliseconds */
        position:number;
    }

    export interface STUDIO_USER_PROPERTY {
        name:string;
        type;
        intvalue:number;
        boolvalue;
        floatvalue:number;
        stringvalue:string;
      
    }

    // #endregion Studio Structures //

    // #region Studio Defines ////////////////////////////////////////////////////////////////////////////////

    /* Flags passed into Studio::System::startCommandCapture. */
    export enum STUDIO_COMMANDCAPTURE_FLAGS {
        NORMAL = 0x00000000,
        FILEFLUSH = 0x00000001,
        SKIP_INITIAL_STATE = 0x00000002
    }

    /** Flags passed into Studio.System.loadCommandReplay */
    export enum STUDIO_COMMANDREPLAY_FLAGS {
        /** Standard behavior. */
        NORMAL = 0x00000000,
        /** Normally the playback will release any created resources when it stops, unless this flag is set. */
        SKIP_CLEANUP = 0x00000001,
        /** Play back at maximum speed, ignoring the timing of the original replay */
        FAST_FORWARD = 0x00000002,
        /** Skips commands related to bank loading. */
        SKIP_BANK_LOAD = 0x00000004
    }
   
    export enum STUDIO_EVENT_CALLBACK_TYPE {
        /** Called when an instance is fully created. Parameters = unused.  */
        CREATED = 0x00000001,
        /** Called when an instance is just about to be destroyed. Parameters = unused.  */
        DESTROYED = 0x00000002,
        /** Called when an instance is preparing to start. Parameters = unused */
        STARTING = 0x00000004,
        /** Called when an instance starts playing. Parameters = unused. */
        STARTED = 0x00000008,
        /** Called when an instance is restarted. Parameters = unused. */
        RESTARTED = 0x00000010,
        /** Called when an instance stops. Parameters = unused.  */
        STOPPED = 0x00000020,
        /** Called when an instance did not start, e.g. due to polyphony. Parameters = unused.  */
        START_FAILED = 0x00000040,
        /** Called when a programmer sound needs to be created in order to play a programmer instrument. 
         * Parameters = FMOD_STUDIO_PROGRAMMER_SOUND_PROPERTIES.  */
        CREATE_PROGRAMMER_SOUND = 0x00000080,
        /** FMOD_STUDIO_EVENT_CALLBACK_DESTROY_PROGRAMMER_SOUND Called when a programmer sound needs to be destroyed. 
         * Parameters = FMOD_STUDIO_PROGRAMMER_SOUND_PROPERTIES. */
        DESTROY_PROGRAMMER_SOUND = 0x00000100,
        /** Called when a DSP plugin instance has just been created. Parameters = FMOD_STUDIO_PLUGIN_INSTANCE_PROPERTIES.  */
        PLUGIN_CREATED = 0x00000200,
        /** Called when a DSP plugin instance is about to be destroyed. Parameters = FMOD_STUDIO_PLUGIN_INSTANCE_PROPERTIES.  */
        PLUGIN_DESTROYED = 0x00000400,
        /** Called when the timeline passes a named marker. Parameters = FMOD_STUDIO_TIMELINE_MARKER_PROPERTIES.  */
        TIMELINE_MARKER = 0x00000800,
        /** Called when the timeline hits a beat in a tempo section. Parameters = FMOD_STUDIO_TIMELINE_BEAT_PROPERTIES.  */
        TIMELINE_BEAT = 0x00001000,
        /** Called when the event plays a sound. Parameters = FMOD::Sound.  */
        SOUND_PLAYED = 0x00002000,
        /** Called when the event finishes playing a sound. Parameters = FMOD::Sound.  */
        SOUND_STOPPED = 0x00004000,
        /** Pass this mask to Studio::EventDescription::setCallback or Studio::EventInstance::setCallback to 
         * receive all callback types. */
        CALLBACK_ALL = 0xFFFFFFFF
    }

    export enum STUDIO_INITFLAGS {
        /** Initialize normally.  */
        NORMAL = 0x00000000,
        /** Enable live update */
        LIVEUPDATE = 0x00000001,
        /** Load banks even if they reference plugins that have not been loaded */
        ALLOW_MISSING_PLUGINS = 0x00000002,
        /** Disable asynchronous processing and perform all processing on the calling thread instead. */
        SYNCHRONOUS_UPDATE = 0x00000004,
        /** Defer timeline callbacks until the main update. See Studio::EventInstance::SetCallback for more information */
        DEFERRED_CALLBACKS = 0x00000008,
        /** No additional threads are created for bank and resource loading. Loading is driven from Studio::System::update. 
         * Mainly used in non-realtime situations.  */
        LOAD_FROM_UPDATE = 0x00000010
    }

    /** Flags passed into Studio loadBank commands to control bank load behaviour.
     * Normal JavaScript: FMOD.STUDIO_BANK_ + the enum value */
    export enum STUDIO_LOAD_BANK_FLAGS {
        /** Standard behavior */
        NORMAL = 0x00000000,
        /** Loading occurs asynchronously (not in HTML5) */
        NONBLOCKING = 0x00000001,
        /** Force samples to decompress into memory when they are loaded, rather than staying compressed */
        DECOMPRESS_SAMPLES = 0x00000002
    }

    export const STUDIO_LOAD_MEMORY_ALIGNMENT = 32;

    /** These callback types are used with Studio::System::setCallback. */
    export enum STUDIO_SYSTEM_CALLBACK_TYPE {
        /** Called at the start of the main Studio update. For async mode this will be on its own thread.  */
        PREUPDATE = 0x00000001,
        /** Called at the end of the main Studio update. For async mode this will be on its own thread.  */
        POSTUPDATE = 0x00000002,
        /** Called when bank has just been unloaded, after all resources are freed. CommandData will be the bank handle. */
        BANK_UNLOAD = 0x00000004,
        /** Pass this mask to Studio::System::setCallback to receive all callback types. */
        ALL = 0xFFFFFFFF

    }
    // #endregion Studio Defines //////////////////////////////////////////////////////

    // #region Studio Enumerations //////////////////////////////////////////////////////
    
    export enum STUDIO_EVENT_PROPERTY {
        CHANNELPRIORITY,
        /** Priority to set on low-level channels created by this event instance (-1 to 256).  */
        SCHEDULE_DELAY,
        /** Schedule look-ahead on the timeline in DSP clocks, or -1 for default. */
        SCHEDULE_LOOKAHEAD,
        /** Override the event's 3D minimum distance, or -1 for default.  */
        MINIMUM_DISTANCE,
        /**  Override the event's 3D maximum distance, or -1 for default. */
        MAXIMUM_DISTANCE,
        /** Maximum number of event properties supported. */
        MAX   
    }

    /**  */
    export enum STUDIO_INSTANCETYPE {
        NONE,
        SYSTEM,
        EVENTDESCRIPTION,
        EVENTINSTANCE,
        PARAMETERINSTANCE,
        BUS,
        VCA,
        BANK,
        COMMANDREPLAY     
    }

    /** These values describe the loading status of various objects.  */
    export enum STUDIO_LOADING_STATE{
        /** Currently unloading */
        UNLOADING,
        /** Not loaded */
        UNLOADED,
        /** Loading in progress */
        LOADING,
        /** Loaded and ready to play */
        LOADED,
        /** Failed to load and is now in error state */
        ERROR     
    }

    /** Specifies how to use the memory buffer passed to Studio::System::loadBankMemory. */
    export enum STUDIO_LOAD_MEMORY_MODE {
        /** Duplicates the memory into its own buffers, memory can be freed after Studio::System::loadBankMemory returns.  */
        MEMORY,
        /** Copies the memory pointer without duplicating the memory into its own buffers, 
         * memory can be freed after receiving a FMOD_STUDIO_SYSTEM_CALLBACK_BANK_UNLOAD callback.  */
        MEMORY_POINT,
    }
    /** Describes the type of a parameter. */
    export enum STUDIO_PARAMETER_TYPE {
        /** Controlled via the API using Studio::EventInstance::setParameterValue.  */
        GAME_CONTROLLED,
        /** Distance between the event and the listener.  */
        AUTOMATIC_DISTANCE,
        /** Angle between the event's forward vector and the vector pointing from the event to the listener (0 to 180 degrees).  */
        AUTOMATIC_EVENT_CONE_ANGLE,
        /** Horizontal angle between the event's forward vector and listener's forward vector (-180 to 180 degrees).  */
        AUTOMATIC_EVENT_ORIENTATION,
        /** Horizontal angle between the listener's forward vector and the vector pointing from the listener to the event (-180 to 180 degrees).  */
        AUTOMATIC_DIRECTION,
        /** Angle between the listener's XZ plane and the vector pointing from the listener to the event (-90 to 90 degrees).  */
        AUTOMATIC_ELEVATION,
        /** Horizontal angle between the listener's forward vector and the global positive Z axis (-180 to 180 degrees).  */
        AUTOMATIC_LISTENER_ORIENTATION,
        /** Maximum number of parameter types supported */
        MAX    
    }

    /** These values describe the playback state of an event instance. */
    export enum STUDIO_PLAYBACK_STATE {
        /** Currently playing. */
        PLAYING,
        /** The timeline cursor is paused on a sustain point. */
        SUSTAINING,
        /** Not playing.  */
        STOPPED,
        /** Start has been called but the instance is not fully started yet.  */
        STARTING,
        /** Stop has been called but the instance is not fully stopped yet. */
        STOPPING   
    }

    /** Controls how to stop playback of an event instance. */
    export enum STUDIO_STOP_MODE {
        /** Allows AHDSR modulators to complete their release, and DSP effect tails to play out. */
        ALLOWFADEOUT,
        /** Stops the event instance immediately.  */
        IMMEDIATE     
    }

    /** These definitions describe a user property's type. */
    export enum STUDIO_USER_PROPERTY_TYPE {
        INTEGER,
        BOOLEAN,
        FLOAT,
        STRING   
    }
    




    
}
