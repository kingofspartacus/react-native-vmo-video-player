import { NativeModules } from 'react-native';

type VideoPlayerType = {
  multiply(a: number, b: number): Promise<number>;
};

const { VideoPlayer } = NativeModules;

export default VideoPlayer as VideoPlayerType;
