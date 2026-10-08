import { Config } from '@remotion/cli/config'

// Renders the logo intro as a standalone video (npm run render:intro).
Config.setVideoImageFormat('jpeg')
Config.setCodec('h264')
Config.setCrf(16)
