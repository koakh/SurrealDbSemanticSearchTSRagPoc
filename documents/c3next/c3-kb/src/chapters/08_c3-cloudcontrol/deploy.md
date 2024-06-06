# How to deploy
- [Ceph Cluster Setup](./deploy-ceph.md)
- [Mongo Cluster Setup](./deploy-mongo.md)
- [C3 Cloud Setup](./deploy-c3cloud.md)
## CEPH
### Hardware requirements

[Hardware recomendations](https://docs.ceph.com/en/mimic/start/hardware-recommendations/)

### Hardware requirements

A few [considerations](https://medium.com/@adam.goossens/so-you-want-to-build-a-ceph-cluster-7ff9a033411d):

- each node holds a percentage of your cluster’s data.
   - in a three-node cluster each node holds 33% of your data. In a ten node cluster, it’s only 10% per node. The loss of a single node in a small cluster will result in substantially more data migration (particularly as the cluster starts to fill, and potentially an outage if you haven’t configured your cluster’s full and near-full ratios correctly).
   - ceph scales very well as the number of nodes increases.
- be generous with the networking
   - 10Gbit Ethernet for production at a minimum.
- having too few nodes in the cluster places more of your cluster data on each node, increasing recovery I/O and recovery times.
- you can start with as little as three nodes, but if you can afford to spread your disks across more nodes, it’s better to do so.
- Separate your public and cluster networks
   - ideally onto different NICs but at least into different VLANs/subnets.


### Installation

Follow this guide to setup ceph - [Ceph Cluster Setup](https://bitbucket.org/criticallinksteam/c3-backend/src) 


## MongoDB 
### Hardware requirements
for a fault tolerant setup

### Fault Tolerant installation instructions and details

## CCC frontend+backend Fault Tolerant Deployment

CCC frontend load balancing considerations and instructions