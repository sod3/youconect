import React from 'react';
import styled from 'styled-components';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from 'react-share';

const PopupContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

const SharePopup = ({ url, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    onClose();
  };

  return (
    <PopupContainer>
      <ShareButton onClick={copyToClipboard}>
        <img src="https://img.icons8.com/material-outlined/24/000000/copy.png" alt="Copy URL" />
        Copy URL
      </ShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon size={32} round />
        Facebook
      </FacebookShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={32} round />
        WhatsApp
      </WhatsappShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={32} round />
        Twitter
      </TwitterShareButton>
    </PopupContainer>
  );
};

export default SharePopup;
