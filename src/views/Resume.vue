<template>
  <div class="resume">
    <h2 class="text-center text-2xl mb-2 uppercase font-semibold">Resume</h2>
    <div
      class="container mx-auto w-full md:w-8/12 lg:w-7/12 xl:w-5/12 flex flex-col"
    >
      <div class="px-3 md:px-2 mx-auto justify-center flex flex-col">
        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Education</h3>
          <div class="mb-2" v-for="(item, index) in educations" :key="index">
            <h4 class="uppercase font-semibold">{{ item.school }}</h4>
            <span class="text-sm capitalize">{{ item.date }}</span>
            <ul class="list-disc text-sm list-inside font-medium">
              <li
                v-for="(itemact, indexact) in item.activities"
                :key="indexact"
              >
                {{ itemact }}
              </li>
            </ul>
          </div>
        </div>
        <hr class="mb-5" />

        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Award</h3>
          <div class="mb-2" v-for="(item, index) in awards" :key="index">
            <h4 class="uppercase font-semibold">{{ item.title }}</h4>
            <span class="text-sm capitalize">{{ item.date }}</span>
            <ul class="list-disc text-sm list-inside font-medium">
              <li v-for="(itemlist, indexlist) in item.list" :key="indexlist">
                {{ itemlist }}
              </li>
            </ul>
          </div>
        </div>
        <hr class="mb-5" />

        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Skill</h3>
          <div
            class="mb-2 flex flex-col"
            v-for="(item, index) in skills"
            :key="index"
          >
            <h6 class="uppercase font-bold text-sm">{{ item.title }}</h6>
            <ul
              class="list-none text-sm list-inside"
              v-for="(itemlist, indexlist) in item.list"
              :key="indexlist"
            >
              <li>{{ itemlist }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { educations, awards, skills } from "@/assets/data/resume.json";
export default {
  data() {
    return {
      educations: educations,
      awards: awards,
      skills: skills,
    };
  },
};
</script>

<style></style>
