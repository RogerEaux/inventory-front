import { useEffect, useState } from 'react';
import { type ImgHTMLAttributes } from 'react';

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback: string;
}

export default function ImageWithFallback({ src, fallback, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => setImgSrc(fallback);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return <img src={imgSrc} onError={onError} {...props} />;
}
