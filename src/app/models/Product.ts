export class Product {

    constructor(
        id = '',
        index = 0,
        title = '',
        description = ''
    ) { 
        this.id = id
        this.index = index;
        this.title = title;
        this.description = description;
    }

    id?: string;
    index: number;
    title: string;
    description: string;
}