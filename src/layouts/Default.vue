<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<script>
import config from "~/.temp/config.js";
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  },
  computed: {
    config() {
      return config;
    }
  }
};
</script>

<style src="~/assets/css/main.css"></style>
