# C3 Cloud 3.0 - Sync Servers

Sync servers allows clients to host syncthing instances.
These servers expose Docker in a safe maner, in order to be used by C3 Cloud Control 3.0

## Expose Docker Daemon to the Internet

By default, Docker runs through a non-networked UNIX socket. It can also optionally communicate using SSH or a TLS (HTTPS) socket.

### TLS HTTPS socket

Create an `HOST` pointing to the VM IP
> Note: Replace all instances of `HOST` with the DNS name of your Docker daemon’s host.

> Host: sync-server-02.classroomserver.net  |  Type: A  |  Points to: 192.168.90.114

Generate ca-key.pem

```sh
mkdir -p ~/.docker && cd ~/.docker

openssl genrsa -aes256 -out ca-key.pem 4096
# Enter pass phrase for ca-key.pem (CA Private Key): 
# clk&10!zz

openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem
# Important: Common Name (e.g. server FQDN or YOUR name) []:
# $HOST
```

Now that you have a CA, you can create a server key and certificate signing request (CSR).

```sh
openssl genrsa -out server-key.pem 4096

openssl req -subj "/CN=$HOST" -sha256 -new -key server-key.pem -out server.csr
```

Since TLS connections can be made through IP address as well as DNS name, the IP addresses need to be specified when creating the certificate. For example, to allow connections using 192.168.90.114 and 127.0.0.1:

```sh
echo subjectAltName = DNS:$HOST,IP:192.168.90.114,IP:127.0.0.1 >> extfile.cnf
echo extendedKeyUsage = serverAuth >> extfile.cnf

# generate the signed certificate:
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -extfile extfile.cnf

```

#### Client certificates

For client authentication, create a client key and certificate signing request:

```sh
openssl genrsa -out key.pem 4096
openssl req -subj '/CN=client' -new -key key.pem -out client.csr
echo extendedKeyUsage = clientAuth > extfile-client.cnf
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem -extfile extfile-client.cnf

rm -v client.csr server.csr extfile.cnf extfile-client.cnf

chmod -v 0400 ca-key.pem server-key.pem key.pem
chmod -v 0444 ca.pem server-cert.pem cert.pem
```

### Secure Docker by default

Check docker status `sudo systemctl status docker`

Override docker's systemd file

```sh
sudo mkdir -p /etc/systemd/system/docker.service.d/docker.conf
sudo nano /etc/systemd/system/docker.service.d/docker.conf
```

```sh
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd \
  -H fd:// --containerd=/run/containerd/containerd.sock \
  -H tcp://${HOST}:2376 \
  --tlsverify \
  --tlscacert=/home/clkuser/.docker/ca.pem \
  --tlskey=/home/clkuser/.docker/server-key.pem \
  --tlscert=/home/clkuser/.docker/server-cert.pem
```

Restart Docker

```sh
sudo systemctl daemon-reload
sudo systemctl restart docker

# confirm docker is still accessable via fd containerd.sock
docker ps
```

## Client

> On the client machine: copy your CA certificate, your server certificate, and your client certificate to that machine.

```sh
# copy {ca,cert,key}.pem to client machine
scp clkuser@$HOST:~/.docker/{ca,cert,key}.pem .

# test docker remote
curl https://$HOST:2376/images/json --cert cert.pem --key key.pem --cacert ca.pem
```

## Fixes

Fix 1: `Can't load /home/clkuser/.rnd into RNG`

> Try this: `sudo nano /etc/ssl/openssl.cnf` and comment this line `RANDFILE = $ENV::HOME/.rnd`
