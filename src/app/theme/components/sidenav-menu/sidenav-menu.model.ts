export class SidenavMenu {
    constructor(public id: number,
                public title: string,
                public routerLink: string,
                public href: string,
                public target: string,
                public hasSubMenu: boolean,
                public parentId: number,
                public esAdmin: boolean = false // Agrega esta propiedad para indicar si es el elemento "Administración"
                ) { }
}

