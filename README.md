FMOD Studio TypeScript Definitions
=====================
This is a TypeScript definition file for the HTML5 version of FMOD Studio (version 2.00.04), which allows the benefits of static type checking and autocompletion for work in fmodstudio.js and TypeScript. 

For anyone new to the FMOD Studio API in HTML5 or TypeScript, here is a [starter tutorial](./StarterTutorial.md).

Usage
----------------------

Download the index.d.ts from this repository and drop it where fmodstudio.js is located in your project. Double-check that it is included in your tsconfig.json file. Once it is, the FMOD types should be recognized globally.

Annotate the type of the FMOD object instance
```typescript
const fmod: FMOD = {};
```
Note: Do not name your FMOD object 'FMOD' since it will clash with the FMOD namespace type definitions.

Assert out-values to their corresponding types.
```typescript
let outval: any = {};
fmod.Studio_System_Create(outval);
const studioSystem = outval.val as FMOD.StudioSystem;
```

FMOD constant bit flags have been converted to TypeScript constant enums, so what would normally be:
```typescript
let flag = fmod.STUDIO_EVENT_CALLBACK_TYPE_TIMELINE_BEAT;
```
...is now
```typescript
let flag = FMOD.STUDIO_EVENT_CALLBACK_TYPE.TIMELINE_BEAT;
```
This allows using these enums as static types in TypeScript, while the compiler will convert them to the appropriate number in JavaScript.

Feel great that you have type-checking and quick access to (almost) the entire FMOD API :)


