IFMOD
=====================

IFMOD is a TypeScript interface and partial wrapper for the fmodstudio.js library version 1.12 to bring type-safety features and some covenient documentation when using the FMOD Studio / Low Level APIs.

Quick-start:
If you haven't already set up FMOD in HTML5, I highly recommend reading the FMOD Studio 'HTML5 Specific Starter Guide', which can be found in the 'Introduction' section of the official FMOD Studio API Documentation.

IFMOD contains its own blank FMOD object which should be used to initialize FMOD using the boilerplate code found in the *HTML5 Specific Starter Guide* of the official FMOD Studio API Documentation. Once you initialize this object by passing it into fmodstudio.js's global FMODModule constructor function This will allow namespace-level functions in IFMOD to work (e.g. this is just a wrapper around FMOD's namespace-level functions which look like *IFMOD.Studio_System_Create*)

  import { FMOD } from 'path/to/IFMOD.ts';

To make use IFMOD.ts interfaces in your own TypeScript class file, please import the IFMOD.ts IFMOD namespace.

  import { IFMOD } from 'path/to/IFMOD.ts';

Most references to the FMOD namespace can now be 'typed' to the corresponding interface from the IFMOD namespace. Because of JavaScript's particularity, FMOD cannot pass out handles as it does in C/C++/C#, so it passes handles to the parameter by injecting a property named 'val'. IFMOD has its own 'Outval' class, in which we can name the type interface of 'val' by indicating it like so -

```typescript
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
```

Note: IFMOD.ts is still under construction, so much of the fmodstudio library is yet to be interfaced.
