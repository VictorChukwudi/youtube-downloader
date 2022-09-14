import express from "express";
import ytdl from "ytdl-core";
const router = express.Router();

let error = [];

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.post("/", async (req, res) => {
  const { url } = req.body;
  const validateUrl = ytdl.validateURL(url);
  if (validateUrl) {
    const info = await ytdl.getInfo(url);
    const quality = [];
    const filterQuality = [];
    info.formats.forEach((item) => {
      if (item.hasAudio && item.hasVideo) {
        quality.push({
          label: item.qualityLabel,
          url: item.url,
        });
      }
    });

    for (let i = 0; i < quality.length; i++) {
      if (filterQuality.indexOf(quality[i]) === -1 && quality[i] != null) {
        filterQuality.push(quality[i]);
      }
    }
    res.render("download", {
      title: "Download",
      quality: filterQuality,
      id: info.videoDetails.videoId,
    });
  } else {
    res.render("error", { title: "404" });
  }
});

export default router;
