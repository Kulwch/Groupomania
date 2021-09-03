<template>
    <div class="col" v-for="gif in allGifs" :key="gif.id" v-bind="gif">
        <div class="col mx-auto border border-dark rounded shadow mt-3">
            <figure>
                <figcaption>{{ statusText }}</figcaption>
                <img v-bind:src="imageUrl" alt="publié par" />
            </figure>
            <button @click="deleteGif(gif.id)">Supprimer le gif</button>
        </div>
    </div>        
</template>

<script>
import axios from "axios"

    export default {
        name:"allGifs",

        props:{
            statusText:{
                type:String,
                required:true
            },
            imageUrl:{
                type:String,
                required:true
            }
        },

        data() {
            return {
                allGifs:[],
                user: {
                    id:"",
                    isAdmin:Boolean
                }
            }
        },

        created(){
            axios
            .get('http://localhost:3001/api/gifs',
            {
                headers:{
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
            })
            .then(res => {this.allGifs = res.data.allGifs})
        },

        methods: {
            deleteGif(id) {
                axios.
                delete(`http://localhost:3001/gifs/${this.gif.id}/admin`,
                {
                    headers:{
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            }
        }
    }
</script>