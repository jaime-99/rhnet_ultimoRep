export class SidenavMenu {
    constructor(public id: number,
                public title: string,
                public routerLink: string,
                public href: string,
                public target: string,
                public hasSubMenu: boolean,
                public parentId: number,
                public category: string // Agrega esta propiedad para la categoría del menú

                // public esAdmin: boolean = false // Agrega esta propiedad para indicar si es el elemento "Administración"
                ) { }
}

