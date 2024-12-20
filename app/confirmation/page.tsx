'use client';

import { getBbaebakDetail } from 'app/api/apiList';
import ShareModal from 'app/common_components/ShareModal';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MainLinkButton from './components/button/NewButton';
import Notice from './components/button/Notice';
import RefreshButton from './components/button/RefreshButton';
import SaveImageButton from './components/button/SaveImageButton';
import ShareButton from './components/button/ShareButton';
import Contents from './components/contents/Contents';
import Date from './components/contents/Date';
import Title from './components/contents/Title';
import Signature from './components/sign/Signature';

// const ID = 'd512b9ac-4d30-4fee-ae0f-444533555cd5'; // 약속 아이디 (완)
// const ID = '877d983f-b030-48dd-8906-2fe4ba16b9c5'; // 약속 아이디 (완)
// const ID = '6a32d36b-6d9a-487f-80ec-74fff502c538'; // 약속 아이디
// const ID = '8b08dbbf-ea47-4436-a494-d85c264b2726'; // 약속 아이디

interface fetchDataType {
  id: string;
  maker: string;
  date: string;
  desc: string;
  status: string;
  mates: {
    id: string;
    name: string;
    isSigned: boolean;
  }[];
  createdAt: any;
  updatedAt: any;
}

export default function Confirmation() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id');
  const [data, setData] = useState<fetchDataType>({
    id: '',
    maker: '',
    date: '',
    desc: '',
    status: '',
    mates: [],
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await getBbaebakDetail(queryId as string); // 아이디 생성시 params.id로 변경
        const data = res.data.data;
        setData({
          ...data,
        });
      } catch (error) {
        console.error('데이터 조회 에러', error);
      }
    };
    handleFetch();
  }, [queryId]);

  const { maker, status, mates, createdAt } = data;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // test
  // const testData = mockData;
  // const { id, maker, date, desc, status, mates, createdAt, updatedAt } =
  //   testData[0];

  console.log('증명서 페이지에서 받은 mates', mates);

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto scrollbar-gutter-stable no-scrollbar pd">
      <header className="inline-flex justify-center items-center py-0 px-[93.5px] relative mt-[34px] mb-[24px]">
        <Title status={status} />
        <RefreshButton />
      </header>
      <div className=" m-[24px] mr-[22px]">
        <section
          id="signDocument"
          className=" flex p-[24px] flex-col justify-center items-center gap-[12px] self-stretch rounded-[2px] bg-[#F6F5F2]"
        >
          <Date value={createdAt} />
          <Contents {...data} />

          {/* 테스트용 */}
          {/* <Contents {...testData[0]} /> */}
          <div className="w-[260px] h-[37px]">
            <Notice status={status} />
          </div>

          <Signature
            id={params.id}
            maker={maker}
            mates={mates}
            status={status}
          />
        </section>
        <section>
          <div className="flex items-start gap-4 self-stretch mt-[24px]">
            <SaveImageButton />
            <ShareButton onClick={() => setIsModalOpen(true)} />
            {isModalOpen && (
              <ShareModal
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(!isModalOpen)}
                onValidate={() => null}
                id={params.id}
                userName={maker}
              />
            )}
          </div>
          <MainLinkButton />
        </section>
      </div>
    </div>
  );
}

// [공통 언어]

// 약속: bbaebak
// 약속하는 사람: maker
// 약속할 상대: mate
// 도장(=서명): stamp
