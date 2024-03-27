<template>
    <!-- CSRF START -->
    <input type="hidden" id="ipHash" name="ipHash" :value="ipHash">
    <input type="hidden" id="requestTokent" name="requestTokent" :value="requestToken">
    <input type="hidden" id="sig" name="sig" :value="sig"> 
    <!-- CSRF END -->
</template>

<script>
export default {
    name: 'FormCSRF',
    props: {
        ipHash: { type: String },
        requestToken: { type: String },
        sig: { type: String },
    },
    data(){
        return {}
    }
}
</script>