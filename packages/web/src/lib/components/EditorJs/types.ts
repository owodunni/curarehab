export type BlockType =
  | "delimiter"
  | "header"
  | "paragraph"
  | "nestedlist"
  | "image"
  | "quote"
  | "code"
  | "table";
//  | "embed";

type Alignment = "left" | "right" | "center" | "justify";

type Header = { level: 1 | 2 | 3 | 4 | 5 | 6; text: string };

type Paragraph = { text: string };

type Image = {
  file: {
    width: number;
    height: number;
    size: number;
    name: string;
    title: string;
    extension: string;
    fileId: string;
    fileUrl: string;
    url: string;
  };
  caption: string;
  stretched: boolean;
  withBackground: boolean;
  withBorder: boolean;
};

type Quote = { text: string; caption: string; alignment: Alignment };

type Table = { withHeadings: boolean; content: string[][] };

// Not tested
type Code = { code: string };

// Not tested
type List = {
  style: "ordered";
  items: { content: string; items: string[] }[];
};

type Delimiter = object;

type BaseBlock = {
  id: string;
  type: BlockType;
  data: Header | Paragraph | Image | Quote | Table | Delimiter | List | Code;
};

interface HeaderBlock extends BaseBlock {
  type: "header";
  data: Header;
}

interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  data: Paragraph;
}

interface ImageBlock extends BaseBlock {
  type: "image";
  data: Image;
}

interface QuoteBlock extends BaseBlock {
  type: "quote";
  data: Quote;
}

interface TableBlock extends BaseBlock {
  type: "table";
  data: Table;
}

interface DelimiterBlock extends BaseBlock {
  type: "delimiter";
  data: Delimiter;
}

interface ListBlock extends BaseBlock {
  type: "nestedlist";
  data: List;
}

interface CodeBlock extends BaseBlock {
  type: "code";
  data: Code;
}

export type Block =
  | HeaderBlock
  | ParagraphBlock
  | ImageBlock
  | QuoteBlock
  | TableBlock
  | ListBlock
  | CodeBlock
  | DelimiterBlock;
