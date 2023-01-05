export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: any;
    slug: string;
    tags: string[];
    title: string;
    type: any;
    gender: any

    // TODO: agregar createdAt y updatedAt
    createdAt?: string;
    updatedAt?: string;

}

export type ISize = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type IType = 'shirts'|'pants'|'hoodies'|'hats';
