<template>
  <div class="form">
    <h3>Add a Post</h3>
    <label for="body">Body: </label>
    <input name="body" type="text" id="body" required v-model="post.body" />
    <button @click="addPost" class="addPost">Add Post</button>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      post: {
        body: "",
      },
    };
  },
  methods: {
    addPost() {
      var data = {
        body: this.post.body,
      };
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json(); // Parse the JSON response
        })
        .then((data) => {
          console.log("Inserted post:", data); // Log the inserted post
          this.$router.push("/api/home");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    },
  },
};
</script>

<style scoped>
.form {
  max-width: 420px;
  margin: 30px auto;
  background: #f0f0f0;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
h3 {
  text-align: center;
  color: black;
}
label {
  color: black;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: black;
}
button {
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: black;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
button:hover {
  background-color: #cdbf88;
}
</style>
