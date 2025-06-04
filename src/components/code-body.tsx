'use client';

import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { html } from '@codemirror/lang-html';
import { EditorView } from '@codemirror/view';
import { foldGutter } from '@codemirror/language';
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useTheme } from 'next-themes';

export const CodeBody = ({
  editable = true,
  codeValue,
  onChange,
  type = '',
  height = '100%',
  minHeight = '100%',
  maxHeight = '100%',
}: {
  editable?: boolean; 
  codeValue: string;
  onChange?: (val: string) => void;
  type?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
}) => {
  const { theme } = useTheme();
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
        height={height}
        minHeight={minHeight}
        maxHeight={maxHeight}
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
          highlightActiveLine: !!codeValue,
          highlightActiveLineGutter: !!codeValue,
        }}
        theme={theme === 'dark' ? vscodeDark : vscodeLight}
        onChange={(val) => {
          onChange?.(val);
        }}
        editable={editable}
      />
    </div>
  );
};
