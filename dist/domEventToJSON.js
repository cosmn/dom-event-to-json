(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.domEventToJSON = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function traverse(eventData, seenObjects, currentDepth, maxDepth) {
        if (currentDepth >= maxDepth) return '[object Object]';

        var json = {};

        for (var key in eventData) {
            var value = eventData[key];

            switch (Object.prototype.toString.call(value)) {
                case '[object String]':
                case '[object Number]':
                case '[object Boolean]':
                    json[key] = value;
                    break;

                case '[object Null]':
                    json[key] = null;
                    break;

                case '[object Function]':
                    json[key] = '[Function: ' + (value.name || 'anonymous') + ']';
                    break;

                case '[object Object]':
                case '[object Array]':
                case '[object HTMLCollection]':
                case '[object HTMLDocument]':
                case '[object HTMLBodyElement]':
                case '[object HTMLInputElement]':
                case '[object HTMLDivElement]':
                case '[object NamedNodeMap]':
                case '[object NodeList]':
                case '[object DOMTokenList]':
                case '[object DOMStringMap]':
                case '[object CSSStyleDeclaration]':
                case '[object ValidityState]':

                case '[object Arguments]':
                    if (seenObjects.indexOf(value) >= 0) {
                        json[key] = '[object Circular]';
                    } else {
                        seenObjects.push(value);
                        json[key] = traverse(value, seenObjects, currentDepth + 1, maxDepth);
                    }
                    break;
                case '[object Symbol]':
                    json[key] = '[object Symbol]';
                    break;
                default:
                    json[key] = '[unhandled typeof]';
            }
        }

        return json;
    }

    var parse = exports.parse = function parse(eventData, depth) {
        var maxDepth = depth || 4;
        var seenObjects = [eventData]; // start with itself

        return traverse(eventData, seenObjects, 0, maxDepth);
    };
});
