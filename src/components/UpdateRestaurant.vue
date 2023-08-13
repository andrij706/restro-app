<template>
    <div class="home">
        <header-element />
        <h1>Hello {{user}}, Welcome on Update Restaurant Page</h1>
        <form class="form-upd" @submit.prevent="updateRestaurant">
            <input 
                type="text" 
                name="name" 
                placeholder="Enter name" 
                v-model="restaurant.name"
                :class="{invalid: v$.name.$dirty && v$.name.required.$invalid}"
            />
            <small
                class="invalid-text"
                v-if="v$.name.$dirty && v$.name.required.$invalid"    
            >
                This field cannot be empty
            </small>

            <input 
                type="text" 
                name="contact" 
                placeholder="Enter contact" 
                v-model="restaurant.contact"
                :class="{invalid: v$.contact.$dirty && v$.contact.required.$invalid}"
            />
            <small
                class="invalid-text"
                v-if="v$.contact.$dirty && v$.contact.required.$invalid"    
            >
                This field cannot be empty
            </small>

            <input 
                type="text" 
                name="adress" 
                placeholder="Enter adress" 
                v-model="restaurant.adress"
                :class="{invalid: v$.adress.$dirty && v$.adress.required.$invalid}"
            />
            <small
                class="invalid-text"
                v-if="v$.adress.$dirty && v$.adress.required.$invalid"    
            >
                This field cannot be empty
            </small>
            <div>
                <button type="submit">Update restaurant</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import {useRouter, useRoute} from 'vue-router';
import HeaderElement from './HeaderElement.vue';
import axios from 'axios';
import {required} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
export default {
    name: 'UpdateRestaurant',
    components: {HeaderElement},
    setup() {
        const router = useRouter()
        const route = useRoute()

        const user = ref('')

        const restaurant = reactive ({
            name: '',
            contact: '',
            adress: ''        
        })

        const rules = {
            name: {required},
            contact: {required},
            adress: {required}
        }

        const v$ = useVuelidate(rules, restaurant)

        onMounted(async () => {
            const storageUser = localStorage.getItem('userInfo')
            user.value = JSON.parse(storageUser).name
            if (!storageUser){
                router.push('/sign-up')
            }
            const result = await axios('http://localhost:3000/restaurant/'+route.params.id)
            restaurant.name = result.data.name
            restaurant.adress = result.data.adress
            restaurant.contact = result.data.contact
        })

        const updateRestaurant = async () => {
            if(v$.value.$invalid){
                v$.value.$touch()
                return
            }
            await axios.put("http://localhost:3000/restaurant/"+route.params.id ,{
                name: restaurant.name,
                contact: restaurant.contact,
                adress: restaurant.adress
            })
        }

        return{user, v$, restaurant, updateRestaurant}
    }
}
</script>

<style scoped>
    .form-upd input{
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
    .form-upd button{
        width: 320px;
        height: 35px;
        border: 1px solid skyblue;
        background-color: skyblue;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
    }
    .form-upd button:hover{
        opacity: 0.8;
    }
    .form-upd input.invalid {
        border-color: red; 
        margin-bottom: 10px;
    }
    .invalid-text {
        color: red;
        font-size: 12px; 
    }
</style>