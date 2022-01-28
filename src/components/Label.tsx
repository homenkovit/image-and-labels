import { FC, useLayoutEffect, useRef, useState } from 'react';
import { LabelForm } from './LabelForm';
import { LabelText } from './LabelText';
import { isOutOfScreen } from '../utils';
import styles from './Label.module.scss';

export const LABEL_ARROW_SIZE = 10;

export enum LabelPlacement {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export type LabelObject = {
  text: string,
  coordinates: {
    x: number,
    y: number,
  },
  placement: LabelPlacement,
};

interface LabelProps {
  label: LabelObject;
  onUpdate?: (text: string) => void;
  onCancel?: () => void;
}

export const Label: FC<LabelProps> = ({ label, onUpdate, onCancel }) => {
  const labelRef = useRef<HTMLDivElement>(null);

  const { text, coordinates, placement } = label;
  const labelStyles = {
    top: `${coordinates.y}%`,
    left: `${coordinates.x}%`,
    '--arrow-width': `${LABEL_ARROW_SIZE}px`,
  };

  const [labelPlacement, setLabelPlacement] = useState<LabelPlacement>(placement);

  useLayoutEffect(() => {
    const changeLabelPlacementRelativeScreen = () => {
      if (labelRef.current) {
        const { top, left, width, height } = labelRef.current.getBoundingClientRect();

        const { isOutOfScreenOnX, isOutOfScreenOnY } = isOutOfScreen(width, height, left, top);

        if (isOutOfScreenOnX && isOutOfScreenOnY) {
          setLabelPlacement(LabelPlacement.BOTTOM_RIGHT);
        } else if (isOutOfScreenOnX) {
          if (labelPlacement === LabelPlacement.TOP_LEFT) {
            setLabelPlacement(LabelPlacement.TOP_RIGHT);
          }
          if (labelPlacement === LabelPlacement.BOTTOM_LEFT) {
            setLabelPlacement(LabelPlacement.BOTTOM_RIGHT);
          }
        } else if (isOutOfScreenOnY) {
          if (labelPlacement === LabelPlacement.TOP_LEFT) {
            setLabelPlacement(LabelPlacement.BOTTOM_LEFT);
          }
          if (labelPlacement === LabelPlacement.TOP_RIGHT) {
            setLabelPlacement(LabelPlacement.BOTTOM_RIGHT);
          }
        }
      }
    };

    window.addEventListener('resize', changeLabelPlacementRelativeScreen);

    return () => window.removeEventListener('resize', changeLabelPlacementRelativeScreen);
  }, []);

  const saveLabel = (comment: string) => {
    if (onUpdate && comment) {
      onUpdate(comment);
    }
  };

  return (
    <div ref={labelRef} className={`${styles.label} ${styles[labelPlacement]}`} style={labelStyles}>
      {!!text
        ? <LabelText>{text}</LabelText>
        : <LabelForm onSave={saveLabel} onCancel={onCancel} />
      }
    </div>
  );
};
