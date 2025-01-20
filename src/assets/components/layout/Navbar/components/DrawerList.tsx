interface DrawerListProps {
  subChildren: any[];
  topSellers: any[];
  children: any[];
}

function DrawerList({ subChildren, topSellers, children }: DrawerListProps) {
  // console.log('DrawerList Props:', { subChildren, topSellers, children }); // Debug için

  return (
    <div>
      {/* Çok Satanlar Bölümü */}
      {topSellers && topSellers.length > 0 && (
        <div className="mb-4">
          <h3>Çok Satanlar</h3>
          <ul className="list-unstyled">
            {topSellers.map((item: any) => (
              <li key={item.id} className="py-2">
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alt Kategoriler Bölümü */}
      {subChildren && subChildren.length > 0 && (
        <div className="mb-4">
          <h3>Alt Kategoriler</h3>
          <ul className="list-unstyled">
            {subChildren.map((subChild,index) => (
              <li key={index} className="py-2">
                {subChild.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ana Kategoriler Bölümü */}
      {children && children.length > 0 && (
        <div className="mb-4">
          <h3>Kategoriler</h3>
          <ul className="list-unstyled">
            {children.map((child: any) => (
              <li key={child.id} className="py-2">
                <h4 className="mb-2">{child.name}</h4>
                {child.sub_children && child.sub_children.length > 0 && (
                  <ul className="list-unstyled ps-3">
                    {child.sub_children.map((subChild: any) => (
                      <li key={subChild.id} className="py-1">
                        {subChild.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DrawerList;
