<template>
  <div id="app">
    <div class="relative min-h-screen">
      <Navbar />
      <router-view class="pb-10" />
      <Footer />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {
    Navbar,
    Footer: () => import("@/components/Footer"),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
