import { createAppContainer } from 'react-navigation';
import stack from './routes';
console.disableYellowBox = true;


export default createAppContainer(stack)