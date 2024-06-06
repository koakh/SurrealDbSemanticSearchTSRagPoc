# C3Kb

## Docs

- [rust-lang/mdBook](https://github.com/rust-lang/mdBook)
- [mdBook - mdBook Documentation](https://rust-lang.github.io/mdBook/)

## Install Tooling

- [Releases · rust-lang/mdBook](https://github.com/rust-lang/mdBook/releases)

```bash
# enter in c3
$ ssh c3@c3edu.online
# enter path
$ cd /tmp
# download mdbook binary
$ wget https://github.com/rust-lang/mdBook/releases/download/v0.4.6/mdbook-v0.4.6-x86_64-unknown-linux-gnu.tar.gz
# unpack binary
$ tar xvf mdbook-v0.4.6-x86_64-unknown-linux-gnu.tar.gz
mdbook
$ sudo mv mdbook /usr/bin
$ mdbook -V
mdbook v0.4.6
```

## Bootstrap Project

```bash
# enter in c3
$ ssh c3@c3edu.online
# or enter path if already are connected to c3
$ cd ~
# clone repository
$ git clone https://mariomonteiro@bitbucket.org/criticallinksteam/c3-kb.git
# enter paths
$ cd c3-kb
```

## Start server with watch/serve

```shell
$ mdbook serve -p 8000 --open
```

## Open Docs

- <http://c3edu.online:8000>

> Note: now we can use hot reload to automatically build on changes

## Publish to online Server

```shell
# publish docs
$ ./syncWithServer.sh
```
