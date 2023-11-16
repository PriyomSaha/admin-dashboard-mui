import { CgUndo, CgRedo } from "react-icons/cg";
import { RxText } from "react-icons/rx";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import {
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdInsertLink,
  MdImage,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
} from "react-icons/md";
import { ImStrikethrough } from "react-icons/im";
import { BsTable } from "react-icons/bs";

export const eventTypes = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  ul: "ul",
  ol: "ol",
  quote: "quote",
  formatCode: "formatCode",
  formatUndo: "formatUndo",
  formatRedo: "formatRedo",
  formatBold: "formatBold",
  formatItalic: "formatItalic",
  formatUnderline: "formatUnderline",
  formatStrike: "formatStrike",
  formatInsertLink: "formatInsertLink",
  formatAlignLeft: "formatAlignLeft",
  formatAlignCenter: "formatAlignCenter",
  formatAlignRight: "formatAlignRight",
  insertImage: "insertImage",
  insertTable: "insertTable",
};

const pluginsList = [
  {
    id: 1,
    Icon: RxText,
    event: eventTypes.paragraph,
  },
  {
    id: 2,
    Icon: LuHeading1,
    event: eventTypes.h1,
  },
  {
    id: 3,
    Icon: LuHeading2,
    event: eventTypes.h2,
  },
  {
    id: 4,
    Icon: MdFormatListBulleted,
    event: eventTypes.ul,
  },
  {
    id: 5,
    Icon: MdFormatListNumbered,
    event: eventTypes.ol,
  },
  {
    id: 6,
    Icon: MdFormatQuote,
    event: eventTypes.quote,
  },
  {
    id: 7,
    Icon: MdCode,
    event: eventTypes.formatCode,
  },
  {
    id: 8,
    Icon: CgUndo,
    event: eventTypes.formatUndo,
  },
  {
    id: 9,
    Icon: CgRedo,
    event: eventTypes.formatRedo,
  },
  {
    id: 10,
    Icon: MdFormatBold,
    event: eventTypes.formatBold,
  },
  {
    id: 11,
    Icon: MdFormatItalic,
    event: eventTypes.formatItalic,
  },
  {
    id: 12,
    Icon: MdFormatUnderlined,
    event: eventTypes.formatUnderline,
  },
  {
    id: 13,
    Icon: MdImage,
    event: eventTypes.insertImage,
  },
  {
    id: 14,
    Icon: MdInsertLink,
    event: eventTypes.formatInsertLink,
  },
  {
    id: 15,
    Icon: MdFormatAlignLeft,
    event: eventTypes.formatAlignLeft,
  },
  {
    id: 16,
    Icon: MdFormatAlignCenter,
    event: eventTypes.formatAlignCenter,
  },
  {
    id: 17,
    Icon: MdFormatAlignRight,
    event: eventTypes.formatAlignRight,
  },
  {
    id: 18,
    Icon: ImStrikethrough,
    event: eventTypes.formatStrike,
  },
  { id: 19, Icon: BsTable, event: eventTypes.insertTable },
];

export default pluginsList;
