<template>
    <div v-for="comment in comments.filter((comments) => {return comments.gifId === gif.id })" class="col-6"
            :key="comment.id" 
            v-bind="comments"
        >
        <h3>Pouet</h3>
            {{ comment.content }}        
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: "comment",
    props: {
        content:{
            type:Text
        },
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
            .then(res => { this.comments = res.data.comments})

    },

    data() {
        return {
            token: localStorage.getItem('token'),
            comments:{},
            userId: localStorage.getItem('userId')
        }
    },

}
</script>

<style>

</style>