import React, { useState, useEffect } from 'react';
import Styles from './photo.module.scss';
import useResize from '../hooks/useResize';
import { useThrottle } from 'ahooks';
import { Card, Col, Row } from 'antd';

interface Photo {
  id?: number;
  url: string;
}

const PhotoPage: React.FC = () => {
  const {
    contentRect: { width }
  } = useResize();
  const throttledWidth = useThrottle(width < 800 ? 2 : width < 1200 ? 4 : width < 1600 ? 6 : 8, {
    wait: 500
  });

  const [photos, setPhotos] = useState<Photo[]>([
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/200/400?${Math.random()}` },
    { url: `https://picsum.photos/100/500?${Math.random()}` },
    { url: `https://picsum.photos/100/300?${Math.random()}` },
    { url: `https://picsum.photos/200/200?${Math.random()}` },
    { url: `https://picsum.photos/200/100?${Math.random()}` },
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/200/500?${Math.random()}` },
    { url: `https://picsum.photos/100/200?${Math.random()}` },
    { url: `https://picsum.photos/200/300?${Math.random()}` },
    { url: `https://picsum.photos/300/200?${Math.random()}` },
    { url: `https://picsum.photos/400/100?${Math.random()}` },
    { url: `https://picsum.photos/500/600?${Math.random()}` },
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

  return (
    <div>
      <Row gutter={10}>
        {photoColumns.map((column, columnIndex) => (
          <Col key={columnIndex} span={24 / throttledWidth}>
            {column.map((photo, index) => (
              <Card
                key={index}
                style={{ marginBottom: 10 }}
                cover={<img src={photo.url} alt="photo" />}
              >
                <Card.Meta title="图片" description="测试图片信息" />
              </Card>
            ))}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PhotoPage;
