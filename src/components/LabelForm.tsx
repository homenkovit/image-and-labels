import { ChangeEvent, CSSProperties, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../hooks/useClickOutside';
import { useKeyUp } from '../hooks/useKeyUp';
import { Button } from './Button';
import styles from './LabelForm.module.scss';

export const LABEL_FORM_WIDTH = 280;
export const LABEL_FORM_HEIGHT = 150;

interface LabelFormProps {
  onSave?: (comment: string) => void;
  onCancel?: () => void;
}

export const LabelForm: FC<LabelFormProps> = ({ onSave, onCancel }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [commentTrimed, setCommentTrimed] = useState<string>('');

  const formStyles: CSSProperties = {
    width: LABEL_FORM_WIDTH,
    height: LABEL_FORM_HEIGHT,
  };

  const onPressEscape = () => {
    setCommentTrimed('');

    if (onCancel) {
      onCancel();
    }
  };

  useKeyUp('Escape', onPressEscape, { stopPropagation: true });

  const onClickOutside = () => {
    if (onSave && commentTrimed) {
      onSave(commentTrimed);
    } else if (onCancel) {
      onCancel();
    }
  };

  useClickOutside(onClickOutside, formRef);

  const onTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => setCommentTrimed(event.target.value.trim());

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSave && commentTrimed) {
      onSave(commentTrimed);
    }
  };

  return (
    <form ref={formRef} style={formStyles} className={styles.form} onSubmit={onSubmit}>
      <label htmlFor="comment" className={styles.comment}>
        Comment
        <textarea name="comment" id="comment" onChange={onTextareaChange} required autoFocus></textarea>
      </label>
      <div className={styles.buttons}>
        {!!commentTrimed && <Button type="submit" small>Save</Button>}
        <Button type="button" small onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};
