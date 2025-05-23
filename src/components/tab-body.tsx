'use client';

import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

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
        height="200px"
        width="100%"
        extensions={[json()]}
        onChange={(val) => {
          onChange?.(val);
        }}
        editable={editable}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};
