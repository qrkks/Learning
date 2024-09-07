<template>
  <div class="">
    姓:<input type="text" v-model="firestName"><br>
    名:<input type="text" v-model="lastName"><br>
    姓名:<span>{{ fullName }}</span>
  </div>
</template>

<script setup>
import { ref,computed } from 'vue'

let firestName = ref('')
let lastName = ref('')

let fullName = computed(() => {
  return firestName.value + lastName.value
})

</script>

<style lang=""></style>
