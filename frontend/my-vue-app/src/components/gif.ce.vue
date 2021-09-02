<template>
    <div class="col mx-auto border border-dark rounded shadow mt-3" v-bind="gifs">
        <figure>
            <figcaption>{{ gifs.statusText }}</figcaption>
            <div class="w-25"><img v-bind:src="gifs.imageUrl" alt="publié par" /></div>
        </figure>
        <comment></comment>
        <span v-if="user.id === gif.userId || user.isAdmin === 'true'"><button>Supprimer le gif</button></span>
    </div>
    
</template>


<script>
import axios from 'axios'
import comment from '../components/comment.ce.vue'

export default {
    name:'gif',
    components: {
        comment
    },
   

    created() {
        axios
            .get('http://localhost:3001/api/gifs',{                                
                headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + this.token
                }
            })
            .then(res => { this.gifs = res.data.gif })
            .catch(err => {
              console.log(err + "User inconnu ou Posts indisponibles");
              /*this.$router.push('/login');*/
              window.alert('Veuillez vous connecter pour accéder au site')
            });
    },

    data() {
        return {
            gifs:{},
            user:{
                id: localStorage.getItem('userId'),
                isAdmin: localStorage.getItem('isAdmin')
            }
        }
    },

}
</script>

<style>

</style>