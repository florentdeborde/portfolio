import { Image } from '@/components/common/Image';
import { Check } from 'lucide-react';
import styles from './PhotoPicker.module.css';

export interface Photo {
    id: string | number;
    url: string;
    alt: string;
}

interface PhotoPickerProps<T extends Photo> {
    photos: T[];
    selectedId: string | number;
    onSelect: (photo: T) => void;
}

export const PhotoPicker = <T extends Photo>({ photos, selectedId, onSelect }: PhotoPickerProps<T>) => {
    return (
        <div className={styles.photoPickerPhotoGrid}>
            {photos.map((photo) => (
                <button
                    key={photo.id}
                    className={`${styles.photoPickerPhotoOption} ${selectedId === photo.id ? styles.selected : ''}`}
                    onClick={() => onSelect(photo)}
                    type="button"
                    aria-label={`Select photo ${photo.alt}`}
                    aria-pressed={selectedId === photo.id}
                >
                    <Image src={photo.url} alt="" className={styles.photoPickerImage} />
                    {selectedId === photo.id && (
                        <div className={styles.photoPickerCheckIcon}>
                            <Check size={16} />
                        </div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default PhotoPicker;
