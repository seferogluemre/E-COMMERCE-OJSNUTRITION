import { useEffect, useState } from 'react';
import Notification from '../../../assets/components/layout/ToastNotification/Notification';

function Home() {
  const [notification, setNotification] = useState({
    type: "success" as const,
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    const savedNotification = localStorage.getItem('loginNotification');
    if (savedNotification) {
      const { type, message, timestamp } = JSON.parse(savedNotification);
      
      // Sadece son 5 saniye içinde kaydedilmiş bildirimleri göster
      if (new Date().getTime() - timestamp < 5000) {
        setNotification({ type, message, isVisible: true });
        
        // 3 saniye sonra bildirimi kapat
        setTimeout(() => {
          setNotification(prev => ({ ...prev, isVisible: false }));
        }, 3000);
      }
      
      // localStorage'ı temizle
      localStorage.removeItem('loginNotification');
    }
  }, []);

  return (
    <>
      {/* Mevcut ana sayfa içeriği */}
      
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </>
  );
}

export default Home; 