<template>
    <div class="row">
        <div class="col col-md-6 mx-auto border border-dark rounded shadow bg-primary bg-gradient">
            <h2>Déconnecté(e)</h2>
            <p>Vous allez être redirigé(e) vers la page d'accueil dans 5 secondes.</p>
        </div>
    </div>
</template> 

<script>


export default {
    created() {
        setTimeout(() => this.$router.push({ path: '/' }), 5000);
        localStorage.clear()
    }
}
</script>

<style>
</style>