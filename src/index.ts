import { join as joinPath } from 'path';

let isDevMode;

/* eslint-disable-next-line */
// @ts-ignore
if (process[Symbol.for('ts-node.register.instance')]) {
	isDevMode = true;
}

/**
 * Import a file dynamically.
 * 	While running through ts-node, the file will be referenced as a relative
 * 		path from the CWD
 *	While running through node, the file will be referenced relative to `dist/`
 *
 * Set the process env variable TS_DIST_DIR to override the `dist/` path
 *
 * @param file Relative file path
 * @param name (Optional) Export name to return (Defaults to default export).
 * 	Set to null to return all parts of import
 * @returns Returns the default export
 */
export function tsimport<T>(file: string, name: null | string = 'default'): T {
	const wd = process.cwd();
	const distDir = process.env.TS_DIST_DIR ?? 'dist';

	if (isDevMode) {
		file = joinPath(wd, file);
	}
	else {
		file = file.replace('.ts', '.js');
		file = joinPath(wd, distDir, file);
	}

	let module;

	try {
		/* eslint-disable-next-line @typescript-eslint/no-var-requires */
		module = require(file);
	}
	catch (e) {
		throw new Error(`Could not import file ${file}: ${e.message}`);
	}

	if (name === null) {
		return module;
	}

	if (!(name in module)) {
		throw new Error(`Import "${file}" does not export "${name}"`);
	}

	return module[name];
}
