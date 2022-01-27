import { FC, FormEvent, useLayoutEffect, useRef, useState } from 'react';
import { LabelForm } from './LabelForm';
import styles from './Label.module.scss';

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
  const labelStyles = { top: `${coordinates.y}%`, left: `${coordinates.x}%` };

  const [labelPlacement, setLabelPlacement] = useState<LabelPlacement>(placement);

  useLayoutEffect(() => {
    const changeLabelPlacementRelativeScreen = () => {
      if (labelRef.current) {
        const { innerWidth, innerHeight } = window;
        const { top, left, width, height } = labelRef.current.getBoundingClientRect();

        const isOutOfScreenOnX = width + left > innerWidth;
        const isOutOfScreenOnY = height + top > innerHeight;

        if (isOutOfScreenOnX && isOutOfScreenOnY) {
          setLabelPlacement(LabelPlacement.BOTTOM_RIGHT);
        } else if (isOutOfScreenOnX) {
          setLabelPlacement(LabelPlacement.TOP_RIGHT);
        } else if (isOutOfScreenOnY) {
          setLabelPlacement(LabelPlacement.BOTTOM_LEFT);
        }
      }
    };

    changeLabelPlacementRelativeScreen();

    window.addEventListener('resize', changeLabelPlacementRelativeScreen);

    return () => window.removeEventListener('resize', changeLabelPlacementRelativeScreen);
  }, []);

  const saveLabel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const comment = formData.get('comment');

    if (onUpdate && comment) {
      onUpdate(comment.toString());
    }
  };

  return (
    <div ref={labelRef} className={`${styles.label} ${styles[labelPlacement]}`} style={labelStyles}>
      <div className={styles.container}>
        {!!text ? text : <LabelForm onSubmit={saveLabel} onCancel={onCancel} />}
      </div>
    </div>
  );
};
