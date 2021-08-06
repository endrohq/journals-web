import React, { MouseEvent, PropsWithChildren, Ref } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './utils';
import {
  BoldOutlined,
  CodeOutlined,
  FontSizeOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { BaseEditor } from 'slate';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

type CustomElement = {
  type: formatType;
  children: CustomText[];
};
type CustomText = { text: string };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const TOOLBAR_ICONS = {
  format_bold: <BoldOutlined />,
  format_italic: <ItalicOutlined />,
  format_underlined: <UnderlineOutlined />,
  code: <CodeOutlined />,
  looks_one: <FontSizeOutlined />,
  looks_two: <FontSizeOutlined />,
  format_list_numbered: <OrderedListOutlined />,
  format_list_bulleted: <UnorderedListOutlined />
};

export type iconType = keyof typeof TOOLBAR_ICONS;
export type formatType =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'code'
  | 'heading-one'
  | 'heading-two'
  | 'numbered-list'
  | 'paragraph'
  | 'list-item'
  | 'bulleted-list';

export const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className="h100 w40--fixed flex-c flex-jc-c"
      style={{
        cursor: 'pointer',
        color: reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
          ? 'black'
          : '#ccc'
      }}
    />
  )
);

export const BlockButton = ({
  format,
  icon
}: {
  format: formatType;
  icon: iconType;
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}>
      {TOOLBAR_ICONS[icon]}
    </Button>
  );
};

export const MarkButton = ({
  format,
  icon
}: {
  format: formatType;
  icon: iconType;
}) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}>
      {TOOLBAR_ICONS[icon]}
    </Button>
  );
};

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      className="pos-rel bg-gray-100 h40--fixed flex-c"
      {...props}
      ref={ref}
    />
  )
);

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => <Menu className="" {...props} ref={ref} />
);
