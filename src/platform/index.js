function createPlatform() {
  const runtime = typeof wx !== 'undefined' ? wx : null;

  return {
    getSystemInfo() {
      if (runtime && runtime.getSystemInfoSync) return runtime.getSystemInfoSync();
      return { windowWidth: 375, windowHeight: 667, pixelRatio: 1 };
    },
    getStorage(key, fallback) {
      if (!runtime || !runtime.getStorageSync) return fallback;
      return runtime.getStorageSync(key) || fallback;
    },
    setStorage(key, value) {
      if (runtime && runtime.setStorageSync) runtime.setStorageSync(key, value);
    },
    onTouchStart(callback) {
      if (runtime) runtime.onTouchStart(callback);
    },
    onTouchEnd(callback) {
      if (runtime) runtime.onTouchEnd(callback);
    },
    onShow(callback) {
      if (runtime) runtime.onShow(callback);
    },
    onHide(callback) {
      if (runtime) runtime.onHide(callback);
    }
  };
}

module.exports = { createPlatform };
