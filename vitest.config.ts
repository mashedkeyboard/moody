import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, type UserConfig as VitestConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    svelte({ hot: !process.env.VITEST }),
    tsconfigPaths()
  ],
  test: {
    // jest like globals
    globals: true,
    environment: 'jsdom',
    // in-source testing
    includeSource: ['src/**/*.{js,ts,svelte}'],
    // Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
    setupFiles: ['./setupTest.ts'],
    // Exclude files in c8
    coverage: {
      exclude: ['setupTest.ts']
    },
    // Exclude playwright tests folder
    exclude: [...configDefaults.exclude, 'tests', 'tests-examples']
  }
})