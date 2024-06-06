# Git workflow

## Flow

![image](../../assets/images/git-diagram.png)


The development team uses a variation of the [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) branching model that involves the use of feature branches and multiple primary branches.

`
The team's basic needs is keeping up with minor and patch versions as it is represented on the diagram above.
`

In order to keep up with the minor version upgrade there's always some hot fixes and patches needed to be done after the deployment of a new minor version (e.g: *some translation that got forgotten in the midst of a new feature*).

## Minor and patch version management

This way we always keep the source code of said patch versions which helps the team to solve some bugs in the previously deployed minor version. Per example, if the current minor version is 5.4.0 and there's a report of a user that uses the version 5.0.2, the developers have the 5.0.X branch to access and modify.

When a minor version is deployed there's an order of actions to do:

1. Tag the main branch with the minor version that was released (e.g: 5.0.0)
2. Create a new branch based off the main or develop branches (at this time they're the same) named "5.`CurrentMinorVersion`.X" (e.g: 5.0.X)
3. Up the version of the package on the version file?

After these steps we have estabilished our Git environment which separates the development of features of the patch and minor version.
Whenever a new feature needs to be done there's a place to based them off.

When the patch version is ready for deployment it gets tagged just like it's done on the minor version.

## Upgrade the package version for C3 Updater

Up version package