var xlsx = require('node-xlsx')
var database = require('../config/auth.js');
var mysql = require('mysql');
var formidable = require('formidable')
var util = require('util')
var fs = require('fs');

var connection = mysql.createConnection({
    host: database.MySQL.host,
    user: database.MySQL.user,
    password: database.MySQL.password,
    database: database.MySQL.database,
});

exports.index = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx')
    res.render('index', {
        data: list
    })
}

exports.inventory_schedule = async function (req, res) {
    var sql = "SELECT A.id,A.name,A.name_No,A.safe_amount,A.company,B.amount,B.price,B.currency,B.note FROM components_part A,components B WHERE A.id = B.id AND A.suzi_id=2"
    //var result = await go_select(sql);
    await connection.query(sql, async function (error, result) {
        if (error) throw error;
        console.log("正在執行" + sql)
        res.render('inventory_schedule', {
            data: result
        })
    })
    //console.log(list)

}
exports.picking_register = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx')
    res.render('picking_register', {
        data: list[1]
    })
}
exports.picking_record = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx')
    res.render('picking_record', {
        data: list[2]
    })
}
exports.Miscellaneous = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx')
    res.render('miscellaneous', {
        data: list[3]
    })
}
exports.upload = function (req, res) {
    res.render('upload')
}
exports.csv_file = async function (req, res) {

    const readdir = util.promisify(fs.readdir);
    file = await readdir(__dirname + '/../../csv/');
    console.log('FILES ' + file)
    res.render('csv_file', {
        file: file
    })
}
exports.look_file = async function (req, res) {
    console.log(req.params.id);
    var list = xlsx.parse('./csv/' + req.params.id)
    res.render('look_file', {
        data: list
    })
}
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
        fs.rename(files.csv.path, __dirname + '/../../csv/'+files.csv.name, function (err) {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });

    });
}


exports.insert_product = function (req, res) {
    res.render('insert_product')
}

// exports.upload_sql = async function (req, res) {
//     var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx')
//     var data = list[2]
//     var buffer = '';
//     for (let x = 2; x < data.data.length; x++) {
//         for (let a = 1; a < data.data[1].length; a++) {
//             //console.log(data.data[x][a])
//             if (data.data[x][a] == undefined) {
//                 data.data[x][a] = "";
//                 if (buffer !== '') {
//                     buffer = buffer + "','" + data.data[x][a]
//                 } else {
//                     buffer = "'" + data.data[x][a] + "'"
//                 }
//             } else {
//                 if (buffer !== '') {
//                     buffer = buffer + "','" + data.data[x][a]
//                 } else {
//                     buffer = data.data[x][a]
//                 }
//             }



//         }
//         buffer = "'" + buffer + "'";
//         // var sql = "INSERT INTO components_part(company_id,name,name_id,safe_amount,amount,vendor,price,currency,note)VALUES(" + buffer + ")";
//         var sql = "INSERT INTO picking_record(name,name_id,amount,date,note)VALUES(" + buffer + ")";
//         sql = sql.replace("''''", "''")

//         if (buffer !== "''") {

//             await go_insert(sql);
//             console.log("完成")
//         }
//         buffer = "";
//         //console.log("========================================")
//     }
//     console.log("全部完成")
//     res.send("ok")
// }
exports.upload_sql = async function (req, res) {
    var list = xlsx.parse('./csv/素子二--零件領料登記表.xlsx')
    var data = list[0]
    var buffer = '2';
    var buffer2 = '';
    var buffer3 = '';
    var buffer4 = '';
    for (let x = 2; x < data.data.length; x++) {
        for (let a = 2; a < data.data[1].length; a++) {
            //console.log(data.data[x][a])
            if (data.data[x][a] === undefined) {
                data.data[x][a] = ''
            }

            switch (a) {
                case 5:
                case 7:
                case 8:
                case 9:
                    if (buffer3 !== '') {
                        buffer3 = buffer3 + "','" + data.data[x][a]
                    } else {
                        buffer3 = "''"
                    }
                    break;
                default:

                    if (buffer !== '') {
                        buffer = buffer + "','" + data.data[x][a]
                    } else {
                        buffer = "'" + data.data[x][a] + "'"
                    }
            }

        }
        buffer = "('" + buffer + "')";
        buffer = buffer.replace("''''", "''")
        buffer2 = buffer2 + "," + buffer
        buffer3 = "('" + buffer3 + "')";
        buffer3 = buffer3.replace("''''", "''")
        buffer4 = buffer4 + "," + buffer3


        buffer = '2';
        buffer3 = '';
        //console.log("========================================")
    }
    console.log("全部完成")
    buffer2 = buffer2.substring(1, buffer2.length)
    buffer4 = buffer4.substring(1, buffer4.length)

    var sql = "INSERT INTO components_part (suzi_id,name,name_No,safe_amount,company)VALUES" + buffer2;
    await go_insert(sql);
    var sql = "INSERT INTO components (amount,price,currency,note)VALUES" + buffer4
    await go_insert(sql);
    res.send(sql)
}

async function go_insert(sql) {
    console.log(sql)
    await connection.query(sql, async function (error, result) {
        if (error) throw error;
        console.log("正在執行" + sql)
    })

}
async function go_select(sql) {
    console.log(sql)
    await connection.query(sql, async function (error, result) {
        if (error) throw error;
        console.log("正在執行" + sql)
        return result;
    })

}




exports.api_insert_product = function (req, res) {

    console.log(req.body)
    res.send(req.body)
}



exports.use_csv = async function (req, res) {

    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx')
    console.log(JSON.stringify(list))
    //res.send(JSON.stringify(list))

    res.render('use_csv', {
        data: list
    })

}