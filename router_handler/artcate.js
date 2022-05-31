const db = require('../db/index')

module.exports.getArticleCates = (req, res) => {
    // 1.定义sql
    // 根据分类的状态，获取所有未被删除的分类列表数据
    // is_delete 为 0 表示没有被标记为删除 的数据
    const sql = `select * from ev_article_cate where is_delete = 0 order by id asc`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        // console.log(results)
        // results是数组，返回的也是数组格式的数据
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })
}

module.exports.addArticleCates = (req, res) => {
    const sql = `select * from ev_article_cate where name = ? or alias = ?`
    // console.log(req.body)
    // console.log(req.user);
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        // 如果返回两条数据说明分类名称并且分类别名 有重复
        if (results.length === 2)
            return res.cc('分类名称与别名被占用，请更换后重试！')
        // 当返回一条数据的时候，判断是分类名称占用，还是分类别名占用
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('分类别名被占用，请更换后重试！')

        // 只有查询 数据 0 条说明没有重复
        // console.log(results)
        // todo:新增文章分类
        // 1、定义sql
        const sql = `insert into ev_article_cate set ?`
        db.query(sql, [req.body], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            // console.log(results.affectedRows)
            return res.cc('新增文章分类成功', 0)
        })
    })
}

module.exports.deleteCateById = (req, res) => {
    // 注意不要随便删除数据，只能使用更新语句
    const sql = `update ev_article_cate set is_delete = 1 where id=?`
    console.log(req.params.id)
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        return res.cc('删除文章分类成功！', 0)
    })
}

module.exports.getArticleById = (req, res) => {
    const sql = `select * from ev_article_cate where id = ?`
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
        // console.log(results)
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0],
        })
    })
}

module.exports.updateCateById = (req, res) => {
    // 更新数据前，排除自身这条数据，看看还有没有重复数据
    const sql = `select * from ev_article_cate where id != ? and (name = ? or alias =?)`
    db.query(
        sql,
        [req.body.id, req.body.name, req.body.alias],
        (err, results) => {
            if (err) return res.cc(err)
            // 如果返回两条数据说明分类名称并且分类别名 有重复
            if (results.length === 2)
                return res.cc('分类名称与别名被占用，请更换后重试！')
            // 当返回一条数据的时候，判断是分类名称占用，还是分类别名占用
            if (results.length === 1 && results[0].name === req.body.name)
                return res.cc('分类名称被占用，请更换后重试！')
            if (results.length === 1 && results[0].alias === req.body.alias)
                return res.cc('分类别名被占用，请更换后重试！')

            // todo:更新文章分类
            const sql = `update ev_article_cate set ? where id = ?`
            db.query(sql, [req.body, req.body.id], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1)
                    return res.cc('更新文章分类失败')
                return res.cc('更新文章分类成功！')
            })
        }
    )
    res.send('ok')
}
