import React from 'react';
import BackDropContainer from './BackDropContainer';
import MessageBox from './MessageBox';

type Props = {
  type?: 'success' | 'error';
  heading?: string;
  buttonTitle?: string;
  loading?: boolean;
  onPress?: () => void;
};

const MessageModal = ({
  type,
  buttonTitle,
  heading,
  onPress,
  loading,
}: Props) => {
  return (
    <BackDropContainer>
      <MessageBox
        buttonTitle={buttonTitle}
        type={type}
        heading={heading}
        onPress={onPress}
        loading={loading}
      />
    </BackDropContainer>
  );
};

export default MessageModal;
