const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const obfuscator = require('javascript-obfuscator');
const { swcPlugin } = require('esbuild-plugin-swc');
const { TsconfigPathsPlugin } = require('@esbuild-plugins/tsconfig-paths');

const shouldObfuscate = process.argv.includes('--obfuscate');

const buildClient = async () => {
    console.log(`[build] [client] starting build...`);

    const buildStart = Date.now();

    await esbuild.build({
        entryPoints: ['../src/client/client.ts'],
        bundle: true,
        outfile: '../../build/cl_main.js',
        plugins: [
            swcPlugin({
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: false,
                        decorators: false,
                        dynamicImport: false
                    },
                    loose: false,
                    externalHelpers: false,
                    keepClassNames: false
                },
                env: {
                    include: [
                        "transform-async-to-generator",
                        "transform-regenerator"
                    ]
                },
                minify: false
            }),
            TsconfigPathsPlugin({
                tsconfig: path.resolve(__dirname, 'src/client/tsconfig.json')
            })
        ]
    }).then((result) => {
        if (!shouldObfuscate) {
            const timeTaken = Date.now() - buildStart;
            const timeDisplay = timeTaken < 1000 ? `${timeTaken}ms` : `${timeTaken / 1000}s`;
            return console.log(`[build] [client] build complete | took: ${timeDisplay}`);
        }

        const bundleContent = fs.readFileSync('../../build/cl_main.js', 'utf8');
        const filePath = path.resolve(__dirname, '../../build/cl_main.js');

        // const obfuscationStart = Date.now();

        const obfuscatedCode = obfuscator.obfuscate(bundleContent, {
            compact: true,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 1,
            stringArrayEncoding: ['rc4'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 15,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 15,
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 1,
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        }).getObfuscatedCode();

        fs.writeFileSync(filePath, obfuscatedCode);

        // console.log(`[build] [client] obfuscation complete | took: ${(Date.now() - obfuscationStart) / 1000}s`);

        const timeTaken = Date.now() - buildStart;
        const timeDisplay = timeTaken < 1000 ? `${timeTaken}ms` : `${timeTaken / 1000}s`;

        console.log(`[build] [client] build and obfuscation complete | took: ${timeDisplay}`);
    });
};

const buildServer = async () => {
    console.log(`[build] [server] starting build...`);

    const buildStart = Date.now();

    await esbuild.build({
        entryPoints: ['../src/server/server.ts'],
        bundle: true,
        outfile: '../../build/sv_main.js',
        plugins: [
            swcPlugin({
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        tsx: false,
                        decorators: false,
                        dynamicImport: false
                    },
                    loose: false,
                    externalHelpers: false,
                    keepClassNames: false
                },
                env: {
                    include: [
                        "transform-async-to-generator",
                        "transform-regenerator"
                    ]
                },
                minify: false
            }),
            TsconfigPathsPlugin({
                tsconfig: path.resolve(__dirname, 'src/server/tsconfig.json')
            })
        ]
    }).then((result) => {
        if (!shouldObfuscate) {
            const timeTaken = Date.now() - buildStart;
            const timeDisplay = timeTaken < 1000 ? `${timeTaken}ms` : `${timeTaken / 1000}s`;
            return console.log(`[build] [server] build complete | took: ${timeDisplay}`);
        }

        const bundleContent = fs.readFileSync('../../build/sv_main.js', 'utf8');
        const filePath = path.resolve(__dirname, '../../build/sv_main.js');

        // const obfuscationStart = Date.now();

        const obfuscatedCode = obfuscator.obfuscate(bundleContent, {
            compact: true,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: false,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 1,
            stringArrayEncoding: ['rc4'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 15,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 15,
            stringArrayWrappersType: 'function',
            stringArrayThreshold: 1,
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        }).getObfuscatedCode();

        fs.writeFileSync(filePath, obfuscatedCode);

        // console.log(`[build] [server] obfuscation complete | took: ${(Date.now() - obfuscationStart) / 1000}s`);

        const timeTaken = Date.now() - buildStart;
        const timeDisplay = timeTaken < 1000 ? `${timeTaken}ms` : `${timeTaken / 1000}s`;

        console.log(`[build] [server] build and obfuscation complete | took: ${timeDisplay}`);
    });
};

(() => {
    if (fs.existsSync('../../build')) {
        console.log(`[build] removing old build...`);
        fs.rmSync('../../build', { recursive: true });
    }

    buildClient();
    buildServer();
})();