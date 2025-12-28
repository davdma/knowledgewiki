import React, { useState } from 'react';
import styles from './YouTube.module.css';

export default function YouTube({ videoId, width, height, title = 'YouTube video player' }) {
  const [isLoading, setIsLoading] = useState(true);

  if (!videoId) {
    return (
      <div className={styles.error}>
        <p>Error: YouTube video ID is required</p>
      </div>
    );
  }

  // YouTube iframe parameters
  // rel=0: don't show related videos from other channels
  // modestbranding=1: minimal YouTube branding
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

  const containerStyle = {};
  if (width) containerStyle.width = width;
  if (height) containerStyle.height = height;

  return (
    <div className={styles.container} style={containerStyle}>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.skeleton}></div>
        </div>
      )}
      <iframe
        className={styles.iframe}
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}
