<template>
    <div>
        <img class="logo" src="../assets/414_restaurant.jpg" />
        <h1>Login</h1>
        <div>
            <form class="login" @submit.prevent="handleLogin">
                <input 
                    type="text" 
                    v-model="email" 
                    placeholder="Enter Email"
                    >
                <input 
                    type="password" 
                    v-model="password" 
                    placeholder="Enter Password"
                >
                <div>
                    <button type="submit">Login</button>
                    <p>
                        <router-link to="/sign-up">Go to sign-up</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
    name: 'LoginPage',
    setup() {
        const router = useRouter()

        const email = ref('')
        const password = ref('')

        const handleLogin = async () =>{
            try {
                const result = await axios.get(`http://localhost:3000/user?email=${email.value}&password=${password.value}`,)
                if((await result).status === 200 & (await result).data.length > 0){
                    localStorage.setItem("userInfo", JSON.stringify((await result).data[0]))
                    router.push('/')
                } 
            } catch(error) {
                console.error('Error restaurant data:', error)
            }
        }

        onMounted(() => {
            const storageUser = localStorage.getItem('userInfo')
            if (storageUser){
                router.push('/')
            }
        })

        return{email, password, handleLogin}
    }
}
</script>

<style scoped>
    .logo {
        width: 150px;
    }
    .login input{
        width: 300px;
        height: 30px;
        padding-left: 20px;
        display: block;
        margin-bottom: 30px;
        margin-right: auto;
        margin-left: auto;
        border: 1px solid skyblue;
        border-radius: 10px;
    }
    .login button{
        width: 320px;
        height: 35px;
        border: 1px solid skyblue;
        background-color: skyblue;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
    }
    .login button:hover{
        opacity: 0.8;
    }
    .login input.invalid {
        border-color: red; 
        margin-bottom: 10px;
    }
    .invalid-text {
        color: red;
        font-size: 12px; 
    }
</style>