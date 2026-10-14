// src/pages/admin/index/LastOrders.jsx
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';

export function LastOrders() {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Últimos Pedidos Recientes</h3>
            <div className="overflow-x-auto">
                <Table>
                    <THead>
                        <TRow>
                            <THeadItem cx="pb-3">ID Pedido</THeadItem>
                            <THeadItem cx="pb-3">Cliente</THeadItem>
                            <THeadItem cx="pb-3">Fecha</THeadItem>
                            <THeadItem cx="pb-3">Total</THeadItem>
                            <THeadItem cx="pb-3">Estado</THeadItem>
                            <THeadItem cx="pb-3 text-right">Acciones</THeadItem>
                        </TRow>
                    </THead>
                    <TBody cx="text-sm">
                        <TRow>
                            <TData cx="font-medium">#4892</TData>
                            <TData>@juan_dev</TData>
                            <TData>Hoy, 14:20</TData>
                            <TData cx="font-semibold text-center">$34.500</TData>
                            <TData>
                                <Badge content="Pendiente" variant="warning" />
                            </TData>
                            <TData>
                                <div className="flex justify-end items-center gap-2">
                                    <Button variant="ghost">Ver</Button>
                                    <Button>Completar</Button>
                                </div>
                            </TData>
                        </TRow>
                        <TRow>
                            <TData cx="font-medium">#4891</TData>
                            <TData>@maria_coder</TData>
                            <TData>Ayer, 18:45</TData>
                            <TData cx="font-semibold text-center">$12.300</TData>
                            <TData>
                                <Badge content="Completado" variant="success" />
                            </TData>
                            <TData>
                                <div className="flex justify-end items-center gap-2">
                                    <Button variant="ghost">Ver</Button>
                                </div>
                            </TData>
                        </TRow>
                    </TBody>
                </Table>
            </div>
        </div>
    )
}