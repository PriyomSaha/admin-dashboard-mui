import { $getRoot, $getSelection } from "lexical";
import { useEffect, useRef, useState } from "react";
import "./Styling/EditorStyle.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Box, Button } from "@mui/material";
import Toolbar from "./Toolbar/Toolbar";
import { MuiContentEditable, placeHolderSx } from "Components/UI/GlobalStyles";
import "./Styling/EditorStyle.css";
import lexicalEditorConfig from "./EditorConfig";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import CodeHighlightPlugin from "./Plugin/CodeHighlightPlugin";
import { TableContext } from "./Plugin/TablePlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import TableCellResizerPlugin from "./Plugin/TableCellResizer";
import TableActionMenuPlugin from "./Plugin/TableActionMenuPlugin";
import ImagesPlugin from "./Plugin/ImagePlugin";

// const theme = {};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    console.log(root, selection);
  });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function EditorWrapper({ EMPTY_CONTENT }) {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  const editorStateRef = useRef();

  const [lexicalEditorConf, setLexicalEditorConf] = useState({
    ...lexicalEditorConfig,
    editorState: EMPTY_CONTENT,
  });

  return (
    <>
      <LexicalComposer initialConfig={lexicalEditorConf}>
        <TableContext>
          <Toolbar />
          <TablePlugin />
          <TableCellResizerPlugin />
          <Box sx={{ position: "relative", background: "white", mt: 1 }}>
            <RichTextPlugin
              contentEditable={
                <Box ref={onRef}>
                  <MuiContentEditable />
                </Box>
              }
              placeholder={<Box sx={placeHolderSx}>Enter your text here</Box>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin
              onChange={(editorState) => (editorStateRef.current = editorState)}
            />

            <HistoryPlugin />
            <MyCustomAutoFocusPlugin />
            <CodeHighlightPlugin />
            <ImagesPlugin captionsEnabled={true} />
            <ListPlugin />
            <LinkPlugin />
          </Box>

          {floatingAnchorElem && (
            <>
              <TableActionMenuPlugin anchorElem={floatingAnchorElem} />
            </>
          )}
        </TableContext>
      </LexicalComposer>
      <Button onClick={() => console.log(editorStateRef.current.toJSON())}>
        SAVE
      </Button>
    </>
  );
}

export default EditorWrapper;
