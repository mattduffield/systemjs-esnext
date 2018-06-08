export class ChildRouter {
  heading = 'Child Router';

  configureRouter(config, router) {
    config.map([
      {route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome'},
      {route: 'users', name: 'users', moduleId: 'views/users/users', nav: true, title: 'Github Users'},
      {route: 'child-router', name: 'child-router',  moduleId: 'views/child-router/child-router',  nav: true, title: 'Child Router'}
    ]);

    this.router = router;
  }
}
