/**
 * =============================================================================
 * ************   检测支持的特性   ************
 * =============================================================================
 */

(function () {
    inteui.support = {
        touch: !!('ontouchstart' in window),
    }
})();