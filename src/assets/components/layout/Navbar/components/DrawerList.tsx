interface DrawerListProps {
  subChildren: Array<{ id: number; name: string }>; // Alt elemanların tipi
}

function DrawerList({ subChildren }: DrawerListProps) {
  return (
    <div>
      <h2>Ürünler</h2>
      <ul>
        {subChildren.map((item, index) => (
          <li key={index}>{item.name}</li> // Alt elemanları listele
        ))}
      </ul>
    </div>
  );
}

export default DrawerList;
