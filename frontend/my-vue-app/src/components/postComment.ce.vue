<template>
	<div class="container">
        <div class="row">
            <div class="col col-md-6 mx-auto border border-dark rounded shadow">
                <div>
                    <img class="mx-auto" src="" alt="gif publié par " />
                </div>
                <div>
                    <h2 class="">Commenter un gif</h2>                
                    <form>
                        <div class="mx-auto w-50 mb-3">
                            <label for="statusText" class="form-label">Commentaire :</label>
                            <input type="comment" class="form-control" id="comment">
                        </div>                
                        <button type="submit" class="btn btn-primary">Publier le commentaire</button>
                    </form>
                </div>
            </div>
        </div>         
    </div>
</template>
<script>
   export default {
        name: "postComment",

        data() {
            return {
                gifId:"",
                userId: localStorage.getItem('userId'),
                content: "",                                
                token: localStorage.getItem('token')
            }

        },

        methods: {

            postComment() {                
                const formData = new FormData();
                    formData.append("gifId"), parseInt(localStorage.getItem('gifId'))
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