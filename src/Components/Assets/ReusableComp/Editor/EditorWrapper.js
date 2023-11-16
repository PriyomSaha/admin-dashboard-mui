import { $getRoot, $getSelection } from "lexical";
import { useEffect, useState } from "react";
import "./Styling/EditorStyle.css";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Box } from "@mui/material";
import Toolbar from "./Toolbar/Toolbar";
import { MuiContentEditable, placeHolderSx } from "Components/UI/GlobalStyles";
import "./Styling/EditorStyle.css";
import lexicalEditorConfig from "./EditorConfig";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import CodeHighlightPlugin from "./Plugin/CodeHighlightPlugin";
import { TableContext } from "./Plugin/TablePlugin";
import ToolbarPlugin from "./Toolbar/TableToolbar";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import TableCellResizerPlugin from "./Plugin/TableCellResizer";
import TableActionMenuPlugin from "./Plugin/TableActionMenuPlugin";

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

function EditorWrapper() {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
  const onRef = (_floatingAnchorElem) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      <TableContext>
        <Toolbar />

        {/* <ToolbarPlugin /> */}
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
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
          <CodeHighlightPlugin />
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
  );
}

export default EditorWrapper;
