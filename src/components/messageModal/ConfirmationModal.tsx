import React from 'react';
import BackDropContainer from './BackDropContainer';
import ConfirmBox from './ConfirmBox';

type Props = {
  heading?: string;
  loading?: boolean;
  rightBtn?: string;
  rightBtnPress?: () => void;
  leftBtn?: string;
  leftBtnPress?: () => void;
};

const ConfirmationModal = ({
  heading,
  loading,
  leftBtn,
  leftBtnPress,
  rightBtn,
  rightBtnPress,
}: Props) => {
  return (
    <BackDropContainer>
      <ConfirmBox
        heading={heading}
        leftBtn={leftBtn}
        leftBtnPress={leftBtnPress}
        loading={loading}
        rightBtn={rightBtn}
        rightBtnPress={rightBtnPress}
      />
    </BackDropContainer>
  );
};

export default ConfirmationModal;
