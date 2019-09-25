module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    extend: {
      // perdao as gambiarras, primeiro projeto sempre tem que ter uma, se não não é o primeiro projeto 
      maxWidth:{
        'xxxs': '12rem',
        'xxs': '18rem',
        'ssm': '26rem',
      },
      colors: {
        'primary': '#EB007D',
        'secondary':  '#4a5568', //'#d53f8c',
        'background':   '#edf2f7', // '#4a5568',
      },
      height: {
        sm: '40px',
        md: '80px',
        lg: '120px',
        xl: '160px',
        xxl: '250px',
        astronauta: '300px',
        xxxl: '350px',
        astronauta2: '414px',
        xxxxl: '384px',
      },
    }
  },
  variants: {},
  plugins: [

  ]
}