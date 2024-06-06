# C3 Micro-Cloud Foundation LMS

The C3 Micro-Cloud Foundation LMS offers students an innovative way to access content as well as a method for teachers to organize the available content in Classes, where students have a direct access to what is most relevant to their learning curriculum.

## Classes

A new class is created clicking in the **+ ADD** button on the upper right corner of the Classes page.

![Add a new Class](./assets/foundationlms/classnew.png "Add a new Class")

Adding a class name and clicking **Save** will create a new class.

The new class will be shown and can now be filled with content. Clicking on the 3 points on the right side of the banner, various options are available.

![New Class configuration](./assets/foundationlms/classnew2.png "New Class configuration")

A new banner can be uploaded, or selecting a theme, an alternative preloaded banner can be selected. The configuration options are used to define how students and teachers interact with the content and to add additional information about the class.

## Feed

The Class feed is simply a messaging tool between students and teachers of a certain class.

![Message feed](./assets/foundationlms/classfeed.png "Message feed")

In the class page, in the configuration options, it is possible to set how the feed works between students and teachers:

- Students can post and comment
- Students can only comment
- Only teachers can post and comment

## Managing Content in Classes (Learning Paths)

Content for classes is added via Learning Paths. These in turn can be added from a existing LP or created from scratch.

![Add learning path](./assets/foundationlms/classlearningpaths.png "Add learning path")

When created from an existing LP, a form will open and clicking on the desired LP will select it for the class. Clicking **Confirm** confirms selection.

![Select a Template](./assets/foundationlms/classselecttemplate.png "Select a Template")

When created from Scratch, the process is similar to the creation of a regular Learning Path.

After creation it is possible to edit the settings and content of each LP.

## Managing Users in Classes

The third tab in the class page is the selection of which students and teachers will be assigned to the class.

![Users of a class](./assets/foundationlms/classusers.png "Users of a class")

The trash icon is used to remove students or teachers from the class. New users will be added using the **+ ADD STUDENTS** or **+ ADD TEACHERS** buttons.

![Adding students to a class](./assets/foundationlms/classaddstudents.png "Adding students to a class")

## Enabling and Disabling Learning Path Availability (Publishing)

After the class content is configured with the learning paths, it is possible to define if each of the learning paths will be available to the students.

Learning paths become available when they are published with the **Publish** button associated with each one. Unless the LP is published, it will be not visible when students access the class.

![Publish learning path](./assets/foundationlms/classpublishlearningpath.png "Publish learning path")

Unpublished learning paths will be shown greyed out. at any time it is possible to publish and un-publish any learning path.

## Learning Path Preview

Clicking on the **Preview** button the the content of the selected LP will be shown.

![Preview Content in class](./assets/foundationlms/classlearningpathpreview.png "Preview Content in class")

At the bottom of the screen  clicking on the arrow moves to the next or previous content, clicking on finnish returns to the class view.

## Learning Paths

A Learning Path is a sequence of content a teacher or an administrator has put together to then be available in a class.

In order to systematize and simplify the work of the people that have the responsibility to put together content for students, C3 Micro-Cloud supports the configuration of Learning Paths, which can then be used as the basis for class creation.

Learning Paths can be organized inside of folders, so that it is easier for Learning Path creators to organize their Learning Paths.

![Learning path cards](./assets/foundationlms/learningpathcards.png "Learning path cards")

The Learning Path card shows identity of the creator and Subjects and Grades that might be assigned to the Learning Path.

You can also find folders that are a way of organizing a set of Learning Paths.

Learning Paths are also searchable. Additionally, you can apply filters to your visible LPs by assigned Grade and Subject.

### Learning Path Creation

Clicking on **+ ADD**, open a form to add a new Learning Path (LP) name or a folder that will then be shown in the Learning Paths page.

If you have created a folder, you can enter it so that you can create additional folders or a new LP inside the folder. The folder has information about the number of Learning Paths that it has inside.

Next step is to open the LP card, clicking anywhere in it, to open the LP editor:

When you access the Learning Path, you are greeted with a page that shows you the existing content that you have added to the LP, along with a way to reorganize the order of the content, delete it, and add new content.

![LPEditor](./assets/foundationlms/lpeditscreen.png "Learning Path Editor")

Clicking on the **ADD** button will open a content listing dialog.

