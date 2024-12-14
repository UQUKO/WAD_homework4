<template>
    <div class="contacts">
      <h1>Contacts</h1>
      <p>
        This is the Contacts page.
      </p>
      <ul>
        <li>Email: <a href="mailto:example@example.com">example@example.com</a></li>
        <li>Phone: <a href="tel:+1234567890">+123 456 7890</a></li>
        <li>Address: 123 Example Street, Tartu, Rwanda</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Contacts'
  }
  </script>
  
  <style scoped>
  .contacts {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .contacts h1 {
    color: #333;
  }
  .contacts p {
    margin-bottom: 15px;
  }
  .contacts ul {
    list-style-type: none;
    padding: 0;
  }
  .contacts li {
    margin-bottom: 10px;
  }
  </style>
  