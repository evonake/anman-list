import axios from 'axios';

axios.defaults.baseURL = '/api';

export async function getAnimes({ status = 'ongoing', id = null }) {
  const res = await axios.get('/animes', {
    params: {
      status,
      id,
    },
  });

  return res.data;
}

export async function updateAnime(newAnime) {
  const res = await axios.put(`/animes/${newAnime._id}`, newAnime);
  return res.data;
}
