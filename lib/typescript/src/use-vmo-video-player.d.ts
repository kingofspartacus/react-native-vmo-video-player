/// <reference types="react" />
export declare function useVmoVideoPlayer(props: any): {
    nativeProps: any;
    seek: (time: any, tolerance?: any) => void;
    save: () => (options?: {}) => Promise<any>;
    presentFullscreenPlayer: () => void;
    dismissFullscreenPlayer: () => void;
    restoreUserInterfaceForPictureInPictureStopCompleted: (restored: any) => void;
    refVideo: import("react").MutableRefObject<any>;
    showPoster: boolean;
};
