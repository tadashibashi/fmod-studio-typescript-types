Welcome to IFMOD.ts!

You are reading about a TypeScript language interface for the fmodstudio.js library that is currently in development. Instead of pressing buttons without labels on them to trigger sounds from the fmodstudio.js black box, IFMOD.ts aims to write those labels out for you, offering you type-safety and covenient JSDOC-umentation when using the FMOD Studio / Low Level APIs.

Quick-start:
If you haven't already set up FMOD in HTML5, I highly recommend reading the FMOD Studio 'HTML5 Specific Starter Guide', which can be found in the 'Introduction' section of the official FMOD Studio API Documentation.

Once FMOD is set up, to use the IFMOD.ts interface in your own TypeScript class file, please reference the IFMOD.ts file's IFMOD namespace with the 'import' function like so -

import { IFMOD } from 'path/to/IFMOD.ts';

Most references to the FMOD namespace can be 'typed' to the corresponding interface from the IFMOD namespace like so -

// create the 'out' variable with the corresponding type with IFMOD's Outval<T> constructor
let studioSystemOut = new IFMOD.Outval<IFMOD.StudioSystem>();	

// pass the variable into the studio creation function
FMOD.Studio_System_Create(studioSystemOut);

// set a studio system handle, which will now have all its functions and properties listed via autocomplete
let studioSystem = studioSystemOut.val;

// The loadBankFile function calls used here will ensure the correct types are passed into it, and will throw an error if incorrect.
studioSystem.loadBankFile('Master Bank.bank', new IFMOD.Outval<Bank>());
studioSystem.loadBankFile('Master Bank.strings.bank', new IFMOD.Outval<Bank>());

// Get the Event Description
let eventDescriptionOut = new IFMOD.Outval<IFMOD.EventDescription>();
studioSystem.getEvent('event:/Music', eventDescriptionOut);

let eventDescription = eventDescriptionOut.val;

// create an event instance of the 'Music' event description
let eventInstanceOut = IFMOD.Outval<IFMOD.EventInstance>();
eventDescription.createInstance(eventInstanceOut);

let eventInstance = eventInstanceOut.val;

// play the music!
eventInstance.start();




Note: IFMOD.ts is still under construction, so much of the fmodstudio library is yet to be interfaced.