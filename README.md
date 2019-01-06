# madify

This is the source code for https://madi.fi. This project serves as a demonstration of using a custom [CamanJS](http://camanjs.com/) filter (in this case, the [customscale filter](https://www.npmjs.com/package/@jmu-cs/customscale-camanjs-filter), which defaults to [JMU colors](https://www.jmu.edu/identity/our-style/color.shtml)) to modify a user's image and offer it back for them to save it, all done (client-side) in the user's own browser.

## Local usage
- Run `python -m SimpleHTTPServer` from the root of the repository
- Navigate to `localhost:8000`
- Drag and drop (or upload) an image 
  - It may take a few moments for your madified image to appear
- Click on the image to download your madified image
