/**
 * Created by NB on 2018/1/20.
 *//**
 * Created by NB on 2018/1/20.
 */

(function (exports) {

    'use strict';

    var STORAGE_KEY = 'todos-vue';

    exports.todoStorage = {
        fetch: function () {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        },
        save: function (todos) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    };

})(window);