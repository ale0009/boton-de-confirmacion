import React, { useState } from 'react';
import { AlertContainer } from './components/AlertContainer';
import { AlertType } from './components/Alert';
import { PurchaseConfirmation } from './components/PurchaseConfirmation';
import { Bell, ShoppingCart } from 'lucide-react';

// Interfaces para los tipos de datos
interface AlertItem {
  id: string;
  type: AlertType;
  title: string;
  message: string;
}

// Producto de ejemplo
const demoProduct = {
  name: "Producto de Ejemplo",
  price: 99.99,
  quantity: 1
};

function App() {
  // Estado para las alertas
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  // Estado para el modal de confirmación de compra
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // Función para agregar alertas
  const addAlert = (type: AlertType, title: string, message: string) => {
    const newAlert = {
      id: Date.now().toString(),
      type,
      title,
      message,
    };
    setAlerts((prev) => [...prev, newAlert]);
    setTimeout(() => removeAlert(newAlert.id), 5000);
  };

  // Función para remover alertas
  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Manejador para confirmar la compra
  const handleConfirmPurchase = () => {
    setIsPurchaseModalOpen(false);
    addAlert(
      'success',
      '¡Compra exitosa!',
      'Tu pedido ha sido procesado correctamente.'
    );
  };

  // Manejador para cancelar la compra
  const handleCancelPurchase = () => {
    setIsPurchaseModalOpen(false);
    addAlert(
      'info',
      'Compra cancelada',
      'Has cancelado la compra. ¡Te esperamos pronto!'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Contenedor de alertas */}
      <AlertContainer alerts={alerts} onDismiss={removeAlert} />
      
      {/* Modal de confirmación de compra */}
      <PurchaseConfirmation
        product={demoProduct}
        isOpen={isPurchaseModalOpen}
        onConfirm={handleConfirmPurchase}
        onCancel={handleCancelPurchase}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Bell className="w-8 h-8 text-emerald-600" />
                <h1 className="text-3xl font-bold text-gray-800">Demo de Compra</h1>
              </div>
            </div>
            
            {/* Botón para abrir el modal de compra */}
            <div className="flex justify-center">
              <button
                onClick={() => setIsPurchaseModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Realizar Compra</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;