const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const title = req.query.title;
  let query = 'SELECT * FROM tutorials';
  const params = [];
  if (title) {
    query += ' WHERE title LIKE ?';
    params.push(`%${title}%`);
  }
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM tutorials WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err);
    if (!row) return res.sendStatus(404);
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  db.run('INSERT INTO tutorials (title, description, published) VALUES (?, ?, ?)', [title, description, 0], function (err) {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: this.lastID, title, description, published: 0 });
  });
});

router.put('/:id', (req, res) => {
  const { title, description, published } = req.body;
  db.run('UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?', [title, description, published, req.params.id], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ id: req.params.id, title, description, published });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tutorials WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

router.delete('/', (req, res) => {
  db.run('DELETE FROM tutorials', function (err) {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});

router.get('/published/all', (req, res) => {
  db.all('SELECT * FROM tutorials WHERE published = 1', [], (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

module.exports = router;
