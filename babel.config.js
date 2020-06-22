// TODO: check this again!
// it is meant to allow babel to compile files that
// are imported by the examples sub-packages from upper
// scope. In this case the Recorder component.

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime'],
}
