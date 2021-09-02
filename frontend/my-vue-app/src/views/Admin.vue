<template>
    <div class="row">
        <div class="col">
            <h2>Administration</h2>

            <ul class="d-inline-flex justify-content-around w-50 list-unstyled">
                <li><button>Profils</button></li>
                <div class="col d-flex flex-column"><allProfiles></allProfiles></div>
                <li><button>Publications</button></li>
                <div class="col d-flex flex-column"><allGifs></allGifs></div>
                <li><button>Commentaires</button></li>
                <div class="col d-flex flex-column"><allComments></allComments></div>
                <li><router-link to="/signoff">Déconnexion</router-link></li>
            </ul>           

        </div>
    </div>
</template>

<script>
import allComments from '../components/allComments.ce.vue'
import allProfiles from '../components/allProfiles.ce.vue'
import allGifs from '../components/allGifs.ce.vue'

export default {
    components: {
        allProfiles,
        allComments,
        allGifs
    },

    data() {
        return {
            allComments:[],
            allProfiles:[],
            allGifs:[]
        }
    }

}

</script>

<style>
</style>