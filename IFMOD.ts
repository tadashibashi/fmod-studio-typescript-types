export var FMOD:any = {

};

export class Outval<T> {
	val: T;
	constructor() {}
}

/** Check the FMOD.RESULT to see if there are any errors
* @function CHECK_RESULT
* @param result The error code
* @param string The attempted task
* @returns void
*/
export function CHECK_RESULT (result: IFMOD.RESULT, string: string)
{
   if (result != IFMOD.RESULT.OK) {
       alert("FMOD ERROR! [" + FMOD.ErrorString(result) + "]\n" + "=> Problem while " + string);
   }
}

export namespace IFMOD { 

    // #region Namespace Functions Wrap FMOD functions ///////////////////////////////////////////////////////////////////////
    // #region Low Level System Functions ////////////////////////////
    export function Debug_Initialize(flags:DEBUG_FLAGS) {
        let result: RESULT = FMOD.Debug_Initialize(flags);
        return result;
    }

    export function ErrorString(result: RESULT) {
        FMOD.ErrorString(result);
    }

    export function FS_createPreloadedFile(foldername:string, filename:string, url:string, canread:boolean,canwrite:boolean) {
        let result: RESULT = FMOD.FS_createPreloadedFile(foldername, filename, url, canread, canwrite);
        return result;
    }    
    // fill in outval generic type with systems
    export function System_Create(system:Outval<any>) {
        let result: RESULT = FMOD.System_Create(system);
        return result;
    }

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
        /** Closes the system object without freeing the object's memory, so the system handle will still be valid. */
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

        createSoundGroup(): RESULT;

        createStream(name_or_data:string, mode:MODE, sound:Outval<any>): RESULT;

        detachChannelGroupFromPort(): RESULT;

        get3DListenerAttributes(): RESULT;

        get3DNumListeners(): RESULT;
        /** Retrieves the global doppler scale, distance factor and rolloff scale for all 3D sound in FMOD. */
        get3DSettings(doplerscale:Outval<number>, distancefactor:Outval<number>, folloffscale:Outval<number>): RESULT;

        getAdvancedSetting(): RESULT;

        getCPUUsage(): RESULT;

        getChannel(): RESULT;

        getChannelsPlaying(): RESULT;

        getDSPBufferSize(): RESULT;

        getDSPInfoByPlugin(): RESULT;

        getDefaultMixMatrix(): RESULT;
        /** Returns the currently selected driver number.  */
        getDriver(driver:Outval<number>): RESULT;

        getDriverInfo(id:number, name:Outval<string>, guid:Outval<GUID>, systemrate:Outval<number>, speakermode:Outval<SPEAKERMODE>, speakermodechannels:Outval<number>): RESULT;

        getFileUsage(): RESULT;

        getGeometryOcclusion(): RESULT;

        getGeometrySettings(): RESULT;

        getMasterChannelGroup(): RESULT;

        getMasterSoundGroup(): RESULT;

        getNestedPlugin(): RESULT;

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

        getSoftwareFormat(): RESULT;

        getSoundRAM(): RESULT;

        getSpeakerModeChannels(): RESULT;

        getSpeakerPosition(): RESULT;

        getStreamBufferSize(): RESULT;

        getUserData(): RESULT;

        getVersion(): RESULT;

        /** Initializes the system object, and the sound device. This has to be called at the start of the user's program. 
         * You must create a system object with FMOD::System_create. */
        init(maxchannels:number, flags:INITFLAGS, extradriverdata): RESULT;

        isRecording(id:number, recording:Outval<boolean>): RESULT;

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

        registerOutput(): RESULT;
        /** Closes and frees a system object and its resources. */
        release(): RESULT;

        set3DListenerAttributes(): RESULT;

        set3DNumListeners(): RESULT;

        set3DRolloffCallback(): RESULT;

        set3DSettings(): RESULT;

        setAdvancedSetting(): RESULT;

        setCallback(callback, callbackmask:SYSTEM_CALLBACK_TYPE): RESULT;

        setDSPBufferSize(): RESULT;

        setDriver(driver:number): RESULT;

        setFileSystem(): RESULT;

        setGeometrySettings(): RESULT;

