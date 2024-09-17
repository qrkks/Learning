<template>
    
    <div>
        <h2>name: {{ car.name }} - color: {{ car.color }} - price: {{ car.price }}</h2>
        <button @click="changePrice">Change Price</button>
    </div>
</template>
<script setup>
import {reactive} from 'vue';

let car = reactive({
    name: 'Car',
    color: 'blue',
    price: 100
})

function changePrice() {
    car.price += 20;
}
</script>
<style>
    
</style>
