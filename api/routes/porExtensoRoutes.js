'use strict';

module.exports = function(app) {
    let porExtenso = require('../controllers/porExtensoController');

    app.route('/').get(porExtenso.getNumberInFull);


    app.route('/:number')
        .get(porExtenso.getNumberInFull)
    //     .put(todoList.update_a_task)
    //     .delete(todoList.delete_a_task);
};