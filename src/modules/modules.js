var Sequelize = require('sequelize'); //sql語法 類似c＃ Linq
var model = require('../config/db.js'); //使用sql資料表

var xlsx = require('node-xlsx')


exports.suzi = [] //素子名稱
exports.slidebar_name = {}

exports.upload_components_sql = async function upload_components_sql(name, id) {

    //零件庫存明細表
    var list = xlsx.parse('./csv/' + name)
    var data = list[0]
    var suzi_name = name.substring(0, 3)
    var buffer = id;
    var buffer2 = '';
    var buffer3 = '';
    var buffer4 = '';
    for (let x = 2; x < data.data.length; x++) {
        for (let a = 0; a < data.data[1].length; a++) {
            //console.log(data.data[x][a])
            if (data.data[x][a] === undefined) {
                data.data[x][a] = ''
            }
            if ((data.data[x][0] === '') && (data.data[x][1] !== '')) {
                data.data[x][0] = parseInt(data.data[x][1])
            }
            switch (a) {
                case 5:
                case 7:
                case 8:
                case 9:

                    if (buffer3 !== '') {
                        buffer3 = buffer3 + "','" + data.data[x][a]
                    } else {
                        buffer3 = +data.data[x][0] + "','" + data.data[x][a]
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
        console.log("HERE "+buffer.substring(4,buffer.length))

        if (buffer.substring(4, buffer.length) !== ",'NaN','','','','','')") {
            buffer2 = buffer2 + "," + buffer
        }

        buffer3 = "('" + buffer3 + "')";
        buffer3 = buffer3.replace("''''", "''")
        console.log("HERE 2"+buffer3)
        if (buffer3 !== "('NaN','','','','')") {
            buffer4 = buffer4 + "," + buffer3
        }
        buffer = id;
        buffer3 = '';
        //console.log("========================================")
    }

    buffer2 = buffer2.substring(1, buffer2.length)

    buffer4 = buffer4.substring(1, buffer4.length)
    try {
        var sql = "INSERT INTO suzi (name )VALUES('" + suzi_name + "')";
        await go_insert(sql);
        sql = "INSERT INTO components_part (suzi_id,suzi_own_id,suzi_twice_id,name,name_No,safe_amount,company)VALUES" + buffer2;
        //console.log(sql)
        await go_insert(sql);
        sql = "INSERT INTO components (suzi_own_id,amount,price,currency,note)VALUES" + buffer4
        //console.log(sql)
        await go_insert(sql);


    } catch (err) {
        return 0;
    }

    //領料登記表
    var data = list[1]
    var buffer = id;
    var buffer2 = '';
    for (let x = 2; x < data.data.length; x++) {
        for (let a = 1; a < data.data[1].length; a++) {
            //console.log(data.data[x][a])
            if (data.data[x][a] === undefined) {
                data.data[x][a] = ''
            }
            if (buffer !== '') {
                buffer = buffer + "','" + data.data[x][a]
            } else {
                buffer = "'" + data.data[x][a] + "'"
            }

        }


        buffer = "('" + buffer + "')";
        buffer = buffer.replace("''''", "''")


        if (buffer.substring(4, buffer.length) !== ",'','','','','','')") {
            buffer2 = buffer2 + "," + buffer
        }


        buffer = id;
    }
    buffer2 = buffer2.substring(1, buffer2.length)
    try {
        var sql = "INSERT INTO picking_register (suzi_id,name,name_No,get_amount,get_date,get_sign_name,note)VALUES" + buffer2;
        //console.log(sql)
        if (buffer2 !== '') {
            await go_insert(sql);
        }
        return 1;
    } catch (err) {
        console.log(err)
        return 0;
    }


}
//中文轉數字
exports.ChineseToNumber = async function ChineseToNumber(chnStr) {
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
        十: {
            value: 10,
            secUnit: false
        },
        百: {
            value: 100,
            secUnit: false
        },
        千: {
            value: 1000,
            secUnit: false
        },
        万: {
            value: 10000,
            secUnit: true
        },
        亿: {
            value: 100000000,
            secUnit: true
        }
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

//撈取側欄欄位
exports.slidebar = async function slidebar() {
    exports.suzi = [];
    var sql = await model.suzi.findAll({
        attributes: ['name']
    });
    for (let i = 0; i < sql.length; i++) {
        exports.suzi.push(sql[i].dataValues.name);
    }
    console.log(JSON.stringify(exports.suzi))
    console.log("搜尋完畢")
}

exports.suzi_components = async function suzi_components(suzi_id,part) {
    switch (part) {
        case '1':
            var select = "SELECT A.suzi_own_id,A.suzi_twice_id,A.name,A.name_No,A.safe_amount,A.company,B.amount,B.price,B.currency,B.note FROM components_part A,components B WHERE A.id = B.id AND A.suzi_id=" + suzi_id;
            var result = await model.suzi.sequelize.query(select, {
                type: Sequelize.QueryTypes.SELECT
            });
            
            break;
        case '2':
            var select = "SELECT A.id,A.name,A.name_No,A.get_amount,A.get_date,A.get_sign_name,A.note FROM picking_register A,components B WHERE A.suzi_id=B.id AND A.suzi_id=" + suzi_id;
            var result = await model.suzi.sequelize.query(select, {
                type: Sequelize.QueryTypes.SELECT
            });
           
            break;
        case '3':
            break;
        case '4':
            break;
    }

    //console.log(result)
    return result;
}

exports.all_suzi_components = async function all_suzi_components() {
    var select = "SELECT A.id,A.name,A.name_No,A.safe_amount,A.company,B.amount,B.price,B.currency,B.note FROM components_part A,components B WHERE A.id = B.id"
    var result = await model.sequelize.query(select, {
        type: Sequelize.QueryTypes.SELECT
    })

    return result
}

//INSERT 資料
async function go_insert(sql) {
    await model.sequelize.query(sql)
}