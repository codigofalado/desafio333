/**
 * Recorder for Canvas Example
 *
 * supported only in latest browsers:
 * https://caniuse.com/#search=mediarecorder
 *
 * Some Documentation
 * https://developers.google.com/web/updates/2016/01/mediarecorder
 * https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported
 */

class Recorder {
  constructor(video, canvas) {
    // Check if Supported
    this.supported = typeof window.MediaRecorder !== undefined;
    // Name Video File
    this.filename = 'video-g1-';
    // Setting Video
    this.video = video;
    // Setting Canvas
    this.canvas = canvas;

    // Default Type
    this.defaultType = 'video/webm;codecs=h264';

    // Types Supported
    this.supportedTypes = [
      'video/mp4',
      'video/webm',
      'video/mpeg',
      'video/webm;codecs=vp8',
      'video/webm;codecs=daala',
      'video/webm;codecs=h264',
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8.0',
      'video/webm;codecs=vp9.0',
      'video/webm;codecs=avc1',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,vp9,opus',
      'video/x-matroska;codecs=avc1'
    ].filter(type =>
      this.supported ? MediaRecorder.isTypeSupported(type) : false
    );

    // Current Type
    this.type =
      this.supportedTypes.indexOf(this.defaultType) !== -1
        ? this.defaultType
        : this.supportedTypes.length > 0
        ? this.supportedTypes[0]
        : false;

    // Current Status
    this.recording = false;
    // Media Recorder Instance
    this.videoRecorder = null;

    // handlers
    this.onStopRecording = () => {};
  }

  setType(type) {
    this.type = type;
  }

  getTypeExt() {
    const arr = this.type.split('/');
    return arr[1].indexOf(';') === -1 ? arr[1] : arr[1].split(';')[0];
  }

  stop() {
    if (this.videoRecorder) {
      this.recording = false;
      this.videoRecorder.stop();
    }
  }

  start() {
    if (!this.supported) {
      throw new Error('MediaRecorder not supported.');
      return;
    }

    let chunks = [];

    if (!this.recording) {
      this.recording = true;
      const recorderOptions = {
        mimeType: this.type
      };

      // Setting to Mute to prevent Echo.
      this.video.volume = 0;

      const stream = this.canvas.captureStream();

      const audioStream = new MediaStream(
        this.video.captureStream().getAudioTracks()
      );
      const combinedStream = new MediaStream([
        ...stream.getTracks(),
        ...audioStream.getTracks()
      ]);
      this.videoRecorder = new MediaRecorder(combinedStream, recorderOptions);
      this.videoRecorder.start(1000);

      this.videoRecorder.ondataavailable = e => {
        chunks.push(e.data);
      };

      this.videoRecorder.onstop = e => {
        // Callback
        this.onStopRecording();

        // Restore Video Volume
        this.video.volume = 1;

        var blob = new Blob(chunks, {
          type: this.type
        });
        var url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download =
          this.filename + new Date().getTime() + this.getTypeExt();
        link.click();
      };
    } else {
      this.stop();
    }
  }
}
