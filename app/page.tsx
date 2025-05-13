'use client';

import { useState } from 'react';
import CardEditor from '@/components/CardEditor';
import CardPreview from '@/components/CardPreview';

export default function Home() {
  const [cardData, setCardData] = useState({
    name: '',
    image: '',
    additionalFields: [],
  });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">デジタル名刺メーカー</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CardEditor cardData={cardData} setCardData={setCardData} />
          <CardPreview cardData={cardData} />
        </div>
      </div>
    </main>
  );
} 