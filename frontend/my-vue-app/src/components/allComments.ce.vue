<template>
    <div class="col">
        <div v-for="comment in comments" :key="comment.id" v-bind="comment">
            <p>{{comment.content}}</p>
            <button @click.prevent="adminDeleteComment(comment.id)">Supprimer</button>
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
                user: {
                    id:localStorage.getItem('userId'),
                    isAdmin:localStorage.getItem('isAdmin'),
                },
                comments:[]

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
            .then(res => { this.comments = res.data })
        },

        methods: {
            adminDeleteComment(id) {
            axios
            .delete(`http://localhost:3001/api/comments/admin/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
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