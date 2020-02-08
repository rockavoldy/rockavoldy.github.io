---
title: "Mengapa Aplikasi di Ubuntu lebih kecil ukurannya"
slug:
description: ""
date: 2020-02-09 04:51:41
author: akhmad
tags:
    - Ubuntu
    - Windows
    - macOS
cover:
fullscreen: false
published: true
---

Kalian yang baru migrasi dari Windows atau macOS ke Linux khususnya ubuntu bertanya-tanya "Kenapa aplikasi di ubuntu lebih kecil ukurannya daripada yang ada di Windows/macOS?". Saya akan mencoba menjawab pertanyaan ini dari pengalaman Saya sendiri dan juga rangkuman dari tulisan yang ada di internet.

Bisa dilihat ketika _install_ aplikasi. Pada Windows biasanya dikemas dalam satu paket _installer_ yang setelah dipasang langsung bisa digunakan meskipun pemasangan sedang tidak terkoneksi internet. Berbeda pada Ubuntu, aplikasi utama akan dipasang setelah _dependency/library_ yang dibutuhkan sudah ada di sistem. Pada Windows _dependency/library_ ini biasanya sudah termasuk pada paket _installer_ itu sendiri kecuali beberapa shared object seperti .NET Framework dan lainnya. Hal ini juga membuat _size_ sistem yang dibutuhkan pada Windows lebih besar daripada Ubuntu karena banyaknya \*.dll\* yang _duplicate_.
