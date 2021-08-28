<template>
    <div class="container">
        <div class="row">
            <div class="col col-md-6 mx-auto border border-dark rounded shadow">
                <h2 class="h3">Vos informations de profil : </h2>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p class=""></p>
                <img class="mx-auto m-3" src="" alt="avatar"/>
                <button @click="" class="btn btn-primary w-25 mb-3 mx-auto">Modifier votre profil : </button>
            </div>            
        </div>
        <div class="col col-md-6 mx-auto border border-dark rounded shadow">
            <form>
                <div class="mx-auto w-50 mb-3">
                    <label for="avatar" class="form-label" >Changer d'avatar</label>
                    <input type="file" class="form-control-file" name="avatar" id="avatar"/>
                    <input type="submit" class="form-control btn btn-primary" name="submitAvatar" id="submitAvatar"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
</script>

<style>
</style>