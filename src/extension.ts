
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	// Track currently webview panel
	let currentPanel: vscode.WebviewPanel | undefined = undefined;	
  
	context.subscriptions.push(
	  vscode.commands.registerCommand('extension.browse_localhost', () => {
		vscode.window.showInputBox({prompt:"Enter Port Number: "}).then((port:string|undefined)=>{
			if(port==="" || port===undefined){
				return;
			}
			
		const columnToShowIn = vscode.window.activeTextEditor
		? vscode.window.activeTextEditor.viewColumn
		: undefined;

	  if (currentPanel) {
		// If we already have a panel, show it in the target column
		currentPanel.reveal(columnToShowIn);
	  } else {
		// Otherwise, create a new panel
		currentPanel = vscode.window.createWebviewPanel(
		  'localhost',
		  `localhost:${port}`,
		  //vscode.ViewColumn.One,
		  columnToShowIn||vscode.ViewColumn.One,
		  {
			  enableScripts:true
		  }
		);
		currentPanel.webview.html = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>localhost Browser</title>
		</head>
		<body style="background-color:white;">     
			<iframe src="http://localhost:${port}" 
				style="position:fixed; 
					top:0; 
					left:0; 
					bottom:0; 
					right:0; 
					width:100%; 
					height:100%; 
					border:none; 
					margin:0; 
					padding:0; 
					overflow:hidden; 
					z-index:999999;">
			</iframe>
		</body>
		</html>`;

		// Reset when the current panel is closed
		currentPanel.onDidDispose(
		  () => {
			currentPanel = undefined;
		  },
		  null,
		  context.subscriptions
		);
	  }
		});
	  })
	);
  }
export function deactivate() {}
