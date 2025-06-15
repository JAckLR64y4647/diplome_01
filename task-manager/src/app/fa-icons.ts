import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
  faSignInAlt, 
  faTasks, 
  faPlusCircle, 
  faChartLine, 
  faUserCog, 
  faSignOutAlt,
  faUser,
  faLock,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

export function initializeFontAwesome(library: FaIconLibrary): void {
  library.addIcons(
    faSignInAlt,
    faTasks,
    faPlusCircle,
    faChartLine,
    faUserCog,
    faSignOutAlt,
    faUser,
    faLock,
    faEnvelope
  );
}