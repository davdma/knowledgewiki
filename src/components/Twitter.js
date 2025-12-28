import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './Twitter.module.css';

export default function Twitter({ tweetId, theme, width }) {
  const { colorMode } = useColorMode();
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Determine theme: use prop if provided, otherwise auto-detect from Docusaurus
  const effectiveTheme = theme || colorMode;

  useEffect(() => {
    // Validate tweetId
    if (!tweetId) {
      setError('Tweet ID is required');
      setIsLoading(false);
      return;
    }

    // Load Twitter widget script if not already loaded
    const loadTwitterScript = () => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        if (window.twttr && window.twttr.widgets) {
          resolve(window.twttr);
          return;
        }

        // Check if script tag already exists
        const existingScript = document.getElementById('twitter-wjs');
        if (existingScript) {
          existingScript.addEventListener('load', () => resolve(window.twttr));
          existingScript.addEventListener('error', reject);
          return;
        }

        // Create and load script
        const script = document.createElement('script');
        script.id = 'twitter-wjs';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.onload = () => resolve(window.twttr);
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load and render tweet
    loadTwitterScript()
      .then((twttr) => {
        if (containerRef.current) {
          // Clear container
          containerRef.current.innerHTML = '';

          // Create tweet embed
          const options = {
            theme: effectiveTheme,
            align: 'center',
            dnt: true, // Do Not Track
          };

          // Add width option - only pass pixel values to Twitter API
          // For percentage widths, we'll let CSS handle it
          if (width && !String(width).includes('%')) {
            options.width = typeof width === 'number' ? width : parseInt(width);
          }

          twttr.widgets
            .createTweet(tweetId, containerRef.current, options)
            .then((element) => {
              if (element) {
                setIsLoading(false);
              } else {
                setError('Failed to load tweet. Please check the tweet ID.');
                setIsLoading(false);
              }
            })
            .catch(() => {
              setError('Failed to load tweet. Please check the tweet ID.');
              setIsLoading(false);
            });
        }
      })
      .catch(() => {
        setError('Failed to load Twitter widget script.');
        setIsLoading(false);
      });
  }, [tweetId, effectiveTheme, width]);

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
      </div>
    );
  }

  // Handle custom container width
  const containerStyle = {};
  if (width) {
    if (typeof width === 'string' && width.includes('%')) {
      containerStyle.width = width;
    } else {
      // For pixel values, set a max-width to contain the tweet
      const pixelWidth = typeof width === 'number' ? width : parseInt(width);
      containerStyle.maxWidth = `${pixelWidth}px`;
    }
  }

  return (
    <div className={styles.container} style={containerStyle}>
      {isLoading && (
        <div className={styles.loading} style={containerStyle}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonHeader}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonFooter}></div>
          </div>
        </div>
      )}
      <div ref={containerRef} className={styles.tweetWrapper}></div>
    </div>
  );
}
