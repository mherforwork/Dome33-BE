const { EventEmitter } = require('events');

const MONITOR_INTERVAL = 500;

const TEMPERATURE_CHANGED_EVENT = "temperature";
const AIRPRESSURE_CHANGED_EVENT = "air-pressure";
const HUMIDITY_CHANGED_EVENT = "humidity";

const eventEmitter = new EventEmitter();
let timer;

const randomIntFromRange = (min, max) => { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.start = () => {
  const timer = setInterval(() => {
    const dataType = randomIntFromRange(1, 4);

    switch (dataType) {
      case 1: // Temperature
        eventEmitter.emit(TEMPERATURE_CHANGED_EVENT, randomIntFromRange(365, 400) / 10);
        break;
      case 2: // Air pressure
        eventEmitter.emit(AIRPRESSURE_CHANGED_EVENT, randomIntFromRange(10100, 10500) / 10);
        break;
      case 3: // Humidity
        eventEmitter.emit(HUMIDITY_CHANGED_EVENT, randomIntFromRange(60, 99));
        break;
      default: // ignore
        break;
    }
  }, MONITOR_INTERVAL);
};

exports.end = () => {
  if (timer) {
    clearInterval(timer);
  }
}

exports.listen = (name, callback) => {
  if (!eventEmitter) {
    return;
  }

  eventEmitter.on(name, callback);
}
