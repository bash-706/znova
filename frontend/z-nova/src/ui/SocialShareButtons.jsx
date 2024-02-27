import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaReddit,
  FaWhatsapp,
} from 'react-icons/fa6';

function SocialShareButtons({ url, title }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.facebook.com/dialog/share?app_id=377229581660360&display=popup&href=${url}`}
      >
        <FaFacebook
          style={{ fontSize: '4rem', color: 'var(--color-brand-600)' }}
        />
      </a>
      {/* <a */}
      {/* target="_blank" */}
      {/* rel="noreferrer" */}
      {/* href={`https://www.instagram.com/sharer.php?u=${url}`} */}
      {/* > */}
      {/* <FaInstagram */}
      {/* style={{ */}
      {/* fontSize: '4rem', */}
      {/* color: '#dc2743', */}
      {/* }} */}
      {/* /> */}
      {/* </a> */}
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.twitter.com/intent/tweet?url=${url}`}
      >
        <FaTwitter style={{ fontSize: '4rem', color: '#00acee' }} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaReddit style={{ fontSize: '4rem', color: '#ff4500' }} />
      </a>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://api.whatsapp.com/send?text=${url}`}
      >
        <FaWhatsapp style={{ fontSize: '4rem', color: '#25d366' }} />
      </a>
    </div>
  );
}

export default SocialShareButtons;
