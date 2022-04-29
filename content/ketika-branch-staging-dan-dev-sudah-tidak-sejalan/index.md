---
title: "Ketika Branch Staging Dan Dev Sudah Tidak Sejalan"
description: "Ketika Branch Staging Dan Dev Sudah Tidak Sejalan"
date: 2022-04-29T05:51:58+07:00
cover: false
fullscreen: false
draft: false
summary: Ketika maintenance repository yang sudah besar, untuk deployment ini tidak bisa langsung merge dari branch dev ke branch master. Artikel ini berisi langkah-langkah untuk apply commit tertentu dari branch dev ke staging atau master. 
---

Saat ini, di tempat saya sekarang dipercaya untuk jadi maintainer salah satu project dengan git history yang sudah lama. Mengurus deployment ke training server untuk test fitur-fitur atau fix atau improvement, dan melakukan deployment ke live server. 

Masalah datang ketika branch master (live server) dan branch dev (training server) ini sudah tidak sejalan, jika melakukan branching dari dev lalu merge ke branch master, merge conflict-nya ini terlalu banyak untuk di solve 1-1
{{< img src="img/git-diff-shortstat.png" alt="ketika compare branch dev dan branch master" >}}
*Ketika compare branch dev dan branch master*

Mungkin ini hanya terjadi di tempat saya sekarang, atau mungkin issue ini sudah jadi issue umum ketika maintenance project lama dengan codebase yang besar, entahlah.

> dan pertanyaan 2 miliar-nya adalah, **bagaimana untuk solve case seperti ini?**

Please welcome **git cherry-pick**

Simplenya, siapkan dulu commit-commit dari changes yang mau di-apply, bisa di save dulu ke note mungkin. Lalu buat branch baru dari branch staging, checkout ke branch baru ini, dan `git cherry-pick <commit-hash>` nya 1-1 dari commit paling awal (terlama sampai terbaru) sambil diliat tiap-tiap cherry-picknya ini jika ada conflict.

Penjelasan panjangnya, git cherry-pick biasa ini digunakan untuk mengambil commit-commit tertentu, jadi
1. Siapkan commit-commit yang akan diambil dari branch dev, misal untuk mengambil fitur A, siapkan commit-commitnya dari ketika pertama fitur A dibuat
2. Buat branch baru dari branch staging, pastikan sudah melakukan `git pull` sebelum melakukan branching
3. `git checkout` ke branch baru hasil branching dari staging
4. `git cherry-pick ` satu per satu commit yang sudah disiapkan tadi dari commit paling awal sampai terbaru. cherry-pick satu per satu ini agar bisa cek juga ketika ada conflict
5. Jika semua commit sudah ter-apply, saatnya cek dengan `git diff <branch dev> -- folder/file yang diubah`
6. Hasil pada poin 5 ini akan kosoong jika branch file yang dibandingkan ini dengan file dari branch dev sudah sama, berarti process cherry-pick untuk apply commit-commit-nya ini sudah sesuai. Atau jika ada output, bisa di cek sekaligus jika perbedaannya itu karena ada commit yang kurang, atau tidak berhubungan dengan fitur A ini.
7. Setelah dipastikan aman, saatnya create Merge Request dari branch ini ke branch `staging`, harus-nya sudah tidak ada merge conflict lagi. Setelah review aman, merge MR ini, dan buat merge request baru dari `staging` ke branch `master`

**Note:** 
> - Mungkin ada yang bingung kenapa sampai ada 3 branch utama `master`, `staging`, dan `dev`, branch `staging` di tempat saya sekarang digunakan untuk menampung dulu hasil cherry-pick dari branch `dev`, lalu setelah semua aman, baru di merge ke branch `master`, jadi branch `staging` ini akan selalu sama dengan branch `master` dan bisa langsung di merge tanpa ada conflict. Berbeda dengan branch `dev`, biasanya banyak fitur yang telah dikembangkan tidak jadi digunakan di live, dan traffic branch `dev` ini akan selalu ramai untuk testing, karena itu tidak bisa merge langsung dari `dev` ke `staging` atau `master` tanpa conflict. 
> - Adanya branch `staging` ini juga mempermudah proses revert commit jika misal deployment saat itu ada fatal error, dan harus melakukan rollback seluruh changes pada deployment saat itu.
