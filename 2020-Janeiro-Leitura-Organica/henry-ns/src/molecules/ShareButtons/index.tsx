import React, { FC } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

import ExternalLink from '~/atoms/ExternalLink';

import { Container } from './styles';

const URLS = [
  {
    name: 'twitter',
    Icon: FaTwitter,
    href: (text: string) =>
      `https://twitter.com/intent/tweet?text=${text}&url=http://leituraorganica.netlify.com/&hashtags=leituraOrganica,desafio333,codigofalado`,
  },
  {
    name: 'facebook',
    Icon: FaFacebook,
    href: (text: string) =>
      `https://www.facebook.com/share.php?u=http://leituraorganica.netlify.com/&quote=${text}`,
  },
  {
    name: 'linkedin',
    Icon: FaLinkedin,
    href: () =>
      'https://www.linkedin.com/sharing/share-offsite/?url=http://leituraorganica.netlify.com/',
  },
];

interface Props {
  ppm: number | string;
}

const ShareButtons: FC<Props> = ({ ppm }) => (
  <Container>
    {URLS.map(media => (
      <li key={media.name}>
        <ExternalLink
          href={media.href(
            `WOW! minha velocidade de leitura é ${ppm} PPM. Calcule a sua também!`
          )}
        >
          <media.Icon />
        </ExternalLink>
      </li>
    ))}
  </Container>
);

export default ShareButtons;
