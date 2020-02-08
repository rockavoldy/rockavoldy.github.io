module.exports = {
  siteName: "Blog | Akhmad",
  siteDescription:
    "Catatan, pengingat, dan build log project open-source. Ada juga tulisan opini, tutorial, dan teknologi yang menarik untuk dibahas.",
  siteUrl: "https://blog.akhmad.id",
  titleTemplate: `%s | Akhmad`,
  icon: "src/favicon.png",

  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      plugins: [
        [
          "gridsome-plugin-remark-shiki",
          {
            theme: "min-light"
          }
        ]
      ]
    }
  },

  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/posts/**/*.md",
        typeName: "Post",
        refs: {
          tags: {
            typeName: "Tag",
            create: true
          },
          author: {
            typeName: "Author",
            create: true
          }
        }
      }
    },
    {
      use: "gridsome-plugin-gtm",
      options: {
        id: "G-SSJJDEH4S6",
        enabled: true
      }
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000 // default
      }
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Blog Akhmad",
          feed_url: "https://blog.akhmad.id/feed.xml",
          site_url: "https://blog.akhmad.id"
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: "https://blog.akhmad.id" + node.path,
          author: node.author,
          date: node.date
        }),
        output: {
          dir: "./static",
          name: "feed.xml"
        }
      }
    }
  ],

  templates: {
    Post: "/:title",
    Tag: "/tag/:id",
    Author: "/author/:id"
  },

  chainWebpack: config => {
    config.module
      .rule("css")
      .oneOf("normal")
      .use("postcss-loader")
      .tap(options => {
        options.plugins.unshift(
          ...[
            require("postcss-import"),
            require("postcss-nested"),
            require("tailwindcss")
          ]
        );

        if (process.env.NODE_ENV === "production") {
          options.plugins.push(
            ...[
              require("@fullhuman/postcss-purgecss")({
                content: ["src/assets/**/*.css", "src/**/*.vue", "src/**/*.js"],
                defaultExtractor: content =>
                  content.match(/[\w-/:%]+(?<!:)/g) || [],
                whitelistPatterns: [/shiki/]
              })
            ]
          );
        }

        return options;
      });
  }
};