        setNetworkProxy(): RESULT;

        setNetworkTimeout(): RESULT;

        setOutput(): RESULT;

        setOutputByPlugin(): RESULT;
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
        addInput(): RESULT;

        disconnectAll(): RESULT;

        disconnectFrom(): RESULT;

        getActive(): RESULT;

        getBypass(): RESULT;

        getCPUUsage(): RESULT;

        getChannelFormat(): RESULT;

        getDataParameterIndex(): RESULT;

        getIdle(): RESULT;

        getInfo(): RESULT;

        getInput(): RESULT;

        getMeteringEnabled(): RESULT;

        getMeteringInfo(): RESULT;

        getNumInputs(): RESULT;

        getNumOutputs(): RESULT;

        getNumParameters(): RESULT;

        getOutput(): RESULT;

        getOutputChannelFormat(): RESULT;

        getParameterBool(): RESULT;

        getParameterData(): RESULT;

        getParameterFloat(): RESULT;

        getParameterInfo(): RESULT;

        getParameterInt(): RESULT;

        getSystemObject(): RESULT;

        getType(): RESULT;

        getUserData(): RESULT;

        getWetDryMix(): RESULT;

        release(): RESULT;

        reset(): RESULT;

        setActive(): RESULT;

        setBypass(): RESULT;

        setChannelFormat(): RESULT;

        setMeteringEnabled(): RESULT;

        setParameterBool(): RESULT;

        setParameterData(): RESULT;

        setParameterFloat(): RESULT;

        setParameterInt(): RESULT;

        setUserData(): RESULT;

        setWetDryMix(): RESULT;

