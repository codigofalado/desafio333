// Class Manage Content
class ManageContent {
  constructor() {
    // Setting Manage Prefix
    this.prefix = '.manage-content__';
    // Setting Interface Prefix
    this.prefixInterface = '.g1__';

    // Settings Elements
    this.elementsNames = [
      'left-hash',
      'subtitle',
      'title',
      'marquee-inner',
      'location',
      'urgent',
      'globonews-icon'
    ];
    this.elements = [];
    this.initElements();

    // Set Inputs Wrap
    this.inputsWrap = document.querySelector(this.prefix + 'inputs');
    this.inputs = [];
    this.inputsValues = {};
    this.initInputs();

    // Set Update Button
    this.updateButton = document.querySelector(this.prefix + 'button-update');
    this.updateButton.addEventListener('click', e =>
      this.handleUpdateButton(e)
    );

    // Background
    this.bgPrefix = this.prefix + 'background-';
    this.bgImage = document.querySelector(this.bgPrefix + 'image');
    this.bgImageEl = this.bgImage.querySelector('img');
    this.bgVideo = document.querySelector(this.bgPrefix + 'video');
    this.bgVideoEl = this.bgVideo.querySelector('video');
    this.bgImagePreview = document.querySelector(
      this.prefix + 'bg-image-preview'
    );
    this.bgSelectionWrap = document.querySelector(this.bgPrefix + 'selection');

    // Background Settings
    this.currentBgType = 'video-default';
    this.bgDefaultImage = 'assets/background-default.jpg';
    this.bgDefaultVideo = 'assets/background-default.mp4';
    this.currentBgImage = this.bgDefaultImage;
    // Cam Vars
    this.camRef = null;
    this.camRecording = false;
    this.camStop = () => {};

    // Init Background Fields
    this.updateBackgroundField();
    this.initBgSelectionEvents();

    //Init Video
    this.initVideo();
  }

  initVideo() {
    if (this.currentBgType.indexOf('video') !== -1) {
      setTimeout(() => {
        this.bgVideoEl.play().catch(err => {
          console.log(err);
        });
      }, 1000);
    }
  }

  handleChangeBackgroundType(e) {
    this.currentBgType = e.target.value;
    this.updateBackgroundField();
  }

  updateBackgroundType() {
    if (this.currentBgType.indexOf('image') !== -1) {
      this.bgVideo.classList.add('hidden');
      this.bgImage.classList.remove('hidden');
    } else {
      if (this.currentBgType.indexOf('video') !== -1) {
        this.bgVideo.classList.remove('hidden');
        this.bgImage.classList.add('hidden');
      }
    }
  }

  // Background Selection Field
  updateBackgroundField() {
    this.bgSelectionWrap.querySelectorAll('p.type').forEach(p => {
      const name = p.getAttribute('data-key');
      if (name === this.currentBgType) {
        p.classList.remove('hidden');
      } else {
        p.classList.add('hidden');
      }
    });

    // Handle with Videos Controls and Image Preview
    const videoControls = document.querySelector(
      this.prefix + 'bg-video-controls'
    );
    if (this.currentBgType.indexOf('image') === -1) {
      this.bgImagePreview.parentElement.classList.add('hidden');
      videoControls.classList.remove('hidden');
    } else {
      this.bgImagePreview.src = this.currentBgImage;
      this.bgImagePreview.parentElement.classList.remove('hidden');
      videoControls.classList.add('hidden');
    }
    this.updateBackgroundType();
  }

  updateBackground(src) {
    if (this.currentBgType !== 'video-cam' && this.camRecording) {
      this.camStop();
    }
    if (this.currentBgType.indexOf('image') !== -1) {
      this.currentBgImage = src;
      this.bgImagePreview.src = src;
      this.bgImageEl.src = src;
      this.bgVideoEl.src = this.bgDefaultVideo;
    } else if (this.currentBgType.indexOf('video') !== -1) {
      this.currentBgVideo = src;
      this.bgImageEl.src = this.bgDefaultImage;
      this.bgVideoEl.src = src;
    }
  }
  updateBackgroundImage(src) {}

  // Handle Updating Interface Content
  handleUpdateButton(e) {
    this.updateElements();
    // Close Left Menu if Setted;
    if (leftMenu) {
      leftMenu.hide();
    }
  }

