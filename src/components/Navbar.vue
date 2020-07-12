<template>
  <nav class="w-full bg-gray-400 flex justify-between px-4 py-3">
    <header>
      <h1 class="font-light text-lg">Header</h1>
    </header>
    <div>
      <ul class="flex flex-row">
        <li class="nav__list">
          <a class="nav__link" href="#">About</a>
        </li>
        <li class="nav__list">
          <a class="nav__link" href="#">Portfolio</a>
        </li>
        <li class="nav__list">
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
.nav__list {
  @apply mx-1;
  @apply text-white;
}

.nav__list:hover {
  @apply text-gray-700;
  @apply transition;
  @apply ease-in;
  @apply duration-150;
}

.nav__link {
  @apply bg-blue-500;
  @apply border-white;
  @apply font-medium;
  @apply px-3;
  @apply py-1;
  @apply border-b-0;
  @apply rounded;
}

.nav__link:hover {
  @apply bg-blue-100;
  @apply border-b;
  @apply rounded-t;
  @apply rounded-b-none;
  @apply border-gray-700;
  @apply transition;
  @apply ease-in;
  @apply duration-150;
}
</style>