import 'jasmine';
import * as index from '../../src';

describe('ts-import-ts', () => {
	it('exports a', () => {
		expect(index.a).toBeTrue();
	});
});
