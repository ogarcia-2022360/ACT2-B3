import * as readline from "readline";
import { calcularSubtotal, calcularIva, calcularTotal } from "./calculos";

function pregunta(prompt: string): Promise<string> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => {
        rl.question(prompt, (respuesta) => {
            rl.close();
            resolve(respuesta);
        });
    });
}

// Convierte el texto a numetros
function convertirANumeros(texto: string): number[] {
    // Estandariza separadores a coma
    let textoLimpio = texto.replace(/;/g, ",").replace(/ /g, ",");
    let pedazos = textoLimpio.split(",");
    
    let resultado: number[] = [];
    
    for (let i = 0; i < pedazos.length; i++) {
        const elemento = pedazos[i];
        
        if (elemento !== undefined) {
            let valor = Number(elemento);
            // Valida que no este vacio y sea un numero real
            if (elemento.trim() !== "" && !Number.isNaN(valor)) {
                resultado.push(valor);
            }
        }
    }
    
    return resultado;
}

async function main() {
    console.log("--- Calculadora de Ventas ---");
    console.log("1. Usar ejemplos");
    console.log("2. Ingresar mis propios números");

    const opcion = await pregunta("Elige 1 o 2: ");
    let misMontos: number[] = [];

    // Se define la fuente de los datos
    if (opcion === "1") {
        console.log("a) 12.5, 30, 7.99");
        console.log("b) 100, 45.5, 9.5");
        const tipoEjemplo = await pregunta("Elige a o b: ");
        misMontos = tipoEjemplo === "b" ? [100, 45.5, 9.5, 0.99] : [12.5, 30, 7.99];
    } else {
        const entrada = await pregunta("Ingresa los numeros separados por coma: ");
        misMontos = convertirANumeros(entrada);
    }

    // Se solicita IVA
    const tasaTexto = await pregunta("Ingresa el porcentaje de IVA (ej: 12): ");
    let tasa = Number(tasaTexto);
    if (Number.isNaN(tasa)) tasa = 12;

    // Procesa calculos
    const subtotal = calcularSubtotal(misMontos);
    const iva = calcularIva(subtotal, tasa / 100);
    const total = calcularTotal(subtotal, iva);

    console.log("\n--- RESULTADOS ---");
    console.log("Subtotal: " + subtotal.toFixed(2));
    console.log("IVA (" + tasa + "%): " + iva.toFixed(2));
    console.log("Total: " + total.toFixed(2));
}

main();