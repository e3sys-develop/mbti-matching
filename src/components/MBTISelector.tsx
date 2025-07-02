import React from 'react';
import { mbtiTypes } from '../data/mbtiTypes';

interface MBTISelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
  label: string;
}

export const MBTISelector: React.FC<MBTISelectorProps> = ({
  selectedType,
  onSelect,
  label
}) => {
  const typeGroups = [
    { name: '分析家', types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'], color: 'purple' },
    { name: '外交官', types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'], color: 'teal' },
    { name: '番人', types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'], color: 'blue' },
    { name: '探検家', types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'], color: 'orange' }
  ];

  const colorClasses = {
    purple: 'border-purple-300 bg-purple-50 hover:bg-purple-100',
    teal: 'border-teal-300 bg-teal-50 hover:bg-teal-100',
    blue: 'border-blue-300 bg-blue-50 hover:bg-blue-100',
    orange: 'border-orange-300 bg-orange-50 hover:bg-orange-100'
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{label}</h3>
      
      {typeGroups.map(group => (
        <div key={group.name} className="space-y-3">
          <h4 className="text-sm font-medium text-gray-600">{group.name}</h4>
          <div className="grid grid-cols-2 gap-3">
            {group.types.map(type => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${selectedType === type 
                    ? `border-${group.color}-500 bg-${group.color}-100 ring-2 ring-${group.color}-200` 
                    : `${colorClasses[group.color as keyof typeof colorClasses]} border-gray-200`
                  }
                  hover:shadow-md active:scale-95
                `}
              >
                <div className="font-bold text-lg text-gray-800">{type}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {mbtiTypes[type].title}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};