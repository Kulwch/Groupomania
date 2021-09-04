<template>
<navBar></navBar>
    <div class="row">
        <div class="col">
            <h2>Tous les commentaires <i class="fas fa-quote-right"></i></h2>
                <div v-if="comments">
                    <div v-for="(comment) in comments" :key="comment.id" class="bg-light border border-dark shadow rounded mb-3">
                        <p>Commentaire - gif n° {{comment.gifId}}</p>
                        <p class="mb-2 bg-white">"{{ comment.content }}" <span v-for="(user) in users.filter((user) => {return user.id == comment.userId})">par <strong>{{user.firstName}} {{user.lastName}}</strong></span></p>
                        <button class="mb-3 btn btn-secondary rounded" @click.prevent="adminDeleteComment(comment.id)">Effacer le commentaire</button>    
                    </div>  
                </div>        
            </div>
        </div>
</template>

<script>
import axios from "axios"
import navBar from '../components/navBar.ce.vue'
import allProfiles from '../components/allProfiles.ce.vue'
import allComments from '../components/allComments.ce.vue'


export default {
    name:"admin",

    components: {
        navBar,
        allProfiles,
        allComments
    },
    created() {

        axios
            .get('http://localhost:3001/api/comments',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.comments = res.data})
            .catch(err => {
              console.log(err + "Utilisateur inconnu ou commentaires indisponibles");
            });
            
        axios
            .get('http://localhost:3001/api/users',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": 'Bearer ' + this.token
                }
            })
            .then(res => { this.users = res.data.users})
            .catch(err => {
              console.log(err + "Utilisateur inconnu ou profils indisponibles");
            });
    },

    data() {
        return {
            comments:[],
            comment:{},
            content:{},
            userId: localStorage.getItem('userId'),
            users:[],
            user:{},
            token: localStorage.getItem('token') 
        }
    },

    methods: {


        adminDeleteComment(id) {
            axios
            .delete(`http://localhost:3001/api/comments/${id}/admin`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(() => this.$router.go())
        }
    }

}

</script>

<style>

</style>