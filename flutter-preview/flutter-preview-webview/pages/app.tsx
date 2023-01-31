import React, { useEffect, useState } from "react";
import Head from "next/head";
import { NextPageContext } from "next";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Action, WebLaunchUrlAction } from "@flutter-preview/webview";
import Image from "next/image";
import { Appbar } from "components/appbar";
import { Stage } from "components/stage";

export default function FlutterWidgetPreview({
  initial,
}: {
  initial: {
    webLaunchUrl?: string;
  };
}) {
  const [fullsize, setFullsize] = useState(false);
  const [webLaunchUrl, setWebLaunchUrl] = useState(
    initial?.webLaunchUrl ?? null
  );
  const [refresh, setRefresh] = useState(0);

  const onToggleReload = React.useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, [setRefresh]);

  useEffect(() => {
    const handler = (e: MessageEvent<Action>) => {
      console.log("message event from vscode: ", e.data ?? e);
      const message = e.data;
      switch (message.type) {
        case "hot-restart": {
          onToggleReload();
          break;
        }
        case "web-launch-url": {
          const { url } = message as WebLaunchUrlAction;
          setWebLaunchUrl(url);
          break;
        }
        default: {
          console.log("unhandled message type: ", message["type"]);
          break;
        }
      }
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }, [onToggleReload]);

  return (
    <>
      <Head>
        <title>Flutter Widget Preview for VSCode</title>
      </Head>
      <Body>
        <Appbar
          onToggleReload={onToggleReload}
          onToggleFullsize={() => setFullsize((prev) => !prev)}
        />
        <Stage fullsize={fullsize}>
          {webLaunchUrl ? (
            <WebLaunchPreview src={webLaunchUrl} refreshKey={refresh} />
          ) : (
            <LoadingView />
          )}
        </Stage>
      </Body>
    </>
  );
}

function LoadingView() {
  return (
    <SplashViewLayout>
      <Image
        src={"/logo-white/32.svg"}
        alt={"Grida Logo White"}
        width={32}
        height={32}
      />
      <p className="message">Flutter Daemon is compiling the preview...</p>
    </SplashViewLayout>
  );
}

const SplashViewLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  height: 100%;
  background-color: black;
  padding: 40px;

  .message {
    opacity: 0.5;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
`;

/**
 * Since flutter daemon for web does not support hot-reload, but only hot-restart,
 * we need to use two iframes for smooth transition.
 *
 * the refreshKey will tell if to trigger a hot-restart
 *
 * @returns
 */
function WebLaunchPreview({
  src,
  refreshKey,
}: {
  src: string;
  refreshKey: number;
}) {
  return (
    <FramesContainer>
      <ContentFrame refreshKey={refreshKey} src={src} />
    </FramesContainer>
  );
}

function ContentFrame({
  refreshKey,
  src,
}: {
  refreshKey: number;
  src: string;
}) {
  return (
    <ContentFrameWrapper
      transition={{
        delay: 0.5,
        duration: 0.5,
      }}
      initial={{
        opacity: 0,
        userSelect: "none",
        pointerEvents: "none",
      }}
      animate={{
        opacity: 1,
        userSelect: "auto",
        pointerEvents: "auto",
      }}
    >
      <iframe
        key={refreshKey}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        src={src}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </ContentFrameWrapper>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const FramesContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ContentFrameWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export async function getServerSideProps(context: NextPageContext) {
  const { webLaunchUrl } = context.query;
  return {
    props: {
      initial: {
        webLaunchUrl: webLaunchUrl ?? null,
      },
    },
  };
}
