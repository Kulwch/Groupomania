<template>
    <div class="col mx-auto border border-dark rounded shadow">
        <h2 class="">Publier un gif</h2>                
        <form>
            <div class="mx-auto w-50 mb-3">
                <label for="statusText" class="form-label">Statut :</label>
                <input type="statusText" class="form-control" id="statusText">
            </div>
            <div class="w-50 mx-auto mb-3">
                <label for="gif" class="form-label">Gif : </label>
                <input type="file" class="form-control-file mx-auto" id="gif">                        
            </div>                    
            <button type="submit" class="btn btn-primary mb-3">Publier le Gif</button>
        </form>
    </div>       
</template>
<script setup>

</script>
<style>
	
</style>