import { FC, FormEvent, useRef, useState } from 'react';

interface LabelProps {
  text: string;
  onUpdate?: (text: string) => void;
  onCancel?: () => void;
}

export const Label: FC<LabelProps> = ({ text, onUpdate, onCancel }) => {
  const commentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const saveLabel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onUpdate && commentTextareaRef.current?.value) {
      onUpdate(commentTextareaRef.current.value);
    }
  }

  if (text) {
    return (
      <div className="label">{text}</div>
    );
  }

  return (
    <form onSubmit={saveLabel}>
      <label htmlFor="comment">
        Comment
        <textarea ref={commentTextareaRef} name="comment" id="comment" required></textarea>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};
