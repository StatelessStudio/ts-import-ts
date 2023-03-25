import 'jasmine';
import { tsimport } from '../../src';
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
		expect(tsimport<any>('test/sample/named-exports', null)).toEqual({
			foo: 'bar',
			baz: 'buzz',
		});
	});
});
