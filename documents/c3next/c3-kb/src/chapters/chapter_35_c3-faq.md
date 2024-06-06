# Faq

this is a shared faq amoung all c3 ecosystem

## Ldap

### How to expose remote connections to Ldap server from outside

```shell
# connect to c3
$ ssh c3@c3edu.online
# change to samba config
$ sudo nano /etc/samba/smb.conf
# add eth0 to interfaces, save and exit
interfaces = lo br0 eth0
# restart samba service
$ sudo systemctl restart samba-ad-dc
```

done we now have remote connections to ldap server

## How to get/set/test current LDAP Password

```shell
# generate new password (optional)
$ sudo sh -c "echo $(head -c 8 <(tr -dc [:alnum:] < /dev/urandom))_C1k > /etc/ldap.password"

# set current ldap password
$ sudo samba-tool user setpassword administrator --newpassword $(cat /etc/ldap.password)
# outcome
Changed password OK

# test squid ldap with new machine-id password
$ sudo /usr/lib/squid/basic_ldap_auth -h 127.0.0.1 -D cn=administrator,cn=users,dc=c3edu,dc=online -W /etc/ldap.password -s sub -b ou=People,dc=c3edu,dc=online -f '(sAMAccountName=%s)'
# here command will wait for above input "c3 root, press enter and we receive a response in this case "BH Success"
c3 root
# outcome
OK

# get curent ldap password
$ cat /etc/ldap.password
```

## How to get/set/test current c3-system-core encryption Password

```shell
# generate new core password
$ sudo sh -c "echo $(head -c 28 <(tr -dc [:alnum:] < /dev/urandom)) > /etc/machine-c3"
```

