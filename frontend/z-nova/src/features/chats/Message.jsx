import { useState } from 'react';
import styled from 'styled-components';
import { useSender } from '../users/useSender';
import moment from 'moment-timezone';
import { HiOutlineDocumentText } from 'react-icons/hi';
import Lightbox from '../../ui/LightBox';

const StyledMessage = styled.span`
  padding: 1rem 2rem;
  border-radius: 6rem;
  display: inline-block;
  color: #fff;
  width: fit-content;
`;

const StyledUser = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
`;

const StyledFileContainer = styled.div`
  margin-top: 1rem;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const StyledPdfContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 250px;
  padding: 0.8rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 0.8rem;
  background-color: #f0f8ff;
  box-shadow: var(--shadow-sm);

  .file-icon {
    font-size: 5rem;
    color: var(--color-brand-500);
  }

  .file-name {
    color: #374151;
  }
`;

function Message({ message, user }) {
  const { sender } = useSender(message?.senderId);
  const [lightboxImage, setLightboxImage] = useState(null);

  const constructFileUrl = (fileName) =>
    `http://127.0.0.1:8000/messages/${fileName}`;

  const handleImageClick = (url) => {
    setLightboxImage(url);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <StyledUser src={`http://127.0.0.1:8000/users/${sender?.photo}`} />
        <span style={{ fontWeight: '500' }}>{sender?.name.split(' ')[0]}</span>
        <span style={{ fontSize: '1.4rem' }}>
          {moment(message?.createdAt)?.calendar()}
        </span>
      </div>

      {message?.files?.map((file) => (
        <StyledFileContainer key={file._id}>
          {file.fileType === 'image' && (
            <StyledImage
              src={constructFileUrl(file.fileUrl)}
              alt="Image Message"
              onClick={() => handleImageClick(constructFileUrl(file.fileUrl))}
            />
          )}
          {file.fileType === 'pdf' && (
            <a
              style={{ display: 'inline-block' }}
              href={constructFileUrl(file.fileUrl)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledPdfContainer>
                <HiOutlineDocumentText className="file-icon" />
                <span className="file-name">
                  {file.fileUrl.split('-').pop()}
                </span>
              </StyledPdfContainer>
            </a>
          )}
        </StyledFileContainer>
      ))}

      {message?.text && (
        <StyledMessage
          style={{
            background:
              message?.senderId === user?._id
                ? '#0095ff'
                : 'var(--color-grey-400)',
            fontWeight: 500,
          }}
        >
          {message.text}
        </StyledMessage>
      )}

      {lightboxImage && (
        <Lightbox image={lightboxImage} onClose={handleCloseLightbox} />
      )}
    </>
  );
}

export default Message;
