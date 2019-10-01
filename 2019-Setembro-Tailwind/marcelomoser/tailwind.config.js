module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#EB007D',
        primaryDark: '#BC0064',
        secundary: '#3F3D56',
        secundaryDark: '#2F2E41',
        light: '#F2F2F2',
        dark: '#111017',
      },
      // fontFamily: {
      //   'sans': ['Rubik'],
      // },
      boxShadow: {
        primary: '0 3px 3px -1px rgba(0,0,0,.2);',
      },
      screens: {
        '2xl' : '1438px',
        '3xl' : '1680px',
      }
    }
  },
  variants: {},
  plugins: [
    function({ addUtilities }) {
      const transition = {
        '.transition': {
          transition: 'all ease .3s',
        },
      }
      
      addUtilities(transition)
    }
  ]
}
