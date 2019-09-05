import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import { join } from "path";

class Tab{
	port:string;
	panel:vscode.WebviewPanel;
	constructor(port:string,panel:vscode.WebviewPanel){
		this.port = port;
		this.panel = panel;
		this.refresh();
	}

	refresh(){
		this.panel.title = `localhost:${this.port}`;
		this.panel.webview.html = readFileSync(join(__dirname,"template.html")).toString().replace("PORT",this.port);
	}


}

export function activate(context: vscode.ExtensionContext) {
	let tabs:[Tab];	
	let getPORT = ()=>{
		return vscode.window.showInputBox({prompt:"Enter Port Number."});
	};
	let create = (port:string)=>{
		const columnToShowIn = vscode.window.activeTextEditor 
		?(vscode.window.activeTextEditor.viewColumn||vscode.ViewColumn.One) 
		: vscode.ViewColumn.One;
		// Create a new panel
		let panel:vscode.WebviewPanel | undefined = vscode.window.createWebviewPanel(
			'localhost',
			"localhost:xxxx",
			columnToShowIn,
			{
				enableScripts:true,
				retainContextWhenHidden: true
			}
		);
		// Reset when the current panel is closed
		panel.onDidDispose(
			() => {panel = undefined;},
			null,
			context.subscriptions
		);
		return panel;
	};
	let main = ()=>{
		getPORT()
		.then((port:string|undefined)=>{
			if(port!=="" && port!==undefined){
				if (!tabs){
					tabs = [new Tab(port,create(port))];
				}else{
					let tab:Tab|undefined = isPresent(port); 
					tab
					?tab.panel.reveal()
					:tabs.push(new Tab(port,create(port)));
				}
			}
		});
	};

	let isPresent = (port:string)=>{
		let res:Tab|undefined = undefined;
		for(let tab of tabs){
			if (tab.port===port){
				res = tab;
				break;
			}
		}
		return res;
	};

	let refresh = ()=>{
		tabs.forEach(tab=>{
			tab.refresh();
		});		
	};

  	context.subscriptions.push(vscode.commands.registerCommand('extension.browse_localhost', main ));
  	context.subscriptions.push(vscode.commands.registerCommand('extension.refresh_tab', refresh ));
}
export function deactivate() {}
