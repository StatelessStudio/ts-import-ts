# ts-import-ts - Readme

Load TS files when running through ts-node, but load the compiled JS files when running through node. Great for typescript applications which dynamically load files (e.g. database migrations, etc.)

## Installation

`npm i ts-import-ts`

## Basic Usage

Create the file you would like to import. **Make sure to export default (or see section on named exports below)**

`test/sample/sample.ts`
```typescript
export default class Sample {
	public foo = 'bar';
}
```

And load the file:

`src/index.ts`
```typescript
import { tsimport } from 'ts-import-ts';

const sampleClass: any = tsimport('test/sample/sample');
const sampleObject = new sampleClass();

console.log(sampleObject.foo); // Output: bar
```

## Advanced Usage w/ Type Safety

Pass a type parameter to `tsimport` to strongly-type the return value. In this example, tsimport will return `foo`.

`test/sample/sample.ts`
```typescript
const foo: string = 'bar';
export default foo;
```

`src/index.ts`
```typescript
import { tsimport } from 'ts-import-ts';

// Importing and typing the return value as a string
const sampleFoo = tsimport<string>('test/sample/sample');
console.log(sampleFoo); // Output: bar
```

## Advanced Usage w/ Inheritance

Create a base-class: 

`src/cool-file.ts`
```typescript
export class CoolFile {
	foo: string;
}
```

Extend the class in the files you'd like to load:

`cool-files/first.ts`
```typescript
import { CoolFile } from '../src/cool-file';

export class FirstCoolFile extends CoolFile {
	foo = 'bar';
}
```

Load the files, typing the import as `typeof CoolFile`:

`src/index.ts`
```typescript
import { tsimport } from 'ts-import-ts';
import { CoolFile } from './cool-file';

const loaded = tsimport<typeof CoolFile>('cool-files/first');
const sampleObject = new loaded();

console.log(sampleObject.foo); // Output: bar
```

## Named Imports

If a file outputs multiple things, or you don't want to `export default`, you may pass a name to import as the second argument:

`test/sample/sample.ts`
```typescript
export const foo = 'bar';
```

`src/index.ts`
```typescript
import { tsimport } from 'ts-import-ts';

// Importing a named export
const namedImport = tsimport('test/sample/sample', 'foo');
console.log(namedImport); // Output: bar
```

## Import All 

Pass null as a second argument to load an object with all exported things:

`test/sample/sample.ts`
```typescript
export const foo = 'bar';
export const baz = 'buzz';
```

`src/index.ts`
```typescript
import { tsimport } from 'ts-import-ts';

const imported = tsimport('test/sample/sample', null);

console.log(imported) // Output: { foo: 'bar', baz: 'buzz' }
```

## Contributing & Development

See [contributing.md](docs/contributing/contributing.md) for information on how to develop or contribute to this project!
