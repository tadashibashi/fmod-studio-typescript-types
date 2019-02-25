Welcome to IFMOD.ts!

You are reading about a TypeScript language interface for the fmodstudio.js library that is currently in development. Instead of pressing buttons without labels on them to trigger fmodstudio.js, IFMOD.ts aims to write these labels out for you, making use of TypeScript's type-safety features and some covenient JSDOC-umentation when using the FMOD Studio / Low Level APIs.

Quick-start:
If you haven't already set up FMOD in HTML5, I highly recommend reading the FMOD Studio 'HTML5 Specific Starter Guide', which can be found in the 'Introduction' section of the official FMOD Studio API Documentation.

When initializing the FMOD object, please make sure to import IFMOD's FMOD object and pass it into the FMODModule constructor. This will allow namespace-level function interfaces to work (e.g. IFMOD.Studio_System_Create) -

import { FMOD } from 'path/to/IFMOD.ts';

To make use IFMOD.ts interfaces in your own TypeScript class file, please import the IFMOD.ts IFMOD namespace with the 'import' function -

import { IFMOD } from 'path/to/IFMOD.ts';

Most references to the FMOD namespace can now be 'typed' to the corresponding interface from the IFMOD namespace. Because of JavaScript's particularity, FMOD cannot pass out handles as it does in C/C++/C#, so it passes handles to the parameter by injecting a property named 'val'. IFMOD has its own 'Outval' class, in which we can name the type interface of 'val' by indicating it like so -

let studioSystemOut = new IFMOD.Outval<IFMOD.StudioSystem>();	

IFMOD.Studio_System_Create(studioSystemOut);

// we can then access the handle with its interface type already set
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