export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .feature('resources')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
      config.settings.keyboard = true;
    });

  aurelia.start().then(a => a.setRoot());
}
