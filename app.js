// Inisialisasi penggunaan express js
const express = require('express');
const app = express();
const port = 3000;

const path = require("path");

// Object Playlist
let songPlaylist = [
  {
    id    : 1,
    title : "Takut",
    artist : [{name : "Idgitaf"}],
    url : "https://open.spotify.com/intl-id/track/1qHddOZ7pwtmOsw0RmlKFx?si=80ca933c5f2f4c84"
  },
  {
    id    : 2,
    title : "Jiwa Yang Bersedih",
    artist : [{name : "Ghea Indrawari"}],
    url : "https://open.spotify.com/intl-id/track/6XsFgTG4dY768oIB4Dmeu0?si=633c0835e02a45c3"
  },
  {
    id    : 3,
    title : "Komang",
    artist : [{name : "Raim Laode"}],
    url : "https://open.spotify.com/intl-id/track/2AaaE0qvFWtyT8srKNfRhH?si=faffe9a0cfd141c3"
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

// Halaman Depan
app.get('/', (req,res) => {
  res.render("index" , { title: "Express"});
})

// About Click
app.get('/about', (req,res)=>{
  res.send("Hello Gais");
})

// Halaman Tampil Playlist
app.get('/playlist', (req, res) => {
  // Ketika ingin menampilkan song yang dicari
  const title = req.query.title;
  if (!!title) {
    return res.send(songPlaylist.filter((songPlaylist) => songPlaylist.title === title ));;
  }
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  // Ketika ingin menampilkan semua lagu
  res.send(songPlaylist);
});

// Delete Lagu
app.delete("/playlist/:id", (req, res) => {
  const playlistIndex = songPlaylist.findIndex(
    (songPlaylist) => songPlaylist.id === parseInt(req.params.id)
  );
  res.send(songPlaylist.splice(playlistIndex, 1)[0]);
});

// Get Song Details 
app.get("/song/:id", (req, res) => {
  res.send(songPlaylist.find((songPlaylist) => songPlaylist.id === parseInt(req.params.id)));
});

// Update Song
app.put("/song/:id", (req, res) => {
  const songIndex = songPlaylist.findIndex(
    (songPlaylist) => songPlaylist.id === parseInt(req.params.id)
  );
  songPlaylist[songIndex] = { id: songPlaylist[songIndex].id, ...req.body };
  res.send(songPlaylist[songIndex]);
});

// Add Song 
app.post('/song', (req, res) => {
  const newSongs = [
    ...songPlaylist,
    {
      id: new Date().valueOf(),
      title : req.body.title,
      artist :req.body.artist,
      url : req.body.url
    }
  ]
  songPlaylist = newSongs;
  res.status(201);
  res.send(songPlaylist)

});

// Console local host
app.listen(port,()=>{
  console.log(`Express app listening at http://localhost:${port}`);
})

