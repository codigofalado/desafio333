import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description?: string;
  lang?: string;
  meta?: [];
  title: string;
}

const SEO: FC<Props> = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          meta: siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.meta.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.meta.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.meta.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
      ].concat(meta ?? [])}
    />
  );
};

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
};

export default SEO;
