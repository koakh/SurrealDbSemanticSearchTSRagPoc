# C3 Micro-Cloud Dashboard

The C3 Micro-Cloud dashboard provides an extensive set of information related to the device configuration and mode of working.

The information is presented in individual cards, in an easy to read, non technical format. This dashboard page is available to users that have a teacher or administrator profile.

The information presented in the dashboard is fixed at the time the page is opened. To update the information it will be necessary to refresh the dashboard page.

## Top Row

![Dashboard top row](./assets/dashboard/dashboardgeneral.png "Dashboard top row")

On the top of the dashboard page the following information regarding the C3 Micro-Cloud, is available:

- **Software version**: Starts at version {{ C3_VERSION }}
- **Status**: Reports if the C3 Micro-Cloud software is updated to the latest version
- **RAM usage**: How much RAM is currently being used
- **Sync status**: Synchronization status with C3 Cloud Control

## Service status

The service status card provides information  about the multiple services that are running on the C3 Micro-Cloud:

![Dashboard service status](./assets/dashboard/dashboardservicestatus.png "Dashboard service status")

A red ball indicates the service is not running, the green ball indicates the service is currently running.

- **Web filtering**: The white or black list status
- **Bandwidth filtering**: The bandwidth limitation services status
- **HTTPS Caching**: Status of HTTPS cache service (requires the Critical Links certificate installed)
- **Intelligent Video Caching**: Status of video cache service (requires the Critical Links certificate installed)
- **Firewall**: Status of the firewall service
- **CloudVPN**: Status of the CloudVPN service, used for remote access to the C3 Micro-Cloud (requires activation on the Critical links servers side)

## General and License

### General

Provides information about the C3 Micro-Cloud domain, date and time, hostname and uptime.

Two buttons are provided to **Restart** or **Shutdown** the device.

![Dashboard General](./assets/dashboard/dashboardgenerallicense.png "Dashboard General")

### License

Provides Information about the C3 Micro-Cloud License, Type of License (perpetual or time limited), as well as the support contract end date.

![Dashboard License](./assets/dashboard/dashboardgenerallicense_1.png "Dashboard License")

## C3 Cloud Control and Network Information

### C3 Cloud Control

![Dashboard C3 Cloud Network](./assets/dashboard/dashboardcloudcontrolnetwork.png "Dashboard C3 Cloud Network")

Reports information about C3 Cloud Control connectivity and synchronization status.

Also, form this card, you can export information to be uploaded to the C3 Cloud Control for devices that never connect to the internet. If you press the button _Export Data_ you will be presented with two options:

1. Download file: the C3 offline information will be downloaded to your computer. You can then take your computer to a location with Internet Access and upload this file to the C3 Cloud Control
2. Export to USB drive: if you have a USB pen directly attached to the C3 Micro-Cloud, you can export the offline information directly to the attached USB pen. The information is stored in a file with the name _c3licenseid.txt_

### Network Interfaces

![Dashboard C3Cloud Network](./assets/dashboard/dashboardcloudcontrolnetwork_1.png "Dashboard C3Cloud Network")

Reports status of the C3 Micro-Cloud network interfaces and internet availability.
> [!NOTE]
> For C3 Micro-Cloud devices that do not have a physical wired LAN interface, the LAN information will always be RED (cable disconnected). This is NOT a malfunction.

## Local Area Network and internet Access

![Dashboard Lan](./assets/dashboard/dashboardnetworks.png "Dashboard Lan")

![Dashboard Wan](./assets/dashboard/dashboardnetworks_1.png "Dashboard Wan")

Displays configuration information about the LAN and WAN interfaces of the C3 Micro-Cloud.

## Hardware

![Dashboard Hardware](./assets/dashboard/dashboardhardware.png "Dashboard Hardware")

The hardware card in the dashboard details basic information about the C3 Micro-Cloud hardware:

- Number of CPU Cores
- RAM usage
- Size and usage of the System and Data disk partitions

## Wireless

![Dashboard WiFi](./assets/dashboard/dashboardwireless.png "Dashboard WiFi")

This card shows information about the C3 Micro-Cloud WiFi configuration.

- **WiFi AP Name**: The WiFi access point SSID name
- **WiFi band**: 2.4Ghz or 5Ghz WiFi band
- **Channel**: WiFi channel selected (available channels depend on the regulatory domain)
- **WiFi AP Password**: The password to connect to the device Access Point
- **Regulatory Domain**: Country where the C3 Micro-Cloud is installed
- **Connected stations**: How many user devices are currently connected to the C3 Micro-Cloud

> Note: Devices without the WiFi interface do not show this card
