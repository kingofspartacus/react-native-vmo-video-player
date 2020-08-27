# @vmo-community/video-player

A library component play video use ExoPlayer with android, ios AVPlayer

## Installation

```sh
yarn add @vmo-community/video-player
```

## Usage
[Follow document react-native-video](https://github.com/react-native-community/react-native-video)
```js
import VideoPlayer from "@vmo-community/video-player";

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Config Husky
`
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    "pre-commit": "yarn lint && yarn typescript"
  }
},
`

## License

MIT
