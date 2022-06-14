<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/global/Header";

export default {
  name: "AppLayout",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
