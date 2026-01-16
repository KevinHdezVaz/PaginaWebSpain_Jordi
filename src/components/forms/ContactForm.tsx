import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(9, "Teléfono inválido"),
    people: z.string().min(1, "Indica número de personas"),
    package: z.string(),
    dates: z.string(),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        // Envío a Formspree (cambia el hash por tu código real cuando crees la cuenta)
        const response = await fetch("https://formspree.io/f/xpzgkwna", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("¡Mensaje enviado con éxito! Jordi te contactará pronto.");
            reset();
        } else {
            alert("Hubo un error al enviar. Inténtalo de nuevo o llama directamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-earth-dark font-semibold mb-2">
                        Nombre completo *
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        className="w-full px-6 py-4 rounded-lg border border-earth-beige focus:border-earth-brown focus:outline-none transition-all"
                        placeholder="Tu nombre"
                    />
                    {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-earth-dark font-semibold mb-2">
                        Email *
                    </label>
                    <input
                        {...register("email")}
                        type="email"
                        className="w-full px-6 py-4 rounded-lg border border-earth-beige focus:border-earth-brown focus:outline-none transition-all"
                        placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-earth-dark font-semibold mb-2">
                        Teléfono *
                    </label>
                    <input
                        {...register("phone")}
                        type="tel"
                        className="w-full px-6 py-4 rounded-lg border border-earth-beige focus:border-earth-brown focus:outline-none transition-all"
                        placeholder="+34 600 000 000"
                    />
                    {errors.phone && <p className="text-red-600 text-sm mt-2">{errors.phone.message}</p>}
                </div>

                <div>
                    <label className="block text-earth-dark font-semibold mb-2">
                        Número de personas (mín. 4, máx. 10) *
                    </label>
                    <select
                        {...register("people")}
                        className="w-full px-6 py-4 rounded-lg border border-earth-beige focus:border-earth-brown focus:outline-none transition-all"
                    >
                        <option value="">Seleccionar</option>
                        {[4, 5, 6, 7, 8, 9, 10].map(n => (
                            <option key={n} value={n}>{n} personas</option>
                        ))}
                    </select>
                    {errors.people && <p className="text-red-600 text-sm mt-2">{errors.people.message}</p>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-earth-dark font-semibold mb-2">
                        Paquete de interés
                    </label>
                    <select
                        {...register("package")}
                        className="w-full px-6 py-4 rounded-lg border border-earth-beige focus:border-earth-brown focus:outline-none transition-all"
                    >
                        <option value="">Cualquiera</option>
                        <option value="3dias">Fin de semana (3 días / 2 noches)</option>
                        <option value="5dias">Experiencia Empordà (5 días / 4 noches)</option>
                        <option value="7dias">Inmersión total (7 días / 6 noches)</option>
                        <option value="personalizado">Paquete personalizado</option>
                    </select>
                </div>

                <div>
                    <label className="block text-earth-dark font-semibold mb-2">
                        Fechas aproximadas
                    </label>
                    <input
                        {...register("dates")}
                        type="text"
                        className="w-full px-6 py-4 rounded-lg border border-earth-beige focus:border-earth-brown focus:outline-none transition-all"
                        placeholder="Ej: Junio 2026"
                    />
                </div>
            </div>

            <div>
                <label className="block text-earth-dark font-semibold mb-2">
                    Mensaje *
                </label>
                <textarea
                    {...register("message")}
                    rows={6}
                    className="w-full px-6 py-4 rounded-lg border border-earth-beige focus:border-earth-brown focus:outline-none transition-all resize-none"
                    placeholder="Cuéntanos más sobre tu grupo, preferencias, dudas..."
                />
                {errors.message && <p className="text-red-600 text-sm mt-2">{errors.message.message}</p>}
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-earth-brown hover:bg-earth-green text-white font-bold py-5 px-12 rounded-lg text-xl transition-all shadow-xl hover:shadow-2xl disabled:opacity-70"
                >
                    {isSubmitting ? "Enviando..." : "Enviar consulta"}
                </button>
            </div>
        </form>
    );
}