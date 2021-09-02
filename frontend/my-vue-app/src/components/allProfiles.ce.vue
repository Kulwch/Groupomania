<template>
    <div class="col" v-for="profile in allProfiles" :key="profile.id" v-bind="profile">
        <div class="d-flex flex-column col-8 mx-auto border border-dark rounded shadow">
            <p>{{ firstName }}</p>            
            <p>{{ lastName }}</p>
            <p class="">{{ email }}</p>
            <img class="mx-auto m-3 h-50 w-50" :src="avatarUrl" alt="avatar"/>
            <button @click="" class="btn btn-primary w-35 mb-3 mx-auto">Modifier</button>        
        </div>
        <div class="d-flex flex-column col-8 mx-auto border border-dark rounded shadow mt-3">
            <form id="form" class="mt-5"  method="put" >
                <div class="mx-auto w-50 mb-3">
                    <label for="avatar" class="form-label" >Changer d'avatar</label>
                    <input type="file" class="form-control-file" name="avatar" id="avatar"/>
                    <input type="submit" class="form-control btn btn-primary" name="submitAvatar" id="submitAvatar" />
                </div>
            </form>
        </div>
        <button @click="adminDelete()" class="btn btn-primary w-35 mb-3 mx-auto">Supprimer ce compte</button>
    </div>
</template>

<script>
import axios from "axios"

export default {
    props:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        avatarUrl: {
            type:String, 
            required:true            
        },
        isAdmin:{
            type:Boolean,
            required: true
        },        
    },
    data() {
        return {
            allProfiles:[]
        }
    },

    created() {
        axios
        .get('http://localhost:3001/api/users', {
            headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": 'Bearer ' + this.token
            }
        })
        .then(res => {this.allProfiles = res.data})
    },

    methods: {
        adminDelete() {
            axios.
            delete(`http://localhost:3001/api/users/${id}/admin`,
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

<style>
</style>