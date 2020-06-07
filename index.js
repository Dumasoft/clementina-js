define("core/constants/elements", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BODY = document.body;
    exports.PRUEBA = 'ESTA ES MI PRIMERA LIBRERÍA';
});
define("core/constants/general", ["require", "exports", "core/constants/elements"], function (require, exports, elements_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(elements_1);
});
define("core/base", ["require", "exports", "core/constants/general"], function (require, exports, general_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(general_1);
});
define("index", ["require", "exports", "core/base"], function (require, exports, base_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(base_1);
});
//# sourceMappingURL=index.js.map