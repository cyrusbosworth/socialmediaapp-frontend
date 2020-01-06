//TODO check docs about globalStyles and palette

export default {
	palette: {
		primary: {
			main: '#424242',
			light: 'rgb(103, 103, 103)',
			dark: 'rgb(46, 46, 46)',
			contrastText: '#fff'
		},
		secondary: {
			main: '#C62828',
			light: 'rgb(209, 83, 83)',
			dark: 'rgb(138, 28, 28)',
			contrastText: '#fff'
		}
	},
	typography: {
		useNextVariants: true
	},
	globalStyles: {
		paper: {
			padding: 20
		},
		profile: {
			'& .image-wrapper': {
				textAlign: 'center',
				position: 'relative',
				'& button': {
					position: 'absolute',
					top: '80%',
					left: '70%'
				}
			},
			'& .profile-image': {
				width: 200,
				height: 200,
				objectFit: 'cover',
				maxWidth: '100%',
				borderRadius: '50%'
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle'
				},
				'& a': {}
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0'
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer'
				}
			}
		},
		buttons: {
			textAlign: 'center',
			'& a': {
				margin: '20px 10px'
			}
		},
		card: {
			display: 'flex',
			marginBottom: 20
		},
		cardContent: {
			width: '100%',
			flexDirection: 'column',
			padding: 25
		},
		cover: {
			minWidth: 200,
			objectFit: 'cover'
		},
		handle: {
			width: 60,
			height: 20,
			backgroundColor: 'gray',
			marginBottom: 7
		},
		date: {
			height: 13,
			width: 100,
			backgroundColor: 'rgba(0,0,0,.3)',
			marginBottom: 10
		},
		fullLine: {
			height: 15,
			backgroundColor: 'rgba(0,0,0,.3)',
			width: '90%',
			marginBottom: 10
		},
		halfLine: {
			height: 15,
			backgroundColor: 'rgba(0,0,0,.3)',
			width: '50%',
			marginBottom: 10
		},

		invisSeparator: {
			border: 'none',
			margin: 4
		},
		visSeparator: {
			width: '100%',
			borderBottom: '1px solid rgba(0,0,0,.1)',
			marginBottom: 20
		},
		form: {
			textAlign: 'center'
		},
		image: {
			margin: '20px auto 20px auto',
			height: '75px',
			width: '75px'
		},
		pageTitle: {
			margin: '10px auto 10px auto'
		},
		textField: {
			margin: '10px auto 10px auto'
		},
		button: {
			margin: 20,
			position: 'relative'
		},
		progress: {
			position: 'absolute'
		},
		customError: {
			color: 'red',
			fontSize: '.8rem'
		}
	}
};
