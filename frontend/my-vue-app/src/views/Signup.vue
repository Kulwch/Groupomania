<template>
	<div class="container">
        <div class="row">
            <div class="col col-md-6 mx-auto border border-dark rounded shadow">
                <h2 class="h4 mt-3">Inscription</h2>                
                    {{ signupForm }}
            </div>
        </div>         
    </div>
</template>

<script setup>
import signupForm from '../components/signupForm.ce.vue'

 const axios = require('axios').default;
    axios.post('http://localhost:3001/api/auth/login', {
        email: '',
        password: ''
  })
  .then((res) => res.token)
  .then(() => headToHome())
  .catch((error) => {error});
 
</script>
<style>
	
</style>