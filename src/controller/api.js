var modules = require('../modules/modules.js')

//上傳csv至資料庫後台
exports.upload_sql = async function (req, res) {
    console.log(req.params)
    var name = req.params.name;
    //數字轉中文
    var suzi_id = await modules.ChineseToNumber(name[2])
    //上傳
    var result = await modules.upload_components_sql(name, suzi_id)

    if (result === 1) {
        await modules.slidebar();
        res.redirect("/")
    } else {
        res.send("錯誤")
    }


}

exports.search_data = async function (req, res) {
    if (req.query.id) {
        var id = req.query.id
        var data = await modules.components_name(id)
       
    }
    if (req.query.name_part) {
        var name_part = req.query.name_part
        //console.log(`name_part = ${name_part}`)
        var data = await modules.components_name_part(name_part)
    }
    res.send(data)

}

exports.search_data_result = async function (req, res) {
    
    var data = await modules.search_all_count(req.query.name,req.query.name_No)
    console.log(req.query)
    res.send(data)

}

exports.insert_product = async function (req, res) {
   console.log(req.body)
    var data = await modules.insert_product(req.body)
    console.log(`data ${data}`)



    res.send(data)
}