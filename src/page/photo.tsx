import React, { useState, useEffect } from 'react';
import Styles from './photo.module.scss'
import useResize from '../hooks/useResize'
import { useThrottle } from 'ahooks';

interface Photo {
    id?: number;
    url: string;
}


const PhotoPage: React.FC = () => {
    const { contentRect: { width } } = useResize()
    const throttledWidth = useThrottle(width < 800 ? 4 : width < 1200 ? 6 : width < 1600 ? 8 : 10, { wait: 500 });


    console.log(width)
    const [photos, setPhotos] = useState<Photo[]>([
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/400?${Math.random()}` },
        { url: `https://picsum.photos/200/500?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },
        { url: `https://picsum.photos/200/300?${Math.random()}` },

    ]);

    useEffect(() => {
        // Fetch photos from API or any other data source
        // and update the state
        const fetchPhotos = async () => {
            try {
                const response = await fetch('https://api.example.com/photos');
                const data = await response.json();
                setPhotos(data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h1>Photo Page</h1>
            <div className={Styles['container']} style={{ '--columns': throttledWidth } as React.CSSProperties & { '--columns': any }}>
                {photos.map((photo, i) => (
                    <img key={i} src={photo.url} />
                ))}
            </div>
        </div >
    );
};

export default PhotoPage;