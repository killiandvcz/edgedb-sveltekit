import adapter from '@sveltejs/adapter-auto';
import autoPreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: autoPreprocess(),
	kit: {
		adapter: adapter()
	}
};

export default config;
