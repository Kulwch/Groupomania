<template>
    <div class="col">
        <span v-for="commentLoop in comments" class="col-6"
            :key="commentLoop" 
            v-bind="commentLoop"
        >
            {{ content }}
        </span>        
    </div>
</template>


<script>import axios from "axios"

   export default {
    name: "comments",

    props:{
        content: {
            type:String, 
            required:true,
            
        }        
    },

    data() {
        return {
            token: localStorage.getItem('token'),
            comments: [],
            user: {
                id: localStorage.getItem('userId')
            }
        }
    },

    created() {
        axios.get('http://localhost:3001/api/comments',
        {
             headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": 'Bearer ' + this.token
              }
        })
        .then(res => { this.content = res.data})
        .catch(err => { err})
    },
}
</script>

<style>

</style>