<!-- <script></script>
<template>
    <iframe class="full-page-iframe" src="http://localhost:8000/login" frameborder="0"></iframe>

</template>
<style scoped>
/* .full-page-iframe {
  width: 100vw; 
  height: 100vh; 
  border: none;
} */
</style> -->

<template>
    <div>
      <button @click="redirectToLogin">Login</button>
      <button @click="redirectToRegister">Register</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      redirectToLogin() {
        window.location.href = 'http://localhost:8000/login'; // Cambia l'URL in base alla tua struttura delle rotte
      },
      redirectToRegister() {
        window.location.href = 'http://localhost:8000/register'; // Cambia l'URL in base alla tua struttura delle rotte
      }
    }
  }
  </script>

  <!-- <template>
    <div>
      <button @click="redirectToLogin">Login</button>
      <button @click="redirectToRegister">Register</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    methods: {
      redirectToLogin() {
        axios.post('/api/login')
          .then(response => {
            if (response.data.redirect) {
              this.$router.push(response.data.redirect);
            }
          })
          .catch(error => {
            console.error(error);
          });
      },
      redirectToRegister() {
        axios.post('/api/register')
          .then(response => {
            if (response.data.redirect) {
              this.$router.push(response.data.redirect);
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
  </script> -->