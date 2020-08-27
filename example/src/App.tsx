import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import VideoPlayer from '@vmo-community/video-player';

const { width, height } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <VideoPlayer
        style={styles.container}
        source={{
          uri:
            'http://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8',
        }}
        controls
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
});
