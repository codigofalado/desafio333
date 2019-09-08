/**
 * Draw Functions of g1 Elements in canvas
 *
 */
class CanvasElements {
  constructor(canvas) {
    // Set Canvas Props
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Settings Defaults Props of Canvas
    this.ctx.textBaseline = 'top';

    // Ratio of Elements
    this.ratio = 1;
    // Window Sizes
    this.win = {
      w: 0,
      h: 0
    };

    // Marquee Initial Value
    this.marqueeLeft = 40;
    this.titleHeight = 0;

    // Init Ratio and Window Sizes
    this.updateWindowSizes();

    // Images
    this.images = [
      { name: 'g1Icon', src: 'assets/g1-icon.svg' },
      { name: 'newsIcon', src: 'assets/news-icon.svg' },
      { name: 'globoIcon', src: 'assets/globo-icon.svg' }
    ];
    this.imagesRef = {};

    this.loadImages();

    // Adding Events Listeners
    // Windows Resizing...
    window.addEventListener('resize', () => this.updateWindowSizes());
  }

  /**
   * Drawing Functions
   */

  // Cleaning Canvas
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Draw
  drawBoxText(options) {
    const { rect, rectColor, text, textColor, font, image } = options;
    if (font) {
      this.ctx.font = font;
    }
    if (rect) {
      this.ctx.beginPath();
      if (rectColor) {
        this.ctx.fillStyle = rectColor;
      }
      this.ctx.rect(...rect);
      this.ctx.fill();
    }
    if (text) {
      if (textColor) {
        this.ctx.fillStyle = textColor;
      }
      this.ctx.textBaseline = 'top';
      this.ctx.fillText(...text);
    }
    if (image) {
      this.ctx.drawImage(...image);
    }
  }

  /**
   *  Drawing Components
   */
  // Drawing Left Hash
  drawHash(text = '#desafio333') {
    const x = this.getPixels(5);
    const y = this.getPixels(5.5, 'y');

    this.drawBoxText({
      font: 28 * this.ratio + 'px Roboto',
      textColor: '#bababa',
      text: [text, x, y]
    });
  }

  // Drawing Text Width Padding
  drawUrgent(text = 'urgente') {
    const { ratio, win } = this;

    const globoW = 36 * ratio;
    const newsW = 120 * ratio;

    text = text.toUpperCase();

    this.ctx.font = ratio * 26 + 'px "Roboto"';

    const textPx = 15 * ratio;
    const textPy = 6 * ratio;

    const metrics = this.ctx.measureText(text);
    const textW = metrics.width + textPx * 2;
    const w = textW + globoW + newsW;

    const h = 40 * ratio;
    const x = win.w - this.getPixels(5) - w;
    const y = this.getPixels(5.5, 'y');

    //Globo Icon
    if (this.imagesRef['globoIcon'] && this.imagesRef['globoIcon'].complete) {
      this.drawBoxText({
        image: [
          this.imagesRef['globoIcon'],
          x + 5 * ratio,
          y + 5 * ratio,
          globoW,
          globoW
        ]
      });
    }
    //News Icon
    if (this.imagesRef['newsIcon'] && this.imagesRef['newsIcon'].complete) {
      const nx = x + w - newsW;
      this.drawBoxText({
        image: [
          this.imagesRef['newsIcon'],
          nx,
          y + 5 * ratio,
          newsW,
          0.3 * newsW
        ]
      });
    }

    this.drawBoxText({
      rect: [x + globoW, y + textPy, textW + 2, h - textPy],
      rectColor: '#bf170a',
      text: [text, x + globoW + textPx, y + textPy * 2],
      textColor: '#fff'
    });
  }

