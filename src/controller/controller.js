var xlsx = require('node-xlsx') //解析xlsx檔案
var modules = require('../modules/modules.js')
var formidable = require('formidable')
var util = require('util')
var fs = require('fs');

//勞取側欄欄位
modules.slidebar();

//首頁
exports.index = function (req, res) {
    res.render('index', {
        suzi: modules.suzi,
    })
}
//登入頁面
exports.login = function (req, res) {
    res.render('login', {
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
//上傳頁面
exports.upload = function (req, res) {
    res.render('upload', {
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
//觀看檔案目錄
exports.csv_file = async function (req, res) {

    const readdir = util.promisify(fs.readdir);
    var file = await readdir(__dirname + '/../../csv/');
    console.log('FILES ' + file)
    res.render('csv_file', {
        file: file,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
//查看 選擇素子零件庫存零件表 內容
exports.suzi_components = async function (req, res) {

    //數字轉中文
    var suzi_id = await modules.ChineseToNumber(req.params.suzi[2])
    //搜尋結果
    var result = await modules.suzi_components(suzi_id);
    
    res.render('part_suzi', {
        data: result,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })

}
//查看所有 素子零件庫存零件表 內容
exports.all_suzi_components = async function (req, res) {

    var result = await modules.all_suzi_components();
    res.render('part_suzi', {
        data: result,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })


}
//選擇csv sheet 
exports.csv_sheet = async function (req, res) {
    console.log(req.params.id);
    var list = xlsx.parse('./csv/' + req.params.id)
    res.render('csv_sheet', {
        name: req.params.id,
        data: list,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
//觀看csv內容
exports.look_file = async function (req, res) {
    console.log(req.params.id);
    var id = req.params.id;
    var sheet_id = id.substring(id.length - 1, id.length)

    if (isNaN(sheet_id) == true) {

        var list = xlsx.parse('./csv/' + req.params.id)
        res.render('look_file', {
            data: list,
            suzi: modules.suzi,
            slidebar_name: modules.slidebar_name
        })
    } else {
        var list = xlsx.parse('./csv/' + id.substring(0, id.length - 1))
        res.render('look_file', {
            data: list[parseInt(sheet_id)],
            suzi: modules.suzi,
            slidebar_name: modules.slidebar_name
        })
    }
}
//上傳檔案後台
exports.api_upload = function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./csv/";
    form.encoding = 'utf-8';
    form.keepExtensions = true
    console.log(form)
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {
            'content-type': 'text/plain;charset=utf8'
        });
        fs.rename(files.csv.path, __dirname + '/../../csv/' + files.csv.name, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });

    });
}
//輸入資料頁面
exports.insert_product = function (req, res) {
    res.render('insert_product', {
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
//上傳csv至資料庫後台
exports.upload_sql = async function (req, res) {

    var name = req.params.name;
    //數字轉中文
    var suzi_id = await modules.ChineseToNumber(name[2])
    //上傳
    var result = await modules.upload_components_sql(name, suzi_id)

    if(result===1){
        await modules.slidebar();
        res.send("完成")
    }else{
        res.send("錯誤")
    }

    
}


