<template>
  <div class="AllPosts">
    <div id="post-list">
      <div class="container">
        <button @click="Logout" class="center">Logout</button>
      </div>
      <ul>
        <div class="item" v-for="post in posts" :key="post.id">
          <a class="singlepost" :href="'/api/apost/' + post.id">
            <div class="post-header">
              <span class="date">{{ formatDate(post.date) }}</span>
            </div>
            <span class="body">{{ post.body }} </span>
          </a>
        </div>
      </ul>
    </div>
    <div class="container">
      <button @click="this.$router.push('/api/addpost')" class="left">
        Add post
      </button>
      <button @click="DeleteAll" class="right">Delete all</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllPosts",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    fetchPosts() {
      fetch(`http://localhost:3000/api/posts/`)
        .then((response) => response.json())
        .then((data) => (this.posts = data))
        .catch((err) => console.log(err.message));
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    DeleteAll() {
      fetch(`http://localhost:3000/api/posts/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`); // Handle HTTP errors
          }
          return response.json(); // Parse the JSON response
        })
        .then((data) => {
          console.log("Deleted posts:", data);
          this.posts = []; // Clear posts array after deletion
        })
        .catch((e) => {
          console.error("Error deleting posts:", e);
        });
    },
  },
  mounted() {
    this.fetchPosts();
    console.log("mounted");
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container:hover {
  text-decoration: underline;
}

.item {
  background: #f0f0f0;
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 10px;
  height: 100px;
}

.singlepost {
  display: block;
  position: relative;
  color: black;
}

.body {
  margin-top: 35px;
  margin-left: 10px;
  font-size: 1.2em;
  text-align: left;
  display: block;
}

.post-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}

.date {
  font-size: 1em;
}

#post-list {
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 50%;
  border-radius: 20px;
}

#post-list ul {
  padding: 0;
}

#post-list li {
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
}
</style>
