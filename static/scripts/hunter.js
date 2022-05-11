/******/ (function (modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.l = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = modules;
  /******/
  /******/ // expose the module cache
  /******/ __webpack_require__.c = installedModules;
  /******/
  /******/ // define getter function for harmony exports
  /******/ __webpack_require__.d = function (exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        /******/ configurable: false,
        /******/ enumerable: true,
        /******/ get: getter,
        /******/
      });
      /******/
    }
    /******/
  };
  /******/
  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/ __webpack_require__.n = function (module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module["default"];
          }
        : /******/ function getModuleExports() {
            return module;
          };
    /******/ __webpack_require__.d(getter, "a", getter);
    /******/ return getter;
    /******/
  };
  /******/
  /******/ // Object.prototype.hasOwnProperty.call
  /******/ __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  /******/ // __webpack_public_path__
  /******/ __webpack_require__.p = "";
  /******/
  /******/ // Load entry module and return exports
  /******/ return __webpack_require__((__webpack_require__.s = 1));
  /******/
})(
  /************************************************************************/
  /******/ [
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });

      var _createClass = (function () {
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
      })();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var twoPI = Math.PI * 2;

      var GameObject = (function () {
        function GameObject(context, canvas) {
          _classCallCheck(this, GameObject);

          this.context = context;
          this.canvas = canvas;
          this.x = 0;
          this.y = 0;
          this.speed = 0;
          this.turnSpeed = 0;
          this.size = 0;
          this.color = "#000";
          // the angle the object is facing
          this.direction = 0;
        }

        _createClass(GameObject, [
          {
            key: "draw",
            value: function draw() {
              this.context.beginPath();
              this.context.fillStyle = this.color;
              this.context.arc(this.x, this.y, this.size, 0, twoPI);
              this.context.fill();
              this.context.closePath();
            },
          },
          {
            key: "move",
            value: function move() {
              var dX = this.speed * Math.cos(this.direction);
              var dY = this.speed * Math.sin(this.direction);
              this.x += dX;
              this.y += dY;
              this.keepInBounds();
            },
          },
          {
            key: "keepInBounds",
            value: function keepInBounds() {
              var right = this.x + this.size;
              var left = this.x - this.size;
              var top = this.y - this.size;
              var bottom = this.y + this.size;

              if (right < 0) {
                this.x = this.canvas.width;
              } else if (left > this.canvas.width) {
                this.x = 0;
              }

              if (bottom < 0) {
                this.y = this.canvas.height;
              } else if (top > this.canvas.height) {
                this.y = 0;
              }
            },
          },
          {
            key: "getDistanceFromObject",
            value: function getDistanceFromObject(obj) {
              var _getXYDeltasFromObjec = this.getXYDeltasFromObject(obj),
                deltaX = _getXYDeltasFromObjec.deltaX,
                deltaY = _getXYDeltasFromObjec.deltaY;

              return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            },
          },
          {
            key: "getXYDeltasFromObject",
            value: function getXYDeltasFromObject(obj) {
              var targetX = obj.x;
              var targetY = obj.y;

              // because the game treats the canvas like a sphere, the distance is calculated using the closest path.
              if (Math.abs(this.x - targetX) > this.canvas.width / 2) {
                targetX +=
                  this.x > targetX ? this.canvas.width : -1 * this.canvas.width;
              }

              if (Math.abs(this.y - targetY) > this.canvas.height / 2) {
                targetY +=
                  this.y > targetY
                    ? this.canvas.height
                    : -1 * this.canvas.height;
              }

              var deltaX = targetX - this.x;
              var deltaY = targetY - this.y;

              return { deltaX: deltaX, deltaY: deltaY };
            },
          },
          {
            key: "turnTowardPoint",
            value: function turnTowardPoint(x, y) {
              var deltaX = x - this.x;
              var deltaY = y - this.y;
              var angle = Math.atan2(deltaY, deltaX);
              var difference = (this.direction - angle) % twoPI;

              // find the distance of the shorter turn direction
              if (
                Math.abs(difference) >
                Math.abs(this.direction - (angle - twoPI))
              ) {
                difference = this.direction - (angle - twoPI);
              }

              if (Math.abs(difference) <= this.turnSpeed) {
                this.direction = angle;
              } else if (difference < 0) {
                this.direction += this.turnSpeed;
              } else {
                this.direction -= this.turnSpeed;
              }

              this.direction %= twoPI;
            },
          },
        ]);

        return GameObject;
      })();

      exports.default = GameObject;

      /***/
    },
    /* 1 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      var _Hunter = __webpack_require__(2);

      var _Hunter2 = _interopRequireDefault(_Hunter);

      var _Prey = __webpack_require__(3);

      var _Prey2 = _interopRequireDefault(_Prey);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      initHunterGame();

      function initHunterGame() {
        var canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 600;
        var container = document.getElementById("hunterContainer");
        if (container) {
          container.appendChild(canvas);
          startGame(canvas);
        } else {
        }
      }

      function startGame(canvas) {
        var context = canvas.getContext("2d");
        var preyCount = 15;
        var hunter = new _Hunter2.default(context, canvas);
        var prey = [];
        var lastUpdate = void 0;

        for (var i = 0; i < preyCount; i++) {
          prey.push(new _Prey2.default(context, canvas, hunter));
        }
        hunter.targets = prey;

        gameLoop();

        function gameLoop(timestamp) {
          if (!lastUpdate) {
            lastUpdate = timestamp;
          }
          if (timestamp - lastUpdate > 16.7) {
            context.fillStyle = "#D2B48C";
            context.fillRect(0, 0, canvas.width, canvas.height);

            prey.forEach(function (p) {
              return p.update();
            });
            hunter.update();
            prey.forEach(function (p) {
              return p.draw();
            });
            hunter.draw();
            lastUpdate = timestamp;
          }
          window.requestAnimationFrame(gameLoop);
        }
      }

      /***/
    },
    /* 2 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });

      var _createClass = (function () {
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
      })();

      var _GameObject2 = __webpack_require__(0);

      var _GameObject3 = _interopRequireDefault(_GameObject2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Hunter = (function (_GameObject) {
        _inherits(Hunter, _GameObject);

        function Hunter(context, canvas) {
          _classCallCheck(this, Hunter);

          var _this = _possibleConstructorReturn(
            this,
            (Hunter.__proto__ || Object.getPrototypeOf(Hunter)).call(
              this,
              context,
              canvas
            )
          );

          _this.speed = Math.round(Math.random() * 2 + 6);
          _this.turnSpeed = 0.025 * Math.PI;
          _this.x = 20;
          _this.y = 200;
          _this.size = 8;
          _this.color = "#FF0000";
          _this.targets = [];
          _this.currentTarget = null;
          return _this;
        }

        _createClass(Hunter, [
          {
            key: "findClosestTarget",
            value: function findClosestTarget() {
              var _this2 = this;

              var liveTargets = this.targets.filter(function (target) {
                return !target.dead;
              });
              this.currentTarget = !liveTargets.length
                ? null
                : liveTargets.reduce(function (closestTarget, nextTarget) {
                    var currentDistance =
                      _this2.getDistanceFromObject(closestTarget);
                    var nextDistance = _this2.getDistanceFromObject(nextTarget);
                    return currentDistance > nextDistance
                      ? nextTarget
                      : closestTarget;
                  });
            },
          },
          {
            key: "chaseTarget",
            value: function chaseTarget() {
              if (!this.currentTarget) return;

              var distance = this.getDistanceFromObject(this.currentTarget);
              if (distance - this.speed < this.size + this.currentTarget.size) {
                this.currentTarget.die();
              }

              var _getXYDeltasFromObjec = this.getXYDeltasFromObject(
                  this.currentTarget
                ),
                deltaX = _getXYDeltasFromObjec.deltaX,
                deltaY = _getXYDeltasFromObjec.deltaY;

              this.turnTowardPoint(this.x + deltaX, this.y + deltaY);
              this.move();
            },
          },
          {
            key: "update",
            value: function update() {
              this.findClosestTarget();
              this.chaseTarget();
            },
          },
        ]);

        return Hunter;
      })(_GameObject3.default);

      exports.default = Hunter;

      /***/
    },
    /* 3 */
    /***/ function (module, exports, __webpack_require__) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true,
      });

      var _createClass = (function () {
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
      })();

      var _GameObject2 = __webpack_require__(0);

      var _GameObject3 = _interopRequireDefault(_GameObject2);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        }
        return call && (typeof call === "object" || typeof call === "function")
          ? call
          : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError(
            "Super expression must either be null or a function, not " +
              typeof superClass
          );
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true,
          },
        });
        if (superClass)
          Object.setPrototypeOf
            ? Object.setPrototypeOf(subClass, superClass)
            : (subClass.__proto__ = superClass);
      }

      var Prey = (function (_GameObject) {
        _inherits(Prey, _GameObject);

        function Prey(context, canvas, hunter) {
          _classCallCheck(this, Prey);

          var _this = _possibleConstructorReturn(
            this,
            (Prey.__proto__ || Object.getPrototypeOf(Prey)).call(
              this,
              context,
              canvas
            )
          );

          _this.calmSpeed = 0.5;
          _this.fleeSpeed = Math.round(Math.random() * 2 + 3);
          _this.speed = 0;
          _this.x = Math.round(Math.random() * (canvas.width - 20) + 10);
          _this.y = Math.round(Math.random() * (canvas.height - 20) + 10);
          _this.size = 5;
          _this.color = "#00FF00";
          _this.fleeRange = 100;
          _this.swerveRange = 75;
          _this.dead = false;
          _this.turnSpeed = 0.5 * Math.PI;
          _this.hunter = hunter;
          return _this;
        }

        _createClass(Prey, [
          {
            key: "fleeHunter",
            value: function fleeHunter() {
              var distance = this.getDistanceFromObject(this.hunter);
              var x = void 0,
                y = void 0;
              if (distance < this.fleeRange) {
                this.speed = this.fleeSpeed;

                var _getXYDeltasFromObjec = this.getXYDeltasFromObject(
                    this.hunter
                  ),
                  deltaX = _getXYDeltasFromObjec.deltaX,
                  deltaY = _getXYDeltasFromObjec.deltaY;
                // prey will swerve when the hunter gets too close

                if (distance < this.swerveRange) {
                  var angle = -0.25 * Math.PI;
                  x = deltaX * Math.cos(angle) - deltaY * Math.sin(angle);
                  y = deltaX * Math.sin(angle) + deltaY * Math.cos(angle);
                } else {
                  x = deltaX;
                  y = deltaY;
                }
              } else {
                this.speed = this.calmSpeed;
                x = Math.random() * 2 - 1;
                y = Math.random() * 2 - 1;
              }

              this.turnTowardPoint(this.x - x, this.y - y);
              this.move();
            },
          },
          {
            key: "die",
            value: function die() {
              this.dead = true;
              this.color = "#558855";
            },
          },
          {
            key: "update",
            value: function update() {
              if (!this.dead) this.fleeHunter();
            },
          },
        ]);

        return Prey;
      })(_GameObject3.default);

      exports.default = Prey;

      /***/
    },
    /******/
  ]
);
