const mix = require('laravel-mix')
const baseUrl = process.env.BASE_URL

//*** PUBLIC WEBSITE ***//

mix.setPublicPath('./web')
.sass('src/sass/main.scss', 'web/assets/css/main.css')
.options({
  processCssUrls: false,
})
.minify('web/assets/css/main.css')
.minify('src/js/site.js', 'web/assets/js/site.min.js')
.browserSync({
  files: ['web/css/*', 'web/js/*'],
  proxy: baseUrl,
  notify: false,
})
.version()
.disableNotifications()


//*** NEW PAGES WEBSITE ***//

mix.setPublicPath('./web')
.sass('src/sass/webpages.scss', 'web/assets/css/webpages.css')
.options({
  processCssUrls: false,
})
.minify('web/assets/css/webpages.css')
.minify('src/js/webpages.js', 'web/assets/js/webpages.min.js')
.browserSync({
  files: ['web/css/*', 'web/js/*'],
  proxy: baseUrl,
  notify: false,
})
.version()
.disableNotifications()