import { useState } from 'react';

export const useClipboard = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const getClipboardText = () => {
    setLoading(true);
    navigator.clipboard
      .readText()
      .then(result => {
        setText(result.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { text, loading, getClipboardText };
};
