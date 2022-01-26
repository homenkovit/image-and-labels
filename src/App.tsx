import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PreviewWithLabels } from './components/PreviewWithLabels';

export const App: FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    }
  }, []);

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files?.length) {
      setImageUrl(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
      <Header />
      <main className="main">
        <ImageUploader onChange={uploadImage} />
        {!!imageUrl && <PreviewWithLabels imageUrl={imageUrl} />}
      </main>
    </>
  );
};