  // Draw LiveBox/Locations
  drawLiveBox({ title = 'Ao Vivo', line1 = 'GitHub', line2 = false }) {
    const { ratio, win } = this;

    // Getting largest text
    title = title.toUpperCase();
    let textRef =
      line2 !== false ? (line1.length > line2.length ? line1 : line2) : line1;
    textRef = textRef.length < title.length ? title : textRef;

    this.ctx.font = ratio * 18 + 'px Roboto';

    const titlePx = 30 * ratio;
    const titlePy = 2 * ratio;
    const lineH = 20 * ratio;
    const linePy = 8 * ratio;

    const metrics = this.ctx.measureText(textRef);
    const w = metrics.width + titlePx * 2;
    const h = lineH;
    const x = win.w - this.getPixels(5) - w;
    const y = this.getPixels(5.5, 'y') + 45 * ratio;

    // Header
    this.drawBoxText({
      rect: [x, y, w, h],
      rectColor: '#bf170a',
      text: [title, x + titlePx, y + titlePy],
      textColor: '#fff'
    });

    // Location
    const line1Metric = this.ctx.measureText(line1);
    const l1px = (w - line1Metric.width) / 2;

    this.drawBoxText({
      rect: [x, y + lineH, w, lineH + linePy],
      rectColor: '#3d3d3f',
      text: [line1, x + l1px, y + lineH + linePy],
      textColor: '#fff'
    });

    if (line2) {
      // Location2
      const line2Metric = this.ctx.measureText(line2);
      const l2px = (w - line2Metric.width) / 2;

      this.drawBoxText({
        rect: [x, y + lineH * 2 + linePy - 2, w, lineH + linePy + 2],
        rectColor: '#3d3d3f',
        text: [line2, x + l2px, y + lineH * 2 + linePy * 2],
        textColor: '#fff'
      });
    }
  }

  // Drawing Footer
  drawFooter(marqueeText = 'This is a example of text to marquee') {
    const { ratio } = this;

    const x = this.getPixels(5);
    const w = this.getPixels(90);
    const y = this.getPixels(95.5, 'y') - 30 * ratio;
    const h = 35 * ratio;

    const g1IconW = 28 * ratio;
    const whiteLineX = 50 * ratio;

    this.drawBoxText({
      rect: [x, y, w, h],
      rectColor: '#a80000'
    });

    // G1 Icon
    if (this.imagesRef['g1Icon'] && this.imagesRef['g1Icon'].complete) {
      this.drawBoxText({
        image: [
          this.imagesRef['g1Icon'],
          x + 10 * ratio,
          y + 8 * ratio,
          g1IconW,
          g1IconW * 0.64
        ]
      });
    }

    // Right Line
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = '2';
    this.ctx.moveTo(x + whiteLineX, y);
    this.ctx.lineTo(x + whiteLineX, y + h);
    this.ctx.stroke();

    // Clock
    const time = this.getCurrentTime();
    const cp = 10 * ratio; //clock padding

    this.ctx.font = ratio * 20 + 'px "Roboto"';

    const clockMetric = this.ctx.measureText(time);
    const clockW = clockMetric.width + 2 * cp;
    const clockX = x + w - clockW;

    this.drawBoxText({
      rect: [clockX, y, clockW, h],
      rectColor: '#000',
      text: [time, clockX + cp, y + cp],
      textColor: '#fff'
    });

    // Marquee
    const marqueeP = 4 * ratio;
    const marqueeW = w - (whiteLineX + clockW + marqueeP * 2);

    this.drawMarquee(marqueeText, x + whiteLineX + marqueeP, y, marqueeW, h);
  }

  // Drawing Marquee
  drawMarquee(text = 'This is the text of marquee', x, y, w, h) {
    const { ratio } = this;

    this.ctx.font = ratio * 20 + 'px Roboto';

    const metric = this.ctx.measureText(text);
    const textPx = 10 * ratio;
    const textPy = 9 * ratio;
    const textW = metric.width + textPx;
    const overlayW = 20;

    // Clip Mask
    this.ctx.save();

    this.ctx.beginPath();
    this.ctx.rect(x, y, w, h);
    this.ctx.closePath();

    // Define path as Clip
    this.ctx.clip();

    // Text
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(text, x + this.marqueeLeft, y + textPy);

    /// reset clip to default
    this.ctx.restore();

    this.marqueeLeft--;
    if (this.marqueeLeft < -(textW + overlayW)) {
      this.marqueeLeft = w;
    }
  }

