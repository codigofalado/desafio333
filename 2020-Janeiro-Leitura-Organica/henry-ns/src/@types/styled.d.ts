import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      backgound: string;
      active: string;
      activeDark: string;
      primaryText: string;
      secundaryBackgound: string;
    };
  }
}
