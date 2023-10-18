import { RhMenu } from "./rhmenu-model"
export const RHmenuItems = [





    new RhMenu (30, 'MI PERFIL', '/rhnet/perfil', null, 'support', null, false, 0),
    new RhMenu (31, 'GENERAR PASE', '/rhnet/pase', null, 'grid_on', null, false, 0),

    new RhMenu (31, 'INCIDENCIAS', null, null, 'grid_on', null, true, 0),
    new RhMenu (33, 'GENERAR PASE DIGITAL', 'rhnet/pase', null, 'grid_on', null, false, 31),







]
