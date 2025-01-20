import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface DrawerListProps {
  subChildren: any[];
  topSellers: any[];
  children: any[];
  onItemClick: (items: any[], type: 'topSeller' | 'sub_children' | 'children', categoryName: string) => void;
}

function DrawerList({ subChildren, topSellers, children, onItemClick }: DrawerListProps) {
  return (
    <div>
      {/* Çok Satanlar Başlığı */}
      {topSellers && topSellers.length > 0 && (
        <div 
          className="category-header py-3 d-flex justify-content-between align-items-center cursor-pointer border-bottom"
          onClick={() => onItemClick(topSellers, 'topSeller', 'Çok Satanlar')}
        >
          <h3 className="m-0">Çok Satanlar</h3>
          <FaArrowRight />
        </div>
      )}

      {/* Alt Kategoriler Başlığı */}
      {subChildren && subChildren.length > 0 && (
        <div 
          className="category-header py-3 d-flex justify-content-between align-items-center cursor-pointer border-bottom"
          onClick={() => onItemClick(subChildren, 'sub_children', 'Alt Kategoriler')}
        >
          <h3 className="m-0">Alt Kategoriler</h3>
          <FaArrowRight />
        </div>
      )}

      {/* Ana Kategoriler Başlığı */}
      {children && children.length > 0 && (
        <div 
          className="category-header py-3 d-flex justify-content-between align-items-center cursor-pointer border-bottom"
          onClick={() => onItemClick(children, 'children', 'Kategoriler')}
        >
          <h3 className="m-0">Kategoriler</h3>
          <FaArrowRight />
        </div>
      )}
    </div>
  );
}

export default DrawerList;
