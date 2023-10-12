---
title: "Setup Multi Odoo Development Environment"
description: Ketika mengembangkan module untuk odoo, ada saatnya untuk berganti versi odoo seperti ketika proses migrasi module dari odoo 11 ke odoo 15. Artikel ini berisi konfigurasi untuk mengembangkan odoo dengan versi berbeda.
date: 2022-04-24T17:21:23+07:00
cover: false
fullscreen: false
draft: false
summary: Ketika mengembangkan module untuk odoo, ada saatnya untuk berganti versi odoo seperti ketika proses migrasi module dari odoo 11 ke odoo 15. Artikel ini berisi konfigurasi untuk mengembangkan odoo dengan versi berbeda.
aliases:
    - /setup-multi-odoo-development-environment
---

## Prerequisite
1. Dalam artikel ini saya menggunakan elementary 6.1 Jólnir based on Ubuntu 20.04, jadi seharusnya 100% script yang ada di artikel ini bisa jalan tanpa kendala jika kalian menggunakan Ubuntu 20.04 dan turunannya. Untuk pengguna distro atau OS lain bisa disesuaikan.
2. Python3, Ubuntu 20.04 sudah shipped dengan python3.8, jadi untuk development odoo 13 sampai odoo 15, tidak ada config khusus dari python. Kecuali untuk odoo 12 kebawah, maka harus menggunakan [deadsnakes ppa](https://launchpad.net/~deadsnakes/+archive/ubuntu/ppa), yang mungkin akan saya buatkan artikel sendiri dikemudian hari.
3. Virtualenv, sudah ada juga di repo-nya ubuntu dengan nama `python3-virtualenv`. Digunakan untuk membuat setiap library dari beda instance odoo "terisolasi", jadi setiap instance odoo tidak akan saling tabrakan versi library.
4. PostgreSQL, Odoo by default menggunakan postgresql, postgresql v12 sudah cukup untuk cover odoo 13 sampai odoo 15.

## Preparation
1. Install PostgreSQL
   1. Update terlebih dahulu apt, lalu install
        ```shell
        sudo apt update
        sudo apt install postgresql postgresql-client
        ```
   2. Setelah selesai, buat user baru dengan command 
        ```shell
        sudo su - postgres -c "createuser -s -d $USER"
        ```
        Command diatas akan membuat user untuk postgresql sesuai dengan user yang login sekarang dengan access "superuser" dan accesss membuat database.
   3. Setelah user berhasil dibuat, buat database baru. Karena postgresql butuh db yang sesuai dengan nama usernya
        ```shell
        createdb $USER
        ```
   4. jika sudah, kalian bisa cek dengan command `psql`, ini akan membuka psql dengan user yang login sekarang dan db dari user. Jika tidak ada error, tahap pertama install postgresql sudah berhasil.
2. Upgrade python3 dan install beberapa dependencies
   1. Upgrade python3 terlebih dahulu
        ```shell
        sudo apt upgrade python3
        ```
   2. Jika sudah selesai, lanjut dengan install `python3-dev`, `python3-virtualenv`, `git`, dan beberapa dependencies yang dibutuhkan odoo
        ```shell
        sudo apt install python3-dev libxml2-dev libxslt1-dev libldap2-dev \
        libsasl2-dev libtiff5-dev libjpeg8-dev libopenjp2-7-dev zlib1g-dev \
        libfreetype6-dev liblcms2-dev libwebp-dev libharfbuzz-dev libpq-dev git
        ```
   3. Setelahnya, bisa cek virtualenv yang terinstall dengan command
        ```shell
        virtualenv --version
        ```
        ATAU
        ```shell
        python3 -m virtualenv --version
        ```
## Odoo Installation
Dependencies dan app yang dibutuhkan sudah terinstall, sekarang lanjut ke install odoo-nya, disini saya membuat 1 folder di `/home/akhmad/Workspaces/odoo/` dan `cd` ke directory ini, directory ini akan saya gunakan untuk project-project odoo.
1. Clone odoo community seperti biasa, di artikel ini saya akan install odoo 14 community di directory `/home/akhmad/Workspaces/odoo/` dengan nama folder `14c`
    ```shell
    git clone https://github.com/odoo/odoo --branch 14.0 --single-branch --depth 1 14c
    ```
2. Setelah berhasil di clone, `cd` kedalam folder `14c`, lalu konfirmasi dengan cek isi foldernya
3. Jika sudah, selanjutnya adalah setup virtualenv dengan command
    ```shell
    virtualenv -p $(which python3) venv
    ```
    command diatas akan membuat folder baru bernama `venv`, dan akan "copy" seluruh binary python3 dan juga beberapa script untuk aktivasi dan deaktivasi virtualenv, sehingga odoo instance ini akan terisolasi
4. Jika sudah selesai, bisa konfirmasi folder baru `venv` dengan command `ls` kembali
5. Untuk aktivasi virtualenv, kalian bisa menggunakan command
    ```shell
    source /venv/bin/activate
    ```
6. Lalu kalian bisa konfirmasi python yang dipakai dengan command `which python` atau `which python3` (`python` saja yang biasa akan link ke python2, ketika menggunakan virtualenv, ia akan link ke python3 yang berada di folder venv)
7. Jika sudah, saatnya install requirements.txt nya odoo dengan command
    ```shell
    pip install setuptools wheel && pip install -r requirements.txt
    ```
8. Setelah selesai, saatnya buat folder baru terlebih dahulu dengan command
    ```shell
    createdb odoo14
    ```
9. Dan setelah pembuatan database berhasil, kalian bisa run odoo dan initialize database-nya dengan command
    ```shell
    python odoo-bin --addons-path odoo/addons,addons -r $USER -d odoo14 -i base
    ```
10. Voila, odoo berhasil terinstall dan listen di `http://localhost:8069`. Jika akan keluar (atau pindah) virtualenv, kalian bisa gunakan command `deactivate`, lalu activate lagi seperti poin no. 5

Untuk install versi odoo lainnya, kalian bisa `deactivate` dulu virtualenv-nya, lalu kembali ke poin no. 1 dengan perbedaan repository yang kalian clone sesuai dengan branch versi-nya. Dan jangan lupa, berbeda versi odoo maka database juga harus beda.
