<template>
    <div>
        <img class="logo" src="../assets/414_restaurant.jpg" />
        <h1>Sign Up</h1>
        <div>
            <form class="register" @submit.prevent="signUp">
                <input 
                    type="text" 
                    v-model="name" 
                    placeholder="Enter Name"
                    :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}"    
                >
                <small
                    class="invalid-text"
                    v-if="v$.name.$dirty && v$.name.required.$invalid"    
                >
                    Invalid input
                </small>

                <input 
                    type="text" 
                    v-model="email" 
                    placeholder="Enter Email"
                    :class="{invalid: (v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.emailValid.$invalid)}"
                >
                <small
                    class="invalid-text"
                    v-if="(v$.email.$dirty && v$.email.required.$invalid) || (v$.email.$dirty && v$.email.emailValid.$invalid)"    
                >
                    Invalid input
                </small>

                <input 
                    type="password" 
                    v-model="password" 
                    placeholder="Enter Password"
                    :class="{invalid: (v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)}"
                >
                <small
                    class="invalid-text"
                    v-if="(v$.password.$dirty && v$.password.required.$invalid) || (v$.password.$dirty && v$.password.minLength.$invalid)"    
                >
                    Invalid input
                </small>
                <div>
                    <button type="submit">Sign Up</button>
                    <p>
                        <router-link to="/login">Go to login</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import axios from 'axios'
import {useRouter} from 'vue-router'
import {useVuelidate} from '@vuelidate/core'
import {required, email as emailValid, minLength} from '@vuelidate/validators'
export default {
    name: 'SignUp',
    setup(){
        const router = useRouter()

        const name = ref('')
        const email = ref('')
        const password = ref('')

        const rules = {
            name: {required},
            email: {required, emailValid},
            password: {required, minLength: minLength(6)}
        }

        const v$ = useVuelidate(rules, {name, email, password})

        const signUp = async () => {
            if(v$.value.$invalid){
                v$.value.$touch()
                return
            }
            try{
                const result = axios.post("http://localhost:3000/user",
                    {
                        name: name.value,
                        email: email.value,
                        password: password.value
                    })
                if((await result).status === 201){
                    localStorage.setItem("userInfo", JSON.stringify((await result).data))
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

        return {name, email, password, signUp, v$}
    }
}
</script>

<style scoped>
    .logo {
        width: 150px;
    }
    .register input{
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
    .register button{
        width: 320px;
        height: 35px;
        margin-top: 10px;
        border: 1px solid skyblue;
        background-color: skyblue;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
    }
    .register button:hover{
        opacity: 0.8;
    }
    .register input.invalid {
        border-color: red; 
        margin-bottom: 10px;
    }
    .invalid-text {
        color: red;
        font-size: 12px; 
    }
</style>