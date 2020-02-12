<template>
  <article class="mt-16 md:mt-20 lg:mt-24">
    <div class="mx-auto max-w-3xl px-6 shadow border rounded-sm">
      <div class="py-8 border-b border-gray-300">
        <header class="text-center mb-8">
          <time
            :datetime="post.datetime"
            class="text-gray-700 text-xs mb-2 uppercase"
          >{{ formatPublishDate(post.datetime) }}</time>
          <h2 class="text-2xl sm:text-3xl leading-tight font-sans mb-1 sm:mb-2">
            <g-link
              :to="`${post.path}/`"
              class="border-b border-transparent hover:border-gray-700 transition-border-color text-black font-bold"
            >{{ post.title }}</g-link>
          </h2>
          <p class="text-gray-700 leading-normal text-sm sm:text-base">
            <span v-if="post.author">
              by
              <g-link
                :to="`${post.author.path}/`"
                class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-border-color"
                v-if="post.author"
              >{{ titleCase(post.author.title) }}</g-link>
            </span>
            <span v-if="post.tags && post.tags.length > 0">
              in
              <g-link
                :to="`${post.tags[0].path}/`"
                class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-border-color"
              >{{ titleCase(post.tags[0].title) }}</g-link>
            </span>
            <span v-if="post.author || (post.tags && post.tags.length > 0)">&nbsp;&bull;&nbsp;</span>
            <span>{{ post.timeToRead }} min read</span>
          </p>
        </header>
        <p
          class="leading-normal text-gray-700 text-base px-2 sm:px-4 md:px-10 text-justify"
          v-html="excerpt(post, 280, ' ...')"
        ></p>
      </div>
    </div>
  </article>
</template>

<script>
import moment from "moment";

export default {
  props: ["post"],
  computed: {
    formattedPublishDate() {
      return moment(this.post.datetime).format("DD MMMM, YYYY");
    }
  },
  methods: {
    formatPublishDate(date) {
      return moment(date).format("DD MMMM, YYYY");
    },
    excerpt(post, length, clamp) {
      if (post.excerpt) {
        return post.excerpt;
      }

      length = length || 280;
      clamp = clamp || " ...";
      let text = post.content
        .replace(/<pre(.|\n)*?<\/pre>/gm, "")
        .replace(/<[^>]+>/gm, "");

      return text.length > length ? `${text.slice(0, length)}${clamp}` : text;
    },
    titleCase(str) {
      return str
        .replace("-", " ")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    }
  }
};
</script>
