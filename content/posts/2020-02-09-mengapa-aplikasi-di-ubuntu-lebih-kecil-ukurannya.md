---
title: "Mengapa Aplikasi di Ubuntu lebih kecil ukurannya"
slug: ""
description: ""
date: 2020-02-09 04:51:41
author: akhmad
tags:
    - Linux
    - Package Manager
cover: ""
fullscreen: false
published: true
---

Kalian yang baru migrasi dari Windows atau macOS ke Linux khususnya ubuntu bertanya-tanya "Kenapa aplikasi di ubuntu lebih kecil ukurannya daripada yang ada di Windows/macOS?". Saya akan mencoba menjawab pertanyaan ini dari pengalaman Saya sendiri dan juga rangkuman dari tulisan yang ada di internet.

Bisa dilihat ketika _install_ aplikasi. Pada Windows biasanya dikemas dalam satu paket _installer_ yang setelah dipasang langsung bisa digunakan meskipun pemasangan sedang tidak terkoneksi internet. Berbeda pada Ubuntu, aplikasi utama akan dipasang setelah _dependency/library_ yang dibutuhkan sudah ada di sistem, dimana _package manager_ biasanya akan memasang sendiri dengan mengunduh langsung dari _repository_. Pada Windows _dependency/library_ ini biasanya sudah termasuk pada paket _installer_ itu sendiri kecuali beberapa shared object seperti .NET Framework dan lainnya. Hal ini juga menjadi salah satu penyebab _size_ sistem yang dibutuhkan pada Windows lebih besar daripada Ubuntu karena banyaknya \*.dll\* yang _duplicate_.

Hal ini membuat mulai bermunculannya _package manager_ lain yang lebih memudahkan pengguna, dan juga pengembang. Pengguna akan lebih mudah karena aplikasi yang diunduh bisa langsung digunakan tanpa harus memikirkan tentang _dependency_ yang tidak sesuai. Contoh kasus yang biasanya terjadi adalah:

-   Udin memasang sistem operasi Ubuntu yang baru rilis beberapa hari.
-   Udin biasa menggunakan aplikasi _office_ yang bukan open-source, karena memang sudah terbiasa dengan aplikasinya itu.
-   Ketika Udin mau mengunduh aplikasi _office_ itu, dia tidak menemukan untuk versi OS yang baru rilis dalam beberapa hari kebelakang.
-   Karena Udin membutuhkannya, maka dia mencoba mengunduh aplikasi itu dengan target OS 1 tingkat dibawah OS yang sekarang dipasang.
-   Ketika _install_, aplikasi _office_ itu membutuhkan _library_ a-lib dengan versi diatas 2.4 dan dibawah 2.8 untuk bisa dipasang.
-   Tetapi karena versi OS yang Udin pasang adalah OS terbaru, a-lib yang sudah terpasang adalah versi 3.2 .
-   Udin memaksa untuk mengunduh manual _library_ a-lib versi 2.8 dan memasangnya sendiri, tetapi karena a-lib membutuhkan lagi _library_ b-lib dengan versi 1.2 kebawah, maka Udin juga harus mencari _library_ b-lib versi 1.2 kebawah yang bisa dipasang.

Kasus diatas biasa disebut _Dependency hell_. Bisa dilihat bagaimana ketergantungan dari aplikasi dan _library_ tertentu akan sangat memusingkan dan mengganggu. maka dari itu _package manager_ seperti Snapcraft, Flatpak, dan AppImage bermunculan untuk membantu user.

Tetapi meskipun kelihatannya ini menyebabkan banyak masalah, kenapa sampai sekarang tidak membuat _package manager_ seperti Snapcraft, Flatpak, dan AppImage menjadi _default_?
Karena aplikasi dan library pada linux biasanya _open-source_, keamanan adalah alasan kenapa _dependency_ yang diperlukan oleh aplikasi tidak di _bundle_ dalam 1 paket. Ketika terdapat masalah keamanan seperti sebuah _library_ terdapat bug bisa akses remote tanpa _auth_ apapun, ketika _maintainer_ mendapatkan laporan, akan segera diperbaiki dan user akan diberitahu untuk mengupdate _library_ tersebut. Hal ini tidak akan bisa diatasi dengan cepat jika _library_ itu ada dalam 1 paket aplikasi.

Jadi, OS yang baru rilis beberapa hari boleh dicoba, tetapi biasanya belum bisa dipakai untuk _daily usage_ karena masih terdapat banyaknya _bug_, dan juga aplikasi yang masih terbatas untuk bisa dipakai diversi terbaru itu.

> If it ain't broke, don't fix it

Beberapa sumber:

-   [gentoo wiki](https://wiki.gentoo.org/wiki/Why_not_bundle_dependencies)
-   [snapcraft.io](https://snapcraft.io/docs/getting-started)
-   [appimage](https://appimage.org)
-   [ostechnix](https://www.ostechnix.com/linux-package-managers-compared-appimage-vs-snap-vs-flatpak/)
-   [Quora](https://www.quora.com/Why-was-dependency-hell-a-thing-in-Linux-Why-couldnt-the-source-package-just-include-the-necessary-requirements-and-link-to-a-directory-in-a-Makefile)
-   [Quora](https://www.quora.com/Why-do-Linux-software-repositories-sometimes-have-severely-out-dated-packages?share=1)
-   [stackexchange](https://unix.stackexchange.com/questions/265271/why-linux-has-so-many-dependency-problems-when-installing-software-while-windows)
