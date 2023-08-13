<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/add-restaurant">Add restaurant</router-link>
        <a @click="logout" href="#">Logout</a>
    </div>
</template>

<script>
import {useRouter} from 'vue-router'
export default {
    name: 'HeaderElement',
    setup() {
        const router = useRouter()

        const logout = () => {
            localStorage.clear()
            router.push('/login')
        }

        return {logout}
    },
}
</script>

<style scoped>
.nav{
    background-color: #333;
    overflow: hidden;
}
.nav a{
    float: left;
    color: #f2f2f2;
    padding: 14px 14px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 10px;
}
.nav a:hover{
    background-color: #ddd;
    color: #333;
}
</style>