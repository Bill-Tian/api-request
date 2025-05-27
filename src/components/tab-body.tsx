'use client';

import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { EditorView } from '@codemirror/view';

export const TabBody = ({
  editable = true,
  codeValue,
  onChange,
}: {
  editable?: boolean;
  codeValue: string;
  onChange?: (val: string) => void;
}) => {
  return (
    <div className="[&_.cm-content]:font-roboto-mono text-sm">
      <CodeMirror
        value={codeValue}
        height="240px"
        width="900px"
        extensions={[json(), html(), EditorView.lineWrapping]}
        onChange={(val) => {
          onChange?.(val);
        }}
        editable={editable}
      />
    </div>
  );
};
