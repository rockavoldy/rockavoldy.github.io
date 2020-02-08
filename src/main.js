import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { head }) {
  Vue.component("Layout", DefaultLayout);

  head.htmlAttrs = { lang: "id", class: "h-full" };
  head.bodyAttrs = { class: "antialiased font-sans" };

  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Fira+Sans:400,700"
  });
}
