/**
 * Canvas Drawing
 */

const INITIAL_FIELDS = {
  hash: '#Desafio333',
  subtitle: 'Idle Developer',
  title: 'Desenvolvedor faz aplicação que pode gerar fake news',
  marquee:
    'Isso é o que acontece quando um desenvolvedor fica muito tempo olhando só para um pedaço de código. - O Desenvolvedor passa bem.',
  location_1: 'GitHub',
  location_2: 'Brasil'
};

class CanvasContent {
  constructor() {
    // Elements Prefix
    this.prefix = '.canvas-content__';
    this.menuWrap = document.querySelector(this.prefix + 'menu-wrap');
    // Get Canvas Ref
    this.canvas = document.getElementById('main-canvas');
    // Get Video Ref
    this.video = document.getElementById('main-video');

    // Init Canvas Elements
    this.canvasElements = new CanvasElements(this.canvas);
    // Init Left Menu
    this.leftMenu = new LeftMenu();

    // Content Handl
    this.content = INITIAL_FIELDS;
    this.fields = this.menuWrap.querySelectorAll(
      this.prefix + 'inputs .input-layer input'
    );
    this.updateFields();

    // Cam Vars
    this.camRef = null;
    this.camRecord = false;
    this.camStop = () => {};

    // Record
    this.recorder = new Recorder(this.video, this.canvas);
    this.recorder.onStopRecording = () => this.handleStopVideo();
    // Record Visible Layers
    this.recordWrap = document.querySelector(this.prefix + 'record-wrap');
    this.leftMenu.onToggleMenuIcon = s => this.handleRecordIconVisible(s);
    this.isRecording = false;

    // Add Events
    this.initEvents();

    // Init Camera
    this.handleUseCamera();

    // Init Animation
    this.drawCanvas();
  }

  initEvents() {
    // Video Size
    const resizeVideo = () => {
      this.video.width = window.innerWidth;
      this.video.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeVideo);
    resizeVideo();

    // Update Button
    this.menuWrap
      .querySelector(this.prefix + 'button-update')
      .addEventListener('click', () => {
        this.updateInterface();
      });

    // Cam Buttons
    this.menuWrap
      .querySelector(this.prefix + 'cam-face')
      .addEventListener('click', () => this.handleUseCamera('face'));
    this.menuWrap
      .querySelector(this.prefix + 'cam-env')
      .addEventListener('click', () => this.handleUseCamera());
    this.menuWrap
      .querySelector(this.prefix + 'cam-stop')
      .addEventListener('click', () => this.camStop());

    // Record
    this.recordWrap.querySelector('button').addEventListener('click', () => {
      this.recordWrap.classList.add('recording');
      this.recordWrap.querySelector('.text').innerHTML = 'gravando';
      this.recorder.start();
    });
  }

  startRecord() {
    if ((this.isRecording = false)) {
    }
  }

  updateFields(data = false) {
    data = data === false ? INITIAL_FIELDS : data;
    this.fields.forEach(field => {
      const key = field.getAttribute('data-key');
      if (data[key]) {
        field.value = data[key];
      }
    });
  }

  updateInterface() {
    let newData = {};
    this.fields.forEach(field => {
      const key = field.getAttribute('data-key');
      newData[key] = field.value;
    });
    this.content = { ...this.content, ...newData };
  }

  drawCanvas() {
    // Cleaning
    this.canvasElements.clearCanvas();

    // Draw Video
    this.canvasElements.ctx.drawImage(this.video, 0, 0);

    // Top Left
    this.canvasElements.drawHash(this.content.hash);

    // Top Right
    this.canvasElements.drawUrgent();
    this.canvasElements.drawLiveBox({
      line1: this.content.location_1,
      line2: this.content.location_2 ? this.content.location_2 : false
    });

    // Bottom
    this.canvasElements.drawSubtitle(this.content.subtitle);
    this.canvasElements.drawTitle(this.content.title);
    this.canvasElements.drawFooter(this.content.marquee);

    requestAnimationFrame(() => this.drawCanvas());
  }

  handleUseCamera(facingMode = 'environment') {
    const errorEl = document.querySelector(this.prefix + 'error-cam');
    errorEl.classList.add('hidden');

    const handleError = err => {
      err = err.message !== undefined ? err.message : err;
      errorEl.classList.remove('hidden');
      errorEl.innerHTML =
        'Ops... Não foi possivel iniciar Camera.<br /> Error - ' + err;
    };

    if (navigator.mediaDevices === undefined) {
      handleError('MediaDevices not Found.');
      return false;
    }

    try {
      this.camRef = navigator.mediaDevices
        .getUserMedia({ audio: true, video: { facingMode } })
        .then(stream => {
          try {
            this.canvas.width = this.video.width;
            this.canvas.height = this.video.height;

            this.video.srcObject = stream;

            this.camRecording = true;

            this.camStop = () => {
              if (this.camRecording) {
                stream.getTracks().forEach(track => track.stop());
                this.camRecording = false;
              }
            };
          } catch (err) {
            handleError(err);
          }
        })
        .catch(err => handleError(err));
    } catch (err) {
      handleError(err);
    }
  }

  handleRecordIconVisible(state) {
    if (state) {
      this.recordWrap.classList.remove('not-visible');
    } else {
      this.recordWrap.classList.add('not-visible');
    }
  }

  handleStopVideo() {
    this.recordWrap.classList.remove('recording');
    this.recordWrap.querySelector('.text').innerHTML = 'gravar';
  }
}

const canvasContent = new CanvasContent();
