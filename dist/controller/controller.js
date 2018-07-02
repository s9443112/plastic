'use strict';

var go_insert = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(sql) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        console.log(sql);
                        _context8.next = 3;
                        return connection.query(sql, function () {
                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(error, result) {
                                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                    while (1) {
                                        switch (_context7.prev = _context7.next) {
                                            case 0:
                                                if (!error) {
                                                    _context7.next = 2;
                                                    break;
                                                }

                                                throw error;

                                            case 2:
                                                console.log("正在執行" + sql);

                                            case 3:
                                            case 'end':
                                                return _context7.stop();
                                        }
                                    }
                                }, _callee7, this);
                            }));

                            return function (_x14, _x15) {
                                return _ref8.apply(this, arguments);
                            };
                        }());

                    case 3:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    return function go_insert(_x13) {
        return _ref7.apply(this, arguments);
    };
}();

var go_select = function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(sql) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        console.log(sql);
                        _context10.next = 3;
                        return connection.query(sql, function () {
                            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(error, result) {
                                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                        switch (_context9.prev = _context9.next) {
                                            case 0:
                                                if (!error) {
                                                    _context9.next = 2;
                                                    break;
                                                }

                                                throw error;

                                            case 2:
                                                console.log("正在執行" + sql);
                                                return _context9.abrupt('return', result);

                                            case 4:
                                            case 'end':
                                                return _context9.stop();
                                        }
                                    }
                                }, _callee9, this);
                            }));

                            return function (_x17, _x18) {
                                return _ref10.apply(this, arguments);
                            };
                        }());

                    case 3:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this);
    }));

    return function go_select(_x16) {
        return _ref9.apply(this, arguments);
    };
}();

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


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var xlsx = require('node-xlsx');
var database = require('../config/auth.js');
var mysql = require('mysql');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

var connection = mysql.createConnection({
    host: database.MySQL.host,
    user: database.MySQL.user,
    password: database.MySQL.password,
    database: database.MySQL.database
});

exports.index = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx');
    res.render('index', {
        data: list
    });
};
//顯示資料表內容
exports.inventory_schedule = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var sql;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        sql = "SELECT A.id,A.name,A.name_No,A.safe_amount,A.company,B.amount,B.price,B.currency,B.note FROM components_part A,components B WHERE A.id = B.id AND A.suzi_id=2";
                        //var result = await go_select(sql);

                        _context2.next = 3;
                        return connection.query(sql, function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error, result) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (!error) {
                                                    _context.next = 2;
                                                    break;
                                                }

                                                throw error;

                                            case 2:
                                                console.log("正在執行" + sql);
                                                res.render('inventory_schedule', {
                                                    data: result
                                                });

                                            case 4:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, this);
                            }));

                            return function (_x3, _x4) {
                                return _ref2.apply(this, arguments);
                            };
                        }());

                    case 3:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//無用 可刪除
exports.picking_register = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx');
    res.render('picking_register', {
        data: list[1]
    });
};
//無用 可刪除
exports.picking_record = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx');
    res.render('picking_record', {
        data: list[2]
    });
};
//無用 可刪除
exports.Miscellaneous = function (req, res) {
    var list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx');
    res.render('miscellaneous', {
        data: list[3]
    });
};
//上傳頁面
exports.upload = function (req, res) {
    res.render('upload');
};
//觀看檔案目錄
exports.csv_file = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var readdir;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        readdir = util.promisify(fs.readdir);
                        _context3.next = 3;
                        return readdir(__dirname + '/../../csv/');

                    case 3:
                        file = _context3.sent;

                        console.log('FILES ' + file);
                        res.render('csv_file', {
                            file: file
                        });

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();
//選擇csv sheet 
exports.csv_sheet = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var list;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        console.log(req.params.id);
                        list = xlsx.parse('./csv/' + req.params.id);

                        res.render('csv_sheet', {
                            data: list
                        });

                    case 3:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

//觀看csv內容
exports.look_file = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var list;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        console.log(req.params.id);
                        list = xlsx.parse('./csv/' + req.params.id);

                        res.render('look_file', {
                            data: list
                        });

                    case 3:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();
//上傳檔案後台
exports.api_upload = function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = "./csv/";
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    console.log(form);
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
};

//輸入資料頁面
exports.insert_product = function (req, res) {
    res.render('insert_product');
};
//上傳csv至資料庫後台
exports.upload_sql = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var list, data, buffer, buffer2, buffer3, buffer4, x, a, sql;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        list = xlsx.parse('./csv/素子一--零件領料登記表.xlsx');
                        data = list[0];
                        buffer = '2';
                        buffer2 = '';
                        buffer3 = '';
                        buffer4 = '';
                        x = 2;

                    case 7:
                        if (!(x < data.data.length)) {
                            _context6.next = 31;
                            break;
                        }

                        a = 2;

                    case 9:
                        if (!(a < data.data[1].length)) {
                            _context6.next = 20;
                            break;
                        }

                        //console.log(data.data[x][a])
                        if (data.data[x][a] === undefined) {
                            data.data[x][a] = '';
                        }

                        _context6.t0 = a;
                        _context6.next = _context6.t0 === 5 ? 14 : _context6.t0 === 7 ? 14 : _context6.t0 === 8 ? 14 : _context6.t0 === 9 ? 14 : 16;
                        break;

                    case 14:
                        if (buffer3 !== '') {
                            buffer3 = buffer3 + "','" + data.data[x][a];
                        } else {
                            buffer3 = "''";
                        }
                        return _context6.abrupt('break', 17);

                    case 16:

                        if (buffer !== '') {
                            buffer = buffer + "','" + data.data[x][a];
                        } else {
                            buffer = "'" + data.data[x][a] + "'";
                        }

                    case 17:
                        a++;
                        _context6.next = 9;
                        break;

                    case 20:
                        buffer = "('" + buffer + "')";
                        buffer = buffer.replace("''''", "''");
                        buffer2 = buffer2 + "," + buffer;
                        buffer3 = "('" + buffer3 + "')";
                        buffer3 = buffer3.replace("''''", "''");
                        buffer4 = buffer4 + "," + buffer3;

                        buffer = '2';
                        buffer3 = '';
                        //console.log("========================================")

                    case 28:
                        x++;
                        _context6.next = 7;
                        break;

                    case 31:
                        console.log("全部完成");
                        buffer2 = buffer2.substring(1, buffer2.length);
                        buffer4 = buffer4.substring(1, buffer4.length);

                        sql = "INSERT INTO components_part (suzi_id,name,name_No,safe_amount,company)VALUES" + buffer2;
                        _context6.next = 37;
                        return go_insert(sql);

                    case 37:
                        sql = "INSERT INTO components (amount,price,currency,note)VALUES" + buffer4;
                        _context6.next = 40;
                        return go_insert(sql);

                    case 40:
                        res.send(sql);

                    case 41:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();
exports.api_insert_product = function (req, res) {

    console.log(req.body);
    res.send(req.body);
};