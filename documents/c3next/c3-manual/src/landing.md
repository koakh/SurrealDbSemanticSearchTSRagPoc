# C3 Micro-Cloud Landing Pages

The landing page are the initial page a user sees when  first accessing the C3 Micro-Cloud. There is an initial landing page (guest) when a user first arrives at the device. After the users signs in, the landing page correspondent to the user profile will be shown.

The most commonly used landing pages will be for the student, teacher and administrator profile. An example of a landing page for a non signed-in user is shown below.

![Landing page user guest](./assets/landing/landinguserguest.png "Landing page user guest")

## Landing page customization

The landing page of each user profile can be customized by the C3 Micro-Cloud administrator.

The customization mode is activated when clicking on the settings in the upper right side of the administrator screen. When activated this icon will be turned on:

![Landing page customization active](./assets/landing/landingconfigactive.png "Landing page customization active")

Clicking on the **Set Default** button will remove all customization and return to the factory default landing page. This action will only be performed for the user profile that is currently selected in the profile drop-down box above.

Customization of a user profile landing page can start from the modification of an existing factory default landing page or a clean page by completely erasing the page.

### Sections and Widgets

Each section of the landing page is composed of one or more widgets. When in customization mode hovering with the mouse over a section two sets of edition icons will be shown:

1. On the top of the section, five small icons (add, edit, delete and move section), change the overall characteristics and position of the current section
2. Inside the section, on the upper right corner, two small icons (edit and delete widget) are used to change the content inside this specific section  

![Landing page edition](./assets/landing/landingeditsectionwidget.png "Landing page edition")

On the bottom of the screen, after all sections, an empty section with a **+** enables the creation of a new section. By default a new section is created with a height of 300 pixels and one column. The section height can be changed and the number of columns can be increased up to 4.

A widget is added to a section (or a columns of a section) just by dragging and dropping the required widget to the section.

> Notes: After the changes in a section are completed, clicking in the **Apply** button on the lower right side of the page will save the changes. If for any reason the user  moves away from the page, a warning about changes not saved will be shown.

When editing widgets that link to another page or an external URL, the action will only be active when signing in with the correspondent user profile. This avoids moving away from the customization page at this stage.

### Banner

The banner widget consists of one or more slides that occupy the whole width of the content screen. There is no limit to the number of slides that can be placed into a banner. When more that one slide is configured, a timer is set to define how long each slide will be shown (Autoplay speed).

When a banner widget is dropped in a section, a default color will be shown:

![Banner widget](./assets/landing/landingwidgetbanner1.png "Banner widget")

After dropping the widget, there is the option to customize the widget, in two forms:

1 - Add an image and change the color and transparency of the widget:

![Banner widget](./assets/landing/landingwidgetbanner2.png "Banner widget")

The image then can bet set as *cover* (shown above), image will spread the whole width of the page or *contain*, the image will be fully displayed in the banner space.

2 - Use the **Custom Content** tab to add a description and/or a button to the banner. The button will redirect the screen to a predefined area of the C3 Micro-Cloud, or a specific internal or external URL.

![Banner widget](./assets/landing/landingwidgetbanner3.png "Banner widget")

The description text and button colors can be independently defined. Their position in the banner (left, center or right) can also be defined here.

### Button

The button widget is similar to the custom content from a banner, as shown above.

![landingwidgetdropbutton](./assets/landing/landingwidgetbutton1.png "Button widget")

It is possible to define the button text and the action that is taken when the button is pressed. In the case of an external URL, there is the option to open it in the same or a new tab.

If it is required to add more buttons to the current section, it will be necessary to add new columns to the section and then proceed.

![Button widget](./assets/landing/landingwidgetbutton2.png "Button widget")

Any other widget can now be added to the free columns.

### Rich text editor

The rich text editor allows the introduction of formatted text in the section.

![Rich text editor](./assets/landing/landingwidgetrichtext1.png "Rich text editor")

### Content

With this widget the user profile landing page can be configured to provide a direct access to specific content that is present in the C3 Micro-Cloud.

![Content widget](./assets/landing/landingwidgetcontent1.png "Content widget")

There are 3 options to select which content will be shown:

1. The most recent content that arrived at the device
2. The most popular, content that is most often viewed
3. Custom, where the content to be shown can be individually selected

There is also the option to change the name of the content box, as well as its background color and transparency.

![Content widget](./assets/landing/landingwidgetcontent2.png "Content widget")

### App

The App widget is used to provide direct access to the application that are present on the C3 Micro-Cloud.

![Apps widget](./assets/landing/landingwidgetapp1.png "Apps widget")

Clicking on a App on the right side will move an App to the section. Clicking again on the same App, it will be removed from the section.

When clicking on the the first App, it will be present on the left most side of the section. Next App to be clicked will be placed on the right side of the previous one.

As with other widgets, we can change the name of the section as well as its background color and transparency.

### HTML

The HTML widget is used to include in a section a web page written in HTML code.

![HTML code widget](./assets/landing/landingwidgethtml1.png "HTML code widget")

If the HTML code is too large to fit the default height of a section, a scroll bar will be shown on the right side of the section. If desired this scroll bar can be reduced or removed, increasing their height of the section.
