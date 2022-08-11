import React from "react";
import styled from "@emotion/styled";
import Editor from "@monaco-editor/react";

/**
 * `<Example>` ('example')
 * - [Open in Figma](https://figma.com/file/KxtkLFdRQOURmYn3Q4bYTV?node-id=1:3)
 * - [Open in Grida](https://code.grida.co/files/KxtkLFdRQOURmYn3Q4bYTV?node=1:3)
 *
 *
 * ---
 * @example
 * ```tsx
 * import React from "react";
 *
 * export default function () {
 *   return (
 *     <>
 *       👇 instanciate widget like below. 👇
 *       <Example/>
 *     </>
 *   )
 * }
 * ```
 * ---
 * @params {any} props - this widget does not requires props. you can pass custom dynamic props to the widget as you want (on typescript, it will raise type check issues).
 * ---
 * @preview
 * ![](https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4e7d75e6-33ed-4aa5-ab0f-04115c9a6768)
 * ---
 * @remarks
 * @see {@link https://grida.co/docs} for more information.
 * ---
 * Code generated by grida.co | engine 0.0.1 (Apache-2.0) | Generated code under CC0 (public domain) *This code is free to use, modify, and redistribute. (aknowledgment is not required)*
 *
 *
 * ![Made with Grida](https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png)
 * <!-- Info: Please do not remove this comment unless intended. removing this section will break grida integrations. -->
 * <!-- grida.meta.widget_declaration | engine : 0.0.1 | source : figma://KxtkLFdRQOURmYn3Q4bYTV/1:3 -->
 */
export function Example({
  onValueChange,
  value,
  initialValue,
  onRunClick,
  webLuanchUrl,
  refreshKey,
}: {
  onValueChange?: (value: string | undefined) => void;
  value?: string;
  initialValue?: string;
  onRunClick?: () => void;
  webLuanchUrl?: string;
  refreshKey?: string | number;
}) {
  return (
    <RootWrapperExample>
      <L>
        <Editor
          theme="vs-dark"
          height="100vh"
          defaultLanguage="dart"
          defaultValue={initialValue}
          onChange={(e) => {
            onValueChange?.(e);
          }}
          value={value}
        />
      </L>
      <R>
        {webLuanchUrl ? (
          <iframe
            key={refreshKey}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            src={webLuanchUrl}
          />
        ) : (
          <></>
        )}
      </R>
      <Button onClick={onRunClick}>
        <IconsMdiPlayArrow src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/944b032e-4ea3-4cd5-bdd4-0e9520412841" />
      </Button>
    </RootWrapperExample>
  );
}

const RootWrapperExample = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: stretch;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  background-color: white;
  box-sizing: border-box;
`;

const L = styled.div`
  width: 100%;
  padding-top: 24px;
  overflow: hidden;
  background-color: rgb(30, 30, 30);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  position: relative;
`;

const R = styled.div`
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  position: relative;
`;

const Button = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 9;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 10px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.12);
  border-radius: 80px;
  width: 76px;
  height: 76px;
  background-color: rgb(0, 10, 255);
  box-sizing: border-box;
  padding: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

const IconsMdiPlayArrow = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
`;
