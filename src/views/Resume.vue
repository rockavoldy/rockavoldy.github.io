<template>
  <div class="resume">
    <h2 class="text-center text-2xl mb-2 uppercase font-semibold">Resume</h2>
    <div class="container mx-auto w-full md:w-8/12 lg:w-7/12 xl:w-5/12 flex flex-col">
      <div class="px-3 md:px-2 mx-auto justify-center flex flex-col">
        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Education</h3>
          <div class="mb-2" v-for="(item, index) in education" :key="index">
            <h4 class="uppercase font-semibold">{{ item.school }}</h4>
            <h6 class="text-sm capitalize">{{ item.date }}</h6>
            <ul class="list-disc text-sm list-inside font-medium">
              <li v-for="(itemact, indexact) in item.activities" :key="indexact">{{ itemact }}</li>
            </ul>
          </div>
        </div>
        <hr class="mb-5" />

        <div class="w-auto flex flex-col mb-1">
          <h3 class="font-bold text-xl uppercase mb-3">Award</h3>
          <div class="mb-2" v-for="(item, index) in awards" :key="index">
            <h4 class="uppercase font-semibold">{{ item.title }}</h4>
            <h6 class="text-sm capitalize">{{ item.date }}</h6>
            <ul class="list-disc text-sm list-inside font-medium">
              <li v-for="(itemlist, indexlist) in item.list" :key="indexlist">{{ itemlist }}</li>
            </ul>
          </div>
        </div>
        <hr class="mb-5" />

        <!-- TODO: add Skills -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      education: [
        {
          school: "Universitas Pendidikan Indonesia",
          date: "September 2016 - Present",
          activities: [
            "Assistant Practicum Pemrograman Internet Courses (January 2019 - June 2019)",
            "Database lab Assistant (January 2018 - June 2018)"
          ]
        },
        {
          school: "Vocational High School 2 Garut",
          date: "July 2013 - February 2016",
          activities: []
        }
      ],
      awards: [
        {
          title: "Finalist Hackathon PANDI 10",
          date: "24 April 2019",
          list: [
            "This Hackathon organized by PANDI for 10th year celebration.",
            "This Hackatahon intended to use u.id on internet-based services."
          ]
        }
      ]
    };
  }
};
</script>

<style></style>
