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
            comments: [{}],
            user: {
                avatarUrl: "",
                id: "",
                isAdmin: Boolean,
                isModerator: Boolean
            }
         }
    },

   
}
</script>


<style>
</style>