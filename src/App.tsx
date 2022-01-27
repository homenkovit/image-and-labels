import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PreviewWithLabels } from './components/PreviewWithLabels';
import styles from './App.module.scss';

export const App: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    }
  }, [imageUrl]);

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files?.length && files[0].type.startsWith('image')) {
      setImageUrl(URL.createObjectURL(files[0]));
    } else {
      alert('You can upload only image.');
    }
  };

  return (
    <>
      <Header>
        <ImageUploader onChange={uploadImage} />
      </Header>
      <main className={styles.main}>
        {!!imageUrl && <PreviewWithLabels imageUrl={imageUrl} />}
      </main>
    </>
  );
};