        showConfigDialog(): RESULT;


    }

    export interface DSPConnection {
        getInput(): RESULT;

        getMix(): RESULT;

        getMixMatrix(): RESULT;

        getOutput(): RESULT;

        getType(): RESULT;

        getUserData(): RESULT;

        setMix(): RESULT;

        setMixMatrix(): RESULT;

        setUserData(): RESULT;
    
    }

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
    //#endregion System Objects \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // #region Studio System Objects  /////////////////////////////////////////////////////////////////////////////////////////
    export interface StudioSystem {
        // Functions

        /** Creates a Studio System object. This must be called before you do anything else.
         * @param system
         * @param headerversion
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        create(system:Outval<StudioSystem>, headerversion:number): RESULT;

        /** 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        flushCommands(): RESULT;

        /** 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        flushSampleLoading(): RESULT;

        /** 
         * @param settings
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getAdvancedSettings(settings:Outval<any>): RESULT;

        /** 
         * @param path The bank path, filename, or the ID string that identifies the bank. 
         * @param bankOut Address of a variable to receive the Bank object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBank(path:string, bankOut:Outval<any>): RESULT;

        /** 
         * @param id The 128-bit GUID which identifies the bank. FMOD.GUID type
         * @param bankOut Address of a variable to receive the Bank object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBankByID(id:GUID, bankOut:Outval<any>): RESULT;

        /** 
         * @param countOut Address of a variable to receive the number of loaded Banks.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBankCount(countOut:Outval<number>): RESULT;

        /** 
         * @param arrayOut An array of memory allocated by the user. 
         * @param capacity The capacity of the array passed in as the first parameter 
         * @param countOut Address of a variable to receive the number of Banks written to the array 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBankList(arrayOut:Outval<any[]>, capacity:number, countOut:Outval<number>): RESULT;

        /** 
         * @param usageOut Address of a variable to receive the performance information. 
         * Struct passed out is of FMOD_STUDIO_BUFFER_USAGE type.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBufferUsage(usageOut:Outval<STUDIO_BUFFER_USAGE>): RESULT;

        /** 
         * @param path The bus path or the ID string that identifies the bus. 
         * @param busOut Address of a variable to receive the bus object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBus(path:string, busOut:Outval<any>): RESULT;

        /** 
         * @param id The 128-bit GUID which identifies the bus. Type FMOD_GUID
         * @param busOut Address of a variable to receive the bus object.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getBusByID(id:GUID, busOut:Outval<any>): RESULT;

        /** Retrieves performance information for FMOD Studio and low level systems  
         * @param usageOut Address of a variable to receive the performance info. 
         * FMOD_STUDIO_CPU_USAGE. Cast .val to IFMOD.STUDIO_CPU_USAGE
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getCPUUsage(usageOut:Outval<STUDIO_CPU_USAGE>): RESULT;

        /** Retrieves an EventDescription by path or ID string.

         * @param path The path or the ID string that identifies the event or snapshot
         * @param eventOut Address of a variable to receive the EventDescription object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getEvent(path:string, eventOut:Outval<any>): RESULT;

        /** Retrieves an EventDescription by ID.

         * @param id The 128-bit GUID which identifies the event or snapshot.
         * @param eventOut Address of a variable to receive the EventDescription object.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getEventByID(id:number, event:Outval<any>): RESULT;

        /** Retrieves the position, velocity and orientation of the 3D sound listener.
         * @param listener
         * @param attributes
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getListenerAttributes(listener:number, attributes:Outval<any>): RESULT;

        /** Gets the listener weighting, which allows listeners to fade in and out
         * @param listner Listener index.
         * @param weightOut Address of a variable to receive the weighting value. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getListenerWeight(listener:number, weightOut:Outval<number>): RESULT;

        /** Retrieves the Studio System's internal Low Level System object for 
         * access to the Low Level API.
         * @param systemOut Address of a variable to pass the low level System to
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getLowLevelSystem(systemOut:Outval<any>): RESULT;

        /** Gets the number of listeners that have been set into in the 3D sound scene.
         * @param numlistenersOut
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getNumListeners(numlistenersOut:Outval<number>): RESULT;

        /** Retrieves information for loading a sound from an audio table.
         * @param key The key that identifies the sound, listed in FMOD Studio
         * @param infoOut Address of a variable to receive the sound loading information. SOUND_INFO type.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         * @remarks Input each field into lowLevelSystem.createSound(info.name_or_data, 
         * info.mode, nullSinceNoExsoundinfoInJavascriptStruct, soundOut) to receive the parent sound. You can then retrieve
         * the subsound with Sound.getSubSound( info.subsoundindex, Outval );
         */
        getSoundInfo(key:string,infoOut:Outval<STUDIO_SOUND_INFO>): RESULT;

        /** Retrieves the user data that is set on the system.
         * @param userdataOut Address of a variable to receive the user data. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getUserData(userdataOut:Outval<any>): RESULT;

        /** Retrieves a VCA by path or ID string.
         * @param path
         * @param vcaOut
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getVCA(path:string, vcaOut:Outval<any>): RESULT;

        /** Retrieves a VCA by ID
         * @param id The 128-bit GUID which identifies the VCA. 
         * @param vcaOut Address of a variable to receive the VCA object. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        getVCAByID(id:GUID, vcaOut:Outval<any>): RESULT;

        /** Initializes the Studio System, the Low Level System, and the sound device.
         * @param maxchannels
         * @param studioflags
         * @param lowlevelflags
         * @param extradriverdata
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        initialize(maxchannels: number, studioflags:STUDIO_INITFLAGS, 
        lowlevelflags:INITFLAGS, extradriverdata): RESULT;

        /** Loads a Studio event bank using custom read callbacks.
         * @param info Information for loading the bank
         * @param flags Flags to control bank loading
         * @param bankOut Address of a variable to receive the Bank object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadBankCustom(info:STUDIO_BANK_INFO, flags:STUDIO_LOAD_BANK_FLAGS, bankOut:Outval<any>): RESULT;

        /** Loads a Studio event bank from a file.
         * @param filename Name of the file on disk
         * @param flags Flags to control bank loading
         * @param bankOut Address of a variable to receive the Bank object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadBankFile(filename:string, flags:STUDIO_LOAD_BANK_FLAGS, bankOut:Outval<any>): RESULT;

        /** Loads a Studio event bank from memory.
         * @param buffer Memory buffer to load from. This should be 32-byte aligned 
         * if mode is FMOD_STUDIO_LOAD_MEMORY_POINT. 
         * @param length Length of the memory buffer. 
         * @param mode Loading mode to use.
         * @param flags Flags to control bank loading.
         * @param bankOut Address of a variable to receive the Bank object.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadBankMemory(buffer:number[], length:number, mode:STUDIO_LOAD_MEMORY_MODE, flags:STUDIO_LOAD_BANK_FLAGS, bankOut:Outval<any>): RESULT;

        /** Playback Studio commands that have previously been recorded to file.
         * @param filename The filename to load the command replay file from. 
         * @param flags Flags that control the command replay. 
         * @param playback Address of a variable to receive the CommandReplay object
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        loadCommandReplay(filename:string, flags:STUDIO_COMMANDREPLAY_FLAGS, playback:Outval<any>): RESULT;

        /** Retrieves the ID for a bank, event, snapshot, bus or VCA
         * @param path The path to the object as shown in FMOD Studio.
         * @param id Address of a variable to receive the 128-bit GUID.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         * @remarks This function will return FMOD_ERR_EVENT_NOTFOUND unless string
         * data for the requested object is loaded (by loading the "Master Bank.strings.bank" file).
         * e.g. "event:/UI/Cancel", "snapshot:/IngamePause", "bus:/SFX/Ambience", "vca:/Mega Strip", "bank:/Vehicles" 
         */
        lookupID(path:string, id:Outval<GUID>): RESULT;

        /** Retrieves the path for a bank, event, snapshot, bus or VCA.
         * @param id The 128-bit GUID which identifies the bank, event, snapshot, bus or VCA. 
         * @param path Address of a buffer to receive the path. Specify 0 or NULL to ignore.
         * @param size Size of the path buffer in bytes. Required if path parameter is not NULL.
         * @param retrieved Address of a variable to receive the size of the retrieved path in bytes, 
         * including the terminating null character. Optional. Specify 0 or NULL to ignore.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        lookupPath(id, path:string, size:number, retrieved:Outval<any>): RESULT;

        /** Registers a third party plugin DSP for use by events loaded by the Studio API.
         * @param description The description of the DSP. See FMOD_DSP_DESCRIPTION
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        registerPlugin(description:DSP_DESCRIPTION): RESULT;

        /** Shuts down and frees the Studio System
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        release(): RESULT;

        /** Resets information about memory buffers used by FMOD Studio.
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        resetBufferUsage(): RESULT;

        /** Sets advanced features like configuring memory and cpu usage.
         * @param settings Pointer to FMOD_STUDIO_ADVANCEDSETTINGS structure. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setAdvancedSettings(settings:ADVANCEDSETTINGS): RESULT;

        /** Sets a callback to hook into various informational events.
         * @param callback
         * @param callbackmask
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setCallback(callback:STUDIO_SYSTEM_CALLBACK, callbackmask:STUDIO_SYSTEM_CALLBACK_TYPE): RESULT;

        /** Sets the position, velocity and orientation of the 3D sound listener.
         * @param listener index. Specify 0 if there is only 1 listener.
         * @param attributes The 3D attributes for the listener. See FMOD_3D_ATTRIBUTES. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        setListenerAttributes(listener:number, attributes:_3D_ATTRIBUTES): RESULT;

        /** Sets the listener weighting, allowing listeners to fade in and out.
         * @param listner Listener index. 
         * @param weight The weighting value from 0 to 1. 
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        setListenerWeight(listener:number, weight:number): RESULT;

        /** Sets the number of listeners in the 3D sound scene. 
         * This function is useful mainly for split-screen game purposes.
         * @param numlisteners Number of listeners in the scene. Valid values are from 1
         *  to FMOD_MAX_LISTENERS inclusive. Default = 1. 
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        setNumListners(numlisteners:number): RESULT;

        /** Sets arbitrary user data on the system
         * @param userdata
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        setUserData(userdata:any): RESULT;

        /** Start recording all Studio commands to a file with the given path.
         * @param filename The filename where the write the command replay file.
         * @param flags Flags that control command capturing. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        startCommandCapture(filename:string, flags:STUDIO_COMMANDCAPTURE_FLAGS): RESULT;

        /** Stop recording Studio commands.
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        stopCommandCapture(): RESULT;

        /** Unloads all currently loaded banks.
         * @returns an integer value defined in the FMOD_RESULT enumeration */
        unloadAll(): RESULT;

        /** Unregisters a previously registered third party plugin DSP.
         * @param name The name of the DSP. This should match the description passed 
         * to Studio::System::registerPlugin. 
         * @returns an integer value defined in the FMOD_RESULT enumeration
         */
        unregisterPlugin(name:string): RESULT;

        /** Updates the Studio System. This should be called once per 'game' tick, 
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
         * 
         * @param count 
         */
        getBusCount(count:Outval<number>): RESULT;
        /**
         * 
         * @param array 
         * @param capacity 
         * @param count 
         */
        getBusList(array:Outval<Bus[]>, capacity:number, count:Outval<number>): RESULT;
        /**
         * 
         * @param count 
         */
        getEventCount(count:Outval<number>): RESULT;
        /**
         * 
         * @param array 
         * @param capacity 
         * @param count 
         */
        getEventList(array:Outval<EventDescription[]>, capacity:number, count:Outval<number>): RESULT;
        /**
         * 
         * @param id 
         */
        getID(id:Outval<GUID>): RESULT;
        /**
         * 
         * @param state 
         */
        getLoadingState(state:Outval<STUDIO_LOADING_STATE>): RESULT;
        /**
         * 
         * @param path 
         * @param size 
         * @param retrieved 
         */
        getPath(path:Outval<string>, size:number, retrieved:Outval<number>): RESULT;
        /**
         * 
         * @param state 
         */
        getSampleLoadingState(state:Outval<STUDIO_LOADING_STATE>): RESULT;
        /**
         * 
         * @param count 
         */
        getStringCount(count:Outval<number>): RESULT;
        /**
         * 
         * @param index 
         * @param id 
         * @param path 
         * @param size 
         * @param retrieved 
         */
        getStringInfo(index:number, id:Outval<GUID>, path:Outval<string>, size:number, retrieved:Outval<number>): RESULT;
        /**
         * 
         * @param userdata 
         */
        getUserData(userdata:Outval<any>): RESULT;
        /**
         * 
         * @param count 
         */
        getVCACount(count:Outval<number>): RESULT;
        /**
         * 
         * @param array 
         * @param capacity 
         * @param count 
         */
        getVCAList(array:Outval<VCA[]>, capacity:number, count:Outval<number>): RESULT;
        /**
         * 
         */
        loadSampleData(): RESULT;
        /**
         * 
         * @param userdata 
         */
        setUserData(userdata:any): RESULT;
        /**
         * 
         */
        unload(): RESULT;
        /**
         * 
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
        maxMPEGCodecs:number,
        maxADPCMCodecs:number,
        maxXMACodecs:number,
        maxVorbisCodecs:number,
        maxAT9Codecs:number,
        maxFADPCMCodecs:number,
        maxPCMCodecs:number,
        ASIONumChannels:number,
        HRTFMinAngle:number,
        HRTFMaxAngle:number,
        HRTFFreq:number,
        vol0virtualvol:number,
        defaultDecodeBufferSize:number,
        profilePort:number,
        geometryMaxFadeTime:number,
        distanceFilterCenterFreq:number,
        reverb3Dinstance:number,
        DSPBufferPoolSize:number,
        stackSizeStream:number,
        stackSizeNonBlocking:number,
        stackSizeMixer:number,
        resamplerMethod,
        commandQueueSize:number,
        randomSeed:number
    }

    /** NOT COMPATIBLE WITH HTML5 */
    export interface ASYNCREADINFO {
        handle,
        offset,
        sizebytes,
        priority,
        userdata,
        buffer,
        bytesread,
        done,      
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
        name:string,
        format,
        channels:number,
        frequency:number,
        lengthbytes:number,
        lengthpcm:number,
        pcmblocksize:number,
        loopstart:number,
        loopend:number,
        mode:MODE,
        channelmask:CHANNELMASK,
        channelorder,
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
        result;
        instancetype;
        instance;
        functionname;
        functionparams;
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
    export enum ERRORCALLBACK_INSTACETYPE {
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
     * @remarks This callback is used for tracking replay state and providing 
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
        /** Loaed and ready to play */
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
