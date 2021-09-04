<template>
<navBar></navBar>
    <div class="row">
        <div class="col">
            <h2>Administration</h2>

            <ul class="d-inline-flex justify-content-around w-50 list-unstyled">
                <li><button>Profils</button></li>
                <div  class="d-flex flex-column">
                    <div v-for="user in users" :key="user" class="col d-flex flex-column">
                        <allProfiles v-bind="user"></allProfiles>
                    </div>
                </div>
                <li><button>Toutes les gifs</button></li>
                    <div class="col-10 d-flex flex-column">
                        <div class="col mx-auto border border-dark rounded shadow mt-3" v-for="gif in gifs" :key="gif.id">
                            <figure class="mw-75">
                                <figcaption class="h4 text-primary">{{ gif.statusText }}</figcaption>
                                <img class="mw-75" :src="gif.imageUrl" alt="image" />
                            </figure>
                            <button class="mb-3 btn btn-secondary rounded" v-bind="gif" @click.prevent="adminDeleteGif(gif.id)">Supprimer le gif</button>
                            <div v-if="comments">
                                <div v-for="(comment) in comments.filter((comment) => {return comment.gifId == gif.id})" :key="comment.id" class="bg-light rounded">
                                    <p class="mb-2">{{ comment.content }}</p>
                                    <button class="mb-3 btn btn-secondary rounded" @click.prevent="adminDeleteComment(comment.id)">Effacer le commentaire</button>    
                                </div>  
                            </div>        
                        </div>
                    </div>
                    
                <li><button>Commentaires</button></li>
                <div>
                    <allComments></allComments>
                </div>
                <li><router-link to="/logout">Déconnexion</router-link></li>
            </ul>           

        </div>
    </div>
</template>

<script>
import axios from "axios"
import navBar from '../components/navBar.ce.vue'
import allProfiles from "../components/allProfiles.ce.vue";
import allComments from "../components/allComments.ce.vue";


export default {
    name:"admin",

    components: {
        navBar,
        allProfiles,
        allComments
    },
    created() {
        axios
            .get('http://localhost:3001/api/gifs',
            {                                
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": 'Bearer ' + this.token
                }
            })
            .then(res => { this.gifs = res.data.gifs })
            .catch(err => {
              console.log(err + "Utilisateur inconnu ou Posts indisponibles");
            }); 

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
            gifs:[],
            gif:{},
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

        adminDeleteGif(id) {
            axios
            .delete(`http://localhost:3001/api/gifs/admin/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(() => this.$router.go())
        },

        adminDeleteComment(id) {
            axios
            .delete(`http://localhost:3001/api/comments/admin/${id}`,
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
    li {
        margin-left: 2rem;
    }
</style>