import express from "express";
import bodyParser from "body-parser";
import qs from "querystring";
import cors from "cors";
import https from "https"; // ES module import

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/remove-background", (req, res) => {
  const imageUrl = req.body.imageUrl;
    console.log(imageUrl);
  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL is required" });
  }

  const options = {
    method: "POST",
    hostname: "ai-background-remover.p.rapidapi.com",
    path: "/image/matte/v1",
    headers: {
      "x-rapidapi-key": "c33a54ca92mshe0ed17d8bdc312dp1b9d2ejsn80174c01320a", // Replace with actual API key
      "x-rapidapi-host": "ai-background-remover.p.rapidapi.com",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const apiRequest = https.request(options, (apiRes) => {
    const chunks = [];

    apiRes.on("data", (chunk) => {
      chunks.push(chunk);
    });

    apiRes.on("end", () => {
      const body = Buffer.concat(chunks);
      console.log(body);
      res.status(apiRes.statusCode).json(JSON.parse(body.toString()));
    });
  });

  apiRequest.write(qs.stringify({ image_url: imageUrl }));
  console.log(image_url);
  apiRequest.end();

  apiRequest.on("error", (err) => {
    res
      .status(500)
      .json({ error: "Failed to process the image", details: err.message });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
