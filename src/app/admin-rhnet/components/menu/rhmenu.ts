import { RhMenu } from "./rhmenu-model"
export const RHmenuItems = [





    new RhMenu (30, 'MI PERFIL', '/rhnet/perfil', null, 'account_circle', null, false, 0),
    new RhMenu (31, 'GENERAR PASE', '/rhnet/pase', null, 'pan_tool', null, false, 0),

    new RhMenu (31, 'INCIDENCIAS', null, null, 'alarm', null, true, 0),
    new RhMenu (33, 'GENERAR PASE DIGITAL', 'rhnet/pase', null, 'pan_tool', null, false, 31),







]
