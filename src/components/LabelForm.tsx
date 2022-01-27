import { FC, FormEvent } from 'react';
import { Button } from './Button';
import styles from './LabelForm.module.scss';

interface LabelFormProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
}

export const LabelForm: FC<LabelFormProps> = ({ onSubmit, onCancel }) => (
  <form className={styles.form} onSubmit={onSubmit}>
    <label htmlFor="comment" className={styles.comment}>
      Comment
      <textarea name="comment" id="comment" required autoFocus></textarea>
    </label>
    <div className={styles.buttons}>
      <Button type="submit" small>Save</Button>
      <Button type="button" small onClick={onCancel}>Cancel</Button>
    </div>
  </form>
);
