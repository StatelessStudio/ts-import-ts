import 'jasmine';
import { tsimport, tsimportDirectory } from '../../src';
import Sample from '../sample/sample';

describe('ts-import-ts', () => {
	it('can load a class', () => {
		const sampleClass = tsimport<typeof Sample>('test/sample/sample');
		const sampleObject = new sampleClass();

		expect(sampleObject.foo).toEqual('bar');
	});

	it('can use named imports', () => {
		expect(tsimport<string>('test/sample/named-exports', 'foo')).toEqual(
			'bar'
		);
	});

	it('can use null-named imports', () => {
		const imported = tsimport<Record<string, string>>(
			'test/sample/named-exports',
			null
		);

		expect(imported).toEqual({
			foo: 'bar',
			baz: 'buzz',
		});
	});

	it('can import a directory', () => {
		const files = tsimportDirectory<string>('test/sample-dir');

		expect(Array.isArray(files)).toBeTrue();
		expect(files.length).toEqual(2);
		expect(files[0]).toEqual('foo');
		expect(files[1]).toEqual('bar');
	});
});
