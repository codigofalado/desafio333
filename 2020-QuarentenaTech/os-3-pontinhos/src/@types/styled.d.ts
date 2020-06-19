import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: {
      maxWidth: string;
    };
    colors: {
      active: string;
      background: string;
      backgroundDark: string;
      primaryText: string;
      secondaryText: string;
    };
  }
}
