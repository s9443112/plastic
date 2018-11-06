exports.setRequestUrl = function (app) {
    var controller = require('./controller/controller.js');
    var api = require('./controller/api.js');

    //設計事件
    var EventEmitter = require('events').EventEmitter;
    var event = new EventEmitter();

    app.get('/', controller.index)
    app.get('/login', controller.login)
    app.get('/insert_product', controller.insert_product);
    app.get('/upload', controller.upload)
    app.get('/csv_file', controller.csv_file)
    app.get('/csv_sheet/:id', controller.csv_sheet)
    app.get('/look/:id', controller.look_file)
    app.get('/suzi/:suzi', controller.suzi_components)
    app.get('/history',controller.history)
    app.get('/picking_register',controller.picking_register)
    app.get('/flot',controller.flot)


    //撈取csv各張sheet
    app.get('/all_suzi_components', controller.all_suzi_components)

    app.get('/search_data', api.search_data)
    app.get('/search_data_result', api.search_data_result)
    app.get('/upload_sql/:name', api.upload_sql)
    app.post('/api/insert_product', api.insert_product);



}