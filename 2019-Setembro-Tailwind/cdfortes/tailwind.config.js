module.exports = {
	theme: {
		extend: {},
		animations: {
			shake: 'shake .2s',
			bounce: 'bounce 4s'
		},
		fontFamily: {
			body: [ 'Roboto', 'sans-serif' ]
		},
		gradients: (theme) => ({
			// Array definition (defaults to linear gradients).
			tcfalado: [ '30deg', '#805AD5', '#D53F8C' ],
			relay: [ 'to top left', '#FAF5FF', '#E9D8FD', '#FED7E2' ],

			// Object definition.
			'mono-circle': {
				type: 'linear',
				colors: [ '30deg', '#B794F4', '#E9D8FD' ]
			}
		}),
		keyframes: {
			bounce: {
				'0%, 100%': { position: 'static' },
				'50%': { position: 'fixed' }
			}
		}
	},
	variants: {
		animations: [ 'responsive', 'hover', 'focus', 'group-hover' ],
		gradients: [ 'responsive', 'hover' ]
	},
	plugins: [
		require('tailwindcss-plugins/animations'),
		require('tailwindcss-plugins/keyframes'),
		require('tailwindcss-plugins/keyframes/shake'),
		require('tailwindcss-plugins/gradients'),
		require('./public/plugins/css-grid')({
			grids: [ 2, 3, 5, 6, 8, 10, 12 ],
			gaps: {
				0: '0',
				4: '1rem',
				8: '2rem'
			},
			variants: [ 'responsive' ]
		}),
		require('tailwindcss-transition')({
			standard: 'all .3s ease',
			transitions: {
				slow: 'all 2s ease',
				slow1: 'all .5s ease',
				'normal-in-out-quad': 'all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
				'slow-in-out-quad': 'all 2s cubic-bezier(0.455, 0.03, 0.515, 0.955)'
			},
			variants: [ 'responsive', 'hover' ]
		})
	]
};
