import { FC, useLayoutEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import styles from './LabelText.module.scss';

export const LabelText: FC = ({ children }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isShowFullButtonVisible, setShowFullButtonVisible] = useState<boolean>(false);
  const [isFullTextModalVisible, setFullTextModalVisible] = useState<boolean>(false);

  const showFullTextModal = () => setFullTextModalVisible(true);
  const hideFullTextModal = () => setFullTextModalVisible(false);

  useLayoutEffect(() => {
    if (textRef.current) {
      const textHeight = textRef.current.offsetHeight;
      const textScrollHeight = textRef.current.scrollHeight;

      if (textScrollHeight > textHeight) {
        setShowFullButtonVisible(true);
      }
    }
  }, [children]);

  return (
    <>
      <p ref={textRef} className={styles.text}>{children}</p>
      {isShowFullButtonVisible && (
        <Button type="button" className={styles['show-full-button']} onClick={showFullTextModal} small>
          Show full
        </Button>
      )}
      <Modal isVisible={isFullTextModalVisible} onClose={hideFullTextModal}>{children}</Modal>
    </>
  );
};
