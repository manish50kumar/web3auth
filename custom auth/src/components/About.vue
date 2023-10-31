<template>
    <NavBar/>
    <h1>This is About page</h1>
</template>

<script>
import NavBar from './NavBar.vue';
export default {
    
    name: "AboutPage",
    props: {
        provider:Object
    },
    components: {
        NavBar
    },
    mounted() {
        try {
            if (!this.provider) {
                 this.$router.push({name:"Home"})
            }
             console.log("Proctected router", this.provider);
        } catch (error) {
            console.log(error);
        }
    }
}

</script>



