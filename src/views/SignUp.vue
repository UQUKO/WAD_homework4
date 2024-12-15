<template>
  <div class="form">
    <h3>Signup</h3>
    <label for="email">Email</label>
    <input type="email" name="email" required v-model="email" />
    <label for="password">Password</label>
    <input type="password" name="password" required v-model="password" />
    <div v-if="errMsg">{{ errMsg }}</div>
    <button @click="SignUp" class="Signup" :disabled="!isFormValid">
      Signup
    </button>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: function () {
    return {
      email: "",
      password: "",
      errMsg: "",
      isFormValid: false,
    };
  },
  watch: {
    password(value) {
      this.password = value;
      this.validatePassword(value);
    },
    email(value) {
      this.email = value;
      this.validateEmail(value);
    },
  },
  methods: {
    validateEmail(value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Pattern meaning: there is a character at the start of the string before the @ -> it contains an @ -> contains . after the @ -> a char after the .
      if (!emailPattern.test(value)) {
        this.errMsg = "Please enter a valid email address";
        this.isFormValid = false;
      } else {
        this.errMsg = "";
        this.isFormValid = true;
      }
    },
    validatePassword(value) {
      if (
        value.length < 8 ||
        value.length >= 16 ||
        !/[A-Z]/.test(value) ||
        !/[0-9]/.test(value)
      ) {
        this.errMsg =
          "Password must be at least 8 characters  and less than 16 characters, it must include a capital letter and at least one number";
        this.isFormValid = false;
      } else {
        this.errMsg = "";
        this.isFormValid = true;
      }
    },
    SignUp() {
      var data = {
        email: this.email,
        password: this.password,
      };
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Signup failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.$router.push("/api/login");
        })
        .catch((e) => {
          console.log(e);
          this.errMsg = "Signup failed. User may already exist";
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
div {
  padding: 10px 20px;
  margin-top: 20px;
}
</style>
