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
    <div class="button-row">
      <div class="container left">
        <button @click="this.$router.push('/api/addpost')">Add post</button>
      </div>
      <div class="container right">
        <button @click="DeleteAll">Delete all</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllPosts",
  data() {
    return {
      posts: [],
      isAuthenticated: false,
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
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Logout user: ", data);
          this.isAuthenticated = false;
          this.$router.push("/api/login");
        })
        .catch((e) => {
          console.error("Error logging out: ", e);
        });
    },
    isAuth() {
      this.isAuthenticated = !!document.cookie.match(
        /^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/
      ); //checks whether the user has a cookie with the jwt tag
    },
  },
  mounted() {
    this.isAuth();
    if (this.isAuthenticated) {
      this.fetchPosts();
      console.log("mounted");
    } else {
      this.$router.push("/api/login");
    }
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

.button-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
button:hover {
  background-color: #cdbf88;
}
.container.left,
.container.right {
  flex: 1;
}
.container.left {
  display: flex;
  justify-content: flex-start;
}
.container.right {
  display: flex;
  justify-content: flex-end;
}
</style>
