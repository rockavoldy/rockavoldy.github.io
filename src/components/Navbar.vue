<template>
  <nav class="w-full flex justify-end p-4">
    <div id="nav">
      <ul class="flex flex-row justify-around">
        <li class="mx-2">
          <router-link class="nav__link" to="/">Home</router-link>
        </li>
        <li class="mx-2">
          <router-link class="nav__link" to="/resume">Resume</router-link>
        </li>
        <li class="mx-2">
          <router-link class="nav__link" to="/portfolio">Portfolio</router-link>
        </li>
        <li class="mx-2">
          <router-link class="nav__link" to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.nav__link {
  @apply bg-gray-100;
  @apply border;
  @apply border-gray-400;
  @apply px-3;
  @apply py-1;
  @apply rounded;
  @apply font-medium;
}

.nav__link:hover {
  @apply bg-blue-100;
  @apply border-gray-700;
  @apply transition;
  @apply ease-in;
  @apply duration-100;
}

#nav a.router-link-exact-active {
  @apply bg-blue-100;
  @apply border-gray-700;
}
</style>
