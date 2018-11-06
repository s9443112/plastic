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

    res.render('csv_file', {
        file: file,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
//查看 選擇素子零件庫存零件表 內容
exports.suzi_components = async function (req, res) {
    //console.log(req.params)

    //搜尋結果
    var data = await modules.suzi_components(req.params.suzi);

    res.render('suzi', {
        id: req.params.suzi,
        data: data,
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
    // var list = xlsx.parse('./csv/' + req.params.id)
    // console.log(list[0])
    // res.render('test',{
    //     list:list[0]
    // })



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

//輸入資料頁面
exports.insert_product = async function (req, res) {
    var db = require('../config/db_function/suzi')
    var suzi_title = await db.findAll()
    res.render('insert_product', {
        suzi_title: suzi_title,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}

exports.history = async function (req, res) {
    var db = require('../config/db_function/history')
    var history_data = await db.findAll()
    res.render('history', {
        data: history_data,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
exports.picking_register = async function (req, res) {
    var db = require('../config/db_function/picking_register')
    var picking_register = await db.findAll()
    res.render('picking_register', {
        data: picking_register,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}
exports.flot = async function (req, res) {
    // var data = []
    // for (var i = 0; i < 12; i++) {
    //     data.push(Math.random() * 100);
    // }
    var db = require('../config/db_function/suzi')
    var suzi_title = db.findAll()
    var data = modules.search_all_count()
    var [suzi_title,data] = await Promise.all([suzi_title,data])
    res.render('flot',{
        suzi_title:suzi_title,
        data:data,
        suzi: modules.suzi,
        slidebar_name: modules.slidebar_name
    })
}


