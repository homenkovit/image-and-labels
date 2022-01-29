import { FC, useLayoutEffect, useRef, useState } from 'react';
import { LabelForm } from './LabelForm';
import { LabelText } from './LabelText';
import { isOutOfScreen, isTopEnough } from '../utils';
import styles from './Label.module.scss';

export const LABEL_ARROW_SIZE = 10;

export enum LabelPlacement {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  LEFT_TOP = 'left-top',
  RIGHT_TOP = 'right-top',
  LEFT_BOTTOM = 'left-bottom',
  RIGHT_BOTTOM = 'right-bottom',
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
    '--left-offset': '0px',
    '--right-offset': '0px',
  };

  const [labelPlacement, setLabelPlacement] = useState<LabelPlacement>(placement);

  useLayoutEffect(() => {
    const changeLabelPlacementRelativeScreen = () => {
      if (labelRef.current) {
        const { top, left, width, height } = labelRef.current.getBoundingClientRect();
        const { offsetTop, offsetParent } = labelRef.current;
        const labelHeight = height + LABEL_ARROW_SIZE;

        const parentHeight = offsetParent?.clientHeight ?? 0;
        const wrapperHeight = offsetParent?.parentElement?.parentElement?.clientHeight ?? parentHeight;

        const isTopEnoughForLabel = isTopEnough(wrapperHeight, parentHeight, labelHeight, offsetTop);

        const { isOutOfScreenOnX, isOutOfScreenOnY } = isOutOfScreen(width, labelHeight, left, top);

        if (isOutOfScreenOnX && isOutOfScreenOnY) {
          if (isTopEnoughForLabel) {
            setLabelPlacement(LabelPlacement.BOTTOM_RIGHT);
          } else {
            setLabelPlacement(LabelPlacement.TOP_RIGHT);
          }
        } else if (isOutOfScreenOnX) {
          if (labelPlacement === LabelPlacement.TOP_LEFT) {
            setLabelPlacement(LabelPlacement.TOP_RIGHT);
          }
          if (labelPlacement === LabelPlacement.BOTTOM_LEFT) {
            setLabelPlacement(LabelPlacement.BOTTOM_RIGHT);
          }
          if (labelPlacement === LabelPlacement.TOP_RIGHT) {
            setLabelPlacement(LabelPlacement.RIGHT_TOP);
          }
          if (labelPlacement === LabelPlacement.BOTTOM_RIGHT) {
            setLabelPlacement(LabelPlacement.RIGHT_BOTTOM);
          }
        } else if (isOutOfScreenOnY && isTopEnoughForLabel) {
          if (labelPlacement === LabelPlacement.TOP_LEFT) {
            setLabelPlacement(LabelPlacement.BOTTOM_LEFT);
          }
          if (labelPlacement === LabelPlacement.TOP_RIGHT) {
            setLabelPlacement(LabelPlacement.BOTTOM_RIGHT);
          }
          if (labelPlacement === LabelPlacement.LEFT_TOP) {
            setLabelPlacement(LabelPlacement.LEFT_BOTTOM);
          }
          if (labelPlacement === LabelPlacement.RIGHT_TOP) {
            setLabelPlacement(LabelPlacement.RIGHT_BOTTOM);
          }
        } else if (left < 0) {
          if (labelPlacement === LabelPlacement.TOP_LEFT) {
            setLabelPlacement(LabelPlacement.LEFT_TOP);
          }
          if (labelPlacement === LabelPlacement.BOTTOM_LEFT) {
            setLabelPlacement(LabelPlacement.LEFT_BOTTOM);
          }
        } else if (left) {}
      }
    };

    if (labelRef.current) {
      const { left } = labelRef.current.getBoundingClientRect();

      if (left < 0) {
        labelRef.current.style.setProperty('--left-offset', `${Math.round(Math.abs(left))}px`);
      }
    }

    window.addEventListener('resize', changeLabelPlacementRelativeScreen);

    return () => window.removeEventListener('resize', changeLabelPlacementRelativeScreen);
  }, []);

  const saveLabel = (comment: string) => {
    if (onUpdate && comment) {
      onUpdate(comment);
    }
  };

  return (
    <div ref={labelRef} className={`${styles.label} ${!!text && styles.saved} ${styles[labelPlacement]}`} style={labelStyles}>
      {!!text
        ? <LabelText>{text}</LabelText>
        : <LabelForm onSave={saveLabel} onCancel={onCancel} />
      }
    </div>
  );
};
