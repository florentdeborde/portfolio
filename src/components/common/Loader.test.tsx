import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from './Loader';
import styles from './Loader.module.css';

describe('Loader Component', () => {
    it('renders the loader structure correctly', () => {
        const { container } = render(<Loader />);

        // Check for main container classes
        expect(container.firstChild).toHaveClass(styles.loaderOverlay);
        expect(container.querySelector(`.${styles.loaderContent}`)).toBeInTheDocument();
        expect(container.querySelector(`.${styles.spinnerContainer}`)).toBeInTheDocument();
        expect(container.querySelector(`.${styles.spinnerRing}`)).toBeInTheDocument();
        expect(container.querySelector(`.${styles.spinnerCore}`)).toBeInTheDocument();
    });

    it('renders the text when provided', () => {
        const testText = "Loading details...";
        render(<Loader text={testText} />);

        const textElement = screen.getByText(testText);
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass(styles.loaderText);
    });

    it('does not render text element when text prop is not provided', () => {
        const { container } = render(<Loader />);
        const textElement = container.querySelector(`.${styles.loaderText}`);
        expect(textElement).not.toBeInTheDocument();
    });
});
