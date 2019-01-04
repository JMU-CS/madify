var img = new Image()
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var fileName = ''

Caman.allowRevert = false

Dropzone.options.myAwesomeDropzone = {
  autoProcessQueue: false,
  autoQueue: false,
  createImageThumbnails: false,
  init: function () {
    this.on("addedfile", function (file) {
      var reader = new FileReader()
      if (file) {
        fileName = file.name
        reader.readAsDataURL(file)
      }
      reader.addEventListener('load', function () {
        img = new Image()
        img.src = reader.result
        img.onload = function () {
          canvas.width = img.width
          canvas.height = img.height
          $(".preview-wrapper").css("width", img.width)
          $(".preview-wrapper").css("height", img.height)
          ctx.drawImage(img, 0, 0, img.width, img.height)
          $('#canvas').removeAttr('data-caman-id')
          Caman('#canvas', function () {
            // this.revert(false)
            this.customscale()
            this.render()
            $(".preview-wrapper").removeClass("hidden")
            $(".navbar-text").toggleClass("removed")
          })
        }
      }, false)
    })
  }
}

$('#canvas').on('click', function (e) {
  var fileExtension = fileName.slice(fileName.lastIndexOf('.'))
  if (fileExtension == '.jpg' || fileExtension == '.jpeg' || fileExtension == '.png') {
    var actualName = fileName.substring(0, fileName.length - fileExtension.length)
  }
  download(canvas, actualName + '-madifyed.jpg')
})

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