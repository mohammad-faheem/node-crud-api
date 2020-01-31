const Db = require('mysql-activerecord')

var db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: '',
    database: 'test',
    reconnectTimeout: 2000
})

exports._insert = (table, data, callBack) => {
        if(typeof table !== undefined && data !== '') {
            db.insert(table, data, (err, info) => {
                callBack(err, info)
            })
        }
    }

exports._select = (table, data = ['*'], condition = null, callBack) => {
    if(typeof table !== undefined) {
        db.select(data)}
        db.where(condition)
    db.get(table, (err, result, fields) => {
        callBack(err, result)
    })
}

exports._delete = (table, condition = null, callBack) => {
    if(typeof table !== undefined) {
        db.where(condition).delete(table, (err) => {
            if(err) {
                console.log(err)
            } else {
                callBack('data deleted with id')
            }
        })
    }
}

exports._update = (table, condition, data, callBack) => {
    if(typeof table !== undefined) {
        db.where(condition)._update(table, data, (err) => {
            if(err) {
                console.log(err)
            } else {
                callBack(data)
            }
        })
    }
}

