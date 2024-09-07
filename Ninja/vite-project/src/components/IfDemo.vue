<template>
    <div>
        <h3>条件渲染</h3>
        <div v-if="show">你能看见我吗?</div>
        <div v-else-if="!show">你看不见我</div>
        <div v-else>你看得见我吗</div>
        <button @click="show = !show">切换</button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            show: false
        }
    }
}
</script>