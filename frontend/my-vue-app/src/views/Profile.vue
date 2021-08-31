<template>
    <navBar></navBar>
    <div id="profile" class="row">
       <div class="col mx-auto border border-dark rounded shadow bg-light">
            <h2 class="h4 mt-3">Informations de profil</h2>                
            <profileInfos></profileInfos>
                
            <br/>
            <div class="mb-3"><router-link to="/gifs">Retour aux publications</router-link></div>
        </div>              
    </div>    
</template>

<script>
import profileInfos from '../components/profileInfos.ce.vue'
import navBar from '../components/navBar.ce.vue'
import axios from 'axios'

export default {
    name: 'Profile',
    components: {
        profileInfos,
        navBar,
    },

    data() {
        return {
            token: localStorage.getItem('token'),
            user: {
                firstName:"",
                lastName:"",
                email:"",
                avatarUrl:"",
                isAdmin:"",
                isModerator:""
            }
         }
    },

    created() {
        axios.
        get( `http://localhost:3001/api/auth/${this.user.id}`, 
        {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + this.token,
        }})
        .then((res) => { this.user = res })
        .catch((err) => {
            err
        })
    },

    methods: {

    },
    
    computed:{
        fullName() {
            return `${this.user.firstname} ${this.user.lastname}`
        }
    },
}
</script>


<style>
</style>