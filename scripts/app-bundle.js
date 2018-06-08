define('views/welcome/welcome',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Welcome = exports.Welcome = function () {
    function Welcome() {
      _classCallCheck(this, Welcome);

      this.heading = 'Welcome to the Aurelia Navigation App';
      this.firstName = 'John';
      this.lastName = 'Doe';
      this.previousValue = this.fullName;
    }

    Welcome.prototype.submit = function submit() {
      this.previousValue = this.fullName;
      alert('Welcome, ' + this.fullName + '!');
    };

    Welcome.prototype.canDeactivate = function canDeactivate() {
      if (this.fullName !== this.previousValue) {
        return confirm('Are you sure you want to leave?');
      }
    };

    _createClass(Welcome, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }]);

    return Welcome;
  }();

  var UpperValueConverter = exports.UpperValueConverter = function () {
    function UpperValueConverter() {
      _classCallCheck(this, UpperValueConverter);
    }

    UpperValueConverter.prototype.toView = function toView(value) {
      return value && value.toUpperCase();
    };

    return UpperValueConverter;
  }();
});
define('views/welcome/welcome.html!text', ['module'], function(module) { module.exports = "<template><section class=au-animate><h2>${heading}</h2><form role=form submit.delegate=submit()><div class=form-group><label for=fn>First Name</label><input type=text value.bind=firstName class=form-control id=fn placeholder=\"first name\"></div><div class=form-group><label for=ln>Last Name</label><input type=text value.bind=lastName class=form-control id=ln placeholder=\"last name\"></div><div class=form-group><label>Full Name</label><p class=help-block>${fullName | upper}</p></div><button type=submit class=\"btn btn-default\">Submit</button></form></section></template>"; });
define('views/users/users',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Users(http) {
      _classCallCheck(this, Users);

      this.heading = 'Github Users';
      this.users = [];

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
    }

    Users.prototype.activate = function activate() {
      var _this = this;

      return this.http.fetch('users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    };

    return Users;
  }()) || _class);
});
define('views/users/users.html!text', ['module'], function(module) { module.exports = "<template><require from=blur-image></require><section class=au-animate><h2>${heading}</h2><div class=\"row au-stagger\"><div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\"><div class=card><canvas class=header-bg width=250 height=70 blur-image.bind=image></canvas><div class=avatar><img src.bind=user.avatar_url crossorigin ref=image></div><div class=content><p class=name>${user.login}</p><p><a target=_blank class=\"btn btn-default\" href.bind=user.html_url>Contact</a></p></div></div></div></div></section></template>"; });
define('views/child-router/child-router',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChildRouter = exports.ChildRouter = function () {
    function ChildRouter() {
      _classCallCheck(this, ChildRouter);

      this.heading = 'Child Router';
    }

    ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'views/users/users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'views/child-router/child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return ChildRouter;
  }();
});
define('views/child-router/child-router.html!text', ['module'], function(module) { module.exports = "<template><section class=au-animate><h2>${heading}</h2><div><div class=col-md-2><ul class=\"well nav nav-pills nav-stacked\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a href.bind=row.href>${row.title}</a></li></ul></div><div class=col-md-10 style=padding:0><router-view></router-view></div></div></section></template>"; });
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources([]);
  }
});
define('nav-bar.html!text', ['module'], function(module) { module.exports = "<template bindable=router><nav class=\"navbar navbar-default navbar-fixed-top\" role=navigation><div class=navbar-header><button type=button class=navbar-toggle data-toggle=collapse data-target=#skeleton-navigation-navbar-collapse><span class=sr-only>Toggle Navigation</span><span class=icon-bar></span><span class=icon-bar></span><span class=icon-bar></span></button><a class=navbar-brand href=/ ><i class=\"fa fa-home\"></i><span>${router.title}</span></a></div><div class=\"collapse navbar-collapse\" id=skeleton-navigation-navbar-collapse><ul class=\"nav navbar-nav\"><li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\"><a data-toggle=collapse data-target=#skeleton-navigation-navbar-collapse.in href.bind=row.href>${row.title}</a></li></ul><ul class=\"nav navbar-nav navbar-right\"><li class=loader if.bind=router.isNavigating><i class=\"fa fa-spinner fa-spin fa-2x\"></i></li></ul></div></nav></template>"; });
define('main',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging().feature('resources').plugin('aurelia-dialog', function (config) {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 5;
      config.settings.keyboard = true;
    });

    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('dialogs/confirm-delete-dialog',['exports', 'aurelia-dialog'], function (exports, _aureliaDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ConfirmDeleteDialog = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var ConfirmDeleteDialog = exports.ConfirmDeleteDialog = (_temp = _class = function () {
    function ConfirmDeleteDialog(controller) {
      _classCallCheck(this, ConfirmDeleteDialog);

      this.model = {};

      this.controller = controller;
    }

    ConfirmDeleteDialog.prototype.activate = function activate(model) {
      this.model = model;
    };

    return ConfirmDeleteDialog;
  }(), _class.inject = [_aureliaDialog.DialogController], _temp);
});
define('dialogs/confirm-delete-dialog.html!text', ['module'], function(module) { module.exports = "<template><ux-dialog><ux-dialog-header>${model.header}</ux-dialog-header><ux-dialog-body> ${model.prompt} </ux-dialog-body><ux-dialog-footer><button class=\"btn btn-default btn-dlg\" click.trigger=controller.cancel()>Cancel</button><button class=\"btn btn-primary btn-dlg\" click.trigger=controller.ok(true)>OK</button></ux-dialog-footer></ux-dialog></template>"; });
define('blur-image',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BlurImageCustomAttribute = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var BlurImageCustomAttribute = exports.BlurImageCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
		function BlurImageCustomAttribute(element) {
			_classCallCheck(this, BlurImageCustomAttribute);

			this.element = element;
		}

		BlurImageCustomAttribute.prototype.valueChanged = function valueChanged(newImage) {
			var _this = this;

			if (newImage.complete) {
				drawBlur(this.element, newImage);
			} else {
				newImage.onload = function () {
					return drawBlur(_this.element, newImage);
				};
			}
		};

		return BlurImageCustomAttribute;
	}()) || _class);


	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

	var BLUR_RADIUS = 40;

	function stackBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
		if (isNaN(radius) || radius < 1) return;
		radius |= 0;

		var context = canvas.getContext("2d");
		var imageData;

		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch (e) {
			throw new Error("unable to access image data: " + e);
		}

		var pixels = imageData.data;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

		var div = radius + radius + 1;
		var w4 = width << 2;
		var widthMinus1 = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1 = radius + 1;
		var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

		var stackStart = new BlurStack();
		var stack = stackStart;
		for (i = 1; i < div; i++) {
			stack = stack.next = new BlurStack();
			if (i == radiusPlus1) var stackEnd = stack;
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;

		yw = yi = 0;

		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];

		for (y = 0; y < height; y++) {
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			for (i = 1; i < radiusPlus1; i++) {
				p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
				r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;
			}

			stackIn = stackStart;
			stackOut = stackEnd;
			for (x = 0; x < width; x++) {
				pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa != 0) {
					pa = 255 / pa;
					pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

				r_in_sum += stackIn.r = pixels[p];
				g_in_sum += stackIn.g = pixels[p + 1];
				b_in_sum += stackIn.b = pixels[p + 2];
				a_in_sum += stackIn.a = pixels[p + 3];

				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		for (x = 0; x < width; x++) {
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

			yi = x << 2;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			yp = width;

			for (i = 1; i <= radius; i++) {
				yi = yp + x << 2;

				r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;

				if (i < heightMinus1) {
					yp += width;
				}
			}

			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for (y = 0; y < height; y++) {
				p = yi << 2;
				pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

				r_sum += r_in_sum += stackIn.r = pixels[p];
				g_sum += g_in_sum += stackIn.g = pixels[p + 1];
				b_sum += b_in_sum += stackIn.b = pixels[p + 2];
				a_sum += a_in_sum += stackIn.a = pixels[p + 3];

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += width;
			}
		}

		context.putImageData(imageData, top_x, top_y);
	}

	function BlurStack() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	function drawBlur(canvas, image) {
		var w = canvas.width;
		var h = canvas.height;
		var canvasContext = canvas.getContext('2d');
		canvasContext.drawImage(image, 0, 0, w, h);
		stackBlurCanvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
	};
});
define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'systemjs-esnext';
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'views/users/users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'views/child-router/child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return App;
  }();
});
define('app.html!text', ['module'], function(module) { module.exports = "<template><require from=./app.css></require><require from=./nav-bar.html></require><div class=flex-column-1><div class=flex-column-none><nav-bar class=flex-row-1 router.bind=router></nav-bar><user-settings class=flex-row-none></user-settings></div><div class=page-host view-spy=\"\"><router-view></router-view></div></div></template>"; });
define('app.css!text', ['module'], function(module) { module.exports = "body {\n  margin: 0;\n}\n\n.splash {\n  text-align: center;\n  margin: 10% 0 0 0;\n  box-sizing: border-box;\n}\n\n.splash .message {\n  font-size: 72px;\n  line-height: 72px;\n  text-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;\n  text-transform: uppercase;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.splash .fa-spinner {\n  text-align: center;\n  display: inline-block;\n  font-size: 72px;\n  margin-top: 50px;\n}\n\n.page-host {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50px;\n  bottom: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n@media print {\n  .page-host {\n    position: absolute;\n    left: 10px;\n    right: 0;\n    top: 50px;\n    bottom: 0;\n    overflow-y: inherit;\n    overflow-x: inherit;\n  }\n}\n\nsection {\n  margin: 0 20px;\n}\n\n.navbar-nav li.loader {\n  margin: 12px 24px 0 6px;\n}\n\n.pictureDetail {\n  max-width: 425px;\n}\n\n/* animate page transitions */\nsection.au-enter-active {\n  -webkit-animation: fadeInRight 1s;\n  animation: fadeInRight 1s;\n}\n\ndiv.au-stagger {\n  /* 50ms will be applied between each successive enter operation */\n  -webkit-animation-delay: 50ms;\n  animation-delay: 50ms;\n}\n\n.card-container.au-enter {\n  opacity: 0;\n}\n\n.card-container.au-enter-active {\n  -webkit-animation: fadeIn 2s;\n  animation: fadeIn 2s;\n}\n\n.card {\n  overflow: hidden;\n  position: relative;\n  border: 1px solid #CCC;\n  border-radius: 8px;\n  text-align: center;\n  padding: 0;\n  background-color: #337ab7;\n  color: rgb(136, 172, 217);\n  margin-bottom: 32px;\n  box-shadow: 0 0 5px rgba(0, 0, 0, .5);\n}\n\n.card .content {\n  margin-top: 10px;\n}\n\n.card .content .name {\n  color: white;\n  text-shadow: 0 0 6px rgba(0, 0, 0, .5);\n  font-size: 18px;\n}\n\n.card .header-bg {\n  /* This stretches the canvas across the entire hero unit */\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 70px;\n  border-bottom: 1px #FFF solid;\n  border-radius: 6px 6px 0 0;\n}\n\n.card .avatar {\n  position: relative;\n  margin-top: 15px;\n  z-index: 100;\n}\n\n.card .avatar img {\n  width: 100px;\n  height: 100px;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  border-radius: 50%;\n  border: 2px #FFF solid;\n}\n\n/* animation definitions */\n@-webkit-keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0)\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none\n  }\n}\n\n@keyframes fadeInRight {\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    -ms-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0)\n  }\n  100% {\n    opacity: 1;\n    -webkit-transform: none;\n    -ms-transform: none;\n    transform: none\n  }\n}\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n"; });
//# sourceMappingURL=app-bundle.js.map