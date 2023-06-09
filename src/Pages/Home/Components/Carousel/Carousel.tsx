import { Box, Grid, IconButton, Stack, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import LensIcon from "@mui/icons-material/Lens";
import { wrap } from "@popmotion/popcorn";

import { ITEMS } from "../../CarouselItems";
import { AnimatePresence, PanInfo, Point, motion } from "framer-motion";
import { CarouselItem, CarouselItemProps } from "./CarouselItem";
import { RingVolume } from "@mui/icons-material";

const sliderVariants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 1,
};

interface ICarouselProps {
  data: CarouselItemProps[];
  style: React.CSSProperties;
}

export function Carousel(props: ICarouselProps) {
  const theme = useTheme();
  const [[itemCount, direction], setItemCount] = useState([0, 1]);
  const activeItemIndex = wrap(0, ITEMS.length, itemCount);

  const swipeToItem = (swipeDirection: number) => {
    setItemCount([itemCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: PanInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToItem(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToItem(1);
    }
  };

  const skipToItem = (imageId: number) => {
    let changeDirection = 0;
    if (imageId > activeItemIndex) {
      changeDirection = 1;
    } else if (imageId < activeItemIndex) {
      changeDirection = -1;
    }
    setItemCount([imageId, changeDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      swipeToItem(1); // Automatically advance to the next slide
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [itemCount, swipeToItem]);

  return (
    <>
      <AnimatePresence initial={true}>
        <Box
          key={"item" + itemCount}
          component={motion.div}
          custom={direction}
          variants={sliderVariants}
          initial="incoming"
          animate="active"
          exit="exit"
          transition={sliderTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
          className="item"
          sx={{
            ...props.style,
            display: "flex-column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "850px",
            overflow: "hidden",
          }}
        >
          <CarouselItem {...props.data[activeItemIndex]} />
        </Box>
        <Stack
          direction="row"
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "absolute", // Set position to "relative"
            bottom: 3, // Set bottom value to 0
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "25px",
            maxWidth: "50%",
          }}
        >
          <IconButton
            sx={{ color: theme.palette.text.primary }}
            onClick={() => swipeToItem(-1)}
          >
            <ArrowLeftIcon />
          </IconButton>
          {props.data
            ? props.data.map((item, index) => {
                return (
                  <IconButton
                    key={"icon" + index}
                    onClick={() => skipToItem(index)}
                  >
                    <LensIcon
                      fontSize={index === activeItemIndex ? "large" : "small"}
                      style={{
                        color:
                          index == activeItemIndex
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                      }}
                    />
                  </IconButton>
                );
              })
            : ""}
          <IconButton
            sx={{ color: theme.palette.text.primary }}
            onClick={() => swipeToItem(1)}
          >
            <ArrowRightIcon />
          </IconButton>
        </Stack>
      </AnimatePresence>
    </>
  );
}
