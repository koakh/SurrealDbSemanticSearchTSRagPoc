# C3 Micro Cloud Administration

## Network

Here you can find all administration functions related with the network functionality of your C3 Micro-Cloud device. You should have at least a basic understanding of network administration if you want to change any of the default parameters that were provisioned with your device.

### Internet Access

  In this page you can find the configurations for the WAN port of your C3 Micro-Cloud. This is the port that is usually connected to the internet side of your network (in the case that you actually have an active internet connection). This page allows your to configure your WAN connection in two ways:

#### Automatic (DHCP)

You have an active DHCP server in your network, and the C3 Micro-Cloud will automatically get an address from it.

#### Static

You either don't have an active DHCP server in your network or you wish to manually assign an IP address to your C3 Micro-Cloud and all the other necessary settings for it to work correctly.

![Internet Access Configuration](./assets/administration/internetaccess.png "Internet Access Configuration")

If for the *IP configuration method* you have selected "Automatic (DHCP)", all information on this page will be automatically filled with the details provided by the DHCP server in your network. If for some reason these details are empty then there are a few possibilities:

- You didn't connect the network cable or you connected to the wrong port on the C3 (make sure that you are connecting the cable to the identified WAN port in the case that two ports are present in your device)
- Your network doesn't have a DHCP server
- Your network has a DHCP server but it's not providing an IP address to the C3 Micro-Cloud (due to misconfiguration, security policies or other possibilities, you should check with a network administrator)

If you have selected "Static" for the *IP configuration method* then you need to provide all the information manually:

- **IP address**: The IP address that the C3 Micro-Cloud will have. It should be located inside the subnet of your network
- **Netmask**: Network mask for the configured IP
- **Gateway**: The IP address of the device that will provide internet access to the C3 Micro-Cloud
- **DNS server**: Upstream server to provide DNS name resolution

### Local Area Network

This page will allow you to configure the IP Address and DHCP server settings of the LAN side of the C3 Micro-Cloud. This is usually the side that you are going to connect teachers and students devices (notebooks, desktops, tablets, cell phones, etc).

![LAN Configuration](./assets/administration/lan_config.png "LAN Configuration")

It is recommended that the default configuration be used, unless it is required to change. In each section, when making changes, click **Save** to confirm the new configuration.

> Note: If making changes to the LAN IP address, special care should be taken so that it does not conflict with the WAN Side IP address, (usually provided by the upstream router or internet ISP).

#### DHCP server

Allows the enabling/disabling the LAN side DHCP server of the C3 Micro-Cloud, as well as the IP address range that will be offered to connected devices.

![DHCP server configuration](./assets/administration/lan_dhcp.png "DHCP server configuration")

It is a good practice to leave some LAN IP addresses out of the DHCP server configuration range so that it will be possible manually set a fixed IP address to any connected device that might require it.

#### Captive portal

When enabled, users connected to the internet, via the C3 Micro-Cloud WiFi or LAN port, their browser will be redirected to the C3 Micro-Cloud main page, the first time they try to access the internet.

![Captive portal](./assets/administration/lan_captiveportal.png "Captive portal")

The Captive portal configuration also allows the definition of how many users are allowed, up to 2.000.

### Wireless

In the case that your C3 Micro-Cloud includes a WiFi access point, this page will show you all the relevant configuration options available for your Access Point. C3 Micro-Cloud devices can currently ship with two types of Access Points, depending on the chosen configuration:

1. WiFi 5 (802.11ac) Single Radio, Dual Band Access Point
2. WiFI 6 (802.11ax) Dual Radio, Dual Band Access Point

Configurations will be adapted in accordance with the technology of your Access Point.
If your C3 Micro-Cloud is not equipped with an Access Point, this page will indicate that.

![Basic WiFi Settings](./assets/administration/wifibasicsettings.png "Basic WiFi Settings")

Configuring Wireless settings always starting with the basic configuration options:

1. Enabling or disabling the access point
2. Setting the WiFi Name (can be any name)
3. Setting the WiFi Password (between 8 and 63 characters)

Your C3 Micro-Cloud, by default, comes pre-configured with the following configuration settings:

- **WiFi Name**: c3edu.online
- **Password**: mydemokey

#### Advanced Settings

Here you can change advanced settings related with the C3 Micro-Cloud Access Point.

