<template>
    <div class="main">
        <div>
            <h1>NavBar</h1>
        </div>
        <div>
            <router-link to="/" >Home</router-link>
            <router-link to="/about" :provider="provider" >About</router-link>
            <button @click="contact" :provider="provider"  >Contact</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "NavBar",
    props: {
        provider:Object
    },
    methods: {
        contact() {
            this.$router.push({name:"Contact"})
        }
    }
    
}

</script>

<style scoped>

.main{
    background-color: rgb(200, 162, 168);
}
</style>