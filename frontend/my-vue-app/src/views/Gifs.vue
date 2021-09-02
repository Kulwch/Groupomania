<template>
    <navBar></navBar>
    <div class="row d-flex flex-column">
        <postGifForm></postGifForm>
        <gif v-for="gif in gifs" 
            :key="gif" 
            v-bind="gif" 
        ></gif>
    </div>    
</template>

<script>
import navBar from '../components/navBar.ce.vue'
import gif from '../components/gif.ce.vue'
import postGifForm from '../components/postGifForm.ce.vue'
import axios from 'axios'

export default {
    name: 'Gifs',
    components: {
        postGifForm,
        gif,
        navBar,
    },

    data() {
        return {
            token: localStorage.getItem('token'),
            gifs: [],
            comments: [],
            user: {
                avatarUrl: "",
                id: "",
                isAdmin: Boolean,
                isModerator: Boolean
            }
         }
    },

    created() {
        axios
            .get('http://localhost:3001/api/gifs',{                                
                headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer ' + this.token
                }
            })
            .then(res => { this.gifs = res.data })
            .catch(err => {
              console.log(err + "User inconnu ou Posts indisponibles");
              /*this.$router.push('/login');*/
              window.alert('Veuillez vous connecter pour accéder au site')
            });

    },

    
    
}
</script>


<style>
</style>