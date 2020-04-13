import "@testing-library/jest-dom/extend-expect";

global.requestAnimationFrame = callback => {
  callback();
};
global.cancelAnimationFrame = () => true;
global.ResizeObserver = function ResizeObserver(callback) {
  this.disconnect = () => {};
  this.observe = () => {
    callback([
      {
        contentRect: {
          width: 1140
        }
      }
    ]);
  };
};

// below found here: https://github.com/jsdom/jsdom/issues/2155
// Mock data and helper methods
global.window.HTMLMediaElement.prototype._mock = {
  paused: true,
  duration: NaN,
  _loaded: false,
  _load: () => {},
  _resetMock: () => {}
};

// Get "paused" value, it is automatically set to true / false when we play / pause the audio.
Object.defineProperty(global.window.HTMLMediaElement.prototype, "paused", {
  get() {
    return this._mock.paused;
  }
});

// Get and set audio duration
Object.defineProperty(global.window.HTMLMediaElement.prototype, "duration", {
  get() {
    return this._mock.duration;
  },
  set(value) {}
});

// Start the playback.
global.window.HTMLMediaElement.prototype.play = function playMock() {
  if (!this._mock._loaded) {
    // emulate the audio file load and metadata initialization
    this._mock._load(this);
  }
  this._mock.paused = false;
  this.dispatchEvent(new Event("play"));
  // Note: we could
};

// Pause the playback
global.window.HTMLMediaElement.prototype.pause = function pauseMock() {
  this._mock.paused = true;
  this.dispatchEvent(new Event("pause"));
};
