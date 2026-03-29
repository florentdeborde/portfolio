import React, { useState } from 'react';
import styles from './Image.module.css';

export interface ImageSource {
    srcSet: string;
    type: string;
    media?: string;
}

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    sources?: ImageSource[];
    fallbackSrc?: string; // Optional fallback image if load fails
    autoOptimize?: boolean; // Automatically generate WebP/AVIF sources
}

export const Image = ({
    src,
    alt,
    className = '',
    sources = [],
    fallbackSrc,
    autoOptimize = false,
    loading = 'lazy',
    decoding = 'async',
    fetchPriority = 'auto',
    ...props
}: ImageProps) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
        if (props.onError) {
            props.onError(e);
        }
    };

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoaded(true);
        if (props.onLoad) {
            props.onLoad(e);
        }
    };

    const combinedClassName = `${styles.image} ${isLoaded ? styles.loaded : ''} ${className}`;

    // Auto-generate sources if autoOptimize is enabled
    const allSources = [...sources];
    if (autoOptimize && typeof src === 'string' && !src.startsWith('data:') && !src.endsWith('.svg')) {
        const lastDotIndex = src.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            const baseSrc = src.substring(0, lastDotIndex);
            // Higher priority first
            allSources.unshift(
                { srcSet: `${baseSrc}.avif`, type: 'image/avif' },
                { srcSet: `${baseSrc}.webp`, type: 'image/webp' }
            );
        }
    }

    if (allSources.length > 0) {
        return (
            <picture className={styles.picture}>
                {allSources.map((source, index) => (
                    <source key={index} {...source} />
                ))}
                <img
                    src={imgSrc}
                    alt={alt}
                    className={combinedClassName}
                    loading={loading}
                    decoding={decoding}
                    onError={handleError}
                    onLoad={handleLoad}
                    {...props}
                />
            </picture>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={combinedClassName}
            loading={loading}
            decoding={decoding}
            onError={handleError}
            onLoad={handleLoad}
            fetchPriority={fetchPriority}
            {...props}
        />
    );
};
