import { FC, useState, MouseEvent, useEffect } from 'react';
import { isOutOfScreen, isTopEnough } from '../utils';
import { Label, LabelObject, LabelPlacement, LABEL_ARROW_SIZE } from './Label';
import { LABEL_FORM_HEIGHT, LABEL_FORM_WIDTH } from './LabelForm';
import styles from './LabelList.module.scss';

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
      let placement = LabelPlacement.TOP_LEFT;
      const { offsetWidth, offsetHeight, offsetParent } = event.currentTarget;
      const { offsetX, offsetY, clientX, clientY } = event.nativeEvent;
      const labelWithFormHeight = LABEL_FORM_HEIGHT + LABEL_ARROW_SIZE;

      const wrapperHeight = offsetParent?.parentElement?.clientHeight ?? offsetHeight;

      const isTopEnoughForLabel = isTopEnough(wrapperHeight, offsetHeight, labelWithFormHeight, offsetY);

      const x = offsetX / offsetWidth * 100;
      const y = offsetY / offsetHeight * 100;

      const { isOutOfScreenOnX, isOutOfScreenOnY } = isOutOfScreen(LABEL_FORM_WIDTH, labelWithFormHeight, clientX, clientY);

      if (isOutOfScreenOnX && isOutOfScreenOnY) {
        if (isTopEnoughForLabel) {
          placement = LabelPlacement.BOTTOM_RIGHT;
        } else {
          placement = LabelPlacement.TOP_RIGHT;
        }
      } else if (isOutOfScreenOnX) {
        placement = LabelPlacement.TOP_RIGHT;
      } else if (isOutOfScreenOnY && isTopEnoughForLabel) {
        placement = LabelPlacement.BOTTOM_LEFT;
      }

      const newLabel: LabelObject = {
        text: '',
        coordinates: { x, y },
        placement,
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
    <ul className={styles.labels} onClick={addNewLabel}>
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

