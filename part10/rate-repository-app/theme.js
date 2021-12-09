import { Platform } from 'react-native';

const getFont = () => {
	const plattis = Platform.OS;
	if (plattis === 'android') return 'Roboto';
	else if (plattis === 'ios') return 'Arial';
	else return 'System';
}

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		primary: '#0366d6',
		backgroundColor: '#24292e',
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		main: getFont(),
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
  };
  
  export default theme;