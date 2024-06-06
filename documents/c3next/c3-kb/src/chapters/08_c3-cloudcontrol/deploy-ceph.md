## Ceph Cluster Setup
This guide shows how to configure a ceph cluster from scratch using Ubuntu 18.04

Usefull guides:
 - [Instalation ceph-deploy](https://docs.ceph.com/en/mimic/start/)
 - [How To Install Ceph Storage Cluster on Ubuntu 18.04](https://computingforgeeks.com/how-to-deploy-ceph-storage-cluster-on-ubuntu-18-04-lts/)

### Ceph Components
- **Monitor (ceph-mon)** - maintains maps of the cluster state, including the monitor map, manager map, the OSD map, and the CRUSH map;
- **Managers (ceph-mgr)** - responsible for keeping track of runtime metrics and the current state of the Ceph cluster, including storage utilization, current performance metrics, and system load;
- **Object Storage Daemon (ceph-osd)** - stores data, handles data replication, recovery, rebalancing, and provides monitoring information for Ceph Monitors. At least 3 OSDs are normally required for redundancy and high availability;
   - you can run multiple OSDs on the same host, but using the same storage drive for multiple instances is a bad idea as the disk’s I/O speed might limit the OSD daemons performance.
- **Metadata Server (ceph-mds)** - stores metadata on behalf of the Ceph Filesystem. Ceph Metadata Servers allow POSIX file system users to execute basic commands (like,ls, find etc.) without placing an enormous burden on the Ceph Storage Cluster;

## Step 1: Preflight
### Instal steps

1. Install 4 VMs with ubuntu 18.04
   - admin (ceph-deploy)
      - CPU: 4 cores
      - RAM: 4GB
   - nodes 1,2,3
      - CPU: 2 cores
      - RAM: 4GB
      - DISK: 500GB
2. Prerequisites (all nodes)
   ```sh
   sudo apt update
   sudo apt -y install python-minimal python-routes
   ```

   Also, all ceph cluster nodes must have their `/etc/hosts` file configured with each corresponding IP and hostname.
   Check hostnames by running `hostname -s`
   
   ```sh
   # Ceph cluster nodes
   192.168.90.114  admin
   192.168.90.109  node1
   192.168.90.175  node2
   192.168.90.129  node3 
   ```
3. Setup **time sync**

   ```sh
   sudo nano /etc/systemd/timesyncd.conf
   # modify these lines
   [Time]
   NTP=1.europe.pool.ntp.org
   FallbackNTP=ntp.ubuntu.com
   ```
   Then:
   ```sh
   sudo systemctl daemon-reload
   sudo timedatectl set-ntp off
   sudo timedatectl set-ntp on
   ```

4. Setup **passwordless SSH** 

   Setup ceph nodes, not the admin node   
   ```sh
   # create new user named 'clk-ceph'
   sudo useradd -d /home/clk-ceph -m clk-ceph
   sudo passwd clk-ceph

   # ensure sudo priviledges
   echo "clk-ceph ALL = (root) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/clk-ceph
   sudo chmod 0440 /etc/sudoers.d/clk-ceph
   ```
   - ceph-deploy requires **passwordless SSH** access from admin node to other nodes and the SSH user has to have passwordless sudo privileges.

5. Setup admin node

   Install ceph-deploy
   ```sh
   wget -q -O- 'https://download.ceph.com/keys/release.asc' | sudo apt-key add -
   echo deb https://download.ceph.com/debian-nautilus/ $(lsb_release -sc) main | sudo tee /etc/apt/sources.list.d/ceph.list

   sudo apt update
   sudo apt install ceph-deploy
   ```

   Enable passwordless ssh
   ```sh
   # leave the passphrase empty
   ssh-keygen
   ssh-copy-id clk-ceph@node1
   ssh-copy-id clk-ceph@node2
   ssh-copy-id clk-ceph@node3
   ```

   (Recommended) Modify the ~/.ssh/config file of your ceph-deploy admin node so that ceph-deploy can log in to Ceph nodes as the user you created without requiring you to specify `--username clk-ceph` each time you execute ceph-deploy. This has the added benefit of streamlining ssh and scp usage
   ```sh
   sudo nano ~/.ssh/config
   Host node1
      Hostname node1
      User clk-ceph
   Host node2
      Hostname node2
      User clk-ceph
   Host node3
      Hostname node3
      User clk-ceph
   ```
6. reboot all nodes

## Step 2: Storage Cluster

On admin node:

1. create directory
   ```sh
   mkdir ceph-cluster && cd ceph-cluster
   ceph-deploy new node1 node2 node3
   ```
2. install ceph nautilus on nodes
   ```sh
   ceph-deploy install --release nautilus node1 node2 node3
   ```
   Check your configuration with `cat ceph.conf`
3. deploy monitors specified in `ceph.conf`

   The command will only complete successfully if all the monitors are up and in the quorum.
   ```sh
   ceph-deploy mon create-initial
   ```
4. Copy keys to nodes
   ```sh
   ceph-deploy admin node1 node2 node3
   ```
   Make node1 a ceph manager
   ```sh
   ceph-deploy mgr create node1
   ```

5. Create the OSDs
   ```sh
   # list disks available
   ceph-deploy disk list node1
   # choose disk to use 
   ceph-deploy osd create --data /dev/sda2 node1

   # repeat for other nodes
   ceph-deploy disk list node2
   ceph-deploy osd create --data /dev/sda2 node2
   ```

6. Check your cluster’s health.
   ```sh
   ssh node1 sudo ceph health
   ssh node1 sudo ceph -s
   ```

7. Deploy a metadata server
   To use CephFS, you need at least one metadata server. Execute the following to create a metadata server:
   ```sh
   ceph-deploy mds create node1
   ```

8. enable dashboard

   Ceph nautilus does not have dashboard by default. Instal it in node1.
   ```bash
   sudo apt install -y ceph-mgr-dashboard
   sudo ceph mgr module enable dashboard
   sudo ceph config set mgr mgr/dashboard/ssl false

   # change password if you want
   echo "Str0ngP@ssw0rd123212213" > pass.txt
   sudo ceph dashboard ac-user-create admin admin -i pass.txt
   rm pass.txt
   ```
   Access your node1 ip on port `8080` and enter the credentials `admin/Str0ngP@ssw0rd123212213`. 



## Step 3: Setup Ceph Fs
1. create metadata servers

   On admin node, run:
   ```bash
   ceph-deploy mds create node1 node2 node3
   ```
2. create pools

   On node1, run: 
   ```bash
   sudo ceph osd pool create cephfs_data 8
   sudo ceph osd pool create cephfs_metadata 8
   ```
3. enable cephfs
   ```bash
   sudo ceph fs new cephfs cephfs_metadata cephfs_data
   ```

4. create client key with username `cephuser`
   ```bash
   ceph auth get-or-create client.1 mon 'allow r' mds 'allow r, allow rw path=/home/cephfs' osd 'allow rw pool=data'
   sudo ceph auth get-or-create client.cephuser mon 'allow r' mds 'allow r, allow rw path=/home/cephfs' osd 'allow rw pool=cephfs_data' -o /etc/ceph/ceph.client.cephuser.keyring
   ```

   View create user 
   ```sh
   ceph auth get client.cephuser
   ```

   This will create a new client key with the name `cephuser` and output it into ceph.client.user.keyring. 
   It will provide write access for the MDS only to the /home/cephfs directory, and the client will only have write access within the cephfs_data pool.

## Step 4: Ceph Fs Mount

We restrict clients to only mount and work within a certain directory

1. Create user (on node1)
   ```sh

   ```
2. Mount cephs fs folder

   The mount command has the following syntax: `mount -t `
   ```sh
   cd /srv/docker/criticallinks/clkis/c3-cloudcontrol/volumes/syncthing/
   sudo mount -t ceph 192.168.90.109:6789,192.168.90.175:6789,192.168.90.129:6789:/ /home/cephfs -o name=cephuser,secret=AQBqlCdhbUFNNRAAUkzWXuL8hI2Xhp/yJo0tuw==
   ```
3. Persist the mount