![WiFi Advanced Settings](./assets/administration/wifiadvancedsettings.png "WiFi Advanced Settings")

##### WiFi band

Select between 2.4Ghz, 5Ghz and 2,4Ghz + 5Ghz (only for WiFi 6 Access Points). 2.4 Ghz will provide you with the most compatible configuration, specially if you intend to connect older devices. The 5Ghz, when your devices support it, will generally provide significantly faster speeds at the expense of lower range.

##### Regulatory Domain

For increased WiFi compatibility, select here the country where your C3 Micro-Cloud is operating to ensure optimal channel selection.

##### Channel

You can select from a list of available channels for your country and for the selected band. Auto should provide you with an optimal channel detection for your wireless conditions.

##### Security

The type of security system to use with your Access Point. WPA2 should be the most compatible option.

#### WPA Enterprise

![WPA Enterprise Configuration](./assets/administration/wifiwapenterprise.png "WPA Enterprise Configuration")

Here you can connect your C3 Micro-Cloud to an external Radius server to provide username/password authentication to access the C3 Micro-Cloud WiFi network.

- **Authentication Server Address**: The IP address if your Radius Server
- **Authentication Server Password**: Password for your Radius server
- **Authentication Server Port**: The port where your Radius server is expecting connections

#### Virtual SSID

![Virtual SSID](./assets/administration/wifivirtualssid.png "Virtual SSID")

Here you can create an additional WiFi network that is greatly restricted. It has a DHCP server enabled and will provide IP addresses in an isolated local network. Devices connected to this Virtual SSID are unable to access the internet.

- **Virtual SSID name**: What name to assign to your Virtual Access Point
- **Virtual SSID password**: Password to access this network
- **Network visible**: If checked, the SSID will be publicly announced, meaning that the devices will be able to see this SSID when searching for WiFi networks. If this check box is disabled, users will have to manually add this network to their list of WiFi networks manually

#### Connected Stations

![WiFi Connected Stations](./assets/administration/wificonnectedstations.png "WiFi Connected Stations")

Here you can see a list of all connected devices to the C3 Micro-Cloud Access Point. This allows you to quickly identify some information about the connected devices, namely:

- **MAC Address**

> The MAC Address of each connected device.

- **Assigned IP Address**

>This is the IP address assigned to each device and only shows up if you are using the C3 Micro-Cloud DHCP server.

- **Signal (%)**

 > The strength of the WiFi connection with the C3 Micro-Cloud.

- **Mbps**
  
 >The current rate at which the device is connected to the C3 Micro-Cloud Access Point.

### Firewall

The Firewall page controls WAN originated accesses to your C3 Micro-Cloud and comes enabled by default. The Firewall includes a list of pre-defined services that are most commonly used by your C3 Micro-Cloud. The default behavior of the C3 Micro-Cloud Firewall is to deny every external connection attempt unless it´s expressly allowed by enabling the service in the firewall.

![Firewall](./assets/administration/firewall.png "Firewall")

The default firewall services that come pre-configured are the following:

 1. Web GUI (activated by default to allow external access to the C3 Micro-Cloud)
 2. SNMP
 3. DNS
 4. ldap and Share Services
 5. Proxy Server
 6. SSH

#### Additional Services

 If needed, additional services can be configured into the firewall, selecting the **Create Service** button.

![Firewall Create Service](./assets/administration/firewall_newservice.png "Firewall Create Service")

The create a new service, a service name is mandatory, and the ports to be opened are also required, as well as the protocol (TCP or UPD). Ports/protocol pairs can be opened in a range or individually one by one, using the option "Single port" or "Range of ports".

If a specific port or range of ports is already opened by another service, it is not possible to again define it for a new service. The option will be to sequentially open multiple ranges of ports to cover the requirements of the service to be created.

### Internet Filter

This C3 Micro-Cloud feature allows you to control two different functionalities that you can apply to all the internet traffic that goes through your C3 Micro-Cloud:

1. **Internet Web filtering**: It allows you to control which websites can be accessed by your users or which websites are actively blocked
2. **Internet Bandwidth filtering**: It allows you to limit the amount of internet bandwidth that is available to your users

 This all starts with selecting how to apply these features to your users. You can select between two options:

