import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { eventTypes } from "./toolbarIconsList";
import { useEffect, useState } from "react";
import {
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from "lexical";
import { INSERT_TABLE_COMMAND } from "@lexical/table";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { useCallback } from "react";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import {
  $isHeadingNode,
  $createHeadingNode,
  $createQuoteNode,
} from "@lexical/rich-text";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $createCodeNode,
  $isCodeNode,
  getDefaultCodeLanguage,
  getCodeLanguages,
} from "@lexical/code";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import useModal from "../hooks/useModal";
import { InsertImageDialog } from "../Plugin/ImagePlugin";

const LowPriority = 1;

const useOnClickListener = () => {
  const [editor] = useLexicalComposerContext();
  const [modal, showModal] = useModal();
  const [blockType, setBlockType] = useState("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [isRTL, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const [selectedEventTypes, setSelectedEventTypes] = useState([]);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    let allSelectedEvents = [...selectedEventTypes];

    // inner function

    const pushInEventTypesState = (selectionFormat, event) => {
      if (selectionFormat) {
        if (selectedEventTypes.includes(event)) return;
        else allSelectedEvents.push(event);
      } else {
        allSelectedEvents = allSelectedEvents.filter((ev) => ev !== event);
      }
    };

    // range selection ( e.g like to bold only the particular area of the text)
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();

          setBlockType(type);
        }
      }

      pushInEventTypesState(selection.hasFormat("bold"), eventTypes.formatBold);
      pushInEventTypesState(
        selection.hasFormat("italic"),
        eventTypes.formatItalic
      );
      pushInEventTypesState(
        selection.hasFormat("underline"),
        eventTypes.formatUnderline
      );
      pushInEventTypesState(
        selection.hasFormat("strikethrough"),
        eventTypes.formatStrike
      );
      pushInEventTypesState(selection.hasFormat("code"), eventTypes.formatCode);

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        if (!allSelectedEvents.includes(eventTypes.formatInsertLink))
          allSelectedEvents.push(eventTypes.formatInsertLink);
        setIsLink(true);
      } else {
        if (allSelectedEvents.includes(eventTypes.formatInsertLink)) {
          allSelectedEvents = allSelectedEvents.filter(
            (ev) => ev !== eventTypes.formatCode
          );
        }
        setIsLink(false);
      }

      setSelectedEventTypes(allSelectedEvents);
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const onClick = (event) => {
    if (event === eventTypes.formatBold) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
    } else if (event === eventTypes.formatItalic) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
    } else if (event === eventTypes.formatUnderline) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
    } else if (event === eventTypes.formatStrike) {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
    } else if (event === eventTypes.formatAlignLeft) {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
    } else if (event === eventTypes.formatAlignCenter) {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
    } else if (event === eventTypes.formatAlignRight) {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
    } else if (event === eventTypes.paragraph) {
      formatParagraph();
    } else if (event === eventTypes.h1) {
      formatHeading("h1");
    } else if (event === eventTypes.h2) {
      formatHeading("h2");
    } else if (event === eventTypes.ol) {
      console.log("orderlist ");
      formatNumberedList();
    } else if (event === eventTypes.ul) {
      console.log("Unorderlist ");
      formatBulletList();
    } else if (event === eventTypes.quote) {
      formatQuote();
    } else if (event === eventTypes.formatCode) {
      formatCode();
    } else if (event === eventTypes.formatRedo) {
      editor.dispatchCommand(REDO_COMMAND);
    } else if (event === eventTypes.formatUndo) {
      editor.dispatchCommand(UNDO_COMMAND);
    } else if (event === eventTypes.insertTable) {
      handleTable();
    } else if (event === eventTypes.insertImage) {
      showModal("Insert Image", (onClose) => (
        <InsertImageDialog activeEditor={editor} onClose={onClose} />
      ));
    } else if (event === eventTypes.formatInsertLink) {
      insertLink();
    }
  };

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const handleTable = () => {
    const rows = prompt("Enter the number of rows:", "");
    const columns = prompt("Enter the number of columns:", "");

    if (
      isNaN(Number(columns)) ||
      columns == null ||
      rows == null ||
      columns === "" ||
      rows === "" ||
      isNaN(Number(rows))
    ) {
      return;
    }
    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns: columns,
      rows: rows,
    });
  };

  const formatParagraph = () => {
    if (blockType !== "paragraph") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
  };

  const formatHeading = (val) => {
    if (blockType !== val) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode(val));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "ul") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "ol") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
      // below code insert the new block but we only need to format the specific part of the text into code format
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
  };

  return { onClick, isLink, editor, modal, showModal };
};

function getSelectedNode(selection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

export default useOnClickListener;
