# Mongo Cluster Setup

# Replication in MongoDB

Replica sets provide **redundancy** and **fault tolerance** on data.

A replica set is a group of mongod instances that maintain the same data set. One and only one node is deemed the primary node, while the other nodes are deemed secondary nodes.

The primary node receives all write operations. A replica set can have only one primary capable of confirming writes with {w:"majority"} write concern; For more information on primary node operation, see Replica Set Primary.


Usefull guides:
 - [Install MongoDB on ubuntu 18.04](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu)
 - [Deploy replica set](https://docs.mongodb.com/manual/tutorial/deploy-replica-set)

## Step 1: Preflight
### Instal steps

1. Import the public key used by the package management system.

    ```sh
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
    ```
2. Create a list file for MongoDB.

    ```sh
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
    ```

3. Install the MongoDB packages.

    ```sh
    sudo apt-get update
    sudo apt-get install -y mongodb-org=4.4.8 mongodb-org-server=4.4.8 mongodb-org-shell=4.4.8 mongodb-org-mongos=4.4.8 mongodb-org-tools=4.4.8
    ```

4. Enable & Start MongoDB.

    ```sh
    sudo systemctl start mongod
    sudo systemctl status mongod
    sudo systemctl enable mongod
    ```

## Step 2: Mongodb Configuration

1. Start each member of the replica set with the appropriate options.

    For each member, modify the following file `/etc/mongod.conf`:
    ```sh    
    # network interfaces
    net:
        port: 27017
        bindIp: 127.0.0.1,node1
    . . .
    replication:
        replSetName: "c3cloudReplicatSet"
    ```

2. Start mongodb with updated conf

    ```sh    
    sudo systemctl restart mongod
    sudo systemctl status mongod
    ```    

    if status returns error 14 , try this
    ```sh
    chown -R mongodb:mongodb /var/lib/mongodb
    chown mongodb:mongodb /tmp/mongodb-27017.sock

    sudo service mongod restart
    ```
3. Test connection

    On node1, run:
    ```sh
    nc -zv node2 27017
    nc -zv node3 27017
    ```

4. Start the Replica Set

    On node1, run:
    ```sh
    opts = {   
        _id : "c3cloudReplicatSet",   
        members: [ { _id: 0, host: "node1" }, { _id: 1, host: "node2" }, { _id: 2, host: "node3" } ]
    }
    rs.initiate(opts)

    # display replica set 
    rs.conf()

    # Ensure that the replica set has a primary
    rs.status()
    ```    