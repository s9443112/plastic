exports.setRequestUrl = function (app) {
    var controller = require('./controller/controller.js');

    app.get('/', controller.index)
    app.get('/login',controller.login)
    app.get('/insert_product',controller.insert_product);
    app.get('/upload',controller.upload)
    app.get('/csv_file',controller.csv_file)
    app.get('/csv_sheet/:id',controller.csv_sheet)
    app.get('/look/:id',controller.look_file)
    app.get('/suzi/:suzi/part/:part',controller.suzi_components)

    //back-end
    app.post('/api/upload',controller.api_upload)
    //app.post('/api/login',controller.api_login)

    //撈取csv各張sheet
    app.get('/all_suzi_components',controller.all_suzi_components)
   

    app.get('/upload_sql/:name',controller.upload_sql)

    
}