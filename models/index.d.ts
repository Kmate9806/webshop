export interface UserDTO {
    id: number;
    firstName: string;
    lastName: string;
}

export interface CategoryDTO {
    id: number;
    title: string;
}

export interface ProductDTO {
    id: number;
    title: string;
    description: string;
    price: number;
    imgUrl: string;
    brand: string;
    expiration: string;
    uploader: null | UserDTO;
    categories: CategoryDTO[];
}