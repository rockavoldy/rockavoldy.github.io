---
title: "Make Your Project's Docker Image Smaller"
description: "Make Your Project's Docker Image Smaller"
date: 2022-06-19T00:28:19+07:00
cover: false
fullscreen: false
draft: false
summary: Summary dari artikel
---

I have some experiences using docker and docker-compose back from 2019, but it's a basic docker, at least it can run my app easily using docker-compose, and i'm not doing anything with it. Then, in the end of last year, i found this back-end challenge from [Skyshi x devcode](https://blog.gethired.id/devcode-challenge-2nd/). 

The main goal of this challenge is easy, create API with MySQL and create the docker image, but the "main" goal in this challenge is how your app can handle concurrent insert and update and still make sure the integrity of data. [My best score](https://devcode.gethired.id/job/share/SXK789) is at 31.011ms, and i'm at 40 from 65, i'm not sure how top scorer can make the response time below 10ms while still manage the data integrity, and my experience on concurrent programming , so i still have a long way to go.
{{< img src="img/submission.png" >}}

Beside of optimizing the app, first time i can do is optimizing the size of my docker image, with my basic docker knowledge, i can't manage to make it below 100MB because i use the same stage for build and run my app. Some read and search about "How to optimize docker image for go app", and found some articles that use suggest to make it multi-stage, so build first, and copy the binary to the distroless image [just like my first push dockerize the app to github here](https://github.com/rockavoldy/devcode-api-todo/commit/d686ec66a0dd536af773bb2b8069adff1c4f198f). But i still didn't satisfied with distroless image, because it still takes around 30MB, while i see the others challenger image size barely reach 10MB, it's around 4 or 5MB, but then after trying to use alpine, its shrinked to 5MB, and i'm satisfied with the result.

So, 
