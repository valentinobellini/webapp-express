const connection = require('../data/db')


// definiamo le logiche


// index
function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Database query failed:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
}


// show
function show(req, res) {
    // recupera id dai params
    const { id } = req.params;

    // query richiesta dettaglio movie
    const movieDetail = 'SELECT * FROM movies WHERE id = ?';
    // query richiesta dettaglio reviews
    const reviewDetail = "SELECT * FROM reviews WHERE movie_id = ?";

    console.log('Executing movieDetail query with id:', id);

    // lancia query al db per ottenere dati movie
    connection.query(movieDetail, [id], (err, movieResult) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (movieResult.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const movie = movieResult[0];

        // lancia query al db per ottenere dati reviews
        connection.query(reviewDetail, [id], (err, reviewResult) => {
            // se la query non va a buon fine
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // aggiorniamo l'oggetto book con le review ritornate
            movie.reviews = reviewResult;

            // ritorniamo l'oggetto completo
            res.json(movie);
        });
    });
}

// esporta le funzioni
module.exports = { index, show };