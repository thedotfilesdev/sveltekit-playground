import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    alias: {
      '$components/*': 'src/components/*',
      '$lib/*': 'src/lib/*'
    },
    adapter: adapter()
  }
};

export default config;
