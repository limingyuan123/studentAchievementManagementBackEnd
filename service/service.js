const formidable = require('formidable');
const pg = require('../lib/pg')
const uuid = require('node-uuid')

//查询学生信息
exports.getStudents = (req, res, next) => {
    pg.client.query(`SELECT * FROM achievement`, (error, result) => {
        if(error){
            console.log(`get student error, message is: ${error}`)
            res.send({code:-1,message:`error is: ${error}`})
        }else{
            console.log(`get student success`)
            res.send({code:0,message:`get student success`, data:result.rows})
        }
    })
}


//增加学生信息
exports.addStudent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let uid = uuid.v4();
        let {name, mathematics, english, language} = fields; 
        pg.client.query(`INSERT INTO achievement (uid,  name, mathematics, english, language) VALUES 
        ($1, $2, $3, $4, $5)`, [uid, name, mathematics, english, language],
        (error, result) => {
            if(error){
                console.log(`add student error, message is: ${error}`)
                res.send({code:-1,message:`error is: ${error}`})
            }else{
                console.log(`add student success`)
                res.send({code:0,message:`add student success`})
            }
        })
    })
}

//删除学生信息
exports.deleteStudent = (req, res, next) => {
    let uid = req.query.uid;
    if(uid == undefined){
        res.send({code:-2,message:`uid is empty!`});
        return;
    }
    pg.client.query(`DELETE FROM achievement WHERE uid = $1`,[ uid ],
    (error, result) => {
        if(error){
            console.log(`delete student error, message is: ${error}`)
            res.send({code:-1,message:`error is: ${error}`})
        }else{
            console.log(`delete student success`)
            res.send({code:0,message:`add student success`})
        }
    })
}

//更新学生信息
exports.updateStudent = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let {uid, name, mathematics, english, language} = fields; 
        pg.client.query(`UPDATE achievement SET name = $1, mathematics = $2, english = $3, 
        language = $4 WHERE uid = $5`,
        [name, mathematics, english, language, uid],
        (error, result) => {
            if(error){
                console.log(`update student error, message is: ${error}`)
                res.send({code:-1,message:`error is: ${error}`})
            }else{
                console.log(`update student success`)
                res.send({code:0,message:`update student success`})
            }
        })
    })
}
