const Db = require('mysql-activerecord')

var db = new Db.Adapter({
    server: 'localhost',
    username: 'root',
    password: '',
    database: 'test',
    reconnectTimeout: 2000
})

exports._insert = (table, data) => {
    if (typeof table !== undefined && data !== '') {
        var promise = new Promise((resolve, reject) => {
            db.insert(table, data, (err, info) => {

                if (err) {
                    reject(err)
                } else {
                    resolve(info)
                }
            })
        })
        return promise;
    }
}

exports._select = (table, data = ['*'], condition = null) => {
    if (typeof table !== undefined) {
        db.select(data)
    }
    db.where(condition)
    var promise = new Promise((resolve, reject) => {
        db.get(table, (err, result, fields) => {
            if (result) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    })
    return promise;
}

exports._delete = (table, condition = null) => {
    if (typeof table !== undefined) {
        var promise = new Promise((resolve, reject) => {
            db.where(condition).delete(table, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('data deleted with id')
                }
            })
        })
        return promise;
    }
}

exports._update = (table, condition, data, callBack) => {
    if (typeof table !== undefined) {
        db.where(condition)._update(table, data, (err) => {
            if (err) {
                console.log(err)
            } else {
                callBack(data)
            }
        })
    }
}

