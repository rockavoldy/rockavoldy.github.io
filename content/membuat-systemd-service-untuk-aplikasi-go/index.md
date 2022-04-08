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

    Yang harus diperhatikan dari config diatas adalah `ExecStart` dan `WorkingDirectory`
    - `ExecStart` ini diarahkan ke file executable-nya, seperti ketika menjalankan aplikasi-nya secara langsung. Terdapat `env HTTP_PORT=":8080"` yang akan di-pass ke aplikasinya.
    - `WorkingDirectory` ini akan menjadi relative path dari aplikasi. Dan tidak bergantung terhadap dimana aplikasi go ini berada, jadi ketika `pajak` ini berapa di `/usr/bin`, dan ExecStart di-set menjadi `env HTTP_PORT=":8080" /usr/bin/pajak`, ketika `WorkingDirectory` ini di-set, dia akan tetap relative terhadap directory `/home/akhmad/pajak/`, dan bukan terhadap directory `/usr/bin/`.

    Selain itu, output dan error dari service ini hanya akan disimpan ke syslog, syslog ini bisa dicek dengan command
    
    `sudo systemctl status pajak.service`

    {{< img src="img/example-systemctl-status.png" >}}

    Untuk penjelasan lebih lanjut mengenai variable lain, bisa menuju ke [man-page nya systemd disini](https://www.freedesktop.org/software/systemd/man/systemd.service.html).

3. Setelah service selesai dibuat, service bisa langsung di start dengan command 
   
   `sudo systemctl start <nama_file>`
   
   dan dalam kasus ini menjadi `sudo systemctl start pajak.service`
   
4. Jika service tidak terlihat, reload terlebih dahulu service daemon dengan command 
   
   `sudo systemctl daemon-reload`
5. Agar service selalu dijalankan diawal OS boot, enable service dengan command 
   
   `sudo systemctl enable pajak.service`
