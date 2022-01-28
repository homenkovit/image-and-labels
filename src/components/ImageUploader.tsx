import { ChangeEvent, FC, useRef } from 'react';
import { Button } from './Button';
import styles from './ImageUploader.module.scss';

interface ImageUploaderProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader: FC<ImageUploaderProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => inputRef.current?.click();

  return (
    <label htmlFor="upload" className={styles.upload}>
      <Button type="button" onClick={onUploadButtonClick}>Click to upload image</Button>
      <input ref={inputRef} type="file" id="upload" className="visually-hidden" name="upload" accept="image/*" onChange={onChange} />
    </label>
  );
};
