exports.setRequestUrl = function (app) {
    var controller = require('./controller/controller.js');

    app.get('/', controller.index)
    app.get('/insert_product',controller.insert_product);
    app.get('/upload',controller.upload)
    app.get('/csv_file',controller.csv_file)
    app.get('/csv_sheet/:id',controller.csv_sheet)
    app.get('/look/:id',controller.look_file)
    //back-end
    app.post('/api/insert_product',controller.api_insert_product)
    app.post('/api/upload',controller.api_upload)

    //撈取csv各張sheet
    app.get('/inventory_schedule',controller.inventory_schedule)
    app.get('/picking_register',controller.picking_register)
    app.get('/picking_record',controller.picking_record)
    app.get('/Miscellaneous',controller.Miscellaneous)


    app.get('/upload_sql',controller.upload_sql)

    
}