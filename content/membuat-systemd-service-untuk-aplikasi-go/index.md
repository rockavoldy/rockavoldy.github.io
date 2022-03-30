---
title: "Membuat Systemd Service Untuk Aplikasi Go"
description: "Membuat Systemd Service Untuk Aplikasi Go"
date: 2022-03-30T06:41:30+07:00
cover: false
fullscreen: false
draft: false
---

1. Buat sebuah file dengan ekstensi `.service` di dalam `/lib/systemd/system/` directory. Dalam kasus ini, saya buat dengan  nama `pajak.service`
2. Copy struktur "sederhana" dibawah ke file `pajak.service`
    ```
    [Unit]
    Description=kursPajak

    [Service]
    Group=akhmad
    Type=simple
    Restart=always
    RestartSec=5s
    WorkingDirectory=/home/akhmad/pajak/
    ExecStart=env HTTP_PORT=":8080" /home/akhmad/pajak/pajak
    PermissionsStartOnly=true
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=sleepservice

    [Install]
    WantedBy=multi-user.target
    ```

    Dari contoh konfigurasi service di atas, aplikasi Go saya berada di dalam directory `/home/akhmad/pajak/` dengan nama file executable adalah `pajak`. 

    Dan untuk `WorkingDirectory` ini akan dipakai jadi relative path oleh aplikasinya. Selain itu, output dan error dari service ini hanya akan disimpan ke syslog 
    
    `sudo systemctl status pajak.service`

    {{< img src="img/example-systemctl-status.png" >}}

3. Setelah service selesai dibuat, service bisa langsung di start dengan command 
   
   `sudo systemctl start <nama_file>`
   
   dan dalam kasus ini menjadi `sudo systemctl start pajak.service`
   
4. Jika service tidak terlihat, reload terlebih dahulu service daemon dengan command 
   
   `sudo systemctl daemon-reload`
5. Agar service selalu dijalankan diawal masuk OS, bisa dengan command 
   
   `sudo systemctl enable pajak.service`
