require('esbuild')
  .build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    outfile: 'public/feno.js',
    watch: process.argv.includes('--watch'),
    minifyWhitespace: !process.argv.includes('--watch'),
    minify: !process.argv.includes('--watch'),
  })
  .catch(() => process.exit(1));
