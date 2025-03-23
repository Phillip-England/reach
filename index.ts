

import { HTTPContext, logger, Xerus } from "xerus/xerus";
import { tmpl } from "./src/HTMLParser";

let app = new Xerus()

app.use(logger)

app.get("/static/*", async (c: HTTPContext) => {
  return await c.file("." + c.path);
});

app.get('/', async (c: HTTPContext) => {

  let colors: string[] = ['blue', 'red', 'orange']

  return c.html(tmpl(`
  
    <div __data='{"count": 0}'>
      <h1>{{ count }}</h1>
      <button>Increment</button>
    </div>

    <div>
      ${colors.map((color) => {
        return `
          <p>${color}</p>
        `
      })}
    </div>


    <script src='/static/index.js'></script>

    
  `))
})

await app.listen()