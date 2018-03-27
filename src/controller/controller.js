var xlsx = require('node-xlsx')
var database = require('../config/auth.js');
var mysql = require('mysql');
var formidable = require('formidable')
var util = require('util')
var fs = require('fs');
var slidebar_part = []
var slidebar_name = {};

var connection = mysql.createConnection({
    host: database.MySQL.host,
    user: database.MySQL.user,
    password: database.MySQL.password,
    database: database.MySQL.database,
});

slidebar();
async function slidebar() {
    slidebar_part = []
    slidebar_name = {};
    var sql = "SELECT part.part,GROUP_CONCAT(suzi.name)AS name FROM part LEFT JOIN suzi ON part.id=suzi.part_id GROUP BY part_id ORDER BY part.id ASC"
    await connection.query(sql, async function (error, result) {
        if (error) throw error;
        for (let i = 0; i < result.length; i++) {
            var name = result[i].name;

            slidebar_part.push(result[i].part)
            //console.log(name)
            if (name !== null) {
                //var arr = name.split(",").map(val => Number(val) + 1);
                var arr = name.split(","),
                    q;
                //console.log(arr)
                for (let q = 0; q < arr.length; q++) {
                    console.log(arr[q])
                    if (slidebar_name[i] === undefined) {
                        slidebar_name[i] = []
                    }
                    slidebar_name[i].push(arr[q])
                }
                slidebar_name[i].sort()
            }


        }
       

        console.log('做完了')
    })

}

exports.index = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx')
    res.render('index', {
        data: list,
        slidebar_part: slidebar_part,
        slidebar_name: slidebar_name
    })
}
//顯示資料表內容
exports.inventory_schedule = async function (req, res) {
    var sql = "SELECT A.id,A.name,A.name_No,A.safe_amount,A.company,B.amount,B.price,B.currency,B.note FROM components_part A,components B WHERE A.id = B.id"
    //var result = await go_select(sql);
    await connection.query(sql, async function (error, result) {
        if (error) throw error;
        console.log("正在執行" + sql)
        res.render('part_suzi', {
            data: result,
            slidebar_part: slidebar_part,
            slidebar_name: slidebar_name
        })
    })
    //console.log(list)
}
//上傳頁面
exports.upload = function (req, res) {
    res.render('upload', {
        slidebar_part: slidebar_part,
        slidebar_name: slidebar_name
    })
}
//觀看檔案目錄
exports.csv_file = async function (req, res) {

    const readdir = util.promisify(fs.readdir);
    file = await readdir(__dirname + '/../../csv/');
    console.log('FILES ' + file)
    res.render('csv_file', {
        file: file,
        slidebar_part: slidebar_part,
        slidebar_name: slidebar_name
    })
}
//選擇csv sheet 
exports.csv_sheet = async function (req, res) {
    console.log(req.params.id);
    var list = xlsx.parse('./csv/' + req.params.id)
    res.render('csv_sheet', {
        name: req.params.id,
        data: list,
        slidebar_part: slidebar_part,
        slidebar_name: slidebar_name
    })
}
//選擇Part 選擇素子 
exports.part_suzi = async function (req, res) {
    console.log(req.params);

    var suzi_id = await ChineseToNumber(req.params.suzi[2])
    console.log('suzi_id: '+suzi_id)
    var sql = "SELECT A.id,A.name,A.name_No,A.safe_amount,A.company,B.amount,B.price,B.currency,B.note FROM components_part A,components B WHERE A.id = B.id AND A.suzi_id=" + suzi_id;
    await connection.query(sql, async function (error, result) {
        if (error) throw error;
        console.log("正在執行" + sql)
        res.render('part_suzi', {
            data: result,
            slidebar_part: slidebar_part,
            slidebar_name: slidebar_name
        })
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
            slidebar_part: slidebar_part,
            slidebar_name: slidebar_name
        })
    } else {
        var list = xlsx.parse('./csv/' + id.substring(0, id.length - 1))
        res.render('look_file', {
            data: list[parseInt(sheet_id)],
            slidebar_part: slidebar_part,
            slidebar_name: slidebar_name
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
        slidebar_part: slidebar_part,
        slidebar_name: slidebar_name
    })
}
//上傳csv至資料庫後台
exports.upload_sql = async function (req, res) {
    var name = req.params.name;
    var id = await ChineseToNumber(name[2])

    var list = xlsx.parse('./csv/' + name)
    var data = list[0]
    var suzi_name = name.substring(0, 3)
    var buffer = id;
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
                        buffer3 = data.data[x][a]
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
        buffer3 = buffer3.replace("('')", "('','','','')")
        buffer4 = buffer4 + "," + buffer3


        buffer = id;
        buffer3 = '';
        //console.log("========================================")
    }
    console.log("全部完成")
    buffer2 = buffer2.substring(1, buffer2.length)

    buffer4 = buffer4.substring(1, buffer4.length)
    var sql = "INSERT INTO suzi (name,part_id)VALUES('" + suzi_name + "','" + 1 + "')";

    await go_insert(sql);
    var sql = "INSERT INTO components_part (suzi_id,name,name_No,safe_amount,company)VALUES" + buffer2;
    await go_insert(sql);
    var sql = "INSERT INTO components (amount,price,currency,note)VALUES" + buffer4
    await go_insert(sql);

    await slidebar();
    res.send(sql)
}
exports.api_insert_product = function (req, res) {

    console.log(req.body)
    res.send(req.body)

}
async function go_insert(sql) {
    //console.log(sql)
    await connection.query(sql, async function (error, result) {
        if (error) throw error;
        //console.log("正在執行" + sql)
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
async function ChineseToNumber(chnStr) {
    var chnNumChar = {
        零: 0,
        一: 1,
        二: 2,
        三: 3,
        四: 4,
        五: 5,
        六: 6,
        七: 7,
        八: 8,
        九: 9
    };
    var chnNameValue = {
        十: { value: 10, secUnit: false },
        百: { value: 100, secUnit: false },
        千: { value: 1000, secUnit: false },
        万: { value: 10000, secUnit: true },
        亿: { value: 100000000, secUnit: true }
    }

    var rtn = 0;
    var section = 0;
    var number = 0;
    var secUnit = false;
    var str = chnStr.split('');

    for (var i = 0; i < str.length; i++) {
        var num = chnNumChar[str[i]];
        if (typeof num !== 'undefined') {
            number = num;
            if (i === str.length - 1) {
                section += number;
            }
        } else {
            var unit = chnNameValue[str[i]].value;
            secUnit = chnNameValue[str[i]].secUnit;
            if (secUnit) {
                section = (section + number) * unit;
                rtn += section;
                section = 0;
            } else {
                section += (number * unit);
            }
            number = 0;
        }
    }
    return rtn + section;
}



