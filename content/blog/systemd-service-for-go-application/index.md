---
title: "Create Systemd service for Go application"
description: Step-by-step to create systemd service for your app. Systemd service can be used to control your Go app to run in the background, run the app on every boot, or auto-restart just to make sure it will always be running in-case of crash.
date: 2023-10-12T19:08:30+07:00
cover: false
fullscreen: false
draft: false
summary: Step-by-step to create systemd service for your app. Systemd service can be used to control your Go app to run in the background, run the app on every boot, or auto-restart just to make sure it will always be running in-case of crash.
---

1. Create new file with `.service` extension inside directory `/lib/systemd/system/`. In this case, i will create with the name `pajak.service`
2. Here is a simple structure to create service, fill the file we have created above with this and adapt with your app.
    ```shell
    [Unit]
    Description=Kurs Pajak

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
    From above service configuration, my app binary is inside `/home/akhmad/pajak/` directory that have the name `pajak`.

    Config you need to give attention is `ExecStart`, and `WorkingDirectory`
    - `ExecStart` should be point to the executable binary, just like how you usually run the app directly. In my example above, i have `env HTTP_PORT=":8080"` that will be passed to the app as HTTP Port to access the app.
    - `WorkingDirectory` here will be relative path for the app. It's not depends to the binary file you have, so you can change it anywhere you want. I have set this inside `/home/akhmad/pajak/` to store a file created from the app, and to read  the file from the app.

    Also, any output or error from the app will be saved to syslog, you can check it with command
    
    `sudo systemctl status pajak.service`

    {{< img src="img/example-systemctl-status.png" >}}

    As for another configuration, you can always check the [man-page of systemd service here](https://www.freedesktop.org/software/systemd/man/systemd.service.html).
3. After the service is ready, and have been configured, you can start the service with command
    ```sh
   sudo systemctl start <file_name.service>
   ```
   in this case, will be `sudo systemctl start pajak.service`
   
4. If there is an error says can't find the service, it seems you need to reload the daemon first
   ```sh
   sudo systemctl daemon-reload
   ```
5. As to make sure the service will be running at booting, make sure to run this command
   ```sh
   sudo systemctl enable pajak.service
   ```
