<template>
    <div
        class="d-flex flex-column align-items-start col-8 mx-auto border border-dark rounded shadow bg-white"
        v-bind="$attrs"
    >
        <p>
            <strong>Prénom:</strong>
            {{ $attrs.firstName }}
        </p>
        <p>
            <strong>Nom:</strong>
            {{ $attrs.lastName }}
        </p>
        <p>
            <strong>Email:</strong>
            {{ $attrs.email }}
        </p>
        <p v-if="$attrs.isAdmin === true">
            <strong>Rôle:</strong> Admin
        </p>
        <p v-else>
            <strong>Rôle:</strong> Utilisateur
        </p>
        <p>
            <strong>Fonction au sein de l'entreprise :</strong>
            {{ user.job }}
        </p>
        <p>
            <strong>Inscrit(e) depuis le :</strong>
            {{ dateTime($attrs.createdAt) }}
        </p>
        <div class="w-50 mx-auto mb-3">
            <img class="mw-100" :src="$attrs.avatarUrl" alt="avatar" />
        </div>
        <button
            v-if="$attrs.isAdmin !== true"
            class="btn btn-outline-primary mx-auto mb-2"
            @click.prevent="setUserAdmin($attrs.id)"
        >Promouvoir admin</button>
    </div>
    <div class="d-flex flex-column col-8 mx-auto border border-dark rounded shadow mt-1 mb-3">
        <form
            id="form"
            class="mt-5"
            enctype="multipart/form-data"
            @submit.prevent="adminModifyAvatar($attrs.id)"
        >
            <div class="mx-auto w-50 mb-3">
                <label for="avatar" class="form-label">Changer d'avatar&nbsp;</label>
                <input
                    type="file"
                    class="form-control-file"
                    name="image"
                    id="image"
                    ref="image"
                    v-on:change="handleFileUpload()"
                />
                <button
                    type="submit"
                    class="form-control btn btn-outline-primary"
                    name="submitAvatar"
                    id="submitAvatar"
                    @click.prevent="adminModifyAvatar($attrs.id)"
                >Modifier</button>
            </div>
        </form>
        <span>
            <button
                class="btn btn-outline-primary mb-5"
                v-bind="user"
                @click.prevent="adminDeleteUser($attrs.id)"
            >Supprimer ce compte</button>
        </span>
    </div>
</template>

<script>
import axios from "axios"
import moment from 'moment'

export default {
    name: "user",

    data() {
        return {
            users: [],
            user: {
                isAdmin: localStorage.getItem("isAdmin")
            },
            userId: localStorage.getItem("userId"),
            token: localStorage.getItem("token")
        }
    },

    methods: {

        dateTime (value) {
                return moment(value).format('DD-MM-YYYY');
        },

        adminDeleteUser(id) {
            axios.
                delete(`http://localhost:3001/api/users/admin/del/${id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": 'Bearer ' + this.token
                        }
                    })
                .then(() => this.$router.go())
        },

        handleFileUpload() {
            this.image = this.$refs.image.files[0];
            this.imageUrl = URL.createObjectURL(this.image)
        },

        adminModifyAvatar(id) {

            const formData = new FormData();
            formData.append("userId", parseInt(localStorage.getItem('userId')))
            formData.append("image", this.image)

            axios.
                put(`http://localhost:3001/api/users/admin/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": 'Bearer ' + this.token
                        }
                    })
                .then(() => this.$router.go())
        },

        setUserAdmin(id) {
            axios
                .put(`http://localhost:3001/api/users/new/admin/${id}`,
                    {
                        userId: localStorage.getItem("userId"),
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