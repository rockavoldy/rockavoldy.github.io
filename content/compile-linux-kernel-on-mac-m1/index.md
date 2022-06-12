---
title: "Compile Linux Kernel on Mac M1"
description: "Compile Linux Kernel on Mac M1"
date: 2022-06-05T18:08:40+07:00
cover: false
fullscreen: false
draft: false
summary: I just got my first Mac M1 machine, and this article show you step-by-step for me to compile linux kernel for my Raspberry Pi Zero W on my Mac M1 using Docker.
---

I just got my first Mac machine (it's cheapest Mac Mini M1), but it's really powerful machine, and i just got my Arducam 16MP Autofocus. So to see how powerful this mac is, and i need the latest kernel for my pi zero to use this cam, i'm going to compile linux kernel on this Mac and see how much time it takes to compile the linux kernel on this machine. I have done that on my work laptop (i5-6300U; 16GB RAM) and it takes around 1 hours (not really sure the exact time, but it's around there).

So, the first thing we need is to setup this mac to compile the linux kernel, after some digging around, found [this link about cross-compiling kernel](https://www.raspberrypi.com/documentation/computers/linux_kernel.html#cross-compiling-the-kernel). I think most of the toolchains already installed with `xcode-select --install`, after installing xcode-select as usual, found it need `arm-linux-gnueabihf-gcc` to be there, but i can't find this package on brew, just got `arm-linux-gnueabihf-binutils`, so i try to install that one but the error is still there.

{{< img src="img/error-arm-linux-gnueabihf.png" >}}

After some digging around, found [this tutorial from geerlingguy](https://github.com/geerlingguy/raspberry-pi-pcie-devices/tree/master/extras/cross-compile), on his tutorial, he compile the kernel from debian buster with Docker, i guess this would work, just need to change the compile script since on his tutorial he's using arm64 raspi (while mine, still using arm 32bit). So, let's going to step-by-step

1. Get the files from [his repository](https://github.com/geerlingguy/raspberry-pi-pcie-devices/tree/master/extras/cross-compile) or you can find [mine (with only essentials files) here](https://github.com/rockavoldy/linux-kernel-cross-compile). If you have your SSH key, and want it to be passed to the container (for installing the kernel later directly to raspi), you can change [this line](https://github.com/rockavoldy/linux-kernel-cross-compile/blob/main/docker-compose.yml#L22) to your ssh key.
2. After you're done cloning the files, you can create the container using docker-compose inside the repository, `docker compose up -d` is enough. It will download the OS images and setup the container for you with the toolchains needed.

    {{< img src="img/docker-compose-up.png" >}}
3. Then, you can use the container's terminal with `docker attach cross-compile`, to check if it's already inside, you can check with `uname -a` result.

    {{< img src="img/uname-result.png" >}}
4. The build container is complete, you can clone the linux kernel repository now inside this container and do compile in here

Basically, the [script to compile the kernel for Raspi Zero W](https://github.com/rockavoldy/linux-kernel-cross-compile/blob/main/README.md#compile-kernel-for-raspi-zero-w) is
1. Clone branch rpi-5.15.y with depth 1, since i just need the latest commit, so there is no point to get all history
    ```shell
    git clone https://github.com/raspberrypi/linux --branch rpi-5.15.y --depth 1
    cd linux
    ```
2. Create config for raspi 32bit
    ```shell
    make -j4 ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- bcmrpi_defconfig
    ```
    1. (optional) If you want to change something in the kernel, maybe add, remove, or changes some kernel modules, you can use menuconfig.
        ```shell
        make -j4 ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- menuconfig
        ```
3. Compile the kernel with above configuration
    ```shell
    # compile the kernel modules from configuration above
    make -j4 ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- zImage modules dtbs
    ```

When the compile process is done, you can install it directly to the raspi on the same network with
1. Create new directory to hold raspi partition
    ```shell
    mkdir -p /mnt/pi-fat32
    mkdir -p /mnt/pi-ext4
    ```
2. Mount them with sshfs to above directory, make sure  that pi is on the same network, and make sure again if the mounting is success by check with `ls` command
    ```shell
    sshfs root@raspberrypi.local:/ /mnt/pi-ext4
    sshfs root@raspberrypi.local:/boot /mnt/pi-fat32
    ls  -al /mnt/pi-ext4
    ls -al /mnt/pi-fat32
    ```
3. Copy kernel to the boot partition
    ```shell
    cp arch/arm/boot/zImage /mnt/pi-fat32/kernel7l.img
    cp arch/arm/boot/dts/*.dtb /mnt/pi-fat32/
    cp arch/arm/boot/dts/overlays/*.dtb* /mnt/pi-fat32/overlays/
    cp arch/arm/boot/dts/overlays/README /mnt/pi-fat32/overlays/
    ```
4. And install the modules to the root partition of raspi
    ```shell
    env PATH=$PATH make -j4 ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- INSTALL_MOD_PATH=/mnt/pi-ext4 modules_install
    ```
As you can see above, there is some difference with arm64 kernel from geerlingguy, it's `ARCH=arm`, `CROSS_COMPILE=arm-linux-gnueabihf-`, `zImage`, and `*.dtb` files, so make sure to check the target again. 

For the result, on this Mac, i can compile the kernel in around 20 mins, can't really know the exact time, but it's much faster than i compile it on my work laptop.

I think that's it for now, it's been 2 weeks for me with this Mac, and it's a powerful machine for me. I'm barely using all cores since my daily work is using python and Odoo, and it's actually run on my work laptop accessed with remote vscode and SSH from this Mac.

As for credit, Thanks to [geerlingguy](https://github.com/geerlingguy/raspberry-pi-pcie-devices/tree/master/extras/cross-compile) to provide the docker files, and to create some articles and viceos about linux and raspi, so Thank you.

PS: 
> - [TL;DR version here](https://github.com/rockavoldy/linux-kernel-cross-compile)
> - If you're wondering about the result of my arducam with raspi zero, you can [check it here](https://gist.github.com/rockavoldy/ba13b728829af8426d7bc4b3e32ef0ef#about-raspicam)
> - And sorry for my english, i want to make my english better, so from now on, i will post more articles in english.