![Select content](./assets/foundationlms/learningpathselectcontent.png "Select content")

From this dialog you can simply add content to your LP. Pressing the **+** button will add the content to your LP.

You can also select content that is inside an existing content by navigating through it. To do it, for content that has this capability enabled, press the Eye button. For example, if you want to add a specific Wikipedia article as a LP step, you select the Wikipedia, press preview, navigate through it and press the "+" button once you find it.

From the Learning Path editor, you can also press the button **EDIT SETTINGS** to access the settings for this LP

![Select settings](./assets/foundationlms/learningpathsettings.png "Select settings")

In the second tab, Settings, additional information can be added to the template: A description, a list of objectives of the learning path and the expected time for completion. It is also possible to add a thumbnail to the LP card (not visible on the picture).

## Content

Content stored on the C3 Micro-Cloud is either pushed to the device by C3 Cloud Control or locally uploaded.

![Content view](./assets/foundationlms/contentgeneral.png "Content view")

C3 Cloud Control originated content displays a small cloud icon on the upper right corner of the content card. From this page it is possible to edit some of the information associated with each content. Content deletion can only be performed for locally uploaded content. Removal of cloud based content from the C3 Micro-Cloud, needs to be done from the C3 Cloud Control platform.

### Content Filtering

Content filtering is performed clicking on the inverted triangle next to the search line on the top of the content page.

![Content Filtering](./assets/foundationlms/contentfiltering.png "Content Filtering")

Filtering can be performed by type of content (for example cloud content, video, image, document, etc), origin of the content, grade, subject and topic.

When the content page has a filtered applied the filter icon will be marked.

![Filter applied](./assets/foundationlms/contentfilteringmarked.png "Filter applied")

### Content Visibility

For each content card, the way it will be available (visible) to the various user profiles can be defined, clicking in the pencil icon.

![Content visibility](./assets/foundationlms/contentvisibility.png "Content visibility")

The following visibility options are available:

1. **Public Content**: Content that is available to all C3 Micro-Cloud users
2. **Teacher's Content**: Content that can only be seen by users with a teacher profile
3. **Authenticated Users**: Content that only users that have signed in to the C3 Micro-Cloud have access
4. **Private Content**: Only the content creator and the C3 administrator have access to it

## C3 Cloud Control Originated Content

Cloud originated content will be shown in this page. For this type of content a limited set of settings can be edited. A grade, subject and topic can be added or edited, as well as its visibility.

Name and description of cloud originated content cannot be edited and it cannot be deleted on the C3 Micro-Cloud (this action must be performed on the C3 Cloud Control platform).

## C3 Micro-Cloud Local Content

C3 Micro-Cloud users with an administrator or teacher profile can upload to the device various types of content that can then be used by all users. This content will only be available in the C3 Micro-Cloud device to which it was uploaded to.

Content is added with the **+ ADD** button on the top right of the content page. The various types of content are described below.

### Folder

The folder content type creates an hierarchical folder structure within which content can then be stored in an organized way.

![Content type folder](./assets/foundationlms/contentfolder.png "Content type folder")

Any number of folders, either at the same level or down, to translate the organization of content resources required. Content will then be of the types described below.

> Organizing the content in folders is a good way to keep your content organized but it is not mandatory. If required  cards for direct access to content without the need to navigate through a folder structure can be created.

### File

The add file option allows the upload from the user workstation for any kind of file to the content page or folder.

![Add file](./assets/foundationlms/contentaddfile.png "Add file")

This is a two step process:

1. The first part shown above, you are asked to select the file or files to be uploaded.
2. After the files are selected they will be shown, with available and required disk space, as shown below.

![Upload files](./assets/foundationlms/contentfileupload.png "Upload files")

If one of the files is compressed in a zip format a slider will show to enable the decompressing of the zip after the upload.

If not defined when the upload is performed, additional information such as the content name, description, grade, subject, topic, color and thumbnail can be added from the edit (pencil) menu.

![File edit form](./assets/foundationlms/contentfileedit.png "File edit form")

> Note: the file option supports the upload of static websites. Websites need to be compressed in .zip format for upload and at the root of the zip file an index.html file needs to exist.

### URL

Selecting a content as a URL will redirect the user browser to the URL defined. This URL can be an external or internal address.

