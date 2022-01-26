import { FC, useState, MouseEvent } from 'react';
import { Label } from './Label';

export const LabelList: FC = () => {
  const [labels, setLabels] = useState<Array<string>>([]);

  const addNewLabel = (event: MouseEvent<HTMLUListElement>) => {
    setLabels([...labels, 'label']);
  };

  return (
    <ul className="labels" onClick={addNewLabel}>
      {labels.map((label, index) => (
        <li key={index}>
          <Label text={label} />
        </li>
      ))}
    </ul>
  );
};
