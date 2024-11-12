import React, { useState, useEffect, useRef } from 'react';
import Styles from './photo.module.scss';
import useResize from '../hooks/useResize';
import { useThrottle } from 'ahooks';
import { Card, Carousel, CarouselProps, Col, Modal, Row } from 'antd';
interface Photo {
  id?: number;
  url: string;
}

const PhotoPage: React.FC = () => {
  const {
    contentRect: { width }
  } = useResize();

  const calculateColumns = (width: number) => {
    if (width < 800) return 2;
    if (width < 1200) return 4;
    if (width < 1600) return 6;
    return 8;
  };
  const throttledWidth = useThrottle(width < 800 ? 2 : width < 1200 ? 4 : width < 1600 ? 6 : 8, {
    wait: 500
  });

  const [photos, setPhotos] = useState<Photo[]>([
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/100/300?${Math.random()}` },
    { url: `https://picsum.photos/100/300?${Math.random()}` },
    { url: `https://picsum.photos/200/200?${Math.random()}` },
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/100/200?${Math.random()}` },
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/300/200?${Math.random()}` },
    { url: `https://picsum.photos/400/300?${Math.random()}` },
    { url: `https://picsum.photos/500/300?${Math.random()}` },
    { url: `https://picsum.photos/500/200?${Math.random()}` }
  ]); // 这里修改为 Photo[] 一维数组
  const [photoColumns, setPhotoColumns] = useState<Photo[][]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetch data from an API (replace with your actual API)
        const response = await fetch('https://api.example.com/photos');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    // 创建 columns 数组，每个子数组代表一列
    const columns: Photo[][] = Array.from({ length: throttledWidth }, () => []);
    photos.forEach((photo, index) => {
      columns[index % throttledWidth].push(photo);
    });
    setPhotoColumns(columns);
  }, [throttledWidth, photos]);

  type CustomCarouselRef = {
    goTo: (slide: number, dontAnimate?: boolean) => void;
    next: () => void;
    prev: () => void;
    autoPlay: (playType?: 'update' | 'leave' | 'blur') => void;
    innerSlider: any;
  };

  const silder = useRef<CustomCarouselRef | null>(null);
  const [visible, setVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const openGallery = (item: Photo) => {
    setVisible(true);
    setStartIndex(photos.findIndex((i) => i === item));
  };

  useEffect(() => {
    if (visible && silder.current) {
      silder.current.goTo(startIndex);
    }
  }, [startIndex, visible]);

  return (
    <div style={{ padding: '20px 20px' }}>
      <Row gutter={[20, 20]}>
        {photoColumns.map((column, columnIndex) => (
          <Col key={columnIndex} span={24 / throttledWidth}>
            {column.map((photo, index) => (
              <Card
                key={index}
                style={{ marginBottom: 10 }}
                cover={<img src={photo.url} alt="photo" />}
                onClick={() => openGallery(photo)}
              >
                <Card.Meta title="图片" description="测试图片信息" />
              </Card>
            ))}
          </Col>
        ))}
      </Row>
      <Modal
        width={800}
        height={500}
        open={visible}
        title="照片墙"
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <Carousel arrows={true} autoplay ref={silder} fade draggable infinite>
          {photos.map((item, i) => (
            <img style={{ cursor: 'pointer' }} key={i} src={item.url} height={500} />
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default PhotoPage;
