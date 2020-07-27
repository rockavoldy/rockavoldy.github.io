<template>
  <nav class="w-full flex justify-end p-4">
    <div>
      <ul class="flex flex-row justify-around">
        <li class="mx-2">
          <a class="nav__link" href="#">Profile</a>
        </li>
        <li class="mx-2">
          <a class="nav__link" href="#">Portfolio</a>
        </li>
        <li class="mx-2">
          <a class="nav__link" href="#">Contact</a>
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
</style>