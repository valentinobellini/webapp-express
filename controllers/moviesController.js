const connection = require('../data/db')


// definiamo le logiche


// index
function index(req, res) {

    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
};


// show
function show(req, res) {

    const postId = parseInt(req.params.id);

    const sql = 'SELECT * FROM posts WHERE id = ?';
    connection.query(sql, [postId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Post not found' });
        res.json(results[0]);
    });
};


module.exports = { index, show }