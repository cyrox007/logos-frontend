<template>
  <HeaderNavbar />
  <router-view></router-view>
  <FooterPage />
</template>

<script>
import HeaderNavbar from '@/components/Navbar/Navbar.vue';
import FooterPage from '@/components/Footer/FooterPage.vue';

export default {
  name: 'App',
  components: {
    HeaderNavbar,
    FooterPage
  },
  beforeCreate(){
    document.title = "Logos";
  }
}
</script>

<style>
#app {
  text-align: center;
}
:root {
    --color-white: #FFF;
    --color-blue: #157fc4;
    --сolor-link-hover: #106196;
    --color-black: #000;
    --bg: #ededed;
}
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

body {
    background: var(--bg);
}

.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    
}
@media screen and (max-width: 1200px) {
  .container {
    padding: 0 15px;
  }  
}
</style>
