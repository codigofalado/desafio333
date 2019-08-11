/**
 * Clock v1.0
 * Author: Matheus Albino
 */
(function($) {
  function Clock(elm) {
    this.elm = elm;
    this.on();
  }

  Clock.prototype.on = function() {
    this.instance = setInterval(this.update.bind(this), 1000);
  };

  Clock.prototype.off = function() {
    this.elm.textContent = "00:00";
    clearInterval(this.instance);
  };

  Clock.prototype.update = function() {
    let current_time = new Date();
    let current_hours = current_time.getHours();
    let current_minutes = current_time.getMinutes();

    current_hours = (current_hours < 10 ? "0" : "") + current_hours;
    current_minutes = (current_minutes < 10 ? "0" : "") + current_minutes;

    this.elm.textContent = current_hours + ":" + current_minutes;
  };

  if (typeof $.Clock === "undefined") {
    $.Clock = Clock;
  }
})(window || globalThis || {});
