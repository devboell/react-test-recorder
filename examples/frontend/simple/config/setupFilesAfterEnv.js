/* eslint-disable import/no-extraneous-dependencies */
// import 'babel-polyfill'
import '@testing-library/jest-dom'
import { toMatchImageSnapshot } from 'jest-image-snapshot'

expect.extend({ toMatchImageSnapshot })
global.fetch = require('jest-fetch-mock')
