/**
 * Marquee v1.0
 * Author: Matheus Albino
 */
(function($) {
  function Marquee(elm) {
    this.elm = elm;
    this.running = true;
    this.step_start = 100;
    this.step_end = -this.elm.textContent.lenght;
    this.step = this.step_start;
    this.speed = 10;
    this.last_time = 0;

    this.elm.addEventListener("mouseover", () => {
      this.running = false;
    });

    this.elm.addEventListener("mouseout", () => {
      this.running = true;
    });
  }

  Marquee.prototype.setSpeed = function(value) {
    this.speed = value;
  };

  Marquee.prototype.play = function() {
    if (!this.animation) {
      this.animation = requestAnimationFrame(this.update.bind(this));
    }
  };

  Marquee.prototype.stop = function() {
    if (this.animation) {
      cancelAnimationFrame(this.animation);
      this.animation = undefined;
    }
  };

  Marquee.prototype.update = function(time) {
    if (this.last_time == 0) this.last_time = time;
    let frame_time = time - this.last_time;
    this.last_time = time;
    let delta_time = frame_time / 1000;

    if (this.running) {
      this.step = this.step - delta_time * this.speed;
      if (this.step <= this.step_end) this.step = this.step_start;
      this.elm.style.textIndent = this.step + "%";
    }

    this.stop();
    this.play();
  };

  if (typeof $.Marquee === "undefined") {
    $.Marquee = Marquee;
  }
})(window || globalThis || {});
