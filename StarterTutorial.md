FMOD Studio TypeScript Definitions Tutorial
=====================

###Familiar with JavaScript, but new to TypeScript?

Here's a helpful [starter's guide](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) that will help you install TypeScript on your system and understand basic type annotation.

###New to the FMOD Studio API?

Here's a general [starting point](https://fmod.com/resources/documentation-api?version=2.0&page=studio-guide.html) in the documentation, and an [*HTML5 Specific Starter Guide*](https://www.fmod.com/resources/documentation-api?version=2.0&page=platforms-html5.html#start-up-code) using JavaScript. The tutorial written below will follow the set up code in those links.

If you already know how to use fmodstudio.js, please take a glance at the code examples to get an idea of working with FMOD and TypeScript.
In short you just need to drop the .d.ts file into your project and start labeling types.



###Requirements

1. You will need a text editor, one that preferably can provide TypeScript syntax highlighting and intellisense. VSCode is a great option since it comes with these things out of the box.

2. You will need the TypeScript compiler installed globally. This can be done by following the TypeScript starter tutorial above. 

3. You will need a locally hosted web server using [WAMP](https://www.wampserver.com/en/) or another service that will run a web server locally on your system. Web browsers block the ability for sites to access a computer's local file system, but a locally hosted server will grant the permission we need to run FMOD Studio.

###Setup

1. Download the [HTML5 version of FMOD Studio API 2.00.04](https://www.fmod.com/download). You will be required to log in to access the downloads page. Save fmodstudio.js and fmodstudio.js.mem in a folder in your project root directory.

2. Download index.d.ts from this repository, and put it inside of the same folder as fmodstudio.js. Make sure that this folder is included in your tsconfig.json file. 

	(Note: Since this project is still under construction, everything has not been typed yet, so you will need to set "strict" to false under "compilerOptions" in tsconfig.json to prevent TypeScript from throwing errors for now.)

3. Create your own .ts file, on which the majority of this tutorial will be focused. Let's test to see if TypeScript is set up correctly by running the 'tsc' command in the terminal. A new file with the same name, but with a '.js' extension should appear in our project.

4. Create a new HTML file in your root directory and in it, add script tags for both fmodstudio.js and your own .ts file. We will actually reference the .ts file with a .js extension, since the web browser only understands .js, and we will be using the TypeScript compiler to build this file for us.

	Note: fmodstudio.js.mem should be in the same directory as fmodstudio.js, but will be used automatically, and need not any more of our attention.


###Initializing FMOD

Once things are set up, the rest of the tutorial will focus on programming using the FMOD Studio API with TypeScript definitions. In our newly created .ts file, let's start by initializing a blank FMOD object, with the type 'FMOD'. This is the object we will use to initialize and create the FMOD Studio System.

```typescript
const fmod: FMOD = {};
```

Note: You shouldn't name this object 'FMOD' since it will interfere with TypeScript's recognition of the FMOD namespace definitions. (It is an instance of an FMOD object after all.)

From here, we can prepare the FMOD object the way we'd normally set it up in JavaScript. The main difference is that as you enter the code, you should see auto-completion suggestions with the property definitions popping up.

```typescript
const fmod: FMOD = {
	TOTAL_MEMORY: 24 * 1024 * 1024,
	preRun: preRun,
	onRuntimeInitialized : main
};

FMODModule(fmod); // Initialize the fmod object

// === Callbacks ===
function preRun() {
	// not implemented yet
}

function main() {
	// not implemented yet
}
```
At this point, it may be a good idea to put console.log statements in each event (preRun, onRuntimeInitialized) to see if FMOD is loading correctly in your local web server.

###Preloading Bank Files

Now let's implement our initialization logic in the two events, starting with 'preRun'.

```typescript
const fmod: FMOD = {
	TOTAL_MEMORY: 24 * 1024 * 1024,
	preRun: preRun,
	onRuntimeInitialized : main
};

FMODModule(fmod); // Initialize the fmod object

// === Callbacks ===
function preRun() {
	console.log('FMOD preRun. Mounting files...');
	fmod.FS_createPreloadedFile('/', 'Master Bank.bank', 'banks/Master Bank.bank', true, false);
	fmod.FS_createPreloadedFile('/', 'Master Bank.strings.bank', 'banks/Master Bank.strings.bank', true, false);
}

function main() {
	console.log('Runtime Initialized!');
}
```

In order to access files during runtime, we will need to preload them into FMOD's file system. In the code above, we've set up our two files 'Master Bank.bank' and 'Master Bank.strings.bank', located in a folder titled 'banks', now ready to go.

Note: The strings bank isn't necessary, but it allows us to access events, snapshots, parameters, banks, busses, etc. via their readable string names instead of using 32-hex digit GUIDs.

###Initializing the Studio System

Now for our main function. 
```typescript
function main() {
	let outval: any = {};
}
```
We first need to create an object that will pass out other objects. This is a workaround that is due to the architecture of the FMOD Studio API and differences between C/C++ and JavaScript. In FMOD Studio, every function returns an FMOD.RESULT for error checking, therefore all other returned values are passed out of function parameters. C/C++, which FMOD is built in allows you to do this directly, but not so JavaScript. Since fmodstudio.js cannot pass 'out' direct handles as it does in C/C++/C#, it injects handles into a property inside of the passed object named 'val'. Therefore we can retrieve the value from the 'val' property like so:
```typescript
function main() {
	let outval: any = {};
	fmod.Studio_System_Create(outval);
	let system = outval.val;
}
```
We have just created our Studio System. However, the compiler isn't certain what type of object it is so we need to assert its type. This a caveat of HTML5 FMOD, and makes it very important to read the function definition of passed-out types, and accurately assert it to that corresponding type.
```typescript
	let system = outval.val as FMOD.StudioSystem;
```

###Making Some Music

The rest of set up uses the same principles. Here is the rest of main. Feel free to copy/paste the code and hover over type definitions provided by TypeScript.

```typescript
function main() {
	console.log('Runtime Initialized!');
	let outval: any = {};
	fmod.Studio_System_Create(outval);
	let system = outval.val as FMOD.StudioSystem;

	system.initialize(128, FMOD.STUDIO_INITFLAGS.NORMAL, FMOD.INITFLAGS.NORMAL, null);

	system.loadBankFile('Master Bank.bank', FMOD.STUDIO_LOAD_BANK_FLAGS.NORMAL, outval);
	system.loadBankFile('Master Bank.strings.bank', FMOD.STUDIO_LOAD_BANK_FLAGS.NORMAL, outval);

	system.getEvent('event:/Music', outval);
	let desc = outval.val as FMOD.EventDescription;
	desc.createInstance(outval);
	let inst = outval.val as FMOD.EventInstance;
	inst.start();

	setInterval(() => {
		system.update();
	}, 1000/60);
}
````
To summarize the code above, we have created and initialized our FMOD Studio System, loaded our banks, and then retrieved and started an event called 'Music'. After that, we set an Interval that updates our system 60 times per second. The StudioSystem must be updated at a relatively quick frequency in order for sound to play correctly in FMOD. At the very end is an audio workaround for Chrome/iOS as mentioned in the HTML5 FMOD guide.

Now we just need to build using the TypeScript compiler, open our HTML file in our local host... and there we have it, a basic sound in FMOD using TypeScript definitions!

Here's the entire TypeScript file for reference
```typescript
const fmod: FMOD = {
	TOTAL_MEMORY: 24 * 1024 * 1024,
	preRun: preRun,
	onRuntimeInitialized : main
};

FMODModule(fmod); // Initialize the fmod object

// === Callbacks ===
function preRun() {
	console.log('FMOD preRun. Mounting files...');
	fmod.FS_createPreloadedFile('/', 'Master Bank.bank', 'banks/Master Bank.bank', true, false);
	fmod.FS_createPreloadedFile('/', 'Master Bank.strings.bank', 'banks/Master Bank.strings.bank', true, false);
}

function main() {
	console.log('Runtime Initialized!');
	let outval: any = {};
	fmod.Studio_System_Create(outval);
	let system = outval.val as FMOD.StudioSystem;

	system.initialize(128, FMOD.STUDIO_INITFLAGS.NORMAL, FMOD.INITFLAGS.NORMAL, null);

	system.loadBankFile('Master Bank.bank', FMOD.STUDIO_LOAD_BANK_FLAGS.NORMAL, outval);
	system.loadBankFile('Master Bank.strings.bank', FMOD.STUDIO_LOAD_BANK_FLAGS.NORMAL, outval);

	system.getEvent('event:/Music', outval);
	let desc = outval.val as FMOD.EventDescription;
	desc.createInstance(outval);
	let inst = outval.val as FMOD.EventInstance;
	inst.start();

	setInterval(() => {
		system.update();
	}, 1000/60);

	function chromeIOSWorkaround() {
		let outval: any = {};
		system.getCoreSystem(outval);
		let core = outval.val as FMOD.System;
		core.suspendMixer
	}
	window.addEventListener('click', chromeIOSWorkaround)
}
````
