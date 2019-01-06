var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var reader = newFileReader()

var fileName

Caman.allowRevert = false

faceapi.loadSsdMobilenetv1Model('./weights')

Dropzone.options.myAwesomeDropzone = {
  autoProcessQueue: false,
  autoQueue: false,
  createImageThumbnails: false,
  init: initDropzone
}

const filters = [
  faceReplaceFilter,
  camanFilter
]

function initDropzone () {
  this.on("addedfile", function (file) {
    if (file) {
      fileName = file.name
      reader.readAsDataURL(file)
    }
  })
}

function newFileReader () {
  r = new FileReader()

  r.addEventListener('load', function () {
    img = new Image()
    img.src = r.result
    img.onload = async () => filters.forEach(async filter => await filter())
  }, false)

  return r
}

async function camanFilter () {
  canvas.width = img.width
  canvas.height = img.height
  $(".preview-wrapper").css("width", img.width)
  $(".preview-wrapper").css("height", img.height)
  ctx.drawImage(img, 0, 0)
  $('#canvas').removeAttr('data-caman-id')
  Caman('#canvas', function () {
    this.customscale()
    this.render()
    $(".preview-wrapper").removeClass("hidden")
    $(".navbar-text").toggleClass("removed")
  })
}

async function faceReplaceFilter () {
  const detections = await faceapi.detectAllFaces(canvas)
  faces = detections.map(d => d.box)
  faces.forEach(drawDukeDog)
}

$('#canvas').on('click', function (e) {
  var fileExtension = fileName.slice(fileName.lastIndexOf('.'))
  if (fileExtension == '.jpg' || fileExtension == '.jpeg' || fileExtension == '.png') {
    var actualName = fileName.substring(0, fileName.length - fileExtension.length)
  }
  download(canvas, actualName + '-madifyed.jpg')
})

async function drawDukeDog (face) {
  i = new Image()
  i.onload = () => { ctx.drawImage(i, face.x, face.y, face.width, face.height) }
  i.src = './img/duke-dog.png'
}

function download (canvas, filename) {
  var e
  var lnk = document.createElement('a')

  lnk.download = filename
  lnk.href = canvas.toDataURL('image/jpeg', 0.8)

  if (document.createEvent) {
    e = document.createEvent('MouseEvents')
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    lnk.dispatchEvent(e)
  }
  else if (lnk.fireEvent) {
    lnk.fireEvent('onclick')
  }
}
