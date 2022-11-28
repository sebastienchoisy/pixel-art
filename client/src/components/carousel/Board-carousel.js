import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import BoardPropTypes from '../../proptypes/board-proptypes';
import BoardDisplay from '../board/Board-display';

export default function BoardCarousel({ boards }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Warning: findDOMNode is deprecated in StrictMode quand le carousel est utilisé
  // issue connue mais toujours pas fixé par reactStrap

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === boards.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? boards.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = boards.map((board) => (
    <CarouselItem
      onExiting={() => setAnimating(true)}
      onExited={() => setAnimating(false)}
      key={board.pixelBoardname}
      slide={false}
    >
      <BoardDisplay board={board} side={300} />
    </CarouselItem>
  ));
  return (
    <Carousel
      className="boards-carousel"
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      slide={false}
      fade={false}
      dark
    >
      <CarouselIndicators
        items={boards}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

BoardCarousel.propTypes = {
  boards: PropTypes.arrayOf(BoardPropTypes).isRequired,
};
