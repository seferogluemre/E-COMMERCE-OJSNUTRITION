interface SubChildProps {
    name: string;
    slug: string;
    order: number;
}

export interface ChildProps {
    id: string;
    name: string;
    slug: string;
    order: number;
    sub_children?: SubChildProps[]; // Opsiyonel yapıldı
}

export interface CategoriesResponseProps {
    id: string;
    name: string;
    slug: string;
    order: number;
    children?: ChildProps[]; // Opsiyonel yapıldı
    top_sellers?: {
        name: string;
        slug: string;
        description: string;
        picture_src: string;
    }[]; // Array olarak tanımlandı:
    subChildren?: SubChild[]
}

export interface SubChild {
    name: string;
    slug: string;
    order: number;
}

export interface Child {
    id: string;
    name: string;
    slug: string;
    order: number;
    sub_children: SubChild[];
}

export interface TopSeller {
    name: string;
    slug: string;
    description: string;
    picture_src: string;
}

export interface CategoryProps {
    id: string;
    name: string;
    slug: string;
    order: number;
    children: Child[];
    top_sellers: TopSeller[];
    subChildren?: SubChild[];
}

export interface MobileSidebarProps {
    show: boolean;
    handleClose: () => void;
}