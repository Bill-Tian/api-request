'use client';

import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { EditorView } from '@codemirror/view';
import { foldGutter } from '@codemirror/language';
import { vscodeLight } from '@uiw/codemirror-theme-vscode';

export const CodeBody = ({
  editable = true,
  codeValue,
  onChange,
  type = '',
}: {
  editable?: boolean;
  codeValue: string;
  onChange?: (val: string) => void;
  type?: string;
}) => {
  const editorTheme = EditorView.theme({
    '.cm-gutters': {
      fontFamily: 'var(--font-roboto-mono)',
    },
    '.cm-lineNumbers': {
      minWidth: '30px',
      fontSize: '12px',
    },
    '.cm-foldGutter': {
      minWidth: '2em',
      color: 'var(--secondary-light-color)',
    },
    '.cm-foldGutter .cm-gutterElement': {
      textAlign: 'center',
    },
    '.cm-content': {
      fontFamily: 'var(--font-roboto-mono)',
      fontSize: '12px',
    },
  });

  const getLanguageExtension = () => {
    switch (type.toLowerCase()) {
      case 'application/json':
      case 'json':
        return json();
      case 'text/html; charset=utf-8':
      case 'text/html':
      case 'html':
        return html();
      default:
        return json();
    }
  };

  return (
    <div>
      <CodeMirror
        value={codeValue}
        extensions={[
          getLanguageExtension(),
          EditorView.lineWrapping,
          foldGutter({
            openText: '▾',
            closedText: '▸',
          }),
          editorTheme,
        ]}
        basicSetup={{
          foldGutter: false,
        }}
        theme={vscodeLight}
        onChange={(val) => {
          onChange?.(val);
        }}
        editable={editable}
      />
    </div>
  );
};
