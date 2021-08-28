<template>
	<div class="container">
        <div class="row">
            <div class="col col-md-6 mx-auto border border-dark rounded shadow">
                <h2 class="h4 mt-3">Connexion</h2>                
                    <loginForm />
                <br/>
                <router-link :to="/signup">Pas encore inscrit ? Cliquez ici pour rejoindre vos collègues ! </router-link>
            </div>
        </div>         
    </div>
</template>

<script setup>
import loginForm from '../components/loginForm.ce.vue'
 
</script>

<style>
	
</style>