import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react';
import { Fragment } from 'react';

import MenuItem from './MenuItem';
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  PenLine,
  Quote,
  Strikethrough,
} from 'lucide-react';
import { Divider } from '@nextui-org/divider';
import LinkItem from './LinkItem';

export default function FloatingMenuBar({ editor }: { editor: Editor }) {
  const items = [
    {
      icon: Bold,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: Italic,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: Strikethrough,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      icon: PenLine,
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
  ];

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='flex flex-wrap items-center gap-3 border py-2 px-3 dark:border-foreground-50 mx-4 rounded-md bg-background'>
        {items.map((item, index) => (
          <Fragment key={index}>
            <MenuItem {...item} />
          </Fragment>
        ))}
        <LinkItem editor={editor} />
      </div>
    </BubbleMenu>
  );
}