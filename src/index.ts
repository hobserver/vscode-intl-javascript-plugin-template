import {Parser, WebviewBtn} from 'vscode-intl-javascript';
import * as vscode from 'vscode';
interface Options {
    mdsProjectName: string | null,
    exportLangs: string | null
}
export default class AlibabaMds {
    options: Options
    parser?: Parser
    constructor(options: Options) {
        this.options = options ? options : {
            mdsProjectName: null,
            exportLangs: null
        }
    }
    apply(parser: Parser){
        this.parser = parser;
        parser.webview.addParentListener('prompt_info', (params: any) => {
            vscode.window.showWarningMessage(params.info);
        });
        parser.webViewHooks.btnHook.tapPromise('NewBtn', async (btns: WebviewBtn[]) => {
            return btns.concat([{
                key: 'newkey',
                text: 'btn name',
                functionConstructorParams: [
                    'params',
                    `
                    //function body
                    triggerParentListener('prompt_info', {
                        info: 'hello world'
                    });
                    `
                ]
            }]);
        });
    }
}
