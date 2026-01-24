import React from 'react';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-earth-light py-24">
            <div className="max-w-4xl mx-auto px-6 bg-white rounded-3xl shadow-xl p-12">
                <h1 className="text-4xl font-black text-earth-dark mb-8">Política de Devolución</h1>

                <div className="prose prose-lg text-gray-700 space-y-6">
                    <p>
                        En <strong>Gravel Empordà 360º</strong>, entendemos que los planes pueden cambiar. A continuación, detallamos nuestra política de cancelaciones y devoluciones.
                    </p>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">1. Cancelación de Reservas</h2>
                    <p>
                        Dada la naturaleza de la organización de nuestras rutas premium, las cancelaciones deben comunicarse por escrito a <a href="mailto:info@gravelemporda360.com" className="text-earth-brown font-bold">info@gravelemporda360.com</a>.
                    </p>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">2. Condiciones de Reembolso</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Cancelaciones con más de 30 días de antelación:</strong> Se estudiará la devolución del depósito de reserva (20%) descontando gastos de gestión.</li>
                        <li><strong>Cancelaciones con menos de 30 días:</strong> Una vez realizado el pago total, las condiciones de devolución se regirán por los términos especificados en el contrato individual de cada paquete.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-earth-dark mt-8">3. Anulaciones por parte de la empresa</h2>
                    <p>
                        En caso de que Gravel Empordà 360º se vea obligada a cancelar una ruta por causas internas, se ofrecerá una fecha alternativa o el reembolso íntegro de las cantidades abonadas.
                    </p>
                </div>
            </div>
        </div>
    );
}
