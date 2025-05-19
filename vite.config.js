import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css',
                 'resources/js/app.js',
                 'resources/assets/imgs/sword_selectorNBG.png',
                 'resources/assets/imgs/RISK_NBG.png',
                 'resources/assets/imgs/Riskgame_logo.png',
                 ],
            refresh: true,
        }),
    ],
    build: {
        manifest: true,
        outDir: 'public/build',
        assetsDir: 'assets',
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
});
