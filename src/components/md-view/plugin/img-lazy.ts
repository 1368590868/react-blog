/**
 * bytemd plugin : image lazy load
 */
import type { BytemdPlugin } from 'bytemd'

export interface ImageLazyLoadOptions {
    // 是否使用原生懒加载
    useNativeLazy?: boolean;
    // 自定义加载占位图
    placeholderSrc?: string;
    // 自定义类名
    className?: string;
}

export default function imageLazyLoad(options: ImageLazyLoadOptions = {}): BytemdPlugin {
    const {
        useNativeLazy = true,
        placeholderSrc = '',
        className = ''
    } = options;

    return {
        viewerEffect({ markdownBody }) {
            // 获取所有图片元素
            const images = markdownBody.querySelectorAll('img');

            images.forEach((img) => {
                // 保存原始src
                const originalSrc = img.getAttribute('src');

                if (useNativeLazy) {
                    // 使用原生懒加载
                    img.setAttribute('loading', 'lazy');
                } else {
                    // 使用 Intersection Observer 实现懒加载
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                const obImg = entry.target as HTMLImageElement;
                                if (originalSrc) {
                                    obImg.src = originalSrc;
                                }
                                observer.unobserve(obImg);
                            }
                        });
                    });

                    // 设置占位图
                    if (placeholderSrc) {
                        img.src = placeholderSrc;
                    }

                    // 将原始图片地址存储在data-src属性中
                    img.dataset.src = originalSrc || '';
                    img.src = placeholderSrc;

                    // 添加自定义类名
                    if (className) {
                        img.classList.add(className);
                    }

                    // 开始观察
                    observer.observe(img);
                }
            });
        }
    }
}