  // Draw Title
  drawTitle(title = 'This is a example of a good title') {
    const { ratio } = this;

    const x = this.getPixels(5);
    const w = this.getPixels(90);
    let y = this.getPixels(95.5, true);
    let h = 80 * ratio;
    const px = 20 * ratio; //padding
    const py = 20 * ratio; //padding

    this.ctx.font = ratio * 40 + 'px "Roboto Condensed"';

    const lineHeight = 45 * ratio;

    const res = this.getMultlinesInfo(
      title.toUpperCase(),
      x + px,
      y + py,
      w - px,
      lineHeight
    );

    h = lineHeight * res.lines.length + py * 2;
    y -= 30 * ratio + h;

    this.titleHeight = y;

    this.drawBoxText({
      rect: [x, y, w, h],
      rectColor: 'rgba(33, 33, 33, 0.9)'
    });

    res.lines.forEach((line, index) => {
      let ly = index * lineHeight + py;
      ly += index === 0 ? py / 2 : 0;
      this.drawBoxText({
        text: [line, x + px, y + ly],
        textColor: '#fff'
      });
    });
  }

  // Draw Subtitle
  drawSubtitle(subtitle = 'Idle Developer') {
    const { ratio } = this;

    const x = this.getPixels(5);
    const h = 30 * ratio;
    const y = this.titleHeight - h;
    const px = 20 * ratio;
    const py = 7 * ratio;

    subtitle = subtitle.toUpperCase();

    // Calc container Background
    this.ctx.font = 'bold ' + ratio * 23 + 'px "Roboto Condensed"';
    const metrics = this.ctx.measureText(subtitle);
    const w = metrics.width + px * 2;

    this.drawBoxText({
      rect: [x, y, w, h],
      rectColor: 'ddd',
      text: [subtitle.toUpperCase(), x + px, y + py],
      textColor: '#111'
    });
  }

  /**
   * Aux Functions
   */

  // Handing with windows resizing
  updateWindowSizes() {
    const { innerWidth: w, innerHeight: h } = window;
    this.win = { w, h };

    this.canvas.width = w;
    this.canvas.height = h;

    let ratio = 1;
    if (w < 320) {
      ratio = 0.6;
    } else if (w < 400) {
      ratio = 0.65;
    } else if (w < 480) {
      ratio = 0.7;
    } else if (w < 720) {
      ratio = 0.8;
    } else if (w < 960) {
      ratio = 0.9;
    } else {
      ratio = 1;
    }

    this.ratio = ratio;
  }

  // Getting Pixels of Percentage
  getPixels(per, v = false) {
    return v
      ? Math.floor(this.win.h * (per / 100))
      : Math.floor(this.win.w * (per / 100));
  }

  // Getting Current Time for clock
  getCurrentTime() {
    let now = new Date();
    let h = now.getHours();
    h = h < 10 ? '0' + h : h;
    let m = now.getMinutes();
    m = m < 9 ? '0' + m : m;
    return `${h}:${m}`;
  }

  // Getting Multline Lines limited by MaxWidth Info
  getMultlinesInfo(text, x, y, maxWidth, lineHeight) {
    let words = text.split(' ');
    let line = '';
    let lines = [];

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = this.ctx.measureText(testLine);

      if (metrics.width > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    lines.push(line);

    return {
      height: lineHeight * lines.length,
      lines
    };
  }

  // Loading Images
  loadImages() {
    this.images.forEach(image => {
      const { name, src } = image;
      this.imagesRef[name] = new Image();
      this.imagesRef[name].src = src;
    });
  }
}
