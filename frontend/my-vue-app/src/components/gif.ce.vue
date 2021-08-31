<template>
    <div class="col mx-auto border border-dark rounded shadow mt-3">
        <figure>
            <figcaption>{{statusText}}</figcaption>
            <img :src="imageUrl" alt="publié par" />
        </figure>
        <comments></comments>
    </div>
    
</template>


<script>
import comments from '../components/comments.ce.vue'

export default {
    name:'gif',
    components: {
        comments
    },
    
    props:{
        imageUrl: {
            type:String, 
            required:true,
            
        },
        statusText: {
            type:String,
            required:true,
        },
        
    },
}
</script>

<style>

</style>