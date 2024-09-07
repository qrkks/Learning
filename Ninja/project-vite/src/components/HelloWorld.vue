<template>
    <div :class="cls">
        {{ msg }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Hello Vue 3 + Vite',
            cls: 'text-red-500'
        }
    },
}
</script>