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
    id?: string;
    name?: string;
    slug?: string;
    order?: number;
    children?: ChildProps[]; // Opsiyonel yapıldı
    top_sellers?: TopSeller[]; // Kullanılabilir tür tanımlandı
    subChildren?: SubChildProps[]; // Doğru tür referansı kullanıldı
    onItemClick: (
        items: any[],
        type: "topSeller" | "sub_children" | "children",
        categoryName: string
    ) => void;
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
    sub_children?: SubChild[];
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
    children?: Child[];
    top_sellers?: TopSeller[];
    subChildren?: SubChild[];
}
export type CategoryProp = {
    subChildren: SubChild[];
    top_sellers: TopSeller[];
    children: Child[];
};

export interface MobileSidebarProps {
    show: boolean;
    handleClose: () => void;
}


export interface ProductsDrawerProps {
    show: boolean;
    onHide: () => void;
    items: any[];
    title: string;
    onSubCategoryClick?: (items: any[], title: string) => void;
}