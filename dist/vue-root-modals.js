/*!
 * vue-root-modals v0.0.5
 * (c) 2018-present Nikita Nafranets <eddimensi@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global['vue-root-modals'] = {})));
}(this, (function (exports) { 'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var ModalMixin = {
  name: 'vue-root-modal',
  data: function data() {
    return {
      modals: this.$modals.$openedModals
    };
  },
  beforeCreate: function beforeCreate() {
    this.$options.components = this.$modals.$components;
  },
  methods: {
    zIndex: function zIndex(modal) {
      return {
        'z-index': modal.modalID
      };
    },
    closeModal: function closeModal(modal) {
      if (modal.disableClose) {
        return;
      }

      if (modal.resolveOnClose) {
        modal.resolve();
      }

      if (modal.rejectOnClose) {
        modal.reject();
      }

      this.$modals.close(modal.modalID);
    }
  }
};

var __$rootModalMixin = Object.assign(ModalMixin, {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.modals.length ? _c('div', {
      staticClass: "vue-root-modal"
    }, _vm._l(_vm.modals, function (modal) {
      return _c('div', {
        key: modal.modalID,
        staticClass: "vue-root-modal__wrapper",
        style: _vm.zIndex(modal),
        on: {
          "click": function click($event) {
            if ($event.target !== $event.currentTarget) {
              return null;
            }

            _vm.closeModal(modal);
          }
        }
      }, [_c('div', {
        staticClass: "vue-root-modal__body"
      }, [!modal.disableClose ? _c('button', {
        staticClass: "vue-root-modal__close",
        on: {
          "click": function click($event) {
            _vm.closeModal(modal);
          }
        }
      }, [_vm._v(" X ")]) : _vm._e(), _vm._v(" "), _c(modal.typeModal, _vm._b({
        tag: "component"
      }, 'component', modal, false))], 1)]);
    })) : _vm._e();
  },
  staticRenderFns: []
});

__$rootModalMixin.prototype = ModalMixin.prototype;

var VueRootModals =
/*#__PURE__*/
function () {
  function VueRootModals(components) {
    _classCallCheck(this, VueRootModals);

    this.registedComponents = components;
    this.modals = [];
  }

  _createClass(VueRootModals, [{
    key: "openModal",
    value: function openModal(options) {
      options.modalID = this.modals.length + 1;
      this.modals.push(options);
    }
  }, {
    key: "closeModal",
    value: function closeModal(modalID) {
      if (modalID === undefined) {
        this.modals.splice(0, this.modals.length);
        return;
      }

      this.modals.splice(this.modals.findIndex(function (modal) {
        return modal.modalID === modalID;
      }), 1);
    }
  }, {
    key: "install",
    value: function install(Vue) {
      var _this = this;

      Vue.prototype.$modals = {
        close: function close(modalID) {
          _this.closeModal(modalID);
        },
        $components: this.registedComponents,
        $openedModals: this.modals
      };
      Object.keys(this.registedComponents).forEach(function (key) {
        var execModal = function execModal(options) {
          var resolve;
          var reject; // eslint-disable-next-line

          var promise = new Promise(function (resolveFromPromise, rejectFromPromise) {
            resolve = resolveFromPromise;
            reject = rejectFromPromise;
          });
          var config = Object.assign({}, options, {
            resolve: resolve,
            reject: reject,
            typeModal: key
          });

          _this.openModal(config);

          return promise;
        };

        Vue.prototype.$modals[key] = execModal;
        _this[key] = execModal;
      });
    }
  }]);

  return VueRootModals;
}();

var RootModal = __$rootModalMixin;
var RootModalMixin = ModalMixin;

exports.RootModal = RootModal;
exports.RootModalMixin = RootModalMixin;
exports['default'] = VueRootModals;

Object.defineProperty(exports, '__esModule', { value: true });

})));
