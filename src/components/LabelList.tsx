import { FC, useState, MouseEvent, useEffect } from 'react';
import { Label, LabelObject, LabelPlacement } from './Label';

interface LabelListProps {
  list: Array<LabelObject>;
  onChange?: (newList: Array<LabelObject>) => void;
}

export const LabelList: FC<LabelListProps> = ({ list, onChange }) => {
  const [labels, setLabels] = useState<Array<LabelObject>>([]);

  useEffect(() => {
    setLabels(list);
  }, [list]);

  const addNewLabel = (event: MouseEvent<HTMLUListElement>) => {
    if (event.currentTarget === event.target) {
      const { offsetWidth, offsetHeight } = event.currentTarget;

      const x = event.nativeEvent.offsetX / offsetWidth * 100;
      const y = event.nativeEvent.offsetY / offsetHeight * 100;

      const newLabel: LabelObject = {
        text: '',
        coordinates: { x, y },
        placement: LabelPlacement.TOP_LEFT,
      }

      setLabels([...labels, newLabel]);
    }
  };

  const updateLabelByIndex = (index: number, text: string) => {
    const newLabels = [...labels];
    newLabels[index].text = text;

    setLabels(newLabels);

    if (onChange) {
      onChange(newLabels);
    }
  };

  const removeLabelByIndex = (index: number) => {
    const newLabels = [...labels];
    newLabels.splice(index, 1);

    setLabels(newLabels);
  };

  return (
    <ul className="labels" onClick={addNewLabel}>
      {labels.map((label, index) => (
        <li key={label.text + index}>
          <Label
            label={label}
            onUpdate={(text) => updateLabelByIndex(index, text)}
            onCancel={() => removeLabelByIndex(index)}
          />
        </li>
      ))}
    </ul>
  );
};
