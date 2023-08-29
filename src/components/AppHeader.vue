<script>
export default{
    name:"AppHeader",
    data(){
        return{
            navLinks:[
                {label:"Home", name:"Home"},
                {label:"About-us", name:"About-us"},
                {label:"Musicisti", name:"Musicisti"},
                {label:"Login", name:"Login"},
                {label:"Register", name:"Register"},
            ]
        }
    }
}
</script>

<template>
    <div class="headerContainer text-black d-flex align-items-center justify-content-around bg-white">
        <div v-for="navLink in navLinks">
            <router-link :to="{name: navLink.name}">{{ navLink.label }}</router-link>
        </div>
    </div>
</template>

<style scoped></style>