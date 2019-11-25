const del = require('del');

del.sync([
    'public/js/**',
    'public/precache-manifest.*',
    'public/sw.js',
    'public/index.html',
]);
