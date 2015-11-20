/*global $*/
var DragAndDrop = {

    allowDrop: function (ev) {
        'use strict';
        ev.preventDefault();
    },

    drop: function (ev) {
        'use strict';
        ev.preventDefault();
        $('#caja2').append($('.robot'));
    }
};

$(function () {
    'use strict';
    $('#caja2').on('drop', DragAndDrop.drop);
    $('#caja2').on('dragover', DragAndDrop.allowDrop);
});
