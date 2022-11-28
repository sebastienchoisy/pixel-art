import React, { useEffect, useState } from 'react';
import { getBoards } from '../services/APIService';
import BoardCarousel from '../components/carousel/Board-carousel';

export default function ScreenAccueil() {
  const [boards, setBoards] = useState(null);
  useEffect(() => {
    getBoards().then((resp) => setBoards(resp.data));
  }, []);
  return boards && (<BoardCarousel boards={boards} />);
}
