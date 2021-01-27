import dev from './dev';
import prod from './prod';

export default {
  ... (REACT_APP_ENV) ? dev : prod
}