const path = require('path');

const siteMetadata = require('./config/metadata');

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet-async',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Medidor de velocidade de leitura - Leitura Orgânica',
        short_name: siteMetadata.title,
        start_url: '/',
        background_color: '#3198AF',
        theme_color: '#3198AF',
        display: 'minimal-ui',
        icon: 'src/assets/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/src/pages`,
        ignore: ['**/styles.js'],
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-preload-fonts',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-polished',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        '~': path.join(__dirname, 'src'),
      },
    },
    // `gatsby-plugin-offline`,
  ],
};
