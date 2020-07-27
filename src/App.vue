<template>
  <div id="app">
    <Navbar />
    <div class="container mx-auto w-full justify-center flex flex-wrap">
      <div class="text-center mt-10 md:mt-20 lg:mt-32" id="home">
        <div>
          <h1 class="text-2xl md:text-3xl lg:text-4xl font-medium">
            Hello, I'm
            <span class="underline font-semibold">Ahmad</span> 😃
          </h1>
          <h2 class="px-10 text-lg md:text-xl lg:text-2xl">
            <span class="font-medium">Web Developer</span> based in
            <span class="font-medium">Bandung, Indonesia</span>
          </h2>
        </div>
        <hr class="mt-10 mb-5" />
        <Socmed />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Socmed from "@/components/Socmed";
export default {
  name: "App",
  components: {
    Navbar,
    Socmed
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
