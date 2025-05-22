'use client';

import * as React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export const TabBody = ({
  onChange,
}: {
  onChange?: (index: number, field: 'key' | 'value', value: string) => void;
}) => {
  const [value, setValue] = React.useState(`{
        "name": "ChatGPT",
        "type": "AI Assistant"
      }`);

  return (
    <div className="flex gap-2 items-center [&_.cm-content]:font-roboto-mono text-sm">
      <CodeMirror
        value={value}
        height="200px"
        extensions={[json()]}
        onChange={(val) => setValue(val)}
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
