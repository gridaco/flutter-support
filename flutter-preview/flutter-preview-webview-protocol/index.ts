export type Action = HotRestartAction | WebLaunchUrlAction | DaemonStartupLog;
export type ActionType = Action["type"];

export interface HotRestartAction {
  type: "hot-restart";
}

export interface WebLaunchUrlAction {
  type: "web-launch-url";
  url: string;
}

export interface DaemonStartupLog {
  type: "daemon-startup-log";
  message: string;
}

export function appurl(
  initial?: { webLaunchUrl?: string } | null,
  baseurl = "https://flutter-preview.webview.vscode.grida.co/app"
) {
  const url = new URL(baseurl);

  if (initial?.webLaunchUrl) {
    url.searchParams.set("webLaunchUrl", initial.webLaunchUrl);
  }

  return url.toString();
}
