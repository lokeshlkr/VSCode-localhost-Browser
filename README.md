# localhost browser

## inspiration: 
I was making anangular project and wanted to mock some UI, i was making changes in the UI then switching to the browser and then switching back to vscode, which i did not want.

Possible alternative was to make the vscode and my browser window small and snap to sides which wastes quite a lot of space in the window borders and paddings of chrome and vscode on my already very small monitor.

## features:
It is extremly simple, except it asks for the port you wanna connect to on localhost.


## mechanism:
It just creates a webview which loads an external html into an iframe with scripts enabled.


## TODO:
ability to manually refresh the page. Right now it depends on angular's hot reload functionality to refresh autometically on change in angular project, might work with other hot reloading methods.

open multiple ports simultaneously.