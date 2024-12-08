import KakaoShareButton from '@components/KakaoShareButton';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import copyLinkIcon from '@public/copyLink.svg';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

function ShareModal({ isVisible, onClose }: Props) {
  const [_, copy] = useCopyToClipboard();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const currentUrl = window.location.href;
    copy(currentUrl)
      .then(() => {
        console.log('Copied!', currentUrl);
      })
      .catch((error: unknown) => {
        console.error('Failed to copy!', error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className={`transition-transform duration-300 transform ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      } absolute bottom-0 left-0 right-0 max-w-full bg-white shadow-xl rounded-tl-[30px] rounded-tr-[30px]`}
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="w-full max-w-[430px] mx-auto h-[180px] flex flex-col items-center justify-center">
        <span className="text-lg font-medium">공유하기</span>

        <div className="flex flex-row items-center justify-between w-[200px] mt-[30px]">
          <div className="flex flex-col items-center justify-center gap-4">
            <KakaoShareButton />
            <p>카카오톡</p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-4 cursor-pointer"
            onClick={handleCopy}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#e0e0e0] rounded-full">
              <Image src={copyLinkIcon} alt="링크 복사" className="w-6 h-6" />
            </div>

            <p>링크복사</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;