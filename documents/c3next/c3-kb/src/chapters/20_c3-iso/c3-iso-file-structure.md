# C3-iso FileStructure

> all filenames must be in **kebab case**, and don't have any **white space** or **special characters** ex `female-user.png`, some bad examples are `@Screenshot from 2023-03-01 10-30-03.png`

> this only a high level overview of c3 file system tree......please contribute with some miss paths and important config files related do our c3

`/data`

```shell
├── backups
│   └── Backup001.zip
├── gallery
│   └── lms
│       └── classes
│           └── banners
├── home
│   ├── c3
│   │   ├── assets
│   │   │   └── images
│   │   └── downloads
│   ├── parent1
│   │   ├── assets
│   │   │   └── images
│   │   └── downloads
│   ├── student1
│   │   ├── assets
│   │   │   └── images
│   │   └── downloads
│   └── teacher1
│       ├── assets
│       │   └── images
│       └── downloads
├── profile
│   ├── c3administrator
│   │   ├── assets
│   │   │   └── images
│   │   │       ├── administrator.jpg
│   │   │       ├── cloud.png
│   │   │       ├── internet.png
│   │   │       └── update.png
│   │   └── downloads
│   ├── c3guest
│   │   ├── assets
│   │   │   └── images
│   │   │       └── guest.jpg
│   │   └── downloads
│   ├── c3parent
│   │   ├── assets
│   │   │   └── images
│   │   └── downloads
│   ├── c3student
│   │   ├── assets
│   │   │   └── images
│   │   │       └── student.jpg
│   │   └── downloads
│   └── c3teacher
│       ├── assets
│       │   └── images
│       │       ├── classes.png
│       │       ├── content.png
│       │       ├── home.png
│       │       └── teacher.jpg
│       └── downloads
├── system
│   ├── assets
│   │   └── images
│   └── downloads
└── themes
    ├── c3
    │   ├── assets
    │   │   └── images
    │   │       ├── c3.png
    │   │       ├── c3color.png
    │   │       ├── c3logo.png
    │   │       ├── favicon.ico
    │   │       ├── mime-types
    │   │       │   ├── 3g2.svg
    │   │       │   ├── 3gp.svg
    │   │       │   ├── 7z.svg
    │   │       │   ├── aac.svg
    │   │       │   ├── abw.svg
    │   │       │   ├── arc.svg
    │   │       │   ├── avi.svg
    │   │       │   ├── azw.svg
    │   │       │   ├── bin.svg
    │   │       │   ├── bmp.svg
    │   │       │   ├── bz.svg
    │   │       │   ├── bz2.svg
    │   │       │   ├── c3a.svg
    │   │       │   ├── c3app.svg
    │   │       │   ├── c3pkg.svg
    │   │       │   ├── csh.svg
    │   │       │   ├── css.svg
    │   │       │   ├── csv.svg
    │   │       │   ├── doc.svg
    │   │       │   ├── docx.svg
    │   │       │   ├── eot.svg
    │   │       │   ├── epub.svg
    │   │       │   ├── flv.svg
    │   │       │   ├── gif.svg
    │   │       │   ├── gz.svg
    │   │       │   ├── html.svg
    │   │       │   ├── ico.svg
    │   │       │   ├── ics.svg
    │   │       │   ├── jar.svg
    │   │       │   ├── jpeg.svg
    │   │       │   ├── js.svg
    │   │       │   ├── json.svg
    │   │       │   ├── jsonld.svg
    │   │       │   ├── mid.svg
    │   │       │   ├── mjs.svg
    │   │       │   ├── mov.svg
    │   │       │   ├── mp2t.svg
    │   │       │   ├── mp3.svg
    │   │       │   ├── mp4.svg
    │   │       │   ├── mpeg.svg
    │   │       │   ├── mpkg.svg
    │   │       │   ├── odp.svg
    │   │       │   ├── ods.svg
    │   │       │   ├── odt.svg
    │   │       │   ├── oga.svg
    │   │       │   ├── ogv.svg
    │   │       │   ├── ogx.svg
    │   │       │   ├── opus.svg
    │   │       │   ├── otf.svg
    │   │       │   ├── php.svg
    │   │       │   ├── png.svg
    │   │       │   ├── ppt.svg
    │   │       │   ├── rar.svg
    │   │       │   ├── sh.svg
    │   │       │   ├── svg.svg
    │   │       │   ├── tar.svg
    │   │       │   ├── tgz.svg
    │   │       │   ├── tiff.svg
    │   │       │   ├── ts.svg
    │   │       │   ├── ttf.svg
    │   │       │   ├── txt.svg
    │   │       │   ├── vsd.svg
    │   │       │   ├── wav.svg
    │   │       │   ├── weba.svg
    │   │       │   ├── webm.svg
    │   │       │   ├── webp.svg
    │   │       │   ├── wmv.svg
    │   │       │   ├── woff.svg
    │   │       │   ├── xhtml.svg
    │   │       │   ├── xls.svg
    │   │       │   ├── xlsx.svg
    │   │       │   ├── xml.svg
    │   │       │   ├── xul.svg
    │   │       │   ├── zim.svg
    │   │       │   └── zip.svg
    │   │       ├── no-image.png
    │   │       ├── user-female.png
    │   │       └── user-male.png
    │   └── lms
    │       ├── classes
    │       │   └── banners
    │       │       └── default.png
    │       └── lessons
    │           └── banners
    │               └── default.png
    ├── default -> /data/public/themes/c3
    └── modern-robotics
        ├── assets
        │   └── images
        │       ├── c3.png
        │       ├── c3color.png
        │       ├── c3logo.png
        │       ├── favicon.ico
        │       ├── no-image.png
        │       ├── user-female.png
        │       └── user-male.png
        └── lms
            ├── classes
            │   └── banners
            │       └── default.png
            └── lessons
                └── banners
                    └── default.png
```
