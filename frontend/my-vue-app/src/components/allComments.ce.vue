<template>
    <div class="col">
        <div v-for="comment in allComments" :key="comment.id" v-bind="comment">
            <p>{{comment.content}}</p>
            <button @click="deleteComment(comment.id)">Supprimer le commentaire</button>
        </div>
    </div>
</template>
<script>
import axios from "axios"

    export default {
        name:"allComments",

        props:{
            content: {
                type:Text,
                required: true
            }
        }, 

        data() {
            return {
                token: localStorage.getItem('token'),
                allComments:[],
                user: {
                    id:localStorage.getItem('userId'),
                    isAdmin:localStorage.getItem('isAdmin'),
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
            .then(res => { this.allComments = res.data })
        },

        methods: {
            deleteComment(id) {
                axios.delete( `http://localhost:3001/api/comments/${id}/admin`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
                .then(() => console.log('Commentaire effacé !'))
            }
        }
    }
</script>

<style>

</style>