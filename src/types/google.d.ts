declare interface Window {
  google: {
    accounts: {
      id: {
        initialize: (config: any) => void;
        prompt: () => void;
        renderButton: (
          element: HTMLElement,
          options: {
            type?: 'standard' | 'icon';
            theme?: 'outline' | 'filled_blue' | 'filled_black';
            size?: 'large' | 'medium' | 'small';
            text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
            shape?: 'rectangular' | 'pill' | 'circle' | 'square';
            width?: number | string;
          }
        ) => void;
      };
    };
  };
}