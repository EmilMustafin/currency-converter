import path from 'path';

import vue from '@vitejs/plugin-vue';
import { UserConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

const config: UserConfig = {
    plugins: [
        vue(),
        checker({
            typescript: true,
            vueTsc: true,
        }),
    ],
    build: {
        outDir: './build',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
};

export default config;
