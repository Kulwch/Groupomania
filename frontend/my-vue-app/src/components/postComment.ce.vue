<template>
    <div class="col col-md-6 mx-auto border border-dark rounded shadow">
        <h3 class="h4">Commenter ce gif</h3>                
            <form  id="form" class="mt-5" @submit.prevent="postComment(gif.id)">
                <div class="mx-auto w-50 mb-3">
                    <label for="statusText" class="form-label">Commentaire :</label>
                    <input type="text" class="form-control" id="content" name="content" ref="content">
                </div>                
                <button type="submit" class="btn btn-primary" @click="postComment(gif.id)">Publier le commentaire</button>
        </form>
    </div>
</template>
<script>
   export default {
        name: "postComment",

        data() {
            return {
                gif,
                gifId:"",
                userId: localStorage.getItem('userId'),
                content: "",                                
                token: localStorage.getItem('token')
            }

        },

        methods: {

            postComment(id) {                
                const formData = new FormData();
                    formData.append("gifId", gif.id)
                    formData.append("userId", parseInt(localStorage.getItem('userId')))
                    formData.append("content", document.getElementById('content').value)
                
                axios
                    .post('http://localhost:3001/api/comments',
                        formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": 'Bearer ' + this.token
                        }
                    })
                    
            },
        }
    }

</script>
<style>
	
</style>