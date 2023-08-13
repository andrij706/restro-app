<template>
    <div class="home">
        <header-element />
        <h1>Hello {{ name }}, Welcome on Home Page</h1>
        <table class="table" border="1">
            <tr class="header">
                <td>Id</td>
                <td>Name</td>
                <td>Contact</td>
                <td>Adress</td>
                <td>Actions</td>
            </tr>
            <tr v-for="item in restaurant" :key="item.id" class="item">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.contact }}</td>
                <td>{{ item.adress }}</td>
                <td>
                    <button class="button upd" @click="updateRestaurant(item.id)">Update</button>
                    <button class="button del" @click="deleteRestaurant(item.id)">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {useRouter} from 'vue-router';
import HeaderElement from './HeaderElement.vue';
import axios from 'axios';
export default {
    name: 'HomePage',
    components: {HeaderElement},
    setup() {
        const router = useRouter()

        const name = ref('')
        const restaurant = ref([])

        async function mounted ()  {
            const storageUser = localStorage.getItem('userInfo')
            name.value = JSON.parse(storageUser).name
            if (!storageUser){
                router.push('/sign-up')
            }
            try {
                const result = await axios.get('http://localhost:3000/restaurant')
                restaurant.value = result.data
            } catch(error) {
                console.error('Error restaurant data:', error)
            }
        }
        onMounted( async() => {
            try {
                await mounted()
            } catch(error) {
                console.error('Error restaurant data:', error)
            }
        })

        const updateRestaurant = (id) => {
            router.push('/update-restaurant/'+id)
        }

        const deleteRestaurant = async (id) => {
            try{
                await axios.delete('http://localhost:3000/restaurant/'+id)
                await mounted()
            }catch(error) {
                console.error('Error restaurant data:', error)
            }
        }

        return {name, restaurant, deleteRestaurant, updateRestaurant}
    }
}
</script>

<style scoped>
    .table {
        margin-left: 10%;
        width: 80%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    .header {
        background-color: #f2f2f2;
        font-weight: bold;
        text-align: left;
        padding: 10px;
        border-bottom: 2px solid #ccc;
    }
    td {
        width: 160px;
        height: 40px;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }
    .button {
        display: inline-block;
        padding: 10px 20px;
        margin: 10px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        border: none;
        border-radius: 5px;
        color: #ffffff;
        cursor: pointer;
    }
    .del{
        background-color: #db5334;
    }
    .del:hover {
        background-color: #b97629;
    }
    .upd{
        background-color: dodgerblue;
    }
    .upd:hover{
        background-color: rgb(44, 122, 201);
    }
</style>
