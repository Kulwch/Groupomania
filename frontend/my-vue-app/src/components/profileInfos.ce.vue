<template>
            <div class="d-flex flex-column col-8 mx-auto border border-dark rounded shadow" v-bind="user">
                <p>Prénom: {{ user.firstName }}</p>            
                <p>Nom: {{ user.lastName }}</p>
                <p>Email: {{ user.email }}</p>
                <div class="w-25"><img class="mx-auto m-3 h-50 w-50" :src="user.avatarUrl" alt="avatar"/></div>
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
</template>

<script>
import axios from 'axios'
export default {
    name:"profile",

    created() {
        axios.
        get( `http://localhost:3001/api/users/${this.userId}`, 
            {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + this.token,
            }})
        .then(res => {this.user = res.data.user})
    },
   
    data() {
        return {
            userId: localStorage.getItem('userId'),
            user:{},        
        }
    },

    
}
</script>

<style>
</style>