> now follow [Change release channel on c3-system-core and forcePreUpdate c3-updater](09_c3-updater/change-release-channel.html?highlight=%2Fvar%2Flib%2Fc3%2Fversion.json#change-release-channel-on-c3-system-core-and-forcepreupdate-c3-updater) link to unencrypt encrypted keys `version`, `majorVersion` and `releaseChannle` in /var/lib/c3/version.json, and restart `c3-system-core service`

## How to Regenerate a new MachineId

we can change current c3 machine-id to test if everything works in case of machine-id change, like the ones caused by a clones disk, a hardware change or other side effect, this change must not break c3-system-core and ldap

```shell
$ sudo rm /etc/machine-id
$ sudo systemd-machine-id-setup
$ sudo reboot
```

> now test that everything works

## VSCode

### How to connect to container host (c3)

inside <https://code.c3edu.online>, open terminal and launche bellow commands

```shell
# connect to host
$ ssh c3@172.16.0.1
```

done we are connected to "outside world", the c3

## Temporary Package Server

### How to download and install packages from server

first check what package do you want to download with

```shell
$ ssh clkuser@hub.critical-links.com "tree /usr/share/le-httpserver/public/repo50/pool/ -L 4"
/usr/share/le-httpserver/public/repo50/pool/
├── clk
│   ├── a
│   │   └── atheros-clk
│   │       └── atheros-clk_5.4.0-65-generic_amd64.deb
│   ├── c
│   │   └── ct-firmware
│   │       └── ct-firmware_10.1.467-ct-21_amd64.deb
│   └── c3
│       ├── c3-cloud-client
│       │   └── c3-cloud-client_1.1.0_amd64.deb
│       ├── c3-dynamic-caching
│       │   └── c3-dynamic-caching_1.0.9_amd64.deb
│       ├── c3-lexactivator-api
│       │   └── c3-lexactivator-api_1.0.16_amd64.deb
│       └── c3-system-core
│           ├── c3-system-core_1.0.2_amd64.deb
│           ├── c3-system-core_1.0.3_amd64.deb
│           └── c3-system-core_1.0.4_amd64.deb
├── main
│   └── s
│       └── squid
│           ├── squid-common_4.10-1ubuntu1.1+clk_all.deb
│           └── squid_4.10-1ubuntu1.1+clk_amd64.deb
└── multiverse
    └── n
        └── nodogsplash
            └── nodogsplash_5.0.0+clk_amd64.deb
```

next compose url, for ex for latest `c3-cloud-client` the url will be

<https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-cloud-client/c3-cloud-client_1.1.0_amd64.deb>

to download it from shell use your friend wget

```shell
# download package
$ wget https://hub.critical-links.com:8443/repo50/pool/clk/c3/c3-cloud-client/c3-cloud-client_1.1.0_amd64.deb
# if want to install it
$ sudo dpkg -i c3-cloud-client_1.1.0_amd64.deb
# double check if is installed
$ sudo apt-cache policy c3-cloud-client
# check if is running
$ sudo service c3-cloud-client status
```

## WireGuard

### Install WireGuard Client

```shell
$ sudo apt update
$ sudo apt install wireguard -y
$ sudo sh -c 'umask 077; touch /etc/wireguard/wg0.conf'
$ sudo -i
$ cd /etc/wireguard/
$ umask 077; wg genkey | tee privatekey | wg pubkey > publickey
$ ls -l publickey privatekey
# Note down the privatekey ##
$ cat privatekey
SMvKc1Dv+DCf22ulOKtL1.....omitted
# send this pubkey to wireguard administrator, server must have knowledge ot it
$ cat publickey 
tYcnZP4EG5Vw+Wpqz1.....omitted

# edit the /etc/wireguard/wg0.conf
$ sudo nano /etc/wireguard/wg0.conf
```

> Note: before try configuration, **coordinate with wireguard server administrator** to ask it it **already configured your publickey**, and ask for your ip, is required in address ex `Address = 10.10.1.200/2`

```conf
[Interface]
# client's private key
PrivateKey = SMvKc1Dv+DCf22ulOKtL1.....omitted
# client ip address on vpn, use the ip provider by system administrator here `10.10.1.000/2` is just a placeholder
Address = 10.10.1.000/2
 
[Peer]
# server public key
PublicKey = tYcnZP4EG5Vw+Wpqz1.....omitted
# set ACL, ommit if already are connected to it
AllowedIPs = 10.10.1.0/24, 192.168.90.0/24
# server's public IPv4/IPv6 address and port
Endpoint = wg.critical-links.com:51820
# Key connection alive ##
PersistentKeepalive = 15
```

```shell
# enable and start VPN client/peer connection, run:
$ sudo systemctl enable wg-quick@wg0
$ sudo systemctl start wg-quick@wg0
$ sudo systemctl status wg-quick@wg0
$ sudo journalctl -f -u  wg-quick@wg0
```

> don't forget to **exit from su**, with `exit`

## Fix Time/Date KVM RTC Clock ubuntu 20.04 Update Fix

```shell
$ sudo systemctl enable ntp \
  sudo systemctl start ntp \
  sudo systemctl status ntp \
  sudo timedatectl set-ntp on
$ sudo timedatectl
  Local time: Wed 2021-04-07 11:48:53 UTC
  Universal time: Wed 2021-04-07 11:48:53 UTC
  RTC time: Wed 2021-04-07 11:48:54
  Time zone: Etc/UTC (UTC, +0000)
  System clock synchronized: yes
  NTP service: active
  RTC in local TZ: no
```

## How to disable automatic time synchronization

> usefull to hack hardware clock, to force c3-lexactivator-api errors like "The system time has been tampered (backdated)."

```shell
# disable automatic time synchronization
$ sudo timedatectl set-ntp off
$ sudo timedatectl set-time '2021-00-00 00:00:00'
$ sudo timedatectl
# optional enable it
$ sudo timedatectl set-ntp on
```

## Update Samba Files

```shell
$ curl -s --proto '=https' --tlsv1.2 -sSf https://downloads.critical-links.com/samba-update/update-samba.sh | sudo sh
```

> Warning: above script have risks associated, only use it if you know what you are doing, and know how to revert or fix the problem, this can corrupt your system, dns and other system files

> another issue is it will replace your current samba files with a new version, deleting all your changes

## Standard error codes in Linux

```shell
$ sudo apt install moreutils
$ errno -ls
# output
EPERM 1 Operation not permitted
ENOENT 2 No such file or directory
ESRCH 3 No such process
EINTR 4 Interrupted system call
EIO 5 Input/output error
ENXIO 6 No such device or address
E2BIG 7 Argument list too long
ENOEXEC 8 Exec format error
EBADF 9 Bad file descriptor
ECHILD 10 No child processes
EAGAIN 11 Resource temporarily unavailable
ENOMEM 12 Cannot allocate memory
EACCES 13 Permission denied
EFAULT 14 Bad address
ENOTBLK 15 Block device required
EBUSY 16 Device or resource busy
EEXIST 17 File exists
EXDEV 18 Invalid cross-device link
ENODEV 19 No such device
ENOTDIR 20 Not a directory
EISDIR 21 Is a directory
EINVAL 22 Invalid argument
ENFILE 23 Too many open files in system
EMFILE 24 Too many open files
ENOTTY 25 Inappropriate ioctl for device
ETXTBSY 26 Text file busy
EFBIG 27 File too large
ENOSPC 28 No space left on device
ESPIPE 29 Illegal seek
EROFS 30 Read-only file system
EMLINK 31 Too many links
EPIPE 32 Broken pipe
EDOM 33 Numerical argument out of domain
ERANGE 34 Numerical result out of range
EDEADLK 35 Resource deadlock avoided
ENAMETOOLONG 36 File name too long
ENOLCK 37 No locks available
ENOSYS 38 Function not implemented
ENOTEMPTY 39 Directory not empty
ELOOP 40 Too many levels of symbolic links
EWOULDBLOCK 11 Resource temporarily unavailable
ENOMSG 42 No message of desired type
EIDRM 43 Identifier removed
ECHRNG 44 Channel number out of range
EL2NSYNC 45 Level 2 not synchronized
EL3HLT 46 Level 3 halted
EL3RST 47 Level 3 reset
ELNRNG 48 Link number out of range
EUNATCH 49 Protocol driver not attached
ENOCSI 50 No CSI structure available
EL2HLT 51 Level 2 halted
EBADE 52 Invalid exchange
EBADR 53 Invalid request descriptor
EXFULL 54 Exchange full
ENOANO 55 No anode
EBADRQC 56 Invalid request code
EBADSLT 57 Invalid slot
EDEADLOCK 35 Resource deadlock avoided
EBFONT 59 Bad font file format
ENOSTR 60 Device not a stream
ENODATA 61 No data available
ETIME 62 Timer expired
ENOSR 63 Out of streams resources
ENONET 64 Machine is not on the network
ENOPKG 65 Package not installed
EREMOTE 66 Object is remote
ENOLINK 67 Link has been severed
EADV 68 Advertise error
ESRMNT 69 Srmount error
ECOMM 70 Communication error on send
EPROTO 71 Protocol error
EMULTIHOP 72 Multihop attempted
EDOTDOT 73 RFS specific error
EBADMSG 74 Bad message
EOVERFLOW 75 Value too large for defined data type
ENOTUNIQ 76 Name not unique on network
EBADFD 77 File descriptor in bad state
EREMCHG 78 Remote address changed
ELIBACC 79 Can not access a needed shared library
ELIBBAD 80 Accessing a corrupted shared library
ELIBSCN 81 .lib section in a.out corrupted
ELIBMAX 82 Attempting to link in too many shared libraries
ELIBEXEC 83 Cannot exec a shared library directly
EILSEQ 84 Invalid or incomplete multibyte or wide character
ERESTART 85 Interrupted system call should be restarted
ESTRPIPE 86 Streams pipe error
EUSERS 87 Too many users
ENOTSOCK 88 Socket operation on non-socket
EDESTADDRREQ 89 Destination address required
EMSGSIZE 90 Message too long
EPROTOTYPE 91 Protocol wrong type for socket
ENOPROTOOPT 92 Protocol not available
EPROTONOSUPPORT 93 Protocol not supported
ESOCKTNOSUPPORT 94 Socket type not supported
EOPNOTSUPP 95 Operation not supported
EPFNOSUPPORT 96 Protocol family not supported
EAFNOSUPPORT 97 Address family not supported by protocol
EADDRINUSE 98 Address already in use
EADDRNOTAVAIL 99 Cannot assign requested address
ENETDOWN 100 Network is down
ENETUNREACH 101 Network is unreachable
ENETRESET 102 Network dropped connection on reset
ECONNABORTED 103 Software caused connection abort
ECONNRESET 104 Connection reset by peer
ENOBUFS 105 No buffer space available
EISCONN 106 Transport endpoint is already connected
ENOTCONN 107 Transport endpoint is not connected
ESHUTDOWN 108 Cannot send after transport endpoint shutdown
ETOOMANYREFS 109 Too many references: cannot splice
ETIMEDOUT 110 Connection timed out
ECONNREFUSED 111 Connection refused
EHOSTDOWN 112 Host is down
EHOSTUNREACH 113 No route to host
EALREADY 114 Operation already in progress
EINPROGRESS 115 Operation now in progress
ESTALE 116 Stale file handle
EUCLEAN 117 Structure needs cleaning
ENOTNAM 118 Not a XENIX named type file
ENAVAIL 119 No XENIX semaphores available
EISNAM 120 Is a named type file
EREMOTEIO 121 Remote I/O error
EDQUOT 122 Disk quota exceeded
ENOMEDIUM 123 No medium found
EMEDIUMTYPE 124 Wrong medium type
ECANCELED 125 Operation canceled
ENOKEY 126 Required key not available
EKEYEXPIRED 127 Key has expired
EKEYREVOKED 128 Key has been revoked
EKEYREJECTED 129 Key was rejected by service
EOWNERDEAD 130 Owner died
ENOTRECOVERABLE 131 State not recoverable
ERFKILL 132 Operation not possible due to RF-kill
EHWPOISON 133 Memory page has hardware error
ENOTSUP 95 Operation not supported
```
