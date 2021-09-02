<template>
    <div class="col mx-auto border border-dark rounded shadow mt-3">
        <figure>
            <figcaption>{{ statusText }}</figcaption>
            <img v-bind:src="imageUrl" alt="publié par" />
        </figure>
        <comment></comment>
        <span v-if="user.id === gif.userId || user.isAdmin === 'true'"><button>Supprimer le gif</button></span>
    </div>
    
</template>


<script>
import comment from '../components/comment.ce.vue'

export default {
    name:'gif',
    components: {
        comment
    },
   
    props:{
        imageUrl: {
            type:String, 
            required:true
            
        },
        statusText: {
            type:String,
            required:true
        },
        id: {
            type:Number,
            required:true
        }    
    },

    data() {
        return {
            gif,
            comment,
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