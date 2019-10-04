// vim: set ts=2 sw=2 et tw=80:

let looper;
let images = ["https://www.inf.usi.ch/carzaniga/anto.jpg"];
let quotes = [
  "NO",
  "Intuition",
  "Canottaggio",
  "anto.jpg",
  "Prefeitura de Praia Grande",
  "I'm not on Facebook",
  "Say again?",
  "Okkkk...",
  "Emacs",
  "È la somma che fa il totale",
  "Vota Antonio",
  "GNUmerics > Libreoffice calc",
  "You must do exercises",
  "A programmers",
  "Use 0 instead of NULL",
  "C is right, you are wrong",
  "What is ruby?",
  "SmartFibonacci",
  "Ciao Mamma",
  "Ciao Miao",
  "Absolutely",
  "Colorado",
  "Лекториум",
  "Лекция 2",
  "NEtwORkIng"
];

document.addEventListener("DOMContentLoaded", setup);

function setup() {
  changeImages();
  window.setInterval(changeImages, 15 * (360 / 5));
  changeQuotes(250, 10);
  document.getElementById("img1").removeAttribute("style");
  document.getElementById("img2").removeAttribute("style");
  document.getElementById("img3").removeAttribute("style");
}


/** Kaleido */
function loadImages(sources, callback) {
  var images = {};
  var loadedImages = 0;
  var numImages = 0;
  for (var src in sources) {
    numImages++;
  }
  for (var src in sources) {
    images[src] = new Image();
    images[src].onload = function() {
      if (++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[src].src = sources[src];
  }
}

function buildStage(images) {
  var stage = new Konva.Stage({
    container: 'img2',
    width: window.innerWidth,
    height: window.innerHeight
  });

  var layer = new Konva.Layer();

  var lion = new Konva.Image({
    image: images.lion,
    x: 80,
    y: 30,
    draggable: true
  });
  lion.cache();
  lion.filters([Konva.Filters.Kaleidoscope]);
  lion.kaleidoscopePower(3);
  layer.add(lion);
  stage.add(layer);

  let i = 0;
  setInterval(() => {
    console.log(i, "h");
    lion.kaleidoscopeAngle(i % 100);
    layer.batchDraw();
    i++;
  }, 100);
}

var sources = {
  lion: 'https://www.inf.usi.ch/carzaniga/anto.jpg'
};

function girunoFFS() {
    const now = new Date();
    if (now.getDate() == 24 && now.getMonth() == 9) {
        window.open('http://bit.ly/lineage4sharks', '_self');
    }
}

girunoFFS();

loadImages(sources, buildStage);

function changeImages() {
  for (let i = 1; i <= 3; i++)
    document.getElementById("img" + i).src = images[0];
}

let quote = 0;
function changeQuotes(time, offset) {
  quote += 1 + Math.floor(Math.random() * (quotes.length - 2));
  quote = quote % quotes.length;
  document.getElementById("quote").innerHTML =
    quotes[quote];
  window.setTimeout(function() {
    changeQuotes(time, offset);
  }, offset + time * Math.sqrt(quotes[quote].length));
}
