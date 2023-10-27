import { RhMenu } from "./rhmenu-model"
export const RHmenuItems = [





    new RhMenu (30, 'MI PERFIL', '/rhnet/PERFIL', null, 'account_circle', null, false, 0),
    new RhMenu (31, 'PASES', '/rhnet/PASE', null, 'alarm_add', null, false, 0),

    new RhMenu (32, 'PASES AUTORIZADOS', '/rhnet/PASES_AUTORIZADOS', null, 'alarm_on', null, false, 0),
    new RhMenu (33, 'PASES GENERADOS', '/rhnet/PASES_GENERADOS', null, 'receipt', null, false, 0),


    // new RhMenu (31, 'INCIDENCIAS', null, null, 'alarm', null, true, 0),
    // new RhMenu (33, 'GENERAR PASE DIGITAL', 'rhnet/PASE', null, 'pan_tool', null, false, 31),

]
