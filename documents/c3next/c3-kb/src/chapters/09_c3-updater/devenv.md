# Development Environment

## Install Rust ToolChain & Friends

- [Install Rust](https://www.rust-lang.org/tools/install)

```shell
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ source $HOME/.cargo/env
$ cargo version
cargo 1.50.0 (f04e7fab7 2021-02-04)
# required packages
$ sudo apt-get update -y
$ sudo apt install pkg-config libssl-dev -y
# tets build release
$ cargo build --release

# install carg-deb if not already installed
$ cargo install cargo-deb
# use with build deb
$ cargo-deb | cargo deb
```

## Update Rust Toolchain

```shell
$ rustup update
```

## VSCode Extensions

install bellow extensions

- Rust : `rust-lang.rust`
- CodeLLDB : `vadimcn.vscode-lldb`
- Rustfmt: `statiolake.vscode-rustfmt`

or install metaExtension

- Rust and Friends: `nyxiative.rust-and-friends`

## Build project

### Install react frontend dependencies

```shell
# fix installing dependencies
$ cd app
# login in default private npm registry
$ npm login
$ npm i
# if have issues installing try clean cache and remove package lock
$ npm cache clean --force
$ rm package-lock.json && rm -r node_modules
```

## Run

> use Makefile commands

```shell
# build debug binaries
$ make make build
# build release binaries
$ make buildRelease
# start c3-updater in serverMode (start-server)
$ make startServer
# start c3-updater with sudo privileges (WIP)
$ make startServerSudoDebug
# start react cleint
$ make startClient
# make debian
$ make deb
```

## Useful scripts

```shell
# backup project
$ ./backup.sh
# build update.tgz files
$ ./buildUpdate.sh
# cross compile
$ ./crossCompile.sh
# download and install old packages, this revert some packages to old versions, this way we can test packages updates
$ ./downloadAndInstallOldPackages.sh
# test get docker images sha256
$ ./getDockerImageSha256.sh
# script to get latest image versions from private docker registry
$ ./getLatestDockerImages.sh
# used to push files release files from working c3 to local development machine, to upload to cryptlex
$ ./pushReleaseToDevMachine.sh
# push c3-updater.deb to local repository
$ ./pushToLocalRepo.sh
# push c3-updater.deb to remote repository
$ ./pushToRemoteRepo.sh
# show/list remote repository packages, useful to get versions and other related info
$ ./showRemoteRepo.sh
# 
$ ./syncC3.sh
#
$ ./tearDown.sh
```