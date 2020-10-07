<template>
  <div class="resume">
    <h2 class="text-center text-2xl mb-2 uppercase font-semibold">Resume</h2>
    <div
      class="container mx-auto w-full md:w-8/12 lg:w-7/12 xl:w-5/12 flex flex-col"
    >
      <div class="px-3 md:px-2 mx-auto justify-center flex flex-col">
        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Education</h3>
          <div
            class="mb-2"
            v-for="(education, indexEducation) in educations"
            :key="indexEducation"
          >
            <h4 class="uppercase font-semibold">{{ education.school }}</h4>
            <h6 class="capitalize font-medium text-sm">
              {{ education.major }}
            </h6>
            <span class="text-sm capitalize">{{ education.date }}</span>
            <ul class="list-disc text-sm list-inside font-medium">
              <li
                v-for="(activity, indexActivity) in education.activities"
                :key="indexActivity"
              >
                {{ activity }}
              </li>
            </ul>
          </div>
        </div>
        <hr class="mb-5" />

        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Award</h3>
          <div
            class="mb-2"
            v-for="(award, indexAward) in awards"
            :key="indexAward"
          >
            <h4 class="uppercase font-semibold">{{ award.title }}</h4>
            <span class="text-sm capitalize">{{ award.date }}</span>
            <ul class="list-disc text-sm list-inside font-medium">
              <li v-for="(list, indexList) in award.lists" :key="indexList">
                {{ list }}
              </li>
            </ul>
          </div>
        </div>
        <hr class="mb-5" />

        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Skill</h3>
          <div class="flex w-full flex-wrap">
            <div
              class="mb-2 w-6/12"
              v-for="(skill, indexSkill) in skills"
              :key="indexSkill"
            >
              <h6 class="uppercase font-bold text-sm">{{ skill.title }}</h6>
              <ul class="list-none text-sm list-inside">
                <li v-for="(item, indexList) in skill.lists" :key="indexList">
                  {{ item }}
                </li>
              </ul>
            </div>
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
