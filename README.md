IFMOD
=====================

IFMOD is a TypeScript interface for the HTML5 fmodstudio.js library version 2.00.03. This brings the benefits of type-safety and covenient documentation when using the FMOD Studio / Low Level APIs.


Setup
---------------------

- IFMOD contains its own blank FMOD object which should be used to initialize FMOD using the boilerplate code found in the [*HTML5 Specific Starter Guide*](https://www.fmod.com/resources/documentation-api?version=2.0&page=platforms-html5.html#start-up-code) of the official FMOD Studio API Documentation. 

```typescript
import { FMOD } from 'path/to/IFMOD.ts'

FMOD.preRun = yourPrerunFunction;
FMOD.onRuntimeInitialized = yourMainFunction;
FMOD.TOTAL_MEMORY = 64*1024*1024; // 64 mb
FMODModule(FMOD); 
```

- Once we pass the FMOD object into the FMODModule constructor, its namespace-level functions are now wrapped inside IFMOD. For example, we can call FMOD.Studio_System_Create with *IFMOD.Studio_System_Create*, the difference being we now have type-safety and pop-up documentation if you are running a TypeScript plugin in your text editor. 

	Here is an example of creating and initializing the Studio System.
```typescript
import { FMOD, IFMOD } from 'path/to/IFMOD';

FMOD.preRun = yourPrerunFunction;
FMOD.onRuntimeInitialized = main;
FMOD.TOTAL_MEMORY = 64*1024*1024; // 64 mb
FMODModule(FMOD);


function main() {
	let outval: any = {};
	IFMOD.Studio_System_Create(outval); // namespace-level function
	let studioSystem = outval.val as IFMOD.StudioSystem;
	studioSystem.initialize(128, IFMOD.STUDIO_INITFLAGS.NORMAL, IFMOD.INITFLAGS.NORMAL, null);
}
```
Most references to the FMOD namespace can now be 'typed' to the corresponding interface from the IFMOD namespace. If you find the outval object strange, it's a side-result of the differences of language features between C/C++ and JS. FMOD cannot pass 'out' handles as it does in C/C++/C# so instead it passes handles to the parameter by injecting a property named 'val' into the passed object.

IFMOD also contains a helper function, CHECK_RESULT, that makes use of FMOD's verbose error checking. The first parameter is the executed function, and a second is a string you pass describing what FMOD is doing. This is made possible because every function in FMOD returns an FMOD.RESULT value. The string is just to help you locate the context of your error. This function will currently send an alert should FMOD encounter a problem with a specific task.

```typescript
import { CHECK_RESULT } from 'path/to/IFMOD';

CHECK_RESULT( studioSystem.initialize(128, IFMOD.STUDIO_INITFLAGS.NORMAL, IFMOD.INITFLAGS.NORMAL, null), 
	'initializing studio system');
```


- Here is a full example of sound playing. This example assumes we have the files 'Master Bank.bank' and 'Master Bank.strings.bank' containing an event called 'Music' [preloaded into FMOD's file system during FMOD.preRun](https://www.fmod.com/resources/documentation-api?version=2.0&page=platforms-html5.html#file-access), and also that we have the [Chrome/Safari audio context workaround](https://www.fmod.com/resources/documentation-api?version=2.0&page=platforms-html5.html#safari-and-chrome-browser-user-interaction-requirement-use-for-all-browsers) in place should we be using either of those browsers. Please check the documentation for more info.

```typescript
import { FMOD, IFMOD, CHECK_RESULT } from 'path/to/IFMOD';

FMOD.preRun = preRun;
FMOD.onRuntimeInitialized = main;
FMOD.TOTAL_MEMORY = 64*1024*1024; // 64 mb
FMODModule(FMOD);


function main() {
	let outval: any = {};
	IFMOD.Studio_System_Create(outval);
	let studioSystem = outval.val as IFMOD.StudioSystem;
	
	CHECK_RESULT( studioSystem.initialize(128, IFMOD.STUDIO_INITFLAGS.NORMAL, IFMOD.INITFLAGS.NORMAL, null),
		'creating studio system');

	CHECK_RESULT( studioSystem.loadBankFile('Master Bank.bank', outval),
		'loading Master Bank.bank');
	CHECK_RESULT( studioSystem.loadBankFile('Master Bank.strings.bank', outval),
		'loading Master Bank.strings.bank');

	CHECK_RESULT( studioSystem.getEvent('event:/Music', outval),
		'getting Music event from studio system');
	let eventDescription = outval.val as IFMOD.EventDescription;
	
	CHECK_RESULT( eventDescription.createInstance(outval),
		'creating event instance');

	let instance = outval.val as IFMOD.EventInstance;

	CHECK_RESULT( instance.start(), 'starting event instance');

	// Update the system every 1/60th of a second.
	setInterval(() => { 
		CHECK_RESULT( studioSystem.update(), 'updating studio system');
	}, 16.67);
}

function preRun() {
	// PreRun fileloading here
}

```

Note: This is still a work in progress, currently upgrading from version 1.12. Most basic functionality should be working.
