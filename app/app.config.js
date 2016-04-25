System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppConfig;
    return {
        setters:[],
        execute: function() {
            AppConfig = (function () {
                function AppConfig() {
                    this.hostname = "sense22.112adams.local";
                    this.port = 8432;
                }
                return AppConfig;
            }());
            exports_1("AppConfig", AppConfig);
        }
    }
});
//# sourceMappingURL=app.config.js.map