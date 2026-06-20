// Suma los montos y devuelve el subtotal
export function calcularSubtotal(montos: number[]): number {
  return montos.reduce((s, v) => s + v, 0);
}

// Calcula el IVA a partir del subtotal y una tasa (decimal)
export function calcularIva(subtotal: number, tasa = 0.12): number {
  return subtotal * tasa;
}

// Devuelve subtotal + iva 
export function calcularTotal(subtotal: number, iva: number): number {
  return subtotal + iva;
}