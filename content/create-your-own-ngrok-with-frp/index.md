---
title: "Create Your Own ngrok With FRP"
description: Setup your reverse-tunneling service like ngrok in your server using Fast Reverse Proxy (FRP).
date: 2023-08-21T09:56:29+07:00
cover: false
fullscreen: false
draft: false
summary: Setup your reverse-tunneling service like ngrok in your server using Fast Reverse Proxy (FRP).
---

## Introduction
Most Web developer in this time will somehow have used or at least known app called [ngrok](https://ngrok.com). For you who just know this app, it is basically a tool to "publish" your app that are deployed on local to the internet, some call this process "reverse-tunneling". It's a nice tool, i have used it in the past when i need to show my friend/coworker about new feature, but don't have any server ready, or in case in the company, you just want to quickly show it without pushing the dirty-code to the repository and follow the process of the deployment to staging.

But, since reverse-tunneling need a server to forward requests from the intenet to your app, it will have limitation. And for ngrok, it can only open 1 connection for 8 hours, and the domain will always be randomly-generated, except you pay for their service. It can't satisfy my use-case, and since i don't use it regularly, it's hard for me to justify to pay for their service. So because of that issues, in the meantime, I use [SSH Reverse tunneling](https://www.howtogeek.com/428413/what-is-reverse-ssh-tunneling-and-how-to-use-it/) while looking for the alternative tool that i can self-host on my server. Until i found [fast-reverse-proxy (FRP)](https://github.com/fatedier/frp).

## Configuration
### Server
First, we need to configure the app on the server. When you download the [frp tool from their release page](https://github.com/fatedier/frp/releases), it's a compressed file, you can extract it and you will see 2 binary, `frps` and `frpc`. Since we will configure the server first, you only need to use `frps` app, move it to `/usr/local/bin/` directory.

Now, create config file with name `frps.ini` and put it inside `/etc/`, and fill it with
```shell
[common]
bind_port = 7000
vhost_http_port = 80
subdomain_host = your.domain.tld
```
- `bind_port`: will be used for the client (frpc) connect to this server.
- `subdomain_host`: will be used as a host domain, make sure your DNS already have A record for `*.your.domain.tld` to the server IP, so then when your client put `test` in the `subdomain` config, and visit `http://test.your.domain.tld`, it will be redirected to the client that have `subdomain` filled as `test`.
- `vhost_http_port`: this port will be used to accept request to the server, here i put `80`, then when someone access `test.your.domain.tld`, the service will catch the request, check if there is any client use `test` in their `subdomain`, when found, it will redirect the request to that client. This http_port can be changed to others like `8080` if you have another http server like nginx or caddy on the same server, then use reverse_proxy feature to forward request from your http server to FRPs

### Client
As for the client, you need to download at the same [release page](https://github.com/fatedier/frp/releases), there will be `frpc` app when you extract the compressed file, move it to `/usr/local/bin/` too.

Then, create config file with name `frpc.ini` and put inside `/etc/`, and fill it with
```shell
[common]
server_addr = <your-server-ip-address>
server_port = 7000

[test]
type = http
local_ip = 127.0.0.1
local_port = <your-local-app-port>
subdomain = test
```
- `server_addr`: is your server address where FRPs running, can put the IP Address, or the domain that are pointed to that IP Address
- `server_port`: this should be the same as `bind_port` configured in server
- `type`: is the type which your app is running, if it on local, just put `http` in there
- `local_ip`: is where the IP your app running
- `local_port`: is your listen port of your app, says yours running at port `8080`, then just fill it with `8080`
- `subdomain`: is the subdomain that will be use to access this client app, here i put `test`, and when we visit `http://test.your.domain.tld`, it will be forwarded to the app running at `local_ip:local_port`

You can see my configuration with systemd service and caddyserver reverse_proxy in [this gist](https://gist.github.com/rockavoldy/c0aebe0ea394c2252c53021113a2aeca). As for the complete configuration, you can always check the [repository page here](https://github.com/fatedier/frp).

