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
}

export const Image = ({
    src,
    alt,
    className = '',
    sources = [],
    fallbackSrc,
    loading = 'lazy',
    decoding = 'async',
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

    if (sources.length > 0) {
        return (
            <picture className={styles.picture}>
                {sources.map((source, index) => (
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
            {...props}
        />
    );
};
