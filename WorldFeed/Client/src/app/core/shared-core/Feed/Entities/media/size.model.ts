export interface Size {
  sizes: {
    medium: { // Medium-sized photo media will be limited to fit within a 1200x1200 boundary.
      w: 1200,
      h: 800,
      resize: 'fit',
    },
    thumb: { // Thumbnail-sized photo media will be limited to fill a 150x150 boundary and cropped.
      w: 150,
      h: 150,
      resize: 'crop', // A value of fit means that the media was resized to fit one dimension, keeping its native aspect ratio.
    },
    small: { // Small-sized photo media will be limited to fit within a 680x680 boundary.
      w: 680,
      h: 454,
      resize: 'fit',
    },
    large: { // Large-sized photo media will be limited to fit within a 2048x2048 boundary.
      w: 2048,
      h: 1366,
      resize: 'fit', // A value of crop means that the media was cropped in order to fit a specific resolution.
    },
  };
}
