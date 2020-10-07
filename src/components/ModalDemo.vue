<template>
  <div
    class="fixed inset-0 z-50 bg-opacity-50 bg-gray-900 justify-center items-center"
    :class="showModal ? 'flex' : 'hidden'"
    @click="hideModal()"
  >
    <div class="rounded">
      <div>
        <img
          class="h-full w-full object-cover"
          src="https://dummyimage.com/1280x720/000/fff"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  watch: {
    show(val) {
      this.showModal = val;
    },
    showModal(val) {
      if (val) {
        document.querySelector("body").classList.add("overflow-hidden");
      } else {
        document.querySelector("body").classList.remove("overflow-hidden");
      }
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    portid: {
      type: String,
      default: "",
    },
  },
  methods: {
    hideModal() {
      this.showModal = false;
      this.$emit("hide-modal", false);
    },
  },
};
</script>

<style>
</style>