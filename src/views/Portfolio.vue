<template>
  <div class="portfolio">
    <h2 class="text-center text-2xl uppercase font-semibold">Portfolio</h2>
    <h5 class="text-center font-medium mb-2">
      Here is lists of my existing and ongoing project
    </h5>
    <div
      class="container mx-auto w-full md:w-8/12 lg:w-7/12 xl:w-5/12 flex flex-col"
    >
      <div class="px-3 md:px-2 mx-auto justify-center flex flex-col">
        <div class="w-auto flex flex-col">
          <div class="mb-2" v-for="(item, index) in portfolio" :key="index">
            <h4 class="uppercase font-semibold text-lg">{{ item.title }}</h4>
            <div>
              <ul class="list-none text-sm font-medium">
                <li class="flex">
                  <span>
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
                      />
                    </svg>
                  </span>
                  <span class="px-1 whitespace-pre-wrap">{{ item.desc }}</span>
                </li>
                <li class="flex">
                  <span>
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M22.61,19L13.53,9.91C14.46,7.57 14,4.81 12.09,2.91C9.79,0.61 6.21,0.4 3.66,2.26L7.5,6.11L6.08,7.5L2.25,3.69C0.39,6.23 0.6,9.82 2.9,12.11C4.76,13.97 7.47,14.46 9.79,13.59L18.9,22.7C19.29,23.09 19.92,23.09 20.31,22.7L22.61,20.4C23,20 23,19.39 22.61,19M19.61,20.59L10.15,11.13C9.54,11.58 8.86,11.85 8.15,11.95C6.79,12.15 5.36,11.74 4.32,10.7C3.37,9.76 2.93,8.5 3,7.26L6.09,10.35L10.33,6.11L7.24,3C8.5,2.95 9.73,3.39 10.68,4.33C11.76,5.41 12.17,6.9 11.92,8.29C11.8,9 11.5,9.66 11.04,10.25L20.5,19.7L19.61,20.59Z"
                      />
                    </svg>
                  </span>
                  <span class="px-1">{{ item.tech }}</span>
                </li>
                <li class="flex">
                  <span>
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M2.6,10.59L8.38,4.8L10.07,6.5C9.83,7.35 10.22,8.28 11,8.73V14.27C10.4,14.61 10,15.26 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.26 13.6,14.61 13,14.27V9.41L15.07,11.5C15,11.65 15,11.82 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10C16.82,10 16.65,10 16.5,10.07L13.93,7.5C14.19,6.57 13.71,5.55 12.78,5.16C12.35,5 11.9,4.96 11.5,5.07L9.8,3.38L10.59,2.6C11.37,1.81 12.63,1.81 13.41,2.6L21.4,10.59C22.19,11.37 22.19,12.63 21.4,13.41L13.41,21.4C12.63,22.19 11.37,22.19 10.59,21.4L2.6,13.41C1.81,12.63 1.81,11.37 2.6,10.59Z"
                      />
                    </svg>
                  </span>
                  <span class="px-1">
                    <a
                      :class="
                        item.repo !== ''
                          ? 'hover:text-blue-700 border-b hover:border-gray-700'
                          : ''
                      "
                      :href="item.repo !== '' ? item.repo : false"
                      target="_blank"
                      >{{
                        item.repo !== ""
                          ? "See the code on GitHub."
                          : "Sorry, this is a private project."
                      }}</a
                    >
                  </span>
                </li>

                <li
                  class="flex"
                  v-if="
                    (item.link !== '' && item.slide === '') ||
                    (item.link === '' && item.slide === '')
                  "
                >
                  <span>
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"
                      />
                    </svg>
                  </span>
                  <span class="px-1">
                    <a
                      :class="
                        item.link !== ''
                          ? 'border-b hover:text-blue-700 hover:border-gray-700'
                          : ''
                      "
                      :href="item.link !== '' ? item.link : false"
                      target="_blank"
                      >{{
                        item.link !== "" ? item.link : "No demo available."
                      }}</a
                    >
                  </span>
                </li>

                <li class="flex" v-if="item.link === '' && item.slide !== ''">
                  <span>
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z"
                      />
                    </svg>
                  </span>
                  <span class="px-1">
                    <a
                      :class="
                        item.slide !== ''
                          ? 'border-b hover:text-blue-700 hover:border-gray-700 cursor-pointer'
                          : ''
                      "
                      @click="item.slide !== '' ? openModal(item.slide) : null"
                      >{{
                        item.slide !== ""
                          ? "Screenshot of the project"
                          : "No screenshot available."
                      }}</a
                    >
                  </span>
                </li>
              </ul>
            </div>
            <hr class="mt-2 mb-4" />
          </div>
        </div>
      </div>
    </div>
    <ModalDemo
      :show="modal.show"
      @hide-modal="modal.show = $event"
      :portid="modal.portid"
    />
  </div>
</template>

<script>
import { portfolio } from "@/assets/data/portfolio.json";
export default {
  components: {
    ModalDemo: () => import("@/components/ModalDemo"),
  },
  data() {
    return {
      portfolio: portfolio,
      modal: {
        portid: "",
        show: false,
      },
    };
  },
  watch: {
    modal: {
      handler(val) {
        if (!val.show) {
          this.modal.portid = "";
        }
      },
      deep: true,
    },
  },
  methods: {
    openModal(portid) {
      this.modal.portid = portid;
      this.modal.show = true;
    },
  },
};
</script>

<style></style>