  // Handle Use Camera
  handleUseCamera(facingMode = 'environment') {
    const errorEl = document.querySelector(this.prefix + 'bg-error-cam');
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
            this.bgVideo.classList.remove('hidden');
            this.bgImage.classList.add('hidden');
            this.bgVideoEl.srcObject = stream;
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

  handleFileSelectChange(e) {
    const input = e.target;
    const type = input.getAttribute('data-type');

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = e => {
        this.currentBgType = type + '-user';
        this.updateBackground(e.target.result);
        this.updateBackgroundField();
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Background Selection
  // Init Buttons Events
  initBgSelectionEvents() {
    const wrap = this.bgSelectionWrap;

    // File Image
    const fileImage = wrap.querySelector(this.prefix + 'bg-file-image');
    const fileVideo = wrap.querySelector(this.prefix + 'bg-file-video');
    fileImage.addEventListener('change', e => this.handleFileSelectChange(e));
    fileVideo.addEventListener('change', e => this.handleFileSelectChange(e));

    const addEvent = (name, cb, event = 'click') => {
      wrap
        .querySelector(this.prefix + name)
        .addEventListener(event, e => cb(e));
    };

    addEvent(
      'background-type',
      e => this.handleChangeBackgroundType(e),
      'change'
    );
    addEvent('bg-image-user', () => fileImage.click());
    addEvent('bg-video-user', () => fileVideo.click());
    addEvent('bg-video-cam-face', () => this.handleUseCamera('user'));
    addEvent('bg-video-cam-env', () => this.handleUseCamera());
    addEvent('bg-video-cam-stop', () => this.camStop());
    addEvent('bg-use-image-url', e => {
      this.currentBgType = 'image-url';
      const src = wrap.querySelector(this.prefix + 'bg-image-url').value;
      this.updateBackground(src);
    });
    addEvent('bg-restore-image', e => {
      this.currentBgType = 'image-default';
      this.updateBackground(this.bgDefaultImage);
    });

    addEvent('bg-video-pause', () => this.bgVideoEl.pause());
    addEvent('bg-video-play', () => this.bgVideoEl.play());

    // debug
    const debugWrap = document.querySelector(this.prefix + 'debug-items');

    debugWrap
      .querySelector(this.prefix + 'debug-interface')
      .addEventListener('click', e => {
        document.querySelector('.g1__interface').classList.toggle('hidden');
      });
    debugWrap
      .querySelector(this.prefix + 'debug-live-block')
      .addEventListener('click', e => {
        document
          .querySelector('.g1__top-right')
          .classList.toggle('hidden-animation');
      });
  }

  // Elements
  initElements() {
    this.elementsNames.forEach(name => {
      const el = document.querySelector(this.prefixInterface + name);
      if (el) {
        const span = el.querySelector('span'); // Inner Span Animations
        this.elements[name] = span ? span : el;
      }
    });
  }

  // Inputs
  initInputs() {
    this.inputsWrap.querySelectorAll('.input-layer input').forEach(input => {
      let name = input.getAttribute('data-key');
      if (name) {
        let nameEl = name.replace(/_(.*)/g, '');
        if (this.elements[nameEl]) {
          let value = '';
          if (name.indexOf('_') !== -1) {
            value = this.elements[nameEl].innerHTML;

            const nameArr = name.split('_');
            const valueArr = value.split(/\<br\s*\/?>/);
            const valueIndex = parseInt(nameArr[1]) - 1;

            if (valueArr[valueIndex]) {
              input.value = valueArr[valueIndex]
                .replace(/[\n\r]+|[\s]{2,}/g, ' ')
                .trim();
            }
          } else {
            value = this.elements[nameEl].textContent
              .replace(/[\n\r]+|[\s]{2,}/g, ' ')
              .trim();
            input.value = value;
          }
        }
      }
    });
  }

  // Update Elements
  updateElements() {
    let multiLines = {};
    this.inputsWrap.querySelectorAll('.input-layer input').forEach(input => {
      let name = input.getAttribute('data-key');
      const value = input.value;
      if (name) {
        if (name.indexOf('_')) {
          name = name.split('_')[0];
          if (multiLines[name]) {
            multiLines[name].push(value);
          } else {
            multiLines[name] = [value];
          }
        } else {
          if (this.elements[name]) {
            this.elements[name].textContent = value;
            this.inputsValues[name] = value;
          }
        }
      }
    });
    Object.keys(multiLines).forEach(name => {
      if (this.elements[name]) {
        this.elements[name].innerHTML = multiLines[name].join('<br />');
        this.inputsValues[name] = multiLines[name];
      }
    });

    // Handle Urgent Status
    const isUrgent = this.inputsWrap.querySelector('.input-urgent input')
      .checked;
    if (isUrgent) {
      this.elements['urgent'].parentElement.classList.remove('hidden');
      this.elements['globonews-icon'].classList.add('hidden');
    } else {
      this.elements['urgent'].parentElement.classList.add('hidden');
      this.elements['globonews-icon'].classList.remove('hidden');
    }

    // Prevent Small Marquee Issues
    if (
      this.elements['marquee-inner'].offsetWidth <
      this.elements['marquee-inner'].parentElement.offsetWidth
    ) {
      this.elements['marquee-inner'].style.minWidth = '100%';
    } else {
      this.elements['marquee-inner'].style.minWidth = 'auto';
    }
  }

  // Convert a field name Dash/Uppercase or Uppercase/Dash
  convertFieldName(name) {
    return name.index('-') !== -1
      ? name.replace(/\-(\w)/g, (m, w) => w.toUpperCase())
      : name.replace(/[A-Z]/g, w => '-' + w.toLowerCase());
  }

  /**
   * Aux Functions
   */
}
// End Manage Content
