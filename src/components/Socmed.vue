<template>
  <div class="w-full">
    <ul class="flex flex-row justify-around text-center">
      <li>
        <a
          class="socmed__link"
          target="_blank"
          href="https://github.com/rockavoldy"
          >GitHub</a
        >
      </li>
      <li>
        <a
          class="socmed__link"
          target="_blank"
          href="https://twitter.com/rockavoldy"
          >Twitter</a
        >
      </li>
      <li>
        <a class="socmed__link" target="_blank" href="https://fb.me/rockavoldy"
          >Facebook</a
        >
      </li>
      <li>
        <a
          class="socmed__link"
          target="_blank"
          href="https://www.linkedin.com/in/akhmad98"
          >LinkedIn</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
.socmed__link {
  @apply font-medium;
  @apply px-2;
  @apply py-1;
  @apply border-b-2;
  @apply flex;
}

.socmed__link:visited {
  @apply text-blue-900;
}

.socmed__link:hover {
  @apply text-blue-700;
  @apply border-gray-700;
  @apply transition;
  @apply ease-in;
  @apply duration-100;
}
</style>
