import { MouseEvent, FC, SyntheticEvent, useRef, useState, useLayoutEffect, useEffect } from 'react';
import { Label } from './Label';

interface PreviewWithLabelsProps {
  imageUrl: string;
}

export const PreviewWithLabels: FC<PreviewWithLabelsProps> = ({ imageUrl }) => {
  const ratio = useRef<number>();
  const [labels, setLabels] = useState<Array<{ text: string, coordinates: { x: number, y: number }}>>([]);
  const [previewSize, setPreviewSize] = useState<{ width: number, height: number }>();
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.addEventListener('resize', calculateAndSetPreviewContainerSize);
    return () => window.removeEventListener('resize', calculateAndSetPreviewContainerSize);
  }, []);

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setLabels([]);
    ratio.current = naturalHeight / naturalWidth;
    calculateAndSetPreviewContainerSize();
  };

  const calculateAndSetPreviewContainerSize = () => {
    if (mainRef.current && ratio.current) {
      const { offsetWidth, offsetHeight } = mainRef.current;

      const width = Math.min(offsetHeight / ratio.current, offsetWidth);
      const height = Math.min(ratio.current * width, offsetHeight);

      setPreviewSize({ width, height });
    }
  }

  const addNewLabel = (event: MouseEvent<HTMLUListElement>) => {
    if (event.currentTarget === event.target && previewSize) {
      const { width, height } = previewSize;
      const x = event.nativeEvent.offsetX / width * 100;
      const y = event.nativeEvent.offsetY / height * 100;
      setLabels([...labels, { text: '', coordinates: { x, y} }]);
    }
  };

  const updateLabelByIndex = (index: number, text: string) => {
    const newLabels = [...labels];
    newLabels[index].text = text;
    setLabels(newLabels);
  };

  const removeLabelByIndex = (index: number) => {
    setLabels((prevLabels) => prevLabels.filter((_, i) => i !== index));
  };

  return (
    <div className="preview-with-labels" ref={mainRef}>
      <div className="preview-with-labels-container" style={previewSize}>
        <div className="preview">
          <img src={imageUrl} alt="uploaded image" onLoad={onImageLoad} />
        </div>
        <ul className="labels" onClick={addNewLabel}>
          {labels.map((label, index) => (
            <li key={index} style={{ top: `${label.coordinates.y}%`, left: `${label.coordinates.x}%` }}>
              <Label text={label.text} onUpdate={(text) => updateLabelByIndex(index, text)} onCancel={() => removeLabelByIndex(index)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
