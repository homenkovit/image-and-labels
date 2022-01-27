import { FC, SyntheticEvent, useRef, useState, useLayoutEffect } from 'react';
import { LabelObject } from './Label';
import { LabelList } from './LabelList';
import styles from './PreviewWithLabels.module.scss';

interface PreviewWithLabelsProps {
  imageUrl: string;
}

export const PreviewWithLabels: FC<PreviewWithLabelsProps> = ({ imageUrl }) => {
  const ratio = useRef<number>();
  const mainRef = useRef<HTMLDivElement>(null);

  const [labels, setLabels] = useState<Array<LabelObject>>([]);
  const [previewSize, setPreviewSize] = useState<{ width: number, height: number }>();

  useLayoutEffect(() => {
    window.addEventListener('resize', calculateAndSetPreviewContainerSize);

    return () => window.removeEventListener('resize', calculateAndSetPreviewContainerSize);
  }, []);

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    ratio.current = naturalHeight / naturalWidth;

    setLabels([]);

    calculateAndSetPreviewContainerSize();
  };

  const calculateAndSetPreviewContainerSize = () => {
    if (mainRef.current && ratio.current) {
      const { offsetWidth, offsetHeight } = mainRef.current;

      const width = Math.min(offsetHeight / ratio.current, offsetWidth);
      const height = Math.min(ratio.current * width, offsetHeight);

      setPreviewSize({ width, height });
    }
  };

  return (
    <div className={styles.main} ref={mainRef}>
      <div className={styles.container} style={previewSize}>
        <div className={styles.preview}>
          <img src={imageUrl} alt="uploaded image" onLoad={onImageLoad} />
        </div>
        <LabelList list={labels} onChange={(newList) => setLabels(newList)} />
      </div>
    </div>
  );
};
