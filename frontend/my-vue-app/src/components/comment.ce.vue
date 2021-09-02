<template>
    <div class="col">
        <span v-for="commentLoop in comments.filter((comment) => {return comment.gifId === gif.id })" class="col-6"
            :key="commentLoop" 
            v-bind="commentLoop"
        >
        <h3>Pouet</h3>
            {{ content }}
        </span>        
    </div>
</template>


<script>import axios from "axios"

export default {
    name: "comment",
    props: {
        content:{
            type:String
        },
    },

    data() {
        return {
            token: localStorage.getItem('token'),
            comments:[],
            gif,
            user: {
                id: localStorage.getItem('userId')
            }
        }
    },
    
     created() {
        axios
            .get('http://localhost:3001/api/comments',
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.comments = res.data})
            .catch(err => { err})
    }

}
</script>

<style>

</style>