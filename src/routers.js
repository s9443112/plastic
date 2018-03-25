exports.setRequestUrl = function (app) {
    var controller = require('./controller/controller.js');

    app.get('/', controller.index);
    app.get('/use_csv',controller.use_csv)
    app.get('/insert_product',controller.insert_product);
    app.get('/upload',controller.upload)
    //back-end
    app.post('/api/insert_product',controller.api_insert_product)

    //撈取csv各張sheet
    app.get('/inventory_schedule',controller.inventory_schedule)
    app.get('/picking_register',controller.picking_register)
    app.get('/picking_record',controller.picking_record)
    app.get('/Miscellaneous',controller.Miscellaneous)


    app.get('/upload_sql',controller.upload_sql)

    
}