<template>
    <div class="col mx-auto border border-dark rounded shadow mt-3" v-for="gif in gifs" :key="gif.id">
        <figure>
            <figcaption>{{ gif.statusText }}</figcaption>
            <img :src="gif.imageUrl" alt="image" />
        </figure>
        <span v-if="userId == gif.userId"><button v-bind="gif" @click.prevent="deleteGif(gif.id)">Supprimer le gif</button></span>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'gif',

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
            .then(() => console.log(this.gifs))
            .catch(err => {
              console.log(err + "User inconnu ou Posts indisponibles");
              /*this.$router.push('/login');*/
              window.alert('Veuillez vous connecter pour accéder au site')
            });
    },

    data() {
        return {
            gifs:[{}],
            imageUrl:'',
            userId: localStorage.getItem('userId'),
            user:{
                id: localStorage.getItem('userId'),
                isAdmin: localStorage.getItem('isAdmin')
            },
            token: localStorage.getItem('token') 
        }
    },

    methods: {
        
        deleteGif(id) {
            axios
            .delete(`http://localhost:3001/api/gifs/${id}`,
            {
                headers: {
                    'Content-Type': 'application/',
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