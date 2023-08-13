<template>
    <div class="home">
        <header-element />
        <h1>Hello {{name}}, Welcome on Add Restaurant Page</h1>
        <form class="form-add" @submit.prevent="addRestaurant">
            <input 
                type="text" 
                name="name" 
                placeholder="Enter name" 
                v-model="restaurant.restName"
                :class="{invalid: v$.restName.$dirty && v$.restName.required.$invalid}"
            />
            <small
                class="invalid-text"
                v-if="v$.restName.$dirty && v$.restName.required.$invalid"    
            >
                This field cannot be empty
            </small>
            
            <input 
                type="text" 
                name="contact" 
                placeholder="Enter contact"
                v-model="restaurant.restContact"
                :class="{invalid: v$.restContact.$dirty && v$.restContact.required.$invalid}"
            />
            <small
                class="invalid-text"
                v-if="v$.restContact.$dirty && v$.restContact.required.$invalid"    
            >
                This field cannot be empty
            </small>

            <input 
                type="text" 
                name="adress" 
                placeholder="Enter adress" 
                v-model="restaurant.restAdress"
                :class="{invalid: v$.restAdress.$dirty && v$.restAdress.required.$invalid}"
            />
            <small
                class="invalid-text"
                v-if="v$.restAdress.$dirty && v$.restAdress.required.$invalid"    
            >
                This field cannot be empty
            </small>
            <div>
                <button type="submit">Add restaurant</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import {useRouter} from 'vue-router';
import HeaderElement from './HeaderElement.vue';
import axios from 'axios';
import {useVuelidate} from '@vuelidate/core'
import {required} from '@vuelidate/validators'
export default {
    name: 'AddRestaurant',
    components: {HeaderElement},
    setup() {
        const router = useRouter()

        const name = ref('')

        const restaurant = reactive ({
            restName: '',
            restContact: '',
            restAdress: ''        
        })

        const rules = {
            restName: {required},
            restContact: {required},
            restAdress: {required}
        }

        const v$ = useVuelidate(rules, restaurant)

        const addRestaurant = async () => {
            if(v$.value.$invalid){
                v$.value.$touch()
                return
            }
            try {
                await axios.post("http://localhost:3000/restaurant",{
                    name: restaurant.restName,
                    contact: restaurant.restContact,
                    adress: restaurant.restAdress
                })
                restaurant.restName = ''
                restaurant.restContact = ''
                restaurant.restAdress = ''
            } catch(error) {
                console.error('Error restaurant data:', error)
            }
        }

        onMounted(() => {
            const storageUser = localStorage.getItem('userInfo')
            name.value = JSON.parse(storageUser).name
            if (!storageUser){
                router.push('/sign-up')
            }
        })

        return {name, v$, restaurant, addRestaurant}
    }
}
</script>

<style scoped>
    .form-add input{
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
    .form-add button{
        width: 320px;
        height: 35px;
        border: 1px solid skyblue;
        background-color: skyblue;
        border-radius: 10px;
        color: #fff;
        cursor: pointer;
    }
    .form-add button:hover{
        opacity: 0.8;
    }
    .form-add input.invalid {
        border-color: red; 
        margin-bottom: 10px;
    }
    .invalid-text {
        color: red;
        font-size: 12px; 
    }
</style>