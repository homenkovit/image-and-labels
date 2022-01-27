import { FC, FormEvent } from 'react';

interface LabelFormProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
}

export const LabelForm: FC<LabelFormProps> = ({ onSubmit, onCancel }) => (
  <form className="label-form" onSubmit={onSubmit}>
    <label htmlFor="comment" className="label-form-comment">
      Comment
      <textarea name="comment" id="comment" required autoFocus></textarea>
    </label>
    <div className="label-form-buttons">
      <button type="submit" className="label-form-save-button">Save</button>
      <button type="button" className="label-form-cancel-button" onClick={onCancel}>Cancel</button>
    </div>
  </form>
);
