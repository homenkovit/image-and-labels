import { ChangeEvent, FC } from 'react';

interface ImageUploaderProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUploader: FC<ImageUploaderProps> = ({ onChange }) => (
  <label htmlFor="upload" className="upload">
    Click to upload image
    <input type="file" id="upload" name="upload" accept="image/*" onChange={onChange} />
  </label>
);
