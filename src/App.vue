<template>
  <div>
    <nav>
      <router-link to="/api/allposts">Home</router-link>
      <span class="separator"></span>
      <router-link to="/api/signup">Signup</router-link>
      <span class="separator"></span>
      <router-link to="/api/login">Login</router-link>
      <span class="separator"></span>
      <router-link to="/api/contacts">Contacts</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include", //  Don't forget to specify this if you need cookies
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("jwt removed");
          //console.log("jwt removed:" + auth.authenticated());
          this.$router.push("/login");
          location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error logout");
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #e0e0e0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 8px 15px;
  font-size: 1.25em;
}

nav .separator {
  width: 3px;
  height: 1.5em;
  background-color: #2c3e50;
  margin: 0 10px;
  display: inline-block;
  transform: translateY(5px);
}

nav a.router-link-exact-active {
  color: #fff9df;
}
button {
  margin-top: 30px;
  border-radius: 36px;
  background: #fee996;
  border: 0;
  font-weight: 700;
  font-size: 0.8em;
  display: block;
  padding: 10px 16px;
  letter-spacing: 2px;
}
.container {
  display: flex;
  justify-content: center;
}
</style>
