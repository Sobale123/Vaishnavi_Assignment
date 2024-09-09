/*const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const app = express();
const PORT =3000;

const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database in blog.db file.');
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating table ' + err.message);
            } else {
                console.log('Table posts exists or was created.');
            }
        });
    }
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

// Set up SQLite database
//const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run("CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT)");
});

// Fetch all posts
app.get("/posts", (_req, res) => {
    db.all("SELECT * FROM posts", (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

// Fetch a specific post by ID
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(row);
        }
    });
});

// Create a new post
app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    db.run("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], function(err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send({ id: this.lastID });
        }
    });
});

// Update a post
app.put("/posts/:id", (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    db.run("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM posts WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.sendStatus(200);
        }
    });
});

app.get('/',(req,res) => {
    res.sendFile(path.join(_dirname, 'public' ,'blog.html'));
});
// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
*/


const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require('path');
const app = express();
const PORT = 3000;

const db = new sqlite3.Database('./blog.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database in blog.db file.');
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating table ' + err.message);
            } else {
                console.log('Table posts exists or was created.');
            }
        });
    }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Fetch all posts
app.get("/posts", (req, res) => {
    db.all("SELECT * FROM posts", (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(rows);
        }
    });
});

// Fetch a specific post by ID
app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(row);
        }
    });
});

// Create a new post
app.post("/posts", (req, res) => {
    const { title, content } = req.body;
    db.run("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content], function(err) {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send({ id: this.lastID });
        }
    });
});

// Update a post
app.put("/posts/:id", (req, res) => {
    const { title, content } = req.body;
    const id = req.params.id;
    db.run("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, id], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    db.run("DELETE FROM posts WHERE id = ?", [id], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.sendStatus(200);
        }
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