1. **Apply to all**: No differentiation will be applied to your users. They will all face the same restrictions applied even if they belong to different user profiles.
2. **By profile**: This will require that your users configure the proxy to be used (the C3 Micro-Cloud provides an automatic proxy configuration script) and they will be prompted to insert their username and password before they are allowed to access the internet. When selecting *By Profile* your users need to have a username and password assigned to them, and they need to be created using the User Management feature of the C3 Micro-Cloud.

![Internet Filter](./assets/administration/internetfilter_selection.png "Internet Filter")

> [!IMPORTANT]  
> If you are configuring the internet filter as *By Profile* then you need to manually configure your web browser to use a proxy. The easiest way to do this is to configure your browser with an automatic proxy configuration script. The C3 Micro-Cloud provides the following automatic proxy configuration script:
>
> - [https://c3.c3edu.online/proxy.pac](https://c3.c3edu.online/proxy.pac)
>
> Alternatively, you can configure the proxy without using an automatic proxy configuration script by using the following information:
>
> - **Address**: c3.c3edu.online
> - **Port**: 3128
>
> These settings shall be applied to HTTP, HTTPS and FTP proxy settings.

#### Internet Web Filtering

This feature allows the filtering of specific internet content, based on its URL. Filtering can be implemented for all C3 Micro-Cloud users or specifically to one or more type of user profiles. Two types filtering are implemented:

1. By a *whitelist* where only the URL's written on the list will be allowed.
2. By *blacklist* where all URL's will be allowed, except those that are in the list.

![List type selection](./assets/administration/internetfilter_list_selection.png "List type selection")

In the form above, web filtering Enable/disable can be selected and when enabled, the list type can also be selected. The **Manage Domain List** button provides access to the URL's of the selected list type.

![Manage web filter list](./assets/administration/internetfilter_manage_list.png "Manage web filter list")

Selecting a specific or multiple domains in the associated selection box allows its deletion.

![Add Domains](./assets/administration/internetfilter_adddomains.png "Add Domains")

Clicking on the **Add Domains** button, new domains  can be added, either one by one or, clicking on **Import Sites**, from a text file (one URL per line).

>[!IMPORTANT]  
When adding domains, please omit the www side of the URL. For example, if you want to add Youtube to the list, you should add youtube.com and not <www.youtube.com>. The same is valid for all domains.

#### Bandwidth filtering

Together with Web filtering, the Bandwidth filtering feature on C3 Micro-Cloud, is configured for all users or per user profile.

![Internetfilterbandwidth](./assets/administration/Internetfilter_bandwidth.png "Manage Bandwidth by profile")

When configured for all users it is only necessary to set the bandwidth limit required, when configured per profile, a bandwidth limit needs to be set for each user profile. Setting the bandwidth to zero removes the bandwidth filtering action (for all or per profile).

> [!NOTE]
When filtering per profile is selected, the Bandwidth filtering feature also requires the proxy configuration as described above.

### Internet Caching

The C3 Micro-Cloud is capable of internally caching internet content, in order to reduce internet usage when the same internet sites are repeatedly accessed by C3 Micro-Cloud users.

The cache is continuously running. Configuration option is the cache size which can be set up to 65GB. When changing, the C3 Micro-Cloud disk space availability should be taken into consideration.

![Internet Cache Size](./assets/administration/internetcaching_size.png "Internet Cache Size")

After doing any changes, click **Save** to confirm the new configuration.

#### HTTPS Caching

The C3 Micro-Cloud supports the caching of HTTPS sites.

![Internet caching HTTPS](./assets/administration/internetcaching_https.png "Internet caching HTTPS")

After enabling HTTPS, all HTTPS content will be cached on the C3 Micro-Cloud. It is possible to avoid caching for specific domains, adding, one by one or importing from a text file, to the Non Cache list. When all is done click **Save** to store the configuration.

In order for this feature to work without security warnings from the user device browser, it will be necessary to download (export) and install the C3 Micro-Cloud proxy security certificate, before using this feature.

Clicking on **Export Certificate**, the certificate is downloaded to your device. The certificate must then be imported into the user device.

In Windows machines, the certificate should be imported into the “Trusted Root Certification Authorities” folder. The certificate import program can be easily started by accessing the command line (cmd) and then typing *certlm*.

If using Firefox the certificate should be imported directly in Firefox Option menus (search for certificates).

>[!WARNING]
If you activate this feature, make sure that the connected computers/tablets have the custom certificate installed or otherwise they will see constant security warnings.

#### Intelligent Internet Video Caching

The Intelligent Video Caching feature is designed to save considerable internet bandwidth and data usage, when multiple users watch the same videos from the internet. It can be enabled in the screen below.

![Internet Cache Video](./assets/administration/internetcaching_video.png "Internet Cache Video")

After enabling the feature, it is possible to increase the cache size up to 21GB. Clicking **Save** will store the configuration.

> Note: enabling Intelligent Video Caching also enables HTTPS caching, so to use this feature, the above instructions to download and install the certificate also apply. When disabling Intelligent Video Caching, also disable HTTPS caching if it is not required.

### Active Directory

In this page it is possible to configure various settings pertaining to the Active Directory features of the C3 Micro-Cloud.

![Active directory SSO](./assets/administration/activedirectory_1.png "Active directory SSO")

The first part indicates the status and domain of the active directory being used.

![Active directory SSO](./assets/administration/activedirectory_11.png "Active directory SSO")

The second part enables the activation of Single Sign-On on the C3 Micro-Cloud.

![Active directory user filtering](./assets/administration/activedirectory_2.png "Active directory user filtering")

This last part allows for user filtering from the Active Directory side, effectively disabling the user management capabilities from the C3 Micro-Cloud side.

### GPO

![Group Policy Object Management](./assets/administration/gpomanagement.png "Group Policy Object Management")

This page allows you to assign Group Policy Objects (GPO) to the C3 Micro-Cloud user profiles. Fully using this feature requires third party tools to actually create the different Group Policy Objects (Windows RSAT) and also requires that your student and teacher laptops are fully enrolled in the C3 Micro-Cloud Active Directory.

After creating one or more GPOs, they will show up in this page in a list. They can then be selected and applied to the different available user profiles.

### Public Share

This page will allow you to enable a C3 Micro-Cloud public share. This uses Windows Samba protocol, so that it can easily be accessed using a Windows, Mac or Linux computer.

![Public Share](./assets/administration/publicshare.png "Public Share")

>From a windows computer access is \\c3edu.online\public, from a Linux computer it is smb://c3edu.online/public.

Please, pay particular attention that since this is a public share, everyone has ready/write access, so this is not indicated for sensitive documents. The content of the public share can be deleted in this page by clicking on the red trash icon shown above.

### Remote Services

This page enables the configuration of various remote services, used in special C3 Micro-Cloud configurations and networks.

> Note: In this Software version it is no longer required the configuration of the C3 Cloud Control address. This address is automatically setup in the license configuration by Critical Links.

#### Cloud VPN

Cloud VPN allows that from a remote location access to the C3 Micro-Cloud is possible as if the user would be working from the local area network side. This service requires a prior activation of the service in Critical Links servers. Please contact Critical Links if required.

![Cloud VPN](./assets/administration/remoteservices_cloudvpn.png "Cloud VPN")

#### VPN Client

This functionality allows the creation of a VPN network between multiple C3 Micro-Cloud devices connected with each other via the internet. This feature is especially important if it is required to have multiple C3 Micro-Cloud users under the same domain as in an Active Directory environment.

![VPN Client](./assets/administration/remoteservices_vpnclient.png "VPN Client")

#### SNMP

Enables or disables an SNMP agent on the C3 Micro-Cloud, so that it can be queried by an SNMP management system.

![SNMP](./assets/administration/remoteservices_snmp.png "SNMP")

## System

This section will allow you to perform changes or operations directly related with system level functionalities.

### Update

This page allows you to update your C3 Micro-Cloud to the latest available software release. When a new release is available, you will be allowed to upgrade to that release.

![update](./assets/administration/update.png "Software update")

This page also allows you to check the C3 Micro-Cloud component versions, that might be useful if you need to troubleshoot with the support team any issue that you might face with the update process (use the dropdown arrow to expand the list).

### Users

This pages shows all the users registered in the C3 Micro-Cloud, with the possibility to edit or delete current users, as well as registering additional users.

>[!NOTE]
The edit user form allows the disabling of the user being edited. A disabled user will not be able so sign-in into the C3 Micro-Cloud.

![userslist](./assets/administration/userslist.png "Show list of users")

Current registered users can be edited or deleted from this page and the list of shown users can be searched and filtered by user profile.

>[!WARNING]
The user c3 cannot be deleted.

New users can be added in two ways:

1. One by one, through the **+ ADD** button.
2. In batch mode, via a specially configured text file, using the **IMPORT/EXPORT** button. This option also allows the export (in .CSV format) of the current users list.

#### Adding new users manually

![Add a single user](./assets/administration/useradd.png "Add a single user")

The page to add new users has as mandatory fields the user first name, username and password. It is also necessary to select the correct profile for the user being created (Student, Teacher Administrator or Parent). At the bottom of the page, before the **Save** button there is the possibility to upload a picture file associated the user (typically it would be a picture of the user face).

#### Import/Export Users

![Import and export users](./assets/administration/users_importexport.png "Import and export users")

Clicking on **Import/Export** wil open the above form with 3 options:

- Download a CSV file template with details on how to create new users to be imported
- Import users, uploading a compatible CSV file from your work station
- Export to your workstation a CSV file with all details of the users registered on the C3 Micro-Cloud

![Import users from CSV](./assets/administration/usersimportcsv.png "Import users from CSV")

To import users from a CSV file, first it is necessary to upload it to the C3 Micro-Cloud from your workstation.

After the uploaded is completed, a 2 phase process is recommended:

1. Perform a dry run on the file, simulating the import process to check that all formatting is correct and the import will be successful.
2. Proceed with the import.

#### Searching and Filtering Users

On the users main page in the upper left side there is the possibility search and filter for specific users.

![Search and filter users](./assets/administration/userssearchfilter.png "Search and filter users")

Typing a username, name or profile will display only the users that match the text written.

Clicking on the filter icon, some filter options will be shown.

![Filter screen](./assets/administration/usersfilter.png "Filter screen")

From this form, two options are available:

1. Change the default order of how the users are displayed. Sorting order (ascending or descending) is available for username, first name and last name.
2. filter by user profile. When active only users of the selected profile will be shown.

Both options can be set. When the filtering by profile is active, the filter icon will be shown in enhanced mode.

### System Maintenance

This page shows system logs and the service health of the multiple C3 Micro-Cloud internal software services.

![Systemmaintenancelogs](./assets/administration/systemmaintenance_logs.png "Systemlogs").

Specific logs can be filtered and there is also the option to download the logs.

![Systemmaintenancehealth](./assets/administration/systemmaintenance_services.png "Service health")

Scrolling down on this page you have a view of all services running, including its CPU and memory usage.

### Backups

This page allows the C3 Micro-Cloud administrator to backup or restore a full or selected parts of the device configuration and content.

![Backupdashboard](./assets/administration/backupdashboard.png "Backup dashboard")

The initial page shows the backups that are currently sorted in the system. For each of them it is possible to use it to restore a configuration, download it to your workstation or delete it.

From this page it is also possible to initiate a backup, either to the disk of the C3 Micro-Cloud or to a connected USB flash drive (option only possible if the flash drive is already connected) and import a backup from your workstation.

![Create a backup](./assets/administration/backupcreate.png "Create a backup")

When creating a backup it is required to give it a name and select either a full backup or which parts of a partial backup are required.

During the backup operation it will not be possible to move away from this page.

You can also Import an External Backup, which allows you to load a backup that you had previously taken from this unit, or from other unit. You can also import a backup from the previous 4.8 version so that you can restore it in the new C3 Micro-Cloud version.

### Kiosk

The C3 Micro-Cloud allows you to connect a display directly to the HDMI or VGA connection included in you C3 Micro-Cloud. After booting, it will show a webpage of your choosing.

![Kiosk](./assets/administration/kiosk.png "Kiosk")

If Hide address bar/navigation buttons is selected it will not be possible to navigate though the content with these buttons, neither introduce a specific URL.

### License

This page allows you to check some administrative information about your C3 Micro-Cloud, namely:

- Software Version
- License Key
- License Type (Perpetual or Subscription)
- Support Contract Information

![The C3 Micro-Cloud License Page](./assets/administration/licensepage.png "The C3 Micro-Cloud License Page")

 When opening a support ticket to report some issue that you have found with your C3 Micro-Cloud, you should include this information to hel speed up the support process.
