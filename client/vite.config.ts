import suidPlugin from '@suid/vite-plugin';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [
        // import.meta.env.MODE === 'development' && devtools(),
        suidPlugin(),
        solidPlugin()
    ],
    server: {
        port: 3001
    },
    build: {
        target: 'es2022'
    },
    resolve: {
        alias: {
            '@assets': __dirname + '/src/assets',
            '@login': __dirname + '/src/login',
            '@navigation': __dirname + '/src/navigation'
        }
    }
});
