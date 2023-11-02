import { RhMenu } from "./rhmenu-model"
export const RHmenuItems = [





    // new RhMenu (30, 'MI PERFIL', '/rhnet/PERFIL', null, 'account_circle', null, false, 0),
    new RhMenu (31, 'PASE DIGITAL', '/rhnet/PASE', null, 'alarm_add', null, false, 0),

    new RhMenu (32, 'PASES AUTORIZADOS', '/rhnet/PASES_AUTORIZADOS', null, 'alarm_on', null, false, 0),

    new RhMenu (33, 'VACACIONES', null, null, 'receipt', null, true, 0),
    new RhMenu (33, 'VACACIONES 2', '/rhnet', null, 'receipt', null, false, 33),


    new RhMenu (20, 'Productos', null, null, 'grid_on', null, true, 0),
    new RhMenu (21, 'Categorias', '/admin/products/categories', null, 'category', null, false, 20),
    new RhMenu (22, 'Productos', '/admin/products/product-list', null, 'list', null, false, 20),


    // new RhMenu (31, 'INCIDENCIAS', null, null, 'alarm', null, true, 0),
    // new RhMenu (33, 'GENERAR PASE DIGITAL', 'rhnet/PASE', null, 'pan_tool', null, false, 31),

]