![Add a URL](./assets/foundationlms/contentaddurl.png "Add a URL")

It is mandatory to add a name to the content card created and additionally a description, grade, subject, topic or thumbnail can be added.

> Note: if internet filtering is being used, care should be taken to allow any listed external URL in the filtering configuration.

### Video

The video option of content is used bring into the C3 Micro-Cloud online videos so that they can  later be played directly from the device, without the need for an internet connection.

The process starts with a content disclaimer from Critical Links, it is the sole responsibility of the user any copyright issues related to the video. Then three steps will follow:

1. A box open for you to paste the URL of the video (or videos) to download to the C3 Micro-Cloud.

![Add video urls](./assets/foundationlms/contentvideourl.png "Add video urls")

2. The C3 Micro-Cloud uses the URL's to check the video compatibility with the system.

![Check video urls](./assets/foundationlms/contentvideoconfirm.png "Check video urls")

3. If all is OK, clicking **Save** starts the download process. After the download is completed, the video will be available for viewing.

![Videos on the content page](./assets/foundationlms/contentvideodownloaded.png "Videos on the content page")

Standard edition options such as name, description, grades, etc are also available for the downloaded videos.

## LMS Settings

In this page, settings that apply across all Foundation LMS features are configured.

### General

![General LMS](./assets/foundationlms/lmssettings_general.png "General LMS")

In the General tab, two settings are available:

1. Show grades and subjects, enables/disables showing grade and subject information in the content car of each content.
2. Content viewer type, defines how  content is shown to the user. If new tab (default) is selected, when clicking in a content card, its content is shown on a new browser tab. If internal viewer is selected, content is shown in the current tab. Hitting back on the browser, goes back to the C3 Micro-Cloud normal menu.

### Grades

In the Grades Tab, the required grades can be created to subsequently be applied to specific content.

![Adding grades](./assets/foundationlms/lmssettings_grades.png "Adding grades")

When adding or editing a grade, it is possible to add a color to the grade label. Grade information will be shown in the content cards and can be filtered.

### Subjects

In the Subjects Tab, the required subjects can be created to be then applied to specific content.

![Adding subjects](./assets/foundationlms/lmssettings_subjects.png "Adding subjects")

When adding or editing a subject, it is possible to add a color to the subject label. Subject information will be shown in the content cards and can be filtered.

### Topics

In the Topics tab additional content related information can be added and subsequently applied to content cards. This will offer the users an additional level of filtering when searching for specific content.

![Adding topics](./assets/foundationlms/lmssettings_topics.png "Adding topics")

## Apps

Apps are applications that the C3 Micro-Cloud receives from C3 Cloud Control and can be loaded locally. They show on the Apps menu in the same way as content cards. Clicking on a App, it will be loaded and started.

![Apps menu](./assets/foundationlms/appsmenu.png "Apps menu")

Clicking on details in the lower left corner of the App card will open a side page:

![Apps details](./assets/foundationlms/appsdetails.png "Apps details")

The details page provides additional information about the app as well as:

1. An enable/disable button. When disabled, apps will not be shown in the users left side menu and cannot be started
2. Application por information. This information is used when it is necessary to access a C3 Micro-Cloud app from outside the C3. The URL to access the App on the C3 will be *[ip of the C3 wan port]:[application port]*

## Analytics

The analytics page offers a general overview of the usage of the C3 Micro-Cloud, in terms of content, user and  internet activity.

## Content

The top part of the page provides information about total and number of views for contents and learning paths.

![Content views](./assets/foundationlms/analyticspage.png "Content views")

Next part details in terms of contents and learning paths, which are most often viewed.

## Users

The middle part shows data about users in the C3 Micro-Cloud.

![Analytics users](./assets/foundationlms/analyticsusers.png "Analytics users")

It shows who are the users most active in the C3 Micro-Cloud and when were they using the system the date related information can be seen for last week or last month.

## Internet (proxy)

The C3 Micro-Cloud internal proxy and cache monitor all data that flows between the users and the internet. It gathers a number of information, some of which is shown below.

![Proxy statistics](./assets/foundationlms/analyticsproxy.png "Proxy statistics")

From the cache analysis a measure can be calculated of how much data over the internet has been saved though the proxy action and also a list of the most commonly accessed websites. It is possible to select a time interval to obtain this data.
