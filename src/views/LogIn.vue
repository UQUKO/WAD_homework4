<template>
  <div class="form">
    <h3>Login</h3>
    <label for="email">Email</label>
    <input type="email" name="email" required v-model="email" />
    <label for="password">Password</label>
    <input type="password" name="password" required v-model="password" />
    <div class="container">
      <button @click="Login" class="center">Login</button>
      <button @click="this.$router.push('/api/signup')" class="center">
        Signup
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogIn",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    LogIn() {
      var data = {
        email: this.email,
        password: this.password,
      };
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          location.assign("/");
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
  margin: 20px 20px 20px 20px;
  color: black;
  border-radius: 20px;
  align-items: center;
  text-align: center;
}
.center {
  margin: auto;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  width: 30%;
}
.container {
  display: flex;
  justify-content: center;
}
</style>
