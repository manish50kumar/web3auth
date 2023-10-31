
<template>
    <NavBar/>
    <h1>This is component page</h1>
</template>

<script>
import NavBar from './NavBar.vue';
export default {
    name: 'ContactPage',
    components: {
       NavBar   
    },
    props: {
        provider:Object
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