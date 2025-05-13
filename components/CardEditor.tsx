'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface CardEditorProps {
  cardData: {
    name: string;
    image: string;
    additionalFields: Array<{ label: string; value: string }>;
  };
  setCardData: (data: any) => void;
}

export default function CardEditor({ cardData, setCardData }: CardEditorProps) {
  const [newField, setNewField] = useState({ label: '', value: '' });

  const handleAddField = () => {
    if (newField.label && newField.value) {
      setCardData({
        ...cardData,
        additionalFields: [...cardData.additionalFields, newField],
      });
      setNewField({ label: '', value: '' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">名刺情報を入力</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">名前</label>
          <input
            type="text"
            value={cardData.name}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">画像URL</label>
          <input
            type="text"
            value={cardData.image}
            onChange={(e) => setCardData({ ...cardData, image: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">追加フィールド</h3>
          {cardData.additionalFields.map((field, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={field.label}
                onChange={(e) => {
                  const newFields = [...cardData.additionalFields];
                  newFields[index].label = e.target.value;
                  setCardData({ ...cardData, additionalFields: newFields });
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="ラベル"
              />
              <input
                type="text"
                value={field.value}
                onChange={(e) => {
                  const newFields = [...cardData.additionalFields];
                  newFields[index].value = e.target.value;
                  setCardData({ ...cardData, additionalFields: newFields });
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="値"
              />
            </div>
          ))}

          <div className="flex space-x-2">
            <input
              type="text"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="新しいラベル"
            />
            <input
              type="text"
              value={newField.value}
              onChange={(e) => setNewField({ ...newField, value: e.target.value })}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="新しい値"
            />
            <button
              onClick={handleAddField}
              className="p-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 