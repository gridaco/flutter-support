import { MaterialApp, Scaffold } from "../material";
import { SingleChildScrollView, Widget } from "../widgets";

export function composeAppWithHome(home: Widget | string) {
    if (home instanceof Widget) {
        home = home.build().finalize()
    }

    const APP = `import 'package:flutter/material.dart';

void main() {
    runApp(App());
}

class App extends StatelessWidget {
@override
Widget build(BuildContext context) { return
${home}
}}
  `

    return APP
}

export function composeAppWithComponent(component: Widget | string): string {
    let componentSource: string
    if (component instanceof Widget) {
        console.log('start composeSimpleApplication .. from instance of Widget')
        componentSource = component.build().finalize()
    } else {
        console.log('start composeSimpleApplication .. from Prebuilt Widget code')
        componentSource = component;
    }

    const materialApp = new MaterialApp({
        title: 'app built with bridged.xyz',
        debugShowCheckedModeBanner: false,
        // showSemanticsDebugger: true,
        // showPerformanceOverlay: true,
        home: new Scaffold({
            body: new SingleChildScrollView(
                {
                    child: Widget.prebuilt(componentSource, { root: false })
                }
            )
        })
    });

    const MATERIAL_APP_SOURCE = materialApp.build().finalize()

    return composeAppWithHome(MATERIAL_APP_SOURCE)
}