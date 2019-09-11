import { FMOD } from './index';

/**
 * Initializes an FMOD object.
 * All function calls should wait until onRuntimeInitialized is fired
 * @param fmodObject The FMOD object to initialize.
 * It should only contain configuration data 
 * (preRun, onRuntimeInitialized, TOTAL_MEMORY)
 */
declare function FMODModule(fmodObject: FMOD): void;