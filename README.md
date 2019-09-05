# localhost browser

## Inspiration: 
I was making anangular project and mocking some UI, i was making changes in the UI then switching to the browser and then switching back to vscode, which i did not want.
Possible alternative was to make the vscode and my browser window small and snap to sides which wastes quite a lot of space in the window borders and paddings of chrome and vscode on my already very small monitor.

## Features:
1. Asks for port you wanna connect to when opening a new instance.
2. Can handle multiple tabs with different ports.
3. Ability to manually refresh the tabs.
4. Ability to move backwards and forwards in the browser.


## Mechanism:
It creates a `vscode.WebviewPanel` which contains a static html with an iframe. The localhost is loaded into the iframe with scripts enabled. This method does not work with normal websites as most of them refuse to be put in iframes.


## TODO:
ability to manually refresh the page. Right now it depends on angular's hot reload functionality to refresh autometically on change in angular project, might work with other hot reloading methods.

open multiple ports simultaneously.