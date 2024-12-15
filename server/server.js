const express = require("express");
const pool = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "http://localhost:8080", credentials: true }));

app.use(express.json());
app.use(cookieParser());

const secret = "gdgdhdbcb770785rgdzqws";
const maxAgeForToken = 60 * 60;
const generateJWT = (id) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAgeForToken });
};

app.post("/api/posts", async (req, res) => {
  try {
    console.log("a post request has arrived");
    const post = req.body;
    const newpost = await pool.query(
      "INSERT INTO posttable(body) VALUES ($1) RETURNING*",
      [post.body]
    );
    res.json(newpost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    console.log("get posts request has arrived");
    const posts = await pool.query("SELECT * FROM posttable");
    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    console.log("get a post with route parameter request has arrived");
    const { id } = req.params;
    const posts = await pool.query("SELECT * FROM posttable WHERE id = $1", [
      id,
    ]);
    res.json(posts.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    console.log("update request has arrived");
    const updatepost = await pool.query(
      "UPDATE posttable SET body = $2 WHERE id = $1 RETURNING*",
      [id, post.body]
    );
    res.json(updatepost);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("delete a post request has arrived");
    const deletepost = await pool.query(
      "DELETE FROM posttable WHERE id = $1 RETURNING*",
      [id]
    );
    res.json(deletepost);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/api/posts/", async (req, res) => {
  try {
    console.log("Delete all posts request has arrived");
    const deleteAllPosts = await pool.query("DELETE FROM posttable RETURNING*");
    res.json(deleteAllPosts.rowCount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// is used to check whether a user is authinticated
app.get("/auth/authenticate", async (req, res) => {
  console.log("authentication request has arrived");
  const token = req.cookies.jwt; // assign the token named jwt to the token const
  let authenticated = false; // a user is not authenticated until proven the opposite
  try {
    if (token) {
      //checks if the token exists
      //jwt.verify(token, secretOrPublicKey, [options, callback]) verify a token
      await jwt.verify(token, secret, (err) => {
        //token exists, now we try to verify it
        if (err) {
          // not verified
          console.log(err.message);
          console.log("token is not verified");
          res.send({ authenticated: authenticated }); // authenticated = false
        } else {
          // token exists and it is verified
          console.log("author is authenticated");
          authenticated = true;
          res.send({ authenticated: authenticated }); // authenticated = true
        }
      });
    } else {
      //applies when the token does not exist
      console.log("author is not authenticated");
      console.log("token doesn't exist");
      res.send({ authenticated: authenticated }); // authenticated = false
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

app.post("/auth/signup", async (req, res) => {
  try {
    console.log("a signup request has arrived");
    const { email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const bcryptPassword = await bcrypt.hash(password, salt);
    const authUser = await pool.query(
      "INSERT INTO users(email, password) values ($1, $2) RETURNING*",
      [email, bcryptPassword]
    );

    console.log(authUser.rows[0].id);
    const token = await generateJWT(authUser.rows[0].id);
    res
      .status(201)
      .cookie("jwt", token, {
        maxAge: maxAgeForToken * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ user_id: authUser.rows[0].id }).send;
  } catch (err) {
    console.error(err.message);
    res.status(400).send(err.message);
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    console.log("a login request has arrived");
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0)
      return res.status(401).json({ error: "User is not registered" });
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });
    const token = await generateJWT(user.rows[0].id);
    res
      .status(201)
      .cookie("jwt", token, {
        maxAge: maxAgeForToken * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({ user_id: user.rows[0].id }).send;
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

app.get("/auth/logout", (req, res) => {
  console.log("delete jwt request arrived");
  res.status(202).clearCookie("jwt").json({ Msg: "cookie cleared" }).send;
});

app.listen(port, () => {
  console.log("Server is listening to port " + port);